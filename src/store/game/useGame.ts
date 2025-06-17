import { create } from 'zustand';
import { generateRandomLayout } from 'src/utils/layoutGenerator';
import { GameState } from './game.types';
import { BoardType, BoardTypes, CellStatus, GameDifficulties, GameStatuses, MarkerTypes } from 'src/types/general';
import { makeCpuMove } from 'src/utils/cpuMoves';


export const useGameStore = create<GameState>((set, get) => ({
  playerBoard: {},
  opponentBoard: {},
  playerLayout: generateRandomLayout(),
  opponentLayout: generateRandomLayout(),
  playerDestroyedShips: [],
  gameDifficulty: GameDifficulties.EASY,
  targetQueue: [] as [number, number][],
  hitsStack: [] as [number, number][],
  opponentDestroyedShips: [],
  gameStatus: GameStatuses.PLAYING,
  currentTurn: BoardTypes.PLAYER,

  fireShot: (row, col) => {
    const { currentTurn, opponentLayout, opponentBoard, playerDestroyedShips, playerLayout, opponentDestroyedShips } = get();
    const key = `${row}-${col}`;
  
    if (currentTurn !== BoardTypes.PLAYER || opponentBoard[key]) return;
  
    const isHit = opponentLayout.some(ship =>
      ship.positions.some(([r, c]) => r === row && c === col)
    );
  
    const updatedBoard: Record<string, CellStatus> = { ...opponentBoard, [key]: isHit ? MarkerTypes.HIT : MarkerTypes.MISS };
  
    const newDestroyedShips = [...opponentDestroyedShips];
    const hitShip = opponentLayout.find(s =>
      s.positions.some(([r, c]) => r === row && c === col)
    );
  
    if (hitShip && hitShip.positions.every(([r, c]) => updatedBoard[`${r}-${c}`] === MarkerTypes.HIT)) {
      if (!newDestroyedShips.includes(hitShip.ship)) {
        newDestroyedShips.push(hitShip.ship);
      }
    }
  
    const playerDestroyed = playerDestroyedShips.length === playerLayout.length;
    const gameStatus = playerDestroyed
      ? GameStatuses.LOST
      : newDestroyedShips.length === opponentLayout.length
      ? GameStatuses.VICTORY
      : GameStatuses.PLAYING;
  
    set({
      opponentBoard: updatedBoard,
      currentTurn: BoardTypes.OPPONENT,
      opponentDestroyedShips: newDestroyedShips,
      gameStatus,
    });
  
    if (gameStatus === GameStatuses.PLAYING) {
      setTimeout(() => get().cpuMove(), 1000);
    }
  },
  
  setGameDifficulty: (difficulty: GameDifficulties) => {
    set({ gameDifficulty: difficulty });
  },

  cpuMove: () => {
    const {
      playerBoard,
      playerLayout,
      targetQueue,
      hitsStack,
      gameDifficulty,
      playerDestroyedShips,
      isShipSunk,
    } = get();
  
    const result = makeCpuMove(
      {
        board: playerBoard,
        layout: playerLayout,
        targetQueue,
        hitsStack,
        isShipSunk,
      },
      gameDifficulty
    );
  
    const newDestroyedShips = [...playerDestroyedShips];
    const lastHit = Object.entries(result.updatedBoard).find(
      ([key, status]) => status === MarkerTypes.HIT && !playerBoard[key]
    );
  
    if (lastHit) {
      const [key] = lastHit;
      const [row, col] = key.split('-').map(Number);
  
      const hitShip = playerLayout.find(s =>
        s.positions.some(([r, c]) => r === row && c === col)
      );
  
      if (
        hitShip &&
        hitShip.positions.every(([r, c]) => result.updatedBoard[`${r}-${c}`] === MarkerTypes.HIT)
      ) {
        if (!newDestroyedShips.includes(hitShip.ship)) {
          newDestroyedShips.push(hitShip.ship);
        }
      }
    }
  
    const playerLost = newDestroyedShips.length === playerLayout.length;
  
    set({
      playerBoard: result.updatedBoard,
      hitsStack: result.updatedHitsStack,
      targetQueue: result.updatedTargetQueue,
      currentTurn: result.nextTurn,
      playerDestroyedShips: newDestroyedShips,
      gameStatus: playerLost ? GameStatuses.LOST : GameStatuses.PLAYING,
    });
  
  },  
  

  isShipSunk: (row: number, col: number, type: BoardType) => {
    const board = type === BoardTypes.PLAYER ? get().playerBoard : get().opponentBoard;
    const layout = type === BoardTypes.PLAYER ? get().playerLayout : get().opponentLayout;
  
    const ship = layout.find(s =>
      s.positions.some(([r, c]) => r === row && c === col)
    );
  
    if (!ship) return false;
  
    return ship.positions.every(([r, c]) => board[`${r}-${c}`] === MarkerTypes.HIT);
  },

  getCellMarkerType: (row: number, col: number, type: BoardType) => {
    const {
      playerBoard,
      opponentBoard,
      isShipSunk,
    } = get();
  
    const key = `${row}-${col}`;
    const board = type === BoardTypes.PLAYER ? playerBoard : opponentBoard;
    const status = board[key];
  
    if (status === MarkerTypes.MISS) return MarkerTypes.MISS;
    if (status === MarkerTypes.HIT) {
      return isShipSunk(row, col, type) ? MarkerTypes.HIT : MarkerTypes.HIT_SMALL;
    }
  
    return null;
  },

  resetGame: () => {
    set({
      playerBoard: {},
      opponentBoard: {},
      playerDestroyedShips: [],
      opponentDestroyedShips: [],
      gameStatus: GameStatuses.PLAYING,
      gameDifficulty: get().gameDifficulty,
      playerLayout: generateRandomLayout(),
      opponentLayout: generateRandomLayout(),
      currentTurn: BoardTypes.PLAYER,
    });
  },
}));

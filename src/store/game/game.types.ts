import { BoardType, CellStatus, GameDifficulties, GameStatus, MarkerType, ShipLayout } from "src/types/general";

export interface GameState {
  playerBoard: Record<string, CellStatus>;
  opponentBoard: Record<string, CellStatus>;
  playerLayout: ShipLayout[];
  opponentLayout: ShipLayout[];
  currentTurn: BoardType;
  gameStatus: GameStatus;
  playerDestroyedShips: string[];
  opponentDestroyedShips: string[];
  targetQueue: [number, number][];
  hitsStack: [number, number][];
  gameDifficulty: GameDifficulties.EASY | GameDifficulties.HARD;
  fireShot: (row: number, col: number) => void;
  cpuMove: () => void;
  setGameDifficulty: (difficulty: GameDifficulties) => void;
  resetGame: () => void;
  isShipSunk: (row: number, col: number, type: BoardType) => boolean;
  getCellMarkerType: (row: number, col: number, type: BoardType) => MarkerType;
}
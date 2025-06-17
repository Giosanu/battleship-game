import { GameState } from '@store/game/game.types';
import { BoardType, BoardTypes, CellStatus, MarkerTypes } from 'src/types/general';

interface CPUContext {
  board: GameState['playerBoard'];
  layout: GameState['playerLayout'];
  targetQueue: [number, number][];
  hitsStack: [number, number][];
  isShipSunk: (row: number, col: number, type: BoardType) => boolean;
}

interface CPUResult {
  updatedBoard: GameState['playerBoard'];
  updatedTargetQueue: [number, number][];
  updatedHitsStack: [number, number][];
  nextTurn: BoardType;
}

export const makeCpuMove = (
  context: CPUContext,
  difficulty: 'easy' | 'hard'
): CPUResult => {
  const { board, layout, targetQueue, hitsStack, isShipSunk } = context;

  let row = -1;
  let col = -1;
  let key = '';

  // Try smart targeting if "hard" mode
  if (difficulty === 'hard' && targetQueue.length > 0) {
    const nextTarget = targetQueue.find(([r, c]) => !board[`${r}-${c}`]);
    if (nextTarget) {
      [row, col] = nextTarget;
    }
  }

  // If no valid smart target, pick a random unvisited cell
  if (row === -1 || col === -1) {
    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
      key = `${row}-${col}`;
    } while (board[key]);
  }

  key = `${row}-${col}`;
  const isHit = layout.some(ship =>
    ship.positions.some(([r, c]) => r === row && c === col)
  );

  const updatedBoard = {
    ...board,
    [key]: isHit ? MarkerTypes.HIT as CellStatus : MarkerTypes.MISS as CellStatus,
  };

  const updatedHitsStack: [number, number][] = isHit ? [...hitsStack, [row, col]] : [...hitsStack];
  let updatedTargetQueue = [...targetQueue];

  // If hit, queue adjacent cells for next moves
  if (difficulty === 'hard' && isHit) {
    const adjacent = [
      [row - 1, col] as [number, number],
      [row + 1, col] as [number, number],
      [row, col - 1] as [number, number],
      [row, col + 1] as [number, number],
    ].filter(([r, c]) => {
      const withinBounds = r >= 0 && r < 10 && c >= 0 && c < 10;
      const notFiredAt = !updatedBoard[`${r}-${c}`];
      const notAlreadyQueued = !targetQueue.some(([qr, qc]) => qr === r && qc === c);
      return withinBounds && notFiredAt && notAlreadyQueued;
    });

    updatedTargetQueue = [...updatedTargetQueue, ...adjacent];
  }

  // Clear stacks if ship is sunk
  if (isHit && isShipSunk(row, col, BoardTypes.PLAYER)) {
    updatedHitsStack.length = 0;
    updatedTargetQueue.length = 0;
  }

  return {
    updatedBoard,
    updatedHitsStack,
    updatedTargetQueue,
    nextTurn: BoardTypes.PLAYER,
  };
};

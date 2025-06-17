export type CellStatus = 'empty' | 'hit' | 'miss';

export type ShipType = 'carrier' | 'battleship' | 'cruiser' | 'submarine' | 'destroyer';

export enum BoardTypes {
  PLAYER = 'player',
  OPPONENT = 'opponent',
}

export enum GameDifficulties {
  EASY = 'easy',
  HARD = 'hard',
}

export enum MarkerTypes {
  HIT = 'hit',
  HIT_SMALL = 'hit-small',
  MISS = 'miss',
}

export type BoardType = BoardTypes.PLAYER | BoardTypes.OPPONENT;

export interface ShipLayout {
  ship: ShipType;
  positions: [number, number][];
}

export type MarkerType = MarkerTypes.HIT | MarkerTypes.HIT_SMALL | MarkerTypes.MISS | null;

export enum GameStatuses {
  PLAYING = 'Playing',
  VICTORY = 'Victory',
  LOST = 'Lost',
}

export type GameStatus = GameStatuses.PLAYING | GameStatuses.VICTORY | GameStatuses.LOST;

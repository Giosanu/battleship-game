export type ShipImageProps = {
  ship: string; // e.g., 'carrier', 'submarine'
  orientation: 'horizontal' | 'vertical';
  startX: number; // column (0-based)
  startY: number; // row (0-based)
  length: number; // number of tiles the ship spans
  tileSize?: number; // optional override for tile size (default = 32)
};

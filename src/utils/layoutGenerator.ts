
import { GRID_SIZE } from "src/constants/boardMetrics";
import { shipTypes } from "src/constants/ships";
import { ShipType } from "src/types/general";

type Position = [number, number];

interface ShipLayout {
  ship: ShipType;
  positions: Position[];
}

const generateShipPosition = (
  shipSize: number,
  occupied: Set<string>
): Position[] => {
  for (let attempt = 0; attempt < 1000; attempt++) {
    const isHorizontal = Math.random() < 0.5;

    const row = isHorizontal
      ? Math.floor(Math.random() * GRID_SIZE)
      : Math.floor(Math.random() * (GRID_SIZE - shipSize));
    const col = isHorizontal
      ? Math.floor(Math.random() * (GRID_SIZE - shipSize))
      : Math.floor(Math.random() * GRID_SIZE);

    const positions: Position[] = Array.from({ length: shipSize }, (_, i) =>
      isHorizontal ? [row, col + i] : [row + i, col]
    );

    const isOverlapping = positions.some(
      ([r, c]) => occupied.has(`${r}-${c}`)
    );

    if (!isOverlapping) return positions;
  }

  throw new Error("Failed to place ship after 1000 attempts");
};

export const generateRandomLayout = (): ShipLayout[] => {
  const layout: ShipLayout[] = [];
  const occupied = new Set<string>();

  for (const [ship, size] of Object.entries(shipTypes)) {
    const positions = generateShipPosition(size, occupied);
    layout.push({ ship: ship as ShipType, positions });
    positions.forEach(([r, c]) => occupied.add(`${r}-${c}`));
  }

  return layout;
};

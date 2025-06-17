import { ShipType } from "src/types/general";


export const shipTypes: Record<ShipType, number> = {
  carrier: 5,
  battleship: 4,
  cruiser: 3,
  submarine: 3,
  destroyer: 2,
};

export const shipImages = {
  carrier: require('assets/ships/Carrier Shape.png'),
  battleship: require('assets/ships/Battleship Shape.png'),
  cruiser: require('assets/ships/Cruiser Shape.png'),
  submarine: require('assets/ships/Submarine Shape.png'),
  destroyer: require('assets/ships/Aircraft Shape.png'),
};
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { ShipImageProps } from './ShipImage.types';
import { TILE_SIZE } from 'src/constants/boardMetrics';

const ShipImage: React.FC<ShipImageProps> = ({
  ship,
  orientation,
  startX,
  startY,
  length,
  tileSize = TILE_SIZE,
}) => {
  const source = getShipImage(ship);

  const isVertical = orientation === 'vertical';
  const width = isVertical ? tileSize : tileSize * length;
  const height = isVertical ? tileSize * length : tileSize;

  return (
    <Image
      source={source}
      style={[
        styles.image,
        {
          top: startY * tileSize,
          left: startX * tileSize,
          width,
          height,
          transform: isVertical ? [{ rotate: '90deg' }] : [],
        },
      ]}
      resizeMode="contain"
    />
  );
};

const getShipImage = (ship: string) => {
  switch (ship) {
    case 'carrier':
      return require('../../assets/ships/Carrier Shape.png');
    case 'battleship':
      return require('../../assets/ships/Battleship Shape.png');
    case 'cruiser':
      return require('../../assets/ships/Cruiser Shape.png');
    case 'submarine':
      return require('../../assets/ships/Submarine Shape.png');
    case 'destroyer':
      return require('../../assets/ships/Aircraft Shape.png');
    default:
      throw new Error(`Missing ship image for ${ship}`);
  }
};

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    zIndex: 0,
  },
});

export default ShipImage;

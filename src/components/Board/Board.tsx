import React, { useMemo } from 'react';
import { View, Image, Text } from 'react-native';
import { Cell } from '../Cell';
import { BoardProps } from './Board.types';
import { GRID_SIZE, TILE_SIZE } from 'src/constants/boardMetrics';
import { useGameStore } from '@store/game/useGame';
import { boardStyle } from './Board.styles';
import { BoardTypes, MarkerTypes, ShipLayout } from 'src/types/general';
import { shipImages } from 'src/constants/ships';

export const Board = ({ type }: BoardProps) => {
  const isPlayerBoard = useMemo(() => type === BoardTypes.PLAYER, [type]);
  const layout = useGameStore(s =>
    isPlayerBoard ? s.playerLayout : s.opponentLayout
  );
  const board = useGameStore(s =>
    isPlayerBoard ? s.playerBoard : s.opponentBoard
  );

  const shipOverlays = useMemo(() => {
    if (type !== BoardTypes.PLAYER) return null;

    return layout.map(({ ship, positions }: ShipLayout) => {
      const [start, end] = [positions[0], positions[positions.length - 1]];
      const isHorizontal = start[0] === end[0];
      const length = positions.length;

      const top = start[0] * TILE_SIZE;
      const left = start[1] * TILE_SIZE;

      const width = length * TILE_SIZE;
      const height = TILE_SIZE;

      const rotationTransform = isHorizontal
        ? []
        : [
          { translateX: TILE_SIZE / 2 - (length * TILE_SIZE) / 2 },
          { translateY: (length * TILE_SIZE) / 2 - TILE_SIZE / 2 },
          { rotate: '90deg' },
        ];

      return (
        <Image
          key={ship}
          source={shipImages[ship]}
          style={{
            position: 'absolute',
            top,
            left,
            width,
            height,
            borderWidth: 0.5,
            borderColor: '#8AC7DB',
            transform: rotationTransform,
          }}
          resizeMode="stretch"
        />
      );
    });
  }, [layout, type]);

  const markerOverlays = useMemo(() => {
    const { getCellMarkerType } = useGameStore.getState();

    return Object.entries(board).map(([key, status]) => {
      const [row, col] = key.split('-').map(Number);
      const markerType = getCellMarkerType(row, col, type);

      if (!markerType) return null;

      const top = row * TILE_SIZE;
      const left = col * TILE_SIZE;

      let source = null;
      switch (markerType) {
        case MarkerTypes.MISS:
          source = require('assets/markers/Miss small.png');
          break;
        case MarkerTypes.HIT_SMALL:
          source = require('assets/markers/Hit small.png');
          break;
        case MarkerTypes.HIT:
          source = require('assets/markers/Hit.png');
          break;
      }

      return (
        <Image
          key={key}
          source={source}
          style={{
            position: 'absolute',
            top,
            left,
            width: TILE_SIZE,
            height: TILE_SIZE,
            zIndex: 2,
          }}
          resizeMode="contain"
        />
      );
    });
  }, [type, board]);

  return (
    <>
      <Text>{isPlayerBoard ? 'You' : "Opponent"}</Text>
      <View style={boardStyle.container}>
        <View style={boardStyle.board}>
          {Array.from({ length: GRID_SIZE }).map((_, row) => (
            <View key={row} style={boardStyle.row}>
              {Array.from({ length: GRID_SIZE }).map((_, col) => (
                <Cell key={`${row}-${col}`} row={row} col={col} type={type} />
              ))}
            </View>
          ))}
        </View>
        {shipOverlays}
        {markerOverlays}
      </View>
    </>
  );
};
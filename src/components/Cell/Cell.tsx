import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { useGameStore } from '@store/game/useGame';

import Miss from 'assets/markers/Miss small.png';
import HitSmall from 'assets/markers/Hit small.png';
import HitBig from 'assets/markers/Hit.png';
import { TILE_SIZE } from 'src/constants/boardMetrics';
import { BoardType, BoardTypes, MarkerTypes } from 'src/types/general';

interface CellProps {
  row: number;
  col: number;
  type: BoardType;
}

export const Cell = ({ row, col, type }: CellProps) => {
  const fireShot = useGameStore(s => s.fireShot);
  const isPlayerBoard = React.useMemo(() => type === BoardTypes.PLAYER, [type]);
  const board = useGameStore(s =>
    isPlayerBoard ? s.playerBoard : s.opponentBoard
  );
  const { getCellMarkerType } = useGameStore.getState();
  const status = board[`${row}-${col}`];

  const handlePress = () => {
    if (!status && !isPlayerBoard) fireShot(row, col);
  };

  const markerType = useGameStore(s => getCellMarkerType(row, col, type));

  const getMarkerImage = () => {
    switch (markerType) {
      case MarkerTypes.HIT: return HitBig;
      case MarkerTypes.HIT_SMALL: return HitSmall;
      case MarkerTypes.MISS: return Miss;
      default: return null;
    }
  };

  const marker = getMarkerImage();

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={{
          width: TILE_SIZE,
          height: TILE_SIZE,
          borderWidth: .5,
          borderColor: '#8AC7DB',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ADD8E6',
        }}
      >
        {marker && (
          <Image source={marker} style={{ width: TILE_SIZE, height: TILE_SIZE }} resizeMode="contain" />
        )}
      </View>
    </TouchableOpacity>
  );
};

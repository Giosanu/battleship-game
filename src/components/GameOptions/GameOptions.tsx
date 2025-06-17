import { useGameStore } from '@store/game/useGame';
import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { shipImages } from 'src/constants/ships';
import { GameDifficulties } from 'src/types/general';

export const GameStatusPanel = () => {
  const gameStatus = useGameStore(s => s.gameStatus);
  const gameDifficulty = useGameStore(s => s.gameDifficulty);

  const opponentDestroyedShips = useGameStore(s => s.opponentDestroyedShips as Array<keyof typeof shipImages>);

  return (
    <View>
      <Text style={{ fontSize: 12 }}>Game Status: {gameStatus}</Text>
      <Text style={{ fontSize: 12 }}>Game Strategy: {gameDifficulty === GameDifficulties.EASY ? 'Random' : 'Closest to hit'}</Text>
      <Text style={{ fontSize: 12  }}>Ships Destroyed: {opponentDestroyedShips.length}/5</Text>
    </View>
  );
};

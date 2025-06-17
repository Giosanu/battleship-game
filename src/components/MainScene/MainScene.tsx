import { Board } from '@components/Board';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { BoardTypes, GameDifficulties } from 'src/types/general';
import { mainSceneStyles } from './MaineScene.styles';
import { GameStatusPanel } from '@components/GameOptions/GameOptions';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useGameStore } from '@store/game/useGame';

const MainScene: React.FC = () => {
  const gameDifficulty = useGameStore(s => s.gameDifficulty);
  const resetGame = useGameStore(s => s.resetGame);
  const { setGameDifficulty } = useGameStore.getState();

  const setToHard = () => setGameDifficulty(gameDifficulty === GameDifficulties.HARD ? GameDifficulties.EASY : GameDifficulties.HARD);

  return (
    <View style={mainSceneStyles.container}>
      <Board type={BoardTypes.OPPONENT} />
      <Board type={BoardTypes.PLAYER} />
      <View style={mainSceneStyles.floatingButtonsWrapper} >
        <View style={mainSceneStyles.button}>
          <TouchableOpacity onPress={resetGame}>
            <Ionicons name="reload" size={32} />
          </TouchableOpacity>
        </View>
        <View style={mainSceneStyles.button}>
          <TouchableOpacity onPress={setToHard}>
            {gameDifficulty !== GameDifficulties.EASY ?
              <Ionicons name="dice-sharp" size={32} />
              : <Ionicons name="hardware-chip" size={32} />}
          </TouchableOpacity>
        </View>
      </View>
      <GameStatusPanel />
    </View>
  );
};

export default MainScene;
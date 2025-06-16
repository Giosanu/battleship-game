import 'src/theme/theme.config.ts';

import React from 'react';
import { Board } from './src/components/Board';
import { SafeAreaView, StyleSheet } from 'react-native';
import { UnistylesProvider } from 'react-native-unistyles';


export default function App() {
  return (
    <UnistylesProvider>
      <SafeAreaView style={styles.container}>
        <Board type="opponent" />
        <Board type="player" />
      </SafeAreaView>
    </UnistylesProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import 'src/theme/theme.config.ts';

import React from 'react';
import { Board } from './src/components/Board';
import { SafeAreaView, StyleSheet } from 'react-native';
import { BoardTypes } from 'src/types/general';
import MainScene from '@components/MainScene/MainScene';


export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainScene />
    </SafeAreaView>
  )
}

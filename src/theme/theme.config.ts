import { UnistylesRegistry } from 'react-native-unistyles';
import { lightTheme } from './lightTheme';

export const themes = {
  light: lightTheme,
  // dark
};

export const breakpoints = {
  portrait: 1024,
  landscape: 768,
};

UnistylesRegistry
  .addThemes(themes)
  .addBreakpoints(breakpoints)

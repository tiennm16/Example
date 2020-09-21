import {Theme} from '@core';
import {Colors} from './colors';

export const LightTheme: Theme = {
  isDark: false,
  colorScheme: {
    primary: Colors.WHITE,
    secondary: Colors.PURPLE,
    onSecondary: Colors.WHITE,
    background: Colors.GRAY,
    surface: Colors.PURPLE,
    error: Colors.PURPLE,
    onBackground: '#000',
    onError: Colors.WHITE,
    onPrimary: Colors.BLACK,
    onSurface: Colors.WHITE,
  },
};

export const DarkTheme: Theme = {
  isDark: true,
  colorScheme: {
    primary: Colors.BLACK,
    secondary: Colors.PURPLE,
    onSecondary: Colors.WHITE,
    background: Colors.BLACK,
    surface: Colors.PURPLE,
    error: Colors.PURPLE,
    onBackground: Colors.WHITE,
    onError: Colors.WHITE,
    onPrimary: Colors.WHITE,
    onSurface: Colors.WHITE,
  },
};

import React from 'react';
import {
  LayoutAnimation,
  Platform,
  StatusBar,
  UIManager,
  useColorScheme,
} from 'react-native';

import {useSelector, Selector, useDispatch} from 'react-redux';

import {LightTheme, DarkTheme} from '@resources';
import {ThemeConfig, Theme} from '@core';
import {RootStoreState, setTheme} from '@shared-state';

export const themeSelector: Selector<RootStoreState, ThemeConfig> = ({
  configuration: {themeConfig},
}) => themeConfig;

export function useTheme() {
  const themeConfig = useSelector(themeSelector);
  const systemColorScheme = useColorScheme();
  if (themeConfig === ThemeConfig.Dark) {
    return DarkTheme;
  }
  if (themeConfig === ThemeConfig.System) {
    if (systemColorScheme === 'dark') {
      return DarkTheme;
    }
  }
  return LightTheme;
}

export function useThemedStatusBar() {
  const theme = useTheme();
  React.useEffect(() => {
    StatusBar.setBackgroundColor('transparent');
    if (theme.isDark) {
      StatusBar.setBarStyle('light-content');
      return;
    }
    StatusBar.setBarStyle('dark-content');
  }, [theme]);
}

/**
 * hook to theme state
 * @return Theme state and function to set theme
 */
export function useThemeWithSetter(): [Theme, (config: ThemeConfig) => void] {
  const theme = useTheme();
  const dispatch = useDispatch();
  const dispatchTheme = React.useCallback(
    (config: ThemeConfig) => {
      if (
        Platform.OS === 'android' &&
        UIManager.setLayoutAnimationEnabledExperimental
      ) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
      dispatch(setTheme(config));
    },
    [dispatch],
  );
  return [theme, dispatchTheme];
}

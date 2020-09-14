import {createAction} from '@reduxjs/toolkit';
import {ThemeConfig} from '@core';

export const setTheme = createAction<ThemeConfig>('configuration/setTheme');
export const setThemeSuccess = createAction('configuration/setThemeSuccess');
export const setThemeFailed = createAction('configuration/setThemeFailed');

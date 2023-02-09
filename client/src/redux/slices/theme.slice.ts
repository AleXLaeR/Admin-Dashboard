import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Theme } from '../../typings';

type ThemeState = {
  mode: Theme;
};

const initialState: ThemeState = {
  mode: 'dark',
};

const { actions, reducer } = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggle: (state, _) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
    },
    setMode: (state, { payload }: PayloadAction<Theme>) => {
      state.mode = payload;
    },
  },
});
export const { toggle, setMode } = actions;

export const selectTheme = createSelector(
  ({ theme }: RootState) => theme.mode,
  (mode) => mode,
);

export default reducer;

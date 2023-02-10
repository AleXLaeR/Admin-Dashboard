import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@redux/store';
import { Theme } from '@src/typings';

type ThemeState = { mode: Theme };
const initialState: ThemeState = { mode: 'dark' };

const { actions, reducer } = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggle: (state, _) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
    },
  },
});
export const { toggle } = actions;

export const selectTheme = createSelector(
  (state: RootState) => state.theme,
  (theme) => theme,
);

export default reducer;

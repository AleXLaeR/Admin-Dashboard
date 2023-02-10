import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@redux/store';
import { Theme } from '@src/typings';

type GlobalState = {
  mode: Theme;
  userId: string;
};

const initialState: GlobalState = {
  mode: 'dark',
  userId: '63701cc1f03239b7f700000e',
};

const { actions, reducer } = createSlice({
  name: 'global',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
    },
  },
});
export const { toggleTheme } = actions;

export const selectGlobalState = createSelector(
  (state: RootState) => state.global,
  (globalState) => globalState,
);

export default reducer;

import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@redux/store';

type ModalPayload = [keyof ModalList, boolean?];

type ModalState = { isOpen: boolean };
const defaultModalState: ModalState = { isOpen: true };

interface ModalList {
  sidebar: ModalState;
}

const initialState: ModalList = {
  sidebar: defaultModalState,
};

const { actions, reducer } = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setModal: (state, { payload: [modalName, isOpened] }: PayloadAction<ModalPayload>) => {
      state[modalName].isOpen = isOpened ?? !state[modalName].isOpen;
    },
  },
});
export const { setModal } = actions;

export const selectModalState = createSelector(
  ({ modal }: RootState, modalName: keyof ModalList = 'sidebar') => modal[modalName],
  (modalState) => modalState,
);

export default reducer;

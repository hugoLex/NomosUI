import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";

export interface AppState {
  isFindIn: boolean;
  isLexiAI: boolean;
  caseTitle: string | undefined;
  searchLabel: string | undefined;
  isSearchNavbar: boolean;
  isSearchModal: boolean;
  isTitle: boolean;
  isToogle?: boolean;
}

const initialState: AppState = {
  isFindIn: false,
  isLexiAI: false,
  caseTitle: undefined,
  searchLabel: undefined,
  isSearchNavbar: false,
  isSearchModal: false,
  isTitle: false,
  isToogle: true,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    open: (state) => {
      state.isFindIn = true;
    },
    close: (state) => {
      state.isFindIn = false;
    },

    toogleLexAI: (state) => {
      state.isLexiAI = !state.isLexiAI;
    },
    removeCaseTitle: (state) => {
      state.caseTitle = undefined;
    },
    removeSearchLabel: (state) => {
      state.searchLabel = undefined;
    },
    setCaseTitle: (state, action: PayloadAction<string>) => {
      state.caseTitle = action.payload;
    },
    setSearchLabel: (state, action: PayloadAction<string>) => {
      state.searchLabel = action.payload;
    },
    toggleNavbar: (state, action: PayloadAction<boolean>) => {
      state.isToogle = !state.isToogle;
    },
    toggleTitle: (state, action: PayloadAction<boolean>) => {
      state.isTitle = action.payload;
    },
    toggleSearchNav: (state, action: PayloadAction<boolean>) => {
      state.isSearchNavbar = action.payload;
    },
    toggleSearch: (state, action: PayloadAction<boolean>) => {
      state.isSearchModal = action.payload;
    },
  },
});

export const {
  open,
  close,
  toogleLexAI,
  removeCaseTitle,
  removeSearchLabel,
  setCaseTitle,
  setSearchLabel,
  toggleSearch,
  toggleSearchNav,
  toggleTitle,
  toggleNavbar,
} = appSlice.actions;
export const selectFindIn = (state: RootState) => state.app.isFindIn;
export const selectLexiAI = (state: RootState) => state.app.isLexiAI;
export const selectIsNavOpen = (state: RootState) => state.app.isToogle;
export const selectIsTitle = (state: RootState) => state.app.isTitle;
export const selectIsSearchModal = (state: RootState) =>
  state.app.isSearchModal;
export const selectIsSearchNavbar = (state: RootState) =>
  state.app.isSearchNavbar;
export const selectSearchLabel = (state: RootState) => state.app.searchLabel;
export const selectCaseTitle = (state: RootState) => state.app.caseTitle;

export default appSlice.reducer;

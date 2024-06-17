import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type GeneralMessage = {
  generalMessageState: "idle" | "pending" | "succeeded" | "failed" | "info";
  generalMessage: string;
};

interface Message extends GeneralMessage {
  chats: [];
}

const initialState: Message = {
  generalMessageState: "idle",
  generalMessage: "",
  chats: [],
};

export const generalMessageSlice = createSlice({
  name: "generalMessage",
  initialState,
  reducers: {
    successMessage: (state, { payload }) => {
      state.generalMessageState = "succeeded";
      state.generalMessage = payload;
    },
    loadingMessage: (state, { payload }) => {
      state.generalMessageState = "pending";
      state.generalMessage = payload;
    },
    errorMessage: (state, { payload }) => {
      state.generalMessageState = "failed";
      state.generalMessage = payload;
    },
    infoMessage: (state, { payload }) => {
      state.generalMessageState = "info";
      state.generalMessage = payload;
    },
    clearMessage: (state) => {
      state.generalMessage = "";
      state.generalMessageState = "idle";
    },
    updateChat: (state, { payload }) => {
      state.chats = payload;
    },
  },
});

export const {
  successMessage,
  errorMessage,
  loadingMessage,
  infoMessage,
  clearMessage,
  updateChat,
} = generalMessageSlice.actions;

export const chatSelector = (state: RootState) => state.generalMessage.chats;

export default generalMessageSlice.reducer;

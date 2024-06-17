import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  reducerPath as searchPath,
  reducer as searchReducer,
  middleware as searchMiddleware,
} from "./services/endpointSearch";
import {
  reducerPath as aiPath,
  reducer as aiReducer,
  middleware as aiMiddleware,
} from "./services/endpointAI";
import appReducer from "./slices/appSlice";
import generalMessageReducer from "./slices/messagesSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    generalMessage: generalMessageReducer,
    [aiPath]: aiReducer,
    [searchPath]: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(searchMiddleware).concat(aiMiddleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

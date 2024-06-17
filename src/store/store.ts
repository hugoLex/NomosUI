import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  reducerPath,
  reducer as apiReducer,
  middleware,
} from "./services/apiSlice";
import appReducer from "./slices/appSlice";
import generalMessageReducer from "./slices/messagesSlice";

export const store = configureStore({
  reducer: {
    [reducerPath]: apiReducer,
    app: appReducer,
    generalMessage: generalMessageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
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

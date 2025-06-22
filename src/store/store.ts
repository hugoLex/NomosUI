import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  reducerPath as searchPath,
  reducer as searchReducer,
  middleware as searchMiddleware,
} from "./services/endpoints";
import appReducer from "./slices/appSlice";
import generalMessageReducer from "./slices/messagesSlice";
import authReducerPath from "./slices/authSlice"
export const store = configureStore({
  reducer: {
    auth: authReducerPath,
    app: appReducer,
    generalMessage: generalMessageReducer,
    [searchPath]: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(searchMiddleware),
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

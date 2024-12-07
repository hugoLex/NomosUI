import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  reducerPath as searchPath,
  reducer as searchReducer,
  middleware as searchMiddleware,
} from "./services/endpoints";
import appReducer from "./slices/appSlice";
import generalMessageReducer from "./slices/messagesSlice";
import { lexGateWayApiSlice } from "./baseApi/lexgatewayApi";

export const store = configureStore({
  reducer: {
    app: appReducer,
    generalMessage: generalMessageReducer,
    [searchPath]: searchReducer,
    [lexGateWayApiSlice.reducerPath]: lexGateWayApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(searchMiddleware,lexGateWayApiSlice.middleware),
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

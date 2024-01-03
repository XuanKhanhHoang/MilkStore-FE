import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./feature/cart";
import { type } from "os";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import { setupListeners } from "@reduxjs/toolkit/query";
import { cartApi } from "./services/cartApi";
const store = configureStore({
  reducer: { CartReducer, [cartApi.reducerPath]: cartApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([cartApi.middleware]),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const AppUseSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;

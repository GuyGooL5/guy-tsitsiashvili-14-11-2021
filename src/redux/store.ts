import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import configurationReducer from "./reducers/configurationReducer";
import favoritesReducer from "./reducers/favoritesReducer";

export const reduxStore = configureStore({
    reducer: {
        configuration: configurationReducer,
        favorites: favoritesReducer
    }
});


export type ReduxState = ReturnType<typeof reduxStore.getState>
export type ReduxDispatch = typeof reduxStore.dispatch;
export const useReduxDispatch = () => useDispatch<ReduxDispatch>();
export const useReduxSelector: TypedUseSelectorHook<ReduxState> = useSelector;
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import type { Reducer } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  createTransform,
  type PersistConfig,
} from "redux-persist";

import authReducer from "../../features/auth/slices/authSlice";

// The shape of the auth slice, derived from its reducer (no extra export needed).
type AuthState = ReturnType<typeof authReducer>;

const storage = {
  getItem: (key: string) => {
    return Promise.resolve(localStorage.getItem(key));
  },

  setItem: (key: string, value: string) => {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },

  removeItem: (key: string) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};

const rootReducer = combineReducers({
  auth: authReducer,
});

// The full combined root state.
type RootReducerState = ReturnType<typeof rootReducer>;

// Keep user/UI state persisted, but never serialize the short-lived access token.
const authTransform = createTransform<AuthState, AuthState>(
  // inbound: going INTO storage — strip the access token (store it as null).
  (inboundState) => {
    if (!inboundState) return inboundState;
    return { ...inboundState, accessToken: null };
  },
  // outbound: coming OUT of storage — ensure accessToken starts null on rehydrate.
  (outboundState) => {
    if (!outboundState) return outboundState;
    return { ...outboundState, accessToken: null };
  },
  { whitelist: ["auth"] },
);

const persistConfig: PersistConfig<RootReducerState> = {
  key: "root",
  storage,
  whitelist: ["auth"],
  transforms: [authTransform],
};

// Cast bridges redux-persist's 2-generic Reducer with Redux Toolkit's 3-generic one.
const persistedReducer = persistReducer(
  persistConfig,
  rootReducer as unknown as Reducer<RootReducerState>,
);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

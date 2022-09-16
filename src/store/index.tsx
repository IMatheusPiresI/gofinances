import { createStore, combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import { AsyncStorage } from "react-native";

import authReducer from "./ducks/auth";

const persistConfig = {
  key: "@gofinances:auth",
  storage: AsyncStorage,
  whiteList: ["authReducer"],
};

const rootReducer = combineReducers({
  authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
const persistedStore = persistStore(store);

export { store, persistedStore };

import { configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { appReducer } from "../actions/appActions";
import { persistStore } from "redux-persist";

const persistConfig = {
    key:'rot',
    storage
}

const persistedApp = persistReducer(persistConfig,appReducer);

const store = configureStore({
    reducer:{app:persistedApp},
});

let persistedStore = persistStore(store);

export default store;
export {persistedStore};

store.subscribe(()=>console.log('state',store.getState()));
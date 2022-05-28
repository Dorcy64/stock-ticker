import { configureStore } from '@reduxjs/toolkit'
import stocksReducer from './api_store'

import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const userDataPersistConfig = {
    key: 'stocks',
    storage: storage,
  };


export default configureStore({
    reducer: {
        stocks: persistReducer(userDataPersistConfig, stocksReducer)
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

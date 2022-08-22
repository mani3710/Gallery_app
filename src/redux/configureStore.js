// REF: https://redux.js.org/recipes/configuring-your-store/
// REF: https://github.com/jhen0409/react-native-debugger/blob/master/examples/counter-with-redux/src/configureStore.js
// REF: https://github.com/rt2zz/redux-persist

import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import rootReducer from './reducers';

const persistConfig = {
  key: 'root',  
  storage: AsyncStorage,
  // whitelist or blacklist any reducers
  whitelist: ['data'],
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
const persistor = persistStore(store);

export { store, persistor };

// TODO: Define Global Selector and Dispatch
export const useReduxDispatch = () => useDispatch();

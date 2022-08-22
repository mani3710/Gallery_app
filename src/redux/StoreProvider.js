import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from './configureStore';
// import {Loading} from '../components';

const StoreProvider = ({children}) => {
  return (
    <Provider store={store}>
      <PersistGate 
      // loading={<Loading />}
       persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider;
    
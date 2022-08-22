import 'react-native-gesture-handler';
import React from 'react';
import {enableScreens} from 'react-native-screens';
 import {SafeAreaProvider} from 'react-native-safe-area-context';

import {StateProvider} from './contexts';
import {StoreProvider} from './redux';
  import {StatusBar} from './components';
import RootNav from './navigation';



const App = () => {

  return (
    <SafeAreaProvider>
        
      <StoreProvider>
      <StateProvider>
        <StatusBar/>
          <RootNav />                  
          </StateProvider>
      </StoreProvider>
     </SafeAreaProvider> 
  );
};

export default App;
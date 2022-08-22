import 'react-native-gesture-handler';
import React from 'react';
import {enableScreens} from 'react-native-screens';
 import {SafeAreaProvider} from 'react-native-safe-area-context';

import {StateProvider} from './src/contexts';
import {StoreProvider} from './src/redux';
  import {StatusBar} from './src/components';
import RootNav from './src/navigation';



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

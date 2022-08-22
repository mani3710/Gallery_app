import * as React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as Route from './route';

import * as screens from './screen';
const Stack = createStackNavigator();



const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen
                    options={{
                        headerShown: false,
                    }}
                    name={Route.SPLASH_SCREEN} component={screens.SplashScreen} />

                <Stack.Screen
                    options={{
                        headerShown: false,
                    }}
                    name={Route.HOME_SCREEN} component={screens.HomeScreen} />
                <Stack.Screen
                    options={{
                        headerShown: false,
                    }}
                    name={Route.CAMERA_SCREEN} component={screens.CameraScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;

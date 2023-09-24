import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Welcome } from './src/Components/Welcome/Welcome';
import { Logout } from './src/Components/Welcome/Logout';
import { Login } from './src/Components/Login/Login';
import { Register } from './src/Components/Register/Register';
import { Recovery } from './src/Components/Register/PasswordRecovery/Recovery';
import CustomBottomTabNavigator from './src/Components/ButtonTab/Tab';

const Stack = createNativeStackNavigator();

const screenOptions = {
    headerShown: false,
};

function AppStack() {
    return (
        <Stack.Navigator screenOptions={screenOptions} initialRouteName="Welcome">
            <Stack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome} />
            <Stack.Screen options={{ headerShown: false }} name="CustomBottomTabNavigator" component={CustomBottomTabNavigator} />
            <Stack.Screen options={{ headerShown: false }} name="Logout" component={Logout} />
            <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
            <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
            <Stack.Screen options={{ headerShown: false }} name="Recovery" component={Recovery} />
        </Stack.Navigator>
    )
}

function RootNatigator() {
    return (
        <NavigationContainer independent={true}>
            <AppStack />
        </NavigationContainer>
    )
}
export default function Router() {
    return (
        <RootNatigator />
    );
}
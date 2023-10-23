import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Welcome } from './src/UI/Components/Welcome/Welcome';
import { Logout } from './src/UI/Components/Welcome/Logout';
import { Login } from './src/UI/Components/Login/Login';
import { Register } from './src/UI/Components/Register/Register';
import CustomBottomTabNavigator from './src/UI/Components/ButtonTab/Tab';
import DoctorCreationForm from './src/UI/Components/CreateDr';

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
            <Stack.Screen options={{ headerShown: false }} name="DoctorCreationForm" component={DoctorCreationForm} />
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
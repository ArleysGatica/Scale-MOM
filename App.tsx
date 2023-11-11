import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from "react-redux";
import { Welcome } from './src/UI/Components/Welcome/Welcome';
import { Login } from './src/UI/Components/Login/Login';
import CustomBottomTabNavigator from './src/UI/Components/ButtonTab/Tab';
import DoctorCreationForm from './src/UI/Page/CreateDr';
import { store } from './src/app/store';

import MyForm from './src/Helpers/Generalform/form';
import RegisterPatient from './src/UI/Page/RegisterPatient/patient';

//Paper
import { PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import MyComponent from './src/UI/Page/CreateDr';
import ListPatient from './src/UI/Page/Pacient/PatientList';
import Pacient from './src/UI/Page/Pacient/pacientView';
import ListDoctor from './src/UI/Page/Doctor/doctorList';
import DoctorProfile from './src/UI/Page/Doctor/doctorView';

const Stack = createNativeStackNavigator();

const screenOptions = {
    headerShown: false,
};

function AppStack() {
    return (
        <Stack.Navigator screenOptions={screenOptions} initialRouteName="Welcome">
            <Stack.Screen options={{ headerShown: false }} name="RegisterPatient" component={RegisterPatient} />
            <Stack.Screen options={{ headerShown: false }} name="MyComponent" component={MyComponent} />
            <Stack.Screen options={{ headerShown: false }} name="ListPatient" component={ListPatient} />
            <Stack.Screen options={{ headerShown: false }} name="ProfilePatient" component={Pacient} />
            
            <Stack.Screen options={{ headerShown: false }} name="ListDoctor" component={ListDoctor} />
            <Stack.Screen options={{ headerShown: false }} name="DoctorProfile" component={DoctorProfile} />

            <Stack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome} />
            <Stack.Screen options={{ headerShown: false }} name="CustomBottomTabNavigator" component={CustomBottomTabNavigator} />
            <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
            <Stack.Screen options={{ headerShown: false }} name="MyForm" component={MyForm} />
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
        <StoreProvider store={store}>
            <PaperProvider>
                <RootNatigator />
            </PaperProvider>
        </StoreProvider >
    );
}
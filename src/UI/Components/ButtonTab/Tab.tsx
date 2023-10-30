import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppDrawer from '../Drawer/Drawer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';

type HomeScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
};

type RootStackParamList = {
    Welcome: undefined;
};

const Tab = createBottomTabNavigator();

const CustomBottomTabNavigator = ({ navigation }: HomeScreenProps) => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#000',
            }}
            safeAreaInsets={{ bottom: 0 }}
        >
            <Tab.Screen
                name="Home"
                component={AppDrawer}
                options={{
                    tabBarIcon: ({ color }) => (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Welcome');
                            }}
                        >
                            <Icon name="home" size={30} color={color} />
                        </TouchableOpacity>
                    ),
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
};

export default CustomBottomTabNavigator;

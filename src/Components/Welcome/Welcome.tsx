import React from 'react';
import { Text, View, Image, SafeAreaView, Pressable } from 'react-native';
import estilos from './StyleWelcome';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Logout'>;
};

type RootStackParamList = {
    Logout: undefined;
};

export function Welcome({ navigation }: HomeScreenProps) {
    return (

        <SafeAreaView style={{ backgroundColor: '#FFFFFF', height: '100%' }} >
            <View style={estilos.Container}>
                <SafeAreaView style={estilos.containerChild}>
                    <Text style={estilos.Title}>
                        Welcome to
                    </Text>

                    <Image source={require('../../../src/Assets/LogoappLogo.png')}
                        style={estilos.Logo}
                    />
                    <Text style={estilos.Caption}>Scale MoM</Text>

                </SafeAreaView>
                <View style={estilos.Button}>
                    <Pressable onPress={() => navigation.navigate('Logout')}>
                        <Image source={require('../../../src/Assets/Done.png')} />
                    </Pressable>

                </View>
            </View>
        </SafeAreaView>

    )
}

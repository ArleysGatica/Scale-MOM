import React from 'react';
import { Text, View, Image, SafeAreaView, Pressable } from 'react-native';
import estilos from './StyleWelcome';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

type RootStackParamList = {
    Login: undefined;
};

export function Welcome({ navigation }: HomeScreenProps) {
    return (

        <SafeAreaView style={{ backgroundColor: '#FFFFFF', height: '100%' }} >
            <View style={estilos.Container}>
                <SafeAreaView style={estilos.containerChild}>
                    <Text style={estilos.Title}>
                        Bienvenido a
                    </Text>

                    <Image source={require('../../../Assets/LogoappLogo.png')}
                        style={estilos.Logo}
                    />
                    <Text style={estilos.Caption}>Scale MoM</Text>

                </SafeAreaView>
                <View style={estilos.Button}>
                    <Pressable onPress={() => navigation.navigate('Login')}>
                        <Image source={require('../../../Assets/Done.png')} />
                    </Pressable>

                </View>
            </View>
        </SafeAreaView>

    )
}

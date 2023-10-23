import React from 'react';
import { Text, View, Image, SafeAreaView, TouchableHighlight, Pressable } from 'react-native';
import style from './StyleLogout';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeScreenProps = {
    navigation?: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

type RootStackParamList = {
    Login: undefined;
};

export function Logout({ navigation }: HomeScreenProps) {

    return (

        <SafeAreaView style={{ backgroundColor: '#FFFFFF', height: '100%' }} >
            <View style={style.Container}>
                <Image source={require('../../../Assets/LogoappLogo.png')}
                    style={style.Logo}
                />
                <Text style={style.Caption}>Scale MoM App</Text>
                <Text style={style.txtSegund}>
                    The easiest way to start with your amazing application.
                </Text>
                <SafeAreaView style={style.containerBTN}>
                    <TouchableHighlight style={style.buttonLogin}>
                        <Pressable onPress={() => navigation?.navigate('Login')}>
                            <Text style={style.buttonTextLogin}>Login</Text>
                        </Pressable>
                    </TouchableHighlight>
                </SafeAreaView>
            </View>
        </SafeAreaView>

    )
}

import React from 'react';
import { Text, View, ScrollView, Image, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import estilos from './StyleWelcome';

export function Welcome() {
    return (

        <SafeAreaView style={{ backgroundColor: '#FFFFFF', height: '100%' }} >
            <View style={estilos.Container}>
                <SafeAreaView style={estilos.containerChild}>
                    <Text style={estilos.Title}>
                        Welcome to
                    </Text>

                    <Image source={require('../../../Assets/LogoappLogo.png')}
                        style={estilos.Logo}
                    />
                    <Text style={estilos.Caption}>Scale MoM</Text>

                </SafeAreaView>
                {/* <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Button onPress={() => navigation.navigate('Login')} title="Get Started" />
                    </TouchableOpacity> */}
                <View style={estilos.Button}>
                    <Image source={require('../../../Assets/Done.png')} />
                </View>
            </View>
        </SafeAreaView>

    )
}

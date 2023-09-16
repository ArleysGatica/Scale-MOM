import React, { useState } from 'react';
import { Text, View, ScrollView, Image, Button, TouchableOpacity, SafeAreaView, StyleSheet, TouchableHighlight } from 'react-native';
import style from './StyleLogout';
// import { View, Text, TouchableOpacity, Animated, Easing, StyleSheet } from 'react-native';

export function Logout() {

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
                        <Text style={style.buttonTextLogin}>Login</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={style.buttonSing} onPress={() => { }}  >
                        <Text style={style.buttonText}>Sing Up</Text>
                    </TouchableHighlight>
                </SafeAreaView>
            </View>
        </SafeAreaView>

    )
}

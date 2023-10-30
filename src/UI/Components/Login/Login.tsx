import React, { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/types';
import { Text, View, TextInput, Image, Button, TouchableOpacity, SafeAreaView, StyleSheet, TouchableHighlight, Alert, ActivityIndicator, Pressable } from 'react-native';
import style from './Style.Login';

type LoginFormProps = {
    navigation?: NativeStackNavigationProp<RootStackParamList, 'DoctorCreationForm' | 'Login' | 'CustomBottomTabNavigator'>;
};

export function Login({ navigation }: LoginFormProps) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (username === 'admin' && password === 'admin') {
            navigation?.navigate('DoctorCreationForm');
            Alert.alert('Entrar como admin');
        } else if (username === 'doctor' && password === 'doctor') {
            navigation?.navigate('CustomBottomTabNavigator');
            Alert.alert('Entrar como doctor');
        } else {
            Alert.alert('Credenciales incorrectas');
        }
    };

    const handleLogout = () => {
        navigation?.navigate('Login');
        Alert.alert('Logout');
    }

    return (
        <SafeAreaView style={style.containerLogin}>
            <View style={style.Container}>
                <Image source={require('../../../Assets/LogoappLogo.png')}
                    style={style.Logo} />
                <Text style={style.txtSegund}>Login</Text>
            </View>
            <View style={{ width: '100%', alignItems: 'center' }}>

                <View style={style.passwordContainer}>
                    <TextInput
                        style={style.passwordInput}
                        placeholderTextColor="gray"
                        placeholder="Nombre de usuario"
                        onChangeText={(text) => setUsername(text)}
                    />
                </View>

                <View style={style.passwordContainer} >
                    <TextInput
                        style={style.passwordInput}
                        placeholderTextColor="gray"
                        placeholder="Contraseña"
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                </View>
            </View>
            <View style={{ width: '100%', alignItems: 'center', top:50 }}>
                <TouchableHighlight style={style.buttonSing}>
                    <Button
                        color='rgb(18, 19, 48)'
                        onPress={() => handleLogin()}
                        title='Login'
                        testID='login-button'
                   />
                </TouchableHighlight>
            </View>
        </SafeAreaView>
    );

}





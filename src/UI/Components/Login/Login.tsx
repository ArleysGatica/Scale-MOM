import React, { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/types';
import { Text, View, TextInput, Image, Button, TouchableOpacity, SafeAreaView, StyleSheet, TouchableHighlight, Alert, ActivityIndicator, Pressable } from 'react-native';
import style from './Style.Login';
import { login } from '../../../services';

type LoginFormProps = {
  navigation?: NativeStackNavigationProp<
    RootStackParamList,
    | 'DoctorCreationForm'
    | 'Login'
    | 'CustomBottomTabNavigator'
    | 'ListDoctor'
    | 'ListPatient'
  >;
};

export function Login({ navigation }: LoginFormProps) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {

        const response = await login({username, password});

        if (response.userType === 1) {
            Alert.alert('Entrar como admin');

            return navigation?.navigate('ListDoctor');     
        }
        
        if (response.userType === 2) {
            navigation?.navigate('ListPatient');
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
                <TouchableHighlight onPress={() => handleLogin()} style={style.buttonSing}>
                    <Button
                        color='rgb(18, 19, 48)'
                        title='Login'
                        testID='login-button'
                   />
                </TouchableHighlight>
            </View>
        </SafeAreaView>
    );

}





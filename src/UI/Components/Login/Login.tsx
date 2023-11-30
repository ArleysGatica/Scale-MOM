import React, { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/types';
import { Text, View, TextInput, Image, Button, TouchableOpacity, SafeAreaView, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import style from './Style.Login';
import { login } from '../../../services';
import { useAppDispatch } from '../../../app/hook';
import { setCurrentDoctor } from '../../../app/slice/doctorSlice';

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
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useAppDispatch()

    const handleLogin = async () => {
        const response = await login({ username, password });

        if (response.user.userType === 1) {
            Alert.alert('Entrar como admin');
            return navigation?.navigate('ListDoctor');
        }
        
        if (response.user.userType === 2) {
            console.log(response);
            dispatch(setCurrentDoctor(response.user));
            
            navigation?.navigate('ListPatient');
            Alert.alert('Entrar como doctor');
            return navigation?.navigate('ListPatient');
        }
    };

    return (
        <SafeAreaView style={style.containerLogin}>
            <View style={style.Container}>
                <Image source={require('../../../Assets/LogoappLogo.png')}
                    style={style.Logo} />
                <Text style={style.txtSegund}>Iniciar Sesión</Text>
            </View>
            <View style={{ width: '100%', alignItems: 'center' }}>
                <Text style={style.txtForgot}>Nombre</Text>
                <View style={style.passwordContainer}>
                    <TextInput
                        testID="username-input"
                        style={style.passwordInput}
                        placeholderTextColor="gray"
                        placeholder="Nombre de usuario"
                        onChangeText={(text) => setUsername(text)}
                    />
                </View>
                <Text style={style.txtForgot}>Contraseña</Text>
                <View style={style.passwordContainer} >
                    <TextInput
                        testID="password-input"
                        style={style.passwordInput}
                        placeholderTextColor="gray"
                        placeholder="Contraseña"
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                        style={style.eyeIcon}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Image
                            source={showPassword
                                ? require('../../../Assets/eye-open.png')
                                : require('../../../Assets/eye-closed.png')
                            }
                            style={style.eyeImage}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ width: '100%', alignItems: 'center', top: 50 }}>
                <TouchableHighlight onPress={() => handleLogin()} style={style.buttonSing}>
                    <Button
                        testID="login-button"
                        color='#0B153C'
                        title='Iniciar Sesión'
                        onPress={() => handleLogin()}
                    />
                </TouchableHighlight>
            </View>
        </SafeAreaView>
    );

}





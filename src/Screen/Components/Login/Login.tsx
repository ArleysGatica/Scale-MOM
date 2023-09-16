import React, { useState } from 'react';
import { Text, View, TextInput, Image, Button, TouchableOpacity, SafeAreaView, StyleSheet, TouchableHighlight, Alert, ActivityIndicator } from 'react-native';
import style from './Style.Login';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isUppercaseValid, setIsUppercaseValid] = useState(false);
    const [isLowercaseValid, setIsLowercaseValid] = useState(false);
    const [isSpecialCharValid, setIsSpecialCharValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(email);
    };

    const validatePassword = (text: string) => {
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

        setIsUppercaseValid(uppercaseRegex.test(text));
        setIsLowercaseValid(lowercaseRegex.test(text));
        setIsSpecialCharValid(specialCharRegex.test(text));

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&.]{8,}$/;
        return passwordRegex.test(text);
    };

    const handleTextChange = (text: string, field: string) => {
        if (field === 'email') {
            setEmail(text);
            setIsValidEmail(validateEmail(text));
        } else if (field === 'password') {
            setPassword(text);
            setIsValidPassword(validatePassword(text));
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = () => {

        if (!isValidEmail || !isValidPassword) {
            Alert.alert('Please enter a valid email and password.');
            return;
        } else if ('' === email || '' === password) {
            Alert.alert('All fields are required.');
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    return (
        <SafeAreaView style={style.containerLogin}>
            <View style={style.Container}>
                <Image source={require('../../../Assets/LogoappLogo.png')} style={style.Logo} />
                <Text style={style.txtSegund}>Welcome Back</Text>
                <View style={style.passwordContainer}>
                    <TextInput
                        style={style.passwordInput}
                        placeholderTextColor="gray"
                        placeholder="Email"
                        onChangeText={(text) => handleTextChange(text, 'email')}
                    />
                </View>
                {!isValidEmail && <Text style={style.errorText}>Please enter a valid email.</Text>}
                <View style={style.passwordContainer}>
                    <TextInput
                        style={style.passwordInput}
                        placeholderTextColor="gray"
                        placeholder="Password"
                        onChangeText={(text) => handleTextChange(text, 'password')}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableHighlight
                        style={style.passwordIcon}
                        underlayColor="transparent"
                        onPress={togglePasswordVisibility}
                    >
                        <Image
                            source={showPassword ? require('../../../Assets/eye-open.png') : require('../../../Assets/eye-closed.png')}
                            style={{ width: 20, height: 20 }}
                        />
                    </TouchableHighlight>
                </View>
                {!isValidPassword && <Text style={style.errorText}>Please enter a valid password.</Text>}
                <Text style={style.txtForgot}>Forgot your Password?</Text>
                <SafeAreaView style={style.containerBTN}>
                    <TouchableHighlight
                        style={[
                            style.buttonSing,
                            (!isValidEmail || !isValidPassword || isLoading) && style.disabledButton,
                        ]}
                        underlayColor="rgba(18, 19, 48, 0.8)"
                        onPress={handleLogin}
                        disabled={!isValidEmail || !isValidPassword || isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={style.buttonText}>Login</Text>
                        )}
                    </TouchableHighlight>
                </SafeAreaView>
                <Text style={style.TextConection}>Or connect using</Text>
                <SafeAreaView style={style.containerNetwork}>
                    <View style={style.containerNetworkSub}>
                        <Image source={require('../../../Assets/google.png')} style={style.network} />
                    </View>
                    <View style={style.containerNetworkSub}>
                        <Image source={require('../../../Assets/facebook.png')} style={style.network} />
                    </View>
                </SafeAreaView>
                <Text style={style.TextConection}>
                    Don't have an account? <Text style={{ color: 'rgb(18, 19, 48)', textDecorationLine: 'underline' }}>Sign Up</Text>
                </Text>
            </View>
        </SafeAreaView>
    );
}

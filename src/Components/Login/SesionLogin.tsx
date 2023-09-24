import React, { useEffect, useState } from "react";
import { GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin";
import { View, Text, ScrollView, StatusBar, TouchableOpacity, Image } from 'react-native';

interface Props {
    name?: string;
    email?: string;
    photo?: string;
}

export function SingLogin({ name, email, photo }: Props) {


    const [userInfo, setUserInfo] = useState(null);
    const [gettingLoginStatus, setGettingLoginStatus] = useState(true);

    useEffect(() => {
        const config = {
            ClientId: "663908802543-p4no9ub7j6l3no76r92effc9jiucg4n2.apps.googleusercontent.com",
            scopes: ["profile", "email"]
        };
        GoogleSignin.configure(config);
    });

    const [user, setUser] = useState(null);

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            setUser(userInfo as any);
            console.log(userInfo);
        } catch (error) {
            console.log(error);
        }
    }


    const _getCurrentUserInfo = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            setUserInfo(userInfo as any);
        } catch (error: any) { // Definir un tipo explícito 'any' para 'error'
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                // user has not signed in yet
                setGettingLoginStatus(false);
                console.log('Please Login');
            } else {
                // some other error
                setGettingLoginStatus(false);
                console.log('Error:', error);
            }
        }
    };

    const _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            setUserInfo(userInfo as any);
        } catch (error: any) { // Definir un tipo explícito 'any' para 'error'
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User Cancelled the Login Flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Signing In');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play Services Not Available or Outdated');
            } else {
                console.log('Some Other Error Happened');
            }
        }
    };

    const _signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setUserInfo(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <GoogleSigninButton
                    style={{ width: 192, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={signIn}
                    disabled={gettingLoginStatus} />
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={_signOut} style={{ backgroundColor: '#000', padding: 10, borderRadius: 5 }}>
                    <Text style={{ color: '#fff', fontSize: 16 }}>Logout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    ); 
}
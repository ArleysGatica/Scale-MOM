import react, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StatusBar, TouchableOpacity, Image, SafeAreaView, TextInput, TouchableHighlight } from 'react-native';
import style from './StyleRecovery';

export function Recovery() {

    return (
        <SafeAreaView style={style.containerLogin}>
            <View style={style.Container}>
                <Image source={require('../../../../Assets/LogoappLogo.png')} style={style.Logo} />
                <Text style={style.txtSegund}>Restore Password</Text>
                <View style={style.passwordContainer}>
                    <TextInput
                        style={style.passwordInput}
                        placeholderTextColor="gray"
                        placeholder="E-mail address"
                        // onChangeText={(text) => handleTextChange(text, 'Name')}
                    />
                   
                </View>
                <Text style={style.txt}>You will receive email with password reset link </Text>
                <TouchableHighlight
                underlayColor="rgba(18, 19, 48, 0.8)"
                    onPress={() => { }}
                    style={style.containerBTN}
                >

                    <Text style={style.buttonSing}>Send Instructions</Text>

                </TouchableHighlight>
            </View>
        </SafeAreaView>
    );
}
        
        
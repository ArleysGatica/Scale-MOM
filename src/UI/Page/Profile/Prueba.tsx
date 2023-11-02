import React, { useState } from 'react';
import { View, StyleSheet, Image, Pressable, TouchableOpacity, Button } from 'react-native';
import {  Text, TextInput,  } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'


type HomeScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'RegisterPatient'>;
};

type RootStackParamList = {
    RegisterPatient: undefined;
    ListPatient: undefined;
};

export default function PruebaHome({ navigation }: HomeScreenProps) {
 
    return (
        <View style={styles.container}>
         
            <Text
                style={{
                    width: '100%',
                    textAlign: 'center',
                    fontSize: 30,
                    fontWeight: 'bold',
                    marginBottom: 20,
                    color: '#000'
                }}

                variant="displayMedium">
                Bienvenido Doctor{"\n"}

                Juan Perez
            </Text>

            <View 
                style={{
                    width: '100%',
                    height: 'auto',
                    // flexDirection: 'row',
                    justifyContent: 'space-between',
                    // marginBottom: 20,
                    gap: 20,
                }}>
                <Pressable onPress={() => navigation.navigate!('ListPatient')}>
                    <Text
                    style={{
                        width: '35%',
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}>
                        Lista de pacientes
                    </Text>
                </Pressable>

                <View
                    style={styles.box}>
                    <Image source={require('../../../Assets/RegistroPacient.png')}
                        style={{ width: 70, height: 70, resizeMode: 'cover', }} />
                    <Text
                        style={{
                            width: '35%',
                            fontSize: 20,
                            fontWeight: 'bold',
                        }}
                    >
                        Crear Pacientes
                    </Text>
                </View>

                <View
                    style={styles.box}>
                    <Image source={require('../../../Assets/RegistroPacient.png')}
                        style={{ width: 70, height: 70, resizeMode: 'cover', }} />
               
                </View>
                <Pressable onPress={() => navigation.navigate!('RegisterPatient')}>
                    <Image source={require('../../../Assets/Done.png')} />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: '100%',
        width: '100%',
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
    },
    item: {
        fontSize: 16,
        marginBottom: 10,
    },
    list: {
        marginTop: 20,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    activeMedico: {
        fontSize: 16,
        marginBottom: 20,
    },
    medicoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    medicoName: {
        marginRight: 10,
    },
    paragraph: {
        padding: 16,
        fontSize: 19,
        textAlign: "center",
    },

    box: {
        width: '100%',
        height: 90,
        backgroundColor: '#fff',
        borderRadius: 10,
        // Estilos de sombra para iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        // Estilos de sombra para Android
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        columnGap: 18,
        justifyContent: 'center',
    },
});

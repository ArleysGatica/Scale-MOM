import { View,  TouchableOpacity, SafeAreaView, StyleSheet, Alert,  Pressable, ScrollView } from 'react-native';

import React, { useState, useEffect } from 'react';
import { IPatient } from '../../../types/types';
import { fetchCreatePatient } from '../../../services';

import { Appbar, Text, TextInput, Button, } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

interface IParams {
    id:string;
}

const RegisterPatient = () => {

    const [registerData, setregisterData] = useState<IPatient>({});

    const route = useRoute();

    useEffect(() => {
        const id = (route.params as IParams).id;

        if (id) console.log("Edit"); 
        if (!id) console.log("Edit"); 
    }, []);

    const objData: { name: keyof IPatient, label: string, type: string }[] = [
        { name: 'username', label: 'Nombre', type: 'text' },
        { name: 'dni', label: 'Cedula', type: 'text' },
        { name: 'nameEncargado', label: 'Nombre Encargado', type: 'number' },
        { name: 'telefonoEncargado', label: 'Telefono Encargado', type: 'number' },
        { name: 'telefono', label: 'Telefono', type: 'number' },
        { name: 'edad', label: 'Edad', type: 'number' },
    ];

    const createPatientHandler = async () => {
        const response = await fetchCreatePatient({ ...registerData, userType: 0 });
        console.log(response);
    }

    const handleTextChange = (fieldName: keyof IPatient, text: string) => {
        if (fieldName === 'edad' || fieldName === 'telefono' || fieldName === 'telefonoEncargado') {
            const numericText = text.replace(/[^0-9]/g, '');
            setregisterData({ ...registerData, [fieldName]: numericText });
        } else {
            setregisterData({ ...registerData, [fieldName]: text });
        }
    };

    return (
        <>
            <View style={styles.container}>
                <Appbar.Header >
                    <Appbar.BackAction onPress={() => { }} />
                    <Text style={{ fontSize: 25 }}>Salir</Text>
                </Appbar.Header>
                <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
                    <Text
                        style={{
                            width: '100%',
                            textAlign: 'center',
                            fontSize: 45,
                            fontWeight: 'bold',
                            marginBottom: 20,
                            color: 'black'
                        }}

                        variant="displayMedium">
                        Registro de Pacientes
                    </Text>
                    {
                        objData.map((item, index) => {
                            return (
                                <View key={index}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        width: '100%',
                                        height: 80,
                                        justifyContent: 'center',
                                        flexWrap: 'wrap',
                                        gap: 10,
                                        columnGap: 10,
                                        rowGap: 10,

                                    }}>
                                    <Text style={{ width: 75, textAlign: 'center', fontSize: 15, }}>{item.label}</Text>
                                    <TextInput
                                        style={{
                                            width: 200, height: 50,
                                            marginBottom: 10,
                                            backgroundColor: 'rgb(255, 255, 255)',
                                            borderColor: 'rgba(0, 0, 0, 0.29)',
                                            borderRadius: 4,
                                            borderWidth: 1,
                                            color: 'black',
                                        }}
                                        onChangeText={(text) => handleTextChange(item.name, text)}
                                        value={registerData[item.name]?.toString()}

                                    />
                                </View>
                            )
                        })
                    }
                    <View style={{ width: '100%', alignItems: 'center', top: 20 }}>
                        <Button
                            onPress={createPatientHandler}
                            icon="account-check"
                            mode="contained"
                            style={{ width: 200, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            Registrado
                        </Button>
                    </View>
                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        backgroundColor: 'white',
        paddingTop: 20,
        flexGrow: 1,
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        paddingHorizontal: 10,
    },
});

export default RegisterPatient;


import { Text, View, TextInput, Image, Button, TouchableOpacity, SafeAreaView, StyleSheet, TouchableHighlight, Alert, ActivityIndicator, Pressable } from 'react-native';

import React, { useState, useEffect } from 'react';
import { IPatient } from '../../../types/types';
import { fetchCreatePatient } from '../../../services';

const RegisterPatient = () => {

    const [registerData, setregisterData] = useState<IPatient>({});

    const objData: { name: keyof IPatient, label: string, type: string }[] = [
        { name: 'username', label: 'Nombre', type: 'text' },
        { name: 'dni', label: 'Cedula', type: 'text' },
        { name: 'nameEncargado', label: 'Nombre Encargado', type: 'text' },
        { name: 'telefonoEncargado', label: 'Telefono Encargado', type: 'text' },
        { name: 'telefono', label: 'Telefono', type: 'text' },
        { name: 'edad', label: 'Edad', type: 'text' },
    ];

    const createPatientHandler = async () => {
        const response = await fetchCreatePatient(registerData);
        console.log(response);
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>

            <Text style={{ width: '100%', textAlign: 'center', fontSize: 35, fontWeight: 'bold', marginBottom: 20, color: 'black' }}>
                Register Patient
            </Text>
            {
                objData.map((item, index) => {
                    return (
                        <View key={index}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: '100%',
                                height: '10%',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                            }}>
                            <Text style={{ width: 75, textAlign: 'center', fontSize:15, }}>{item.label}</Text>
                            <TextInput
                                style={{
                                    height: 45,
                                    width: 120,
                                    padding: 15,
                                    marginTop: 10,
                                    marginBottom: 10,
                                    backgroundColor: 'rgb(255, 255, 255)',
                                    borderColor: 'rgb(0, 0, 0)',
                                    borderRadius: 4,
                                    borderWidth: 1,
                                    color: 'black',
                                }}
                                onChangeText={text => setregisterData({ ...registerData, [item.name]: text })}
                                value={registerData[item.name]?.toString()}
                            />
                        </View>
                    )
                })
            }
            <Button
                onPress={createPatientHandler}
                title="Register"
                color="black"
                accessibilityLabel="Learn more about this purple button"
            />
        </View>
    );
}

export default RegisterPatient;


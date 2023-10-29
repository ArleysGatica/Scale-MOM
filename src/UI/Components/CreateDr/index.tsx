import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { fetchAdminUserById, fetchCreateDoctor } from '../../../services';

type Doctor = {
    username?: string;
    password?: string;
    idMinsa?: string;
};

interface IAdminUser {
    id?: string;
    username?: string;
    password?: string;
}

type Props = {
    onCreateDoctor?: (doctor: Doctor) => void;
};

const DoctorCreationForm: React.FC<Props> = ({ onCreateDoctor }) => {

    const [createDoctor, setCreateDoctor] = useState<Doctor>({});
    const [userAdmin, setUserAdmin] = useState<IAdminUser>({});

    const objData: { name: keyof Doctor, label: string, type: string }[] = [
        { name: 'username', label: 'Nombre', type: 'text' },
        { name: 'password', label: 'Contraseña', type: 'text' },
        { name: 'idMinsa', label: 'IdMinsa', type: 'text' },
    ];

    const createDoctorHandler = () => {
        const response = fetchCreateDoctor(createDoctor);
        onCreateDoctor && onCreateDoctor(createDoctor);
        Alert.alert('Doctor creado');
        console.log(response);
    }


    const getUserById = async () => {
        const response = await fetchAdminUserById('653d87fcc6fb2046d9477c2b');
        console.log(response);
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>

            <Text style={{ width: '100%', textAlign: 'center', fontSize: 35, fontWeight: 'bold', marginBottom: 20, color: 'black' }}>
                Register Doctor
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
                            <Text style={{ width: 75, textAlign: 'center', fontSize: 15, }}>{item.label}</Text>
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
                                onChangeText={text => setCreateDoctor({ ...createDoctor, [item.name]: text })}
                                value={createDoctor[item.name]?.toString()}
                            />
                        </View>
                    )
                })
            }
            <Button
                onPress={createDoctorHandler}
                title="Register"
                color="black"
                accessibilityLabel="Learn more about this purple button"

            />

            <Text style={{ width: '100%', textAlign: 'center', fontSize: 35, fontWeight: 'bold', marginBottom: 20, color: 'black' }}>
                Get User By Id
            </Text>
            <Button
                onPress={getUserById}
                title="Get User By Id"
                color="black"
                accessibilityLabel="Learn more about this purple button"
            />
        </View>
    )
}

export default DoctorCreationForm;
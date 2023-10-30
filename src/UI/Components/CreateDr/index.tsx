import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { fetchAdminUserById, fetchCreateDoctor } from '../../../services';
import { Appbar, Text, TextInput, Button, } from 'react-native-paper';
type Doctor = {
    username?: string;
    password?: string;
    idMinsa?: string;
    userType?:number;
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
        const response = fetchCreateDoctor({...createDoctor, userType: 2});
        onCreateDoctor && onCreateDoctor({...createDoctor, userType: 2});
        Alert.alert('Doctor creado');
        console.log(response);
    }

    const getUserById = async () => {
        const response = await fetchAdminUserById('653d87fcc6fb2046d9477c2b');
        console.log(response);
    }

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => { }} />
                <Text style={{ fontSize: 25 }}>
                    Salir
                </Text>
            </Appbar.Header>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>

                <Text
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        fontSize: 50,
                        fontWeight: 'bold',
                        marginBottom: 20,
                        color: 'black'
                    }}

                    variant="displayMedium">
                    Registro de Doctor
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
                                <TextInput
                                    style={{ width: 200, height: 50, backgroundColor: 'white' }}
                                    label={item.label}
                                    onChangeText={text => setCreateDoctor({ ...createDoctor, [item.name]: text })}
                                    value={createDoctor[item.name]?.toString()}
                                />
                            </View>
                        )
                    })
                }
                <Button
                    icon="check"
                    mode="contained"
                    onPress={createDoctorHandler}
                    style={{ width: 200, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    Registrado
                </Button>
                {/* <Button
                    onPress={createDoctorHandler}
                    title="Register"
                    color="black"
                    accessibilityLabel="Learn more about this purple button"

                /> */}

                {/* <Text style={{ width: '100%', textAlign: 'center', fontSize: 35, fontWeight: 'bold', marginBottom: 20, color: 'black' }}>
                    Get User By Id
                </Text> */}
                {/* <Button
                    onPress={getUserById}
                    title="Get User By Id"
                    color="black"
                    accessibilityLabel="Learn more about this purple button"
                /> */}
            </View>
        </>
    )
}

export default DoctorCreationForm;
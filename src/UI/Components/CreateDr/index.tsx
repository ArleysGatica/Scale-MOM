import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import { getUserById, fetchCreateDoctor, fetchUpdatePatient, fetchUpdateDoctors } from '../../../services';
import { Appbar, Text, TextInput, Button, } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

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

interface IParams {
    id:string;
}

type Props = {
    onCreateDoctor?: (doctor: Doctor) => void;
};

const DoctorCreationForm: React.FC<Props> = ({ onCreateDoctor }) => {

    const [createDoctor, setCreateDoctor] = useState<Doctor>({});
    const [userAdmin, setUserAdmin] = useState<IAdminUser>({});

    const route = useRoute();
    const id = (route.params as IParams)?.id || '';

    useEffect(() => {

        if (id) {
            getUserById(id).then((resultado) => {
                setCreateDoctor({username:resultado.username, idMinsa:resultado.idMinsa})
                
            })
        }; 
        if (!id) console.log("Create"); 
    }, []);
    

    const objData: { name: keyof Doctor, label: string, type: string }[] = [
        { name: 'username', label: 'Nombre', type: 'text' },
        { name: 'password', label: 'Contraseña', type: 'text' },
        { name: 'idMinsa', label: 'IdMinsa', type: 'text' },
    ];

    const createDoctorHandler = async () => {
        id
          ? await fetchUpdateDoctors(id, {
              username: createDoctor.username,
              idMinsa: createDoctor.idMinsa,
            })
          : await fetchCreateDoctor({...createDoctor, userType: 2});
       
    }

    const getUserByIdAC = async () => {
        const response = await getUserById('653d87fcc6fb2046d9477c2b');
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
                    {id ? "Editar Doctor" : "Crear Doctor"}
                </Text>
                <View>
                    {objData.map((item, index) => {
                        return (
                            id ?  item.name === "password" ? <></> : <View key={index}
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
                        </View> : <View key={index}
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
                    })}
                </View>
                <Button
                    icon="check"
                    mode="contained"
                    onPress={createDoctorHandler}
                    style={{ width: 200, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    {id ? "Editar" : "Registrar"}
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
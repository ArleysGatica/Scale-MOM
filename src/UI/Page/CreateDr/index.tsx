import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import { getUserById, fetchCreateDoctor, fetchUpdatePatient, fetchUpdateDoctors } from '../../../services';
import { Appbar, Text, TextInput, Button, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { IDoctor } from '../../../types/types';

interface IAdminUser {
    id?: string;
    username?: string;
    password?: string;
}

interface IParams {
    id: string;
}

const DoctorCreationForm = () => {

    //@ts-ignore
    const navigation = useNavigation();

    const [createDoctor, setCreateDoctor] = useState<IDoctor>({});
    const [userAdmin, setUserAdmin] = useState<IAdminUser>({});

    const route = useRoute();
    const id = (route.params as IParams)?.id || '';

    useEffect(() => {

        if (id) {
            getUserById(id).then((resultado) => {
                setCreateDoctor({ username: resultado.username, idMinsa: resultado.idMinsa })

            })
        };
        if (!id) console.log("Create");
    }, []);


    const objData: { name: keyof IDoctor, label: string, type: string }[] = [
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
            : await fetchCreateDoctor({ ...createDoctor, userType: 2 });
        //@ts-ignore
        navigation.navigate('ListDoctor', { id: Math.random() });
    }

    return (
        <>
            <PaperProvider theme={theme}>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => navigation.navigate('ListDoctor' as never)} style={{ backgroundColor: '#17C2EC' }} />
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
                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }}>
                        {objData.map((item, index) => {
                            return (
                                id ? item.name === "password" ? <></> : <View key={index}
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
                                        style={{
                                            width: 200, height: 50, backgroundColor: 'white', borderColor: '#17C2EC', borderRadius: 4, borderWidth: 1,
                                        }}
                                        textBreakStrategy='simple'
                                        underlineStyle={{ borderColor: '#17C2EC' }}
                                        underlineColor="#17C2EC"
                                        outlineStyle={{ borderColor: '#17C2EC' }}
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
                                        style={{ width: 200, height: 50, backgroundColor: 'white', borderColor: '#17C2EC', borderRadius: 4, borderWidth: 1 }}
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
                        style={{ width: 150, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#17C2EC' }}
                    >
                        {id ? "Editar" : "Registrar"}
                    </Button>

                </View>
            </PaperProvider>
        </>
    )
}

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        text: 'blue',
        primary: '#17C2EC',
        underlineColor: 'transparent',
        background: 'white'

    },
};

export default DoctorCreationForm;
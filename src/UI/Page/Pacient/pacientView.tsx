import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, SafeAreaView, StyleSheet, TouchableHighlight, Alert, ActivityIndicator, Pressable, ScrollView, Text } from 'react-native';
import { Appbar, Avatar, Button, Card, IconButton } from 'react-native-paper';
import { fetchDeletePatient, getUserById } from '../../../services';
import { IPatient } from '../../../types/types';

interface IParams {
    id: string;
}

const Pacient = () => {
    const route = useRoute();

    const id = (route.params as IParams)?.id;

    const [patient, setPatient] = useState<IPatient>({});

    const [resultado, setResultado] = useState("");

    const navigation = useNavigation();

    const objData: { name: keyof IPatient, label: string, type: string }[] = [
        { name: 'username', label: 'Nombre', type: 'text' },
        { name: 'dni', label: 'Cedula', type: 'text' },
        { name: 'nameEncargado', label: 'Nombre Encargado', type: 'number' },
        { name: 'telefonoEncargado', label: 'Telefono Encargado', type: 'number' },
        { name: 'telefono', label: 'Telefono', type: 'number' },
        { name: 'edad', label: 'Edad', type: 'number' },
    ];

    useEffect(() => {
        if (id) {
            getUserById(id).then((response) => {
                setPatient({ username: response.username, dni: response.dni, nameEncargado: response.nameEncargado, telefonoEncargado: response.telefonoEncargado, telefono: response.telefono, edad: response.edad })

                setResultado(response.resultado);

            })
        };
    }, []);

    const toEditPatient = () => {
        //@ts-ignore
        navigation.navigate('RegisterPatient', { id: id });
    }

    const toFormPatient = () => {
        //@ts-ignore
        navigation.navigate('MyForm', { id: id });
    }

    const toDeletePatient = async () => {
        await fetchDeletePatient(id);
        //@ts-ignore
        navigation.navigate('ListPatient', { id: Math.random() });
    }

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => { }} />
            </Appbar.Header>
            <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
                    Detalle del paciente
                </Text>
            </View>
            <View style={styles.boxButtonAction}>
                <Button
                    icon="account-check"
                    mode="contained"
                    style={{ width: 120, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    onPress={toEditPatient}
                >
                    Editar
                </Button>

                <Button
                    icon="account-check"
                    mode="contained"
                    style={{ width: 150, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    onPress={toFormPatient}
                >
                    Expediente
                </Button>
                <Button
                    icon="account-check"
                    mode="contained"
                    style={{ width: 100, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    onPress={toDeletePatient}
                >
                    Borrar
                </Button>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', maxHeight: "70%" }}>
                {
                    objData.map((item, index) => (
                        <Card.Title
                            key={index}
                            style={{ width: '90%', marginBottom: 10 }}
                            title={item.label}
                            subtitle={patient[item.name]?.toString()}
                        />
                    ))
                }
                {
                    resultado && <Card.Title
                        style={{ width: '90%', marginBottom: 10 }}
                        title="Resultado"
                        subtitle={resultado}
                    />
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
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
    boxButtonAction: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        flexDirection: 'row',
        columnGap: 12,
        paddingLeft: 8,
        paddingTop: 16,
    },
});

export default Pacient;
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, TouchableOpacity, SafeAreaView, StyleSheet, TouchableHighlight, Alert, ActivityIndicator, Pressable, ScrollView, Text } from 'react-native';
import { Appbar, Button, Card } from 'react-native-paper';
import { fetchDeleteDoctor, getUserById } from '../../../services';
import { useEffect, useState } from 'react';
import { LayoutDrawer } from '../../Components/Drawer/LayoutDrawer';

interface IParams {
    id: string;
}

type IDoctor = {
    username?: string;
    password?: string;
    idMinsa?: string;
    userType?: number;
};

const DoctorProfile = () => {
    const route = useRoute();
    const [doctor, setDoctor] = useState<IDoctor>({});

    const id = (route.params as IParams)?.id;

    const navigation = useNavigation();

    const objData: { name: keyof IDoctor, label: string, type: string }[] = [
        { name: 'username', label: 'Nombre', type: 'text' },
        { name: 'idMinsa', label: 'IdMinsa', type: 'text' },
    ];

    useEffect(() => {
        if (id) {
            getUserById(id).then((response) => {
                setDoctor({ username: response.username, idMinsa: response.idMinsa })
            })
        };
    }, []);

    const toEditDoctor = () => {
        //@ts-ignore
        navigation.navigate('DoctorCreationForm', { id: id });
    }


    const toDeleteDoctor = async () => {
        await fetchDeleteDoctor(id);
        //@ts-ignore
        navigation.navigate('ListDoctor', { id: Math.random() });

    }


    return (
        <LayoutDrawer>
            <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
                    Detalle del Doctor
                </Text>
            </View>
            <View style={styles.boxButtonAction}>
                <Button
                    icon="account-check"
                    mode="contained"
                    style={{ width: 120, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    onPress={toEditDoctor}
                >
                    Editar
                </Button>
                <Button
                    icon="account-check"
                    mode="contained"
                    style={{ width: 100, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    onPress={toDeleteDoctor}
                >
                    Borrar
                </Button>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', maxHeight: "70%", width: '100%' }}>
                {
                    objData.map((item, index) => (
                        <Card.Title
                            key={index}
                            style={{ width: '50%', marginBottom: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', paddingLeft:30 }}
                            title={item.label}
                            subtitle={doctor[item.name]?.toString()}
                        />
                    ))
                }
            </View>
        </LayoutDrawer>
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

export default DoctorProfile;
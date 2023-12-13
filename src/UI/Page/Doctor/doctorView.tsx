import { useNavigation, useRoute } from '@react-navigation/native';
import { View,  StyleSheet, Text } from 'react-native';
import { Button, Card } from 'react-native-paper';
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

    const toHistory = () => {
        //@ts-ignore
        navigation.navigate('Historico', { userId: id });
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
                    icon="account-edit"
                    mode="contained"
                    style={{ width: 150, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#17C2EC' }}
                    onPress={toEditDoctor}
                >
                    Editar
                </Button>
                <Button
                    icon="history"
                    mode="contained"
                    style={{ width: 150, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#17C2EC' }}
                    onPress={toHistory}
                >
                    Historial
                </Button>
                <Button
                    icon="delete"
                    mode="contained"
                    style={{ width: 150, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#17C2EC' }}
                    onPress={toDeleteDoctor}
                >
                    Borrar
                </Button>
            </View>
            <View style={styles.containerCard}>
                {
                    objData.map((item, index) => (
                        <Card.Title
                            key={index}
                            style={{ width: '50%', height: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', }}
                
                            title={item.label}
                            titleStyle={{ fontSize: 18, fontWeight: 'bold', width: '100%', justifyContent: 'center', alignItems: 'center', paddingLeft: 35 }}
                            
                            subtitle={doctor[item.name]?.toString()}
                            subtitleStyle={{ fontSize: 15, fontWeight: 'normal', width: '100%', justifyContent: 'center', alignItems: 'center', paddingLeft: 35}}
                        />
                    ))
                }
            </View>
        </LayoutDrawer>
    )

}

const styles = StyleSheet.create({
    containerCard: {
        flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', maxHeight: "30%", width: '80%', borderRadius: 18,
        borderColor: '#17C2EC',
        borderWidth: 1,
        marginTop: 50,
        flexDirection: 'row',
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
    boxButtonAction: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        gap: 12,
        paddingLeft: 8,
        paddingTop: 16,
    },
});

export default DoctorProfile;
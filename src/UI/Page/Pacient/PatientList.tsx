import * as React from 'react';
import { Appbar, Text, Button, Card, Avatar, IconButton } from 'react-native-paper';
import { fetchGetPatient } from '../../../services';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import { LayoutDrawer } from '../../Components/Drawer/LayoutDrawer';



const ListPatient = () => {

    const [listPatient, setListPatient] = React.useState<Array<any>>([]);

    const route = useRoute();

    const id = (route.params as any)?.id;

    const navigation = useNavigation();

    React.useEffect(() => {       
        fetchGetPatient().then((response) => {
            setListPatient(response.pacientes); 
        })
    }, [id]);

    return (
        <LayoutDrawer>
            <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                <Text style={{ fontSize: 25 }}>
                Bienvenido Doctor Juan Perez
                </Text>
                <Text style={{ fontSize: 25 }}>
                    Lista de pacientes
                </Text>
            </View>

            

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white',maxHeight:"70%" }}>
                {
                    listPatient && listPatient.map((patient) => (
                        //@ts-ignore
                        <TouchableOpacity onPress={() => { navigation.navigate('ProfilePatient', { id: patient.id }); }} key={patient.id}>
                            <Card.Title
                                style={{ width: '90%', marginBottom: 10 }}
                                title={patient.username}
                                subtitle={patient.edad}
                                left={(props) => <Avatar.Icon {...props} icon="account" />}
                                right={(props) => <IconButton {...props} icon="dots-vertical" />}
                            />
                        </TouchableOpacity>
                    ))
                }
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                <Button
                    icon="account-check"
                    mode="contained"
                    style={{ width: 200, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => { navigation.navigate('RegisterPatient' as never) }}
                >
                    Crear paciente
                </Button>

            </View>
        </LayoutDrawer>
    )
}

export default ListPatient;
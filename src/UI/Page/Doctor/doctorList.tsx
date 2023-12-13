import * as React from 'react';
import { Avatar, Card, IconButton, } from 'react-native-paper';
import { fetchGetDoctors } from '../../../services';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Appbar, Text, Button, } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

const ListDoctor = () => {

    const [listDoctor, setListDoctor] = React.useState<Array<any>>([]);
    const route = useRoute();

    const id = (route.params as any)?.id;

    const navigation = useNavigation();

    React.useEffect(() => {

        fetchGetDoctors().then((response) => {
            setListDoctor(response.doctors);
        })
    }, [id]);

    const toWelcome = () => {
        navigation.navigate('Welcome' as never);
    }

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={toWelcome} style={{ backgroundColor: '#17C2EC' }} />
            </Appbar.Header>

            
            <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                <Text style={{ fontSize: 25 }}>
                    Lista de Doctores
                </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', rowGap: 20 }}>
                {listDoctor && listDoctor.map((doctor) => (
                    <View style={styles.containerCard}>
                        <Card.Title
                            titleStyle={{ fontSize: 20, fontWeight: 'bold', width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: 5 }}
                            key={doctor.id}
                            style={{ width: '95%', }}
                            title={doctor.username}
                            subtitle={doctor.edad}
                            left={(props) => <Avatar.Icon {...props} icon="account" style={{ backgroundColor: '#17C2EC' }} />}
                            //@ts-ignore
                            right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => { navigation.navigate('DoctorProfile', { id: doctor.id }); }} />}
                        />
                    </View>
                ))}
                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', marginTop: 20 }}>
                    <Button
                        icon="account-check"
                        mode="contained"
                        style={{ width: 200, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#17C2EC' }}
                        onPress={() => { navigation.navigate('DoctorCreationForm' as never) }}
                    >
                        Crear Doctor
                    </Button>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    containerCard: {
        width: '85%',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(23, 194, 236, 0.10)',
        borderRadius: 18,
        borderColor: '#17C2EC',
        borderWidth: 1,

    },
});

export default ListDoctor;

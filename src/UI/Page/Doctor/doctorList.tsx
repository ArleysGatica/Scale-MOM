import * as React from 'react';
import { Avatar, Card, IconButton,  } from 'react-native-paper';
import { fetchGetDoctors } from '../../../services';
import { useNavigation } from '@react-navigation/native';
import { Appbar, Text, TextInput, Button, } from 'react-native-paper';
import { View } from 'react-native';

const ListDoctor = () => {

    const [listDoctor, setListDoctor] = React.useState<Array<any>>([]);

    const navigation = useNavigation();

    React.useEffect(() => {

        fetchGetDoctors().then((response) => {
            console.log(response);

            setListDoctor(response.doctors);

        })
    }, []);

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => { }} />
            </Appbar.Header>
            <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                <Text style={{ fontSize: 25 }}>
                    Lista de Doctores
                </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                
            {listDoctor && listDoctor.map((doctor) => (
                <Card.Title
                    key={doctor.id}
                    style={{ width: '90%', marginBottom: 10 }}
                    
                   
                    title={doctor.username}
                    subtitle={doctor.edad}
                    left={(props) => <Avatar.Icon {...props} icon="account" />}
                    //@ts-ignore
                    right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => { navigation.navigate('DoctorProfile', { id: doctor.id }); }} />}
                />
            ))}
                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                    <Button
                        icon="account-check"
                        mode="contained"
                        style={{ width: 200, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { navigation.navigate('DoctorCreationForm' as never) }}
                    >
                        Crear Doctor
                    </Button>

                </View>
            </View>
          

     
          
        </>
    )
}

export default ListDoctor;

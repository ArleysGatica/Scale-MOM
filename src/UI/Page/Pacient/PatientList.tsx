import * as React from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { fetchGetPatient } from '../../../services';
import { useNavigation } from '@react-navigation/native';



const ListPatient = () => {

    const [listPatient, setListPatient] = React.useState<Array<any>>([]);

    const navigation = useNavigation();

    React.useEffect(() => {
        fetchGetPatient().then((response) => {
            setListPatient(response.pacientes);
            
        })
    }, []);

    return (
        <>
        {listPatient && listPatient.map((patient) => (
            <Card.Title
            title={patient.username}
            subtitle={patient.edad}
            left={(props) => <Avatar.Icon {...props} icon="folder" />}
            //@ts-ignore
            right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => { navigation.navigate('ProfilePatient' , { id:patient.id  });  }} />}
            />
        ))}   
        </>
    )
}

export default ListPatient;
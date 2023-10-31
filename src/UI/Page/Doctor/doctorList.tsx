import * as React from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { fetchGetDoctors } from '../../../services';
import { useNavigation } from '@react-navigation/native';



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
        {listDoctor && listDoctor.map((doctor) => (
            <Card.Title
            title={doctor.username}
            subtitle={doctor.edad}
            left={(props) => <Avatar.Icon {...props} icon="folder" />}
            //@ts-ignore
            right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => { navigation.navigate('DoctorProfile' , { id:doctor.id  });  }} />}
            />
        ))}   
        </>
    )
}

export default ListDoctor;

import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, TouchableOpacity, SafeAreaView, StyleSheet, TouchableHighlight, Alert, ActivityIndicator, Pressable, ScrollView, Text } from 'react-native';
import { Appbar } from 'react-native-paper';
import { fetchDeleteDoctor } from '../../../services';

interface IParams {
    id: string;
}

const DoctorProfile = () => {
    const route = useRoute();

    const id = (route.params as IParams).id;

    const navigation = useNavigation();

const deletePatientHandler = async () => {
    
    await fetchDeleteDoctor(id);
    //@ts-ignore
    navigation.navigate('ListDoctor');
   
    }
    

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => { }} />
            </Appbar.Header>
            <View
                style={styles.box}>
                <Image source={require('../../../Assets/RegistroPacient.png')}
                    style={{ width: 70, height: 70, resizeMode: 'cover', }} />



                {/*@ts-ignore */}
                <Text onPress={() => { navigation.navigate('DoctorCreationForm', { id: id }) }} >
                    Editar
                </Text>
                {/*@ts-ignore */}
                <Text onPress={() => { deletePatientHandler() }} >
                    Eliminar
                </Text>

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
});

export default DoctorProfile;
import { View, Image, TouchableOpacity, SafeAreaView, StyleSheet, TouchableHighlight, Alert, ActivityIndicator, Pressable, ScrollView, Text } from 'react-native';

const Pacient = () => {

    return (
        <>
         <View
                style={styles.box}>
                <Image source={require('../../../Assets/RegistroPacient.png')}
                    style={{ width: 70, height: 70, resizeMode: 'cover', }} />
                <Text
                    style={{
                        width: '35%',
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}
                >
                    Crear Pacientes
                </Text>
                <Text>
                    Editar
                </Text>
                <Text>
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

export default Pacient;
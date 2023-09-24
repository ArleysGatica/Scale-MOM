import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
    containerLogin: {
        backgroundColor: '#FFFFFF',
        height: '100%',
    },

    Container: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: "100%",
    },

    txtSegund: {
        textAlign: 'center',
        fontSize: 21,
        paddingBottom: 50,
        color: '#000000',
        top: 25,
    },

    Logo: {
        top: 5,
        width: 180,
        height: 195,
    },

    containerBTN: {
        display: "flex",
        alignItems: 'center',
        height: '8%',
        width: "100%",
        top: 17,
    },

    buttonSing: {
        backgroundColor: 'rgb(18, 19, 48)',
        borderRadius: 4,
        height: 45,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 0.75,
        },
        shadowOpacity: 1.5,
        bottom: 15,
    },

    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    buttonLogin: {
        backgroundColor: 'rgb(255, 255, 255)',
        borderColor: 'rgba(0, 0, 0, 0.29)',
        borderRadius: 4,
        height: 45,
        width: 160,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 0.75,
        },
        shadowOpacity: 1.5,
    },

    buttonTextLogin: {
        color: 'rgb(18, 19, 48)',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    input: {
        width: '80%',
        height: '6%',
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'rgb(255, 255, 255)',
        borderColor: 'rgba(0, 0, 0, 0.29)',
        borderRadius: 4,
        borderWidth: 1,
        color: 'black',
    },

    passwordContainer: {
        width: '80%',
        height: '6%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'rgb(255, 255, 255)',
        borderColor: 'rgba(0, 0, 0, 0.29)',
        borderRadius: 4,
        borderWidth: 1,
        color: 'black',
    },

    passwordInput: {
        flex: 1,
        height: 45,
        color: 'black',
        paddingLeft: 10,
    },

    passwordIcon: {
        padding: 10,
    },

    warningText: {
        color: 'red',
        marginBottom: 10,
    },

    disabledButton: {
        backgroundColor: 'gray',
    },

    // Estilos para la alerta personalizada
    alert: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 20,
        alignItems: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        zIndex: 999,
    },

    alertText: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },

    alertButton: {
        backgroundColor: 'rgb(18, 19, 48)',
        borderRadius: 4,
        height: 45,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },

    alertButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    TextConection: {
        textAlign: 'center',
        fontSize: 16,
        color: '#5f6368',
        width: '75%',
    },

    containerNetwork: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '15%',
        width: "100%",
        gap: 15,
    },

    containerNetworkSub: {
        backgroundColor: 'rgb(255, 255, 255)',
        borderColor: 'rgba(0, 0, 0, 0.29)',
        borderRadius: 4,
        borderWidth: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    network: {
        width: 35,
        height: 35,
        borderRadius: 5,
    },


    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
    },

    passwordRequirements: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },


});

export default style;


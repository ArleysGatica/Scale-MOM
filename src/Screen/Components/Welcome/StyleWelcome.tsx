import { StyleSheet } from 'react-native';

const estilos = StyleSheet.create({

    Container: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        height: '80%',
        width: "100%",
    },

    containerChild: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: "100%",
        paddingTop: 50,
    },

    Title: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#000000",
        fontFamily: 'poppins',
        textAlign: "center",
    },

    Caption: {
        textAlign: 'center',
        fontSize: 50,
        paddingBottom: 50,
        color: '#000000',
        width: 250,
        top: 25,
    },

    Logo: {
        top: 5,
        width: 180,
        height: 195,

    },

    Button: {
        height: '30%',
        width: "100%",
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',

    },

});

export default estilos;
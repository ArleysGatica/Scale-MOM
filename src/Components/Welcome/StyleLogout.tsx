import { StyleSheet } from 'react-native';

const style = StyleSheet.create({

    Container: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: "100%",
    },
    Caption: {
        textAlign: 'center',
        fontSize: 50,
        paddingBottom: 50,
        color: '#000000',
        width: 250,
        top: 25,
    },

    txtSegund: {
        textAlign: 'center',
        fontSize: 21,
        paddingBottom: 50,
        color: '#000000',
    },

    Logo: {
        top: 5,
        width: 180,
        height: 195,
    },

    containerBTN: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '15%',
        width: "100%",
    },

    buttonSing: {
        backgroundColor: 'rgb(18, 19, 48)',
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

    buttonLogin: {
        backgroundColor: 'rgb(255, 255, 255)',
        borderColor: 'rgba(0, 0, 0, 0.29)',
        borderRadius: 4,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        width: 160,
    },

    buttonTextLogin: {
        color: 'black', 
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default style;
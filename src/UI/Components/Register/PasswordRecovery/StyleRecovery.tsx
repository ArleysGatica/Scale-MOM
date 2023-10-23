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
        width: '35%',
    },

    Logo: {
        top: 5,
        width: 180,
        height: 195,
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

    txt: {
        textAlign: 'center',
        fontSize: 15,
        paddingBottom: 50,
        color: 'gray',
        width: '75%',
    },

    containerBTN: {
        display: "flex",
        alignItems: 'center',
        textAlign: 'center',
        height: '25%',
        width: "100%",
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
        paddingTop: 10,
        // bottom: 15,
        textAlign: 'center',
        fontSize: 18,
    },

});

export default style;

import React, { useRef, useState } from 'react'
import { Button, DrawerLayoutAndroid, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import NavigationView from './Nave';
import PruebaHome from '../../Page/Profile/Prueba';

const AppDrawer = () => {

    const drawer = useRef<DrawerLayoutAndroid>(null);

    return (

        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            keyboardDismissMode="on-drag"
            onDrawerSlide={() => console.log('onDrawerSlide')}
            drawerPosition="left"
            renderNavigationView={() => (
                <NavigationView closeDrawer={() => drawer.current?.closeDrawer()} />
            )}
        >
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() => drawer.current?.openDrawer()}
                >
                    <Text style={styles.menuText}>☰</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Home</Text>
            </View>
            <View style={styles.container}>

                <PruebaHome />
            </View>

        </DrawerLayoutAndroid>
    );
};
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'blue',
        paddingTop: 36,
    },
    menuButton: {
        padding: 10,
    },
    menuText: {
        fontSize: 24,
        color: 'white',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10,
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',


    },
    navigationContainer: {
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        padding: 16,
        fontSize: 15,
        textAlign: 'center',
    },
});

export default AppDrawer;
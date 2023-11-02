import { useRef } from "react";
import { DrawerLayoutAndroid, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import NavigationView from "./Nave";

interface IProps {
    children: React.ReactNode;
}

export const LayoutDrawer = ({ children }:IProps) => {

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

                {children}
            </View>

        </DrawerLayoutAndroid>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e0dcdc',
        paddingTop: 36,
        paddingBottom: 12,
        paddingLeft: 12,
    },
    menuButton: {
        padding: 10,
    },
    menuText: {
        fontSize: 24,
        color: 'Black',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 10,
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        backgroundColor: 'white',


    },
    navigationContainer: {
        // backgroundColor: '#ecf0f1',
    },
    paragraph: {
        padding: 16,
        fontSize: 15,
        textAlign: 'center',
    },
});
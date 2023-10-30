// NavigationView.tsx
import React, { useRef, useState } from 'react';
import { View, Image, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, } from 'react-native';

interface NavigationViewProps {
    closeDrawer: () => void;
}

interface DataProps {
    id?: string;
    name?: string;
    image?: any;
}


const NavigationView = ({ closeDrawer, id, name, image, }: NavigationViewProps & DataProps) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);



    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSelectOption = (value: string) => {
        setSelectedValue(value);
        setIsDropdownOpen(false);
    };

    const data: DataProps[] = [
        { id: "1", name: "Home", image: require('../../../Assets/home.png') },
        // { id: "2", name: "Profile", image: require('../../../Assets/avatar.png') },
        { id: "3", name: "Historial", image: require('../../../Assets/historial.png') },
        { id: "4", name: "Analitica", image: require('../../../Assets/estadisticas.png') },
        { id: "5", name: "Log Out", image: require('../../../Assets/Out.png') },
    ];

    return (
        <View style={[styles.container, styles.navigationContainer]}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                borderBottomColor: 'black',
                borderBottomWidth: 0.8,
                borderStyle: 'solid',
            }}>
                <Image source={require('../../../Assets/LogoappLogo.png')}
                    style={{
                        width: 45,
                        height: 45,
                        marginRight: 5,
                        resizeMode: 'cover',
                    }} />
                <Text style={styles.paragraph}>Home !!</Text>
            </View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id || ''}
                renderItem={({ item }) => (
                    <TouchableOpacity>
                        <View
                            style={{
                                paddingHorizontal: 0,
                                borderRadius: 10,
                                marginHorizontal: 10,
                                marginVertical: 10,

                                width: '100%',
                                height: 100,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <View style={styles.itemContainer}>

                                <Image source={item.image} style={styles.image} />
                                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>
                                    {item.name}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    dropdownContainer: {
        position: 'relative',
    },
    dropdownHeader: {
        backgroundColor: '#eee',
        flexDirection: 'row',
        display: 'flex',
        width: '100%',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    dropdownOptions: {
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        maxHeight: 200,
        borderRadius: 5,
        backgroundColor: '#D4D8F4',
    },
    dropdownOptionsContent: {
        flexGrow: 1,
    },
    option: {
        padding: 10,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: 'center',
        paddingTop: 50,
        width: '100%',
        height: '100%',


    },
    navigationContainer: {
        backgroundColor: "#ecf0f1",
    },
    paragraph: {
        padding: 16,
        fontSize: 19,
        textAlign: "center",
    },

    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // padding: 10,
        width: '75%',
        // height: '100%',
        gap: 10,
        justifyContent: 'center',

    },
    image: {
        display: 'flex',
        width: 50,
        height: 50
        // marginRight: 10,
        // resizeMode: 'cover',
    },
});

export default NavigationView;



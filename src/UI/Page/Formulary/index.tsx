import { Text, View, TextInput, Image, Button, TouchableOpacity, SafeAreaView, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import { IFirstGroup, ISecondGroup } from "../../../types/types";

interface FormularyPartProps {
    fields?: any[];
    handleInputChange?: (name: keyof IFirstGroup, value: any) => void;
    fieldsSecondGroup?: any[];
    handleInputChangeSecondGroup?: (name: keyof ISecondGroup, value: any) => void;
    formData?: IFirstGroup;
    formDataSecondGroup?: ISecondGroup;
    HolaMundo?: any;
    miArray?:any;
}
const FormularyPart = (props: FormularyPartProps) => {

    console.log(props.miArray);
    
    return (
        <SafeAreaView>
            <View style={{  justifyContent: 'center', alignItems: 'center', width: '100%', }}>

                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: 'red' }}>
                    Escala de severidadfcewfcwef
                    {props.HolaMundo}
                    scs
                </Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: 'red' }}>
                    aca
                    {props.HolaMundo}
                   
                </Text>
                {
                    props.fields?.map((field) => (
                        <View key={field.name} style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '100%',
                            height: '10%',
                            justifyContent: 'center'
                        }}>
                            <Text style={{ width: 100, textAlign: 'center' }}>
                                {field.name.replace(/([A-Z])/g, ' $1').trim()}
                            </Text>
                            <TextInput
                                style={{
                                    height: 45,
                                    width: 100,
                                    padding: 15,
                                    marginTop: 10,
                                    marginBottom: 10,
                                    backgroundColor: 'rgb(255, 255, 255)',
                                    borderColor: 'rgb(0, 0, 0)',
                                    borderRadius: 4,
                                    borderWidth: 1,
                                    color: 'black',
                                }}
                                keyboardType="numeric"
                                onChangeText={(value) => props.handleInputChange!(field.name, value)}
                                value={props.formData?.[field.name as keyof IFirstGroup]?.toString()}
                            />
                        </View>
                    ))
                }

                {/* {
                    fieldsSecondGroup?.map((field) => (
                        <View key={field.name} style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '100%',
                            height: '10%',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                        }}>
                            <Text style={{ width: 100, textAlign: 'center' }}>
                                {field.name.replace(/([A-Z])/g, ' $1').trim()}
                            </Text>
                            <TextInput
                                style={{
                                    height: 45,
                                    width: 100,
                                    padding: 15,
                                    marginTop: 10,
                                    marginBottom: 10,
                                    backgroundColor: 'rgb(255, 255, 255)',
                                    borderColor: 'rgb(0, 0, 0)',
                                    borderRadius: 4,
                                    borderWidth: 1,
                                    color: 'black',
                                }}
                                keyboardType="numbers-and-punctuation"
                                onChangeText={(value) => handleInputChangeSecondGroup!(field.name, value)}
                                value={formDataSecondGroup?.[field.name as keyof ISecondGroup]?.toString()}

                            />
                        </View>
                    ))
                } */}

                {/* {
                fieldsThreeGroup.map((field) => (
                    <View key={field.name} style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                        height: '10%',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}>
                        <Text style={{ width: 100, textAlign: 'center' }}>
                            {field.name.replace(/([A-Z])/g, ' $1').trim()}
                        </Text>
                        <TextInput
                            style={{
                                height: 45,
                                width: 100,
                                padding: 15,
                                marginTop: 10,
                                marginBottom: 10,
                                backgroundColor: 'rgb(255, 255, 255)',
                                borderColor: 'rgb(0, 0, 0)',
                                borderRadius: 4,
                                borderWidth: 1,
                                color: 'black',
                            }}
                            keyboardType="decimal-pad"
                            onChangeText={(value) => handleInputChangeThreeGroup(field.name, value)}
                            value={formDataThreeGroup[field.name]?.toString()}
                        />
                    </View>
                ))
            }  */}


            </View>
        </SafeAreaView>
    );
}

export default FormularyPart;
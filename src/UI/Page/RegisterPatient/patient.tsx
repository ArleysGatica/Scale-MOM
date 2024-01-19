import { View, TouchableOpacity, SafeAreaView, StyleSheet, Alert, Pressable, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { IPatient, RootStackParamList } from '../../../types/types';
import { fetchCreatePatient, fetchUpdatePatient, getUserById } from '../../../services';
import { Appbar, Text, TextInput, Button, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

interface IParams {
  id: string;
}

const RegisterPatient = () => {
  //@ts-ignore
  const navigation = useNavigation();
  const [registerData, setRegisterData] = useState<IPatient>({});

  const route = useRoute();
  const id = (route.params as IParams)?.id || '';

  useEffect(() => {

    if (id) {
      getUserById(id).then((resultado) => {
        setRegisterData({ username: resultado.username, dni: resultado.dni, nameEncargado: resultado.nameEncargado, telefonoEncargado: resultado.telefonoEncargado, telefono: resultado.telefono, edad: resultado.edad })
      })
    };
    if (!id) console.log("Create");
  }, []);

  const objData: { name: keyof IPatient, label: string, type: string }[] = [
    { name: 'username', label: 'Nombre', type: 'text' },
      { name: 'dni', label: 'Cédula', type: 'text' },
      { name: 'telefono', label: 'Teléfono Paciente', type: 'number' }, 
    { name: 'edad', label: 'Edad', type: 'number' },
    { name: 'nameEncargado', label: 'Nombre Encargado', type: 'number' },
      { name: 'telefonoEncargado', label: 'Teléfono Encargado', type: 'number' },

  ];

  const createPatientHandler = async () => {
    id ? await fetchUpdatePatient(id, registerData) : await fetchCreatePatient({ ...registerData, userType: 0 });
    // @ts-ignore
    navigation.navigate('ListPatient', { id: Math.random() });
  }
  const handleTextChange = (fieldName: keyof IPatient, text: string) => {
    if (fieldName === 'telefono' || fieldName === 'telefonoEncargado') {
      const numericText = text.replace(/[^0-9]/g, '').slice(0, 8);
      setRegisterData({ ...registerData, [fieldName]: numericText });
    } else if (fieldName === 'edad' || fieldName === 'dni') {
      const numericText = text.replace(/[^0-9a-zA-Z]/g, '');

      let formattedValue = '';
      for (let i = 0; i < numericText.length; i++) {
        if (i === 3 || i === 9) {
          formattedValue += '-';
        }
        formattedValue += numericText[i];
      }

      const truncatedValue = formattedValue.slice(0, 16);

      setRegisterData({ ...registerData, [fieldName]: truncatedValue });
    } else {
      setRegisterData({ ...registerData, [fieldName]: text });
    }
  };

  return (
    <>
      <PaperProvider theme={theme}>
        <View style={styles.container}>
          <Appbar.Header style={{ marginRight: 330 }}>
            <Appbar.BackAction onPress={() => navigation.navigate('ListPatient' as never)} style={{ backgroundColor: '#17C2EC' }} />
          </Appbar.Header>
          <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
            <Text
              style={{
                width: '100%',
                textAlign: 'center',
                fontSize: 45,
                fontWeight: 'bold',
                marginBottom: 20,
                color: 'black',
              }}
              variant="displayMedium">
              {id ? "Editar paciente" : "Registro de Pacientes"}
            </Text>
            <View style={{
              borderRadius: 18,
              borderColor: '#17C2EC',
              borderWidth: 1,
              width: '100%',
              height: 'auto',
              display: 'flex',
              alignItems: 'center',
              margin: 'auto',
              justifyContent: 'center',
              padding: 20,
            }}>
              {
                objData.map((item, index) => {
                  return (
                    <View key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                        height: 80,
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: 10,
                        columnGap: 10,
                        rowGap: 10,
                      }}>
                      <Text style={{ width: 75, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: 'black' }}>
                        {item.label}
                      </Text>
                      <TextInput
                        style={{
                          width: 200,
                          height: 50,
                          marginBottom: 10,
                          backgroundColor: 'white',
                          borderColor: '#17C2EC',
                          borderRadius: 4,
                          borderWidth: 1,
                          color: 'black',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}
                        onChangeText={(text) => handleTextChange(item.name, text)}
                        value={registerData[item.name]?.toString()}
                      />
                    </View>
                  )
                })
              }
            </View>
            <View style={{ width: '100%', alignItems: 'center', top: 20 }}>
              <Button
                onPress={createPatientHandler}
                icon="account-check"
                mode="contained"
                style={{ width: 200, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#17C2EC' }}
              >
                {id ? "Editar" : "Registrar"}
              </Button>
            </View>
          </ScrollView>
        </View>
      </PaperProvider>
    </>
  );
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: 'blue',
    primary: '#17C2EC',
    underlineColor: 'transparent',
    background: '#ffffff',

  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#ffffff',

  },
  scrollViewContent: {
    backgroundColor: 'white',
    paddingTop: 20,
    flexGrow: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
  },
});

export default RegisterPatient;


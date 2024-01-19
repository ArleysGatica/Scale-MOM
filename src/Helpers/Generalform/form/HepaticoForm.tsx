import React from 'react';
import {ICardioVascular, IHepatico} from '../../../types/types';
import {View, StyleSheet, ScrollView} from 'react-native';
import { Text, TextInput, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

interface IFields {
  name: string;
  label: string;
  min: number;
  max: number;
  medida: string;
}

interface Iprops {
  fieldsHepatico: Array<IFields>;
  handleInputChangeHepatico: (name: string, value: string) => void;
  hepatico: IHepatico;
}

export const HepaticoForm = ({
  fieldsHepatico,
  handleInputChangeHepatico,
  hepatico,
}: Iprops) => {

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

    return (
        <PaperProvider theme={theme}> 
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      keyboardShouldPersistTaps="handled">
      <View style={styles.inner}>
                    <Text style={styles.header}>Hepático</Text>
      </View>
      {fieldsHepatico.map((field, index) => {
        return (
          <View
            key={field.name}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              height: 80,
              justifyContent: 'center',
              flexWrap: 'wrap',
              columnGap: 10,
            }}>
            <Text style={{width: 95, textAlign: 'center', fontSize: 15}}>
              {field.name}
            </Text>
            <TextInput
                    style={{
                        width: 200,
                        height: 50,
                        marginBottom: 10,
                        backgroundColor: 'rgb(255, 255, 255)',
                        borderColor: '#17C2EC',
                        borderRadius: 4,
                        borderWidth: 1,
                        color: 'black',
                    }}
              keyboardType="numeric"
              onChangeText={text => handleInputChangeHepatico(field.name, text)}
              value={hepatico[field.name as keyof IHepatico]?.toString() || ''}
              placeholder={`Min: ${field.min} Max: ${field.max}`}
            />
            <Text style={{width: 75, textAlign: 'center', fontSize: 15}}>
              {field.medida}
            </Text>
          </View>
        );
      })}
            </ScrollView>
        </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
    header: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 25,
        marginBottom: 10,
    },  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    width: '60%',
    borderWidth: 1,
    padding: 8,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
  },
  resultContainer: {
    marginTop: 20,
  },

  scrollViewContent: {
    backgroundColor: 'white',
    paddingTop: 20,
    flex: 1,
    flexGrow: 1,
    maxHeight: 670,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    maxHeight: 80,
    marginBottom: 34,
  },

  containerDrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: 200,
    marginBottom: 20,
  },
  selectedText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

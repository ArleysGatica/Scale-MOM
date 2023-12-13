import React from 'react';
import {ICardioVascular} from '../../../types/types';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

interface Iprops {
  selectedValue: string;
  GlasgowOptions: any;
  setSelectedValue: (value: React.SetStateAction<string>) => void
}

export const NeurologicoForm = ({selectedValue, GlasgowOptions, setSelectedValue}: Iprops) => {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      keyboardShouldPersistTaps="handled">
      <View style={styles.inner}>
          <Text style={styles.header}>Neurologico</Text>
        </View>
        <View style={styles.containerDrop}>
          <Text style={styles.label}> Escala de Glasgow</Text>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
            style={styles.picker}>
            {Object.keys(GlasgowOptions).map(key => (
              <Picker.Item key={key} label={key} value={key} />
            ))}
          </Picker>
        </View>
    </ScrollView>
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

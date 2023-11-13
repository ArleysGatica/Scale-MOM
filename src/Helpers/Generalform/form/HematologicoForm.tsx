import React from 'react';
import {ICardioVascular, IHematologico} from '../../../types/types';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text, TextInput} from 'react-native-paper';

interface IFields {
  name: string;
  label: string;
  min: number;
  max: number;
  medida: string;
}

interface Iprops {
  fieldsHematologico: Array<IFields>;
  handleInputChangeHematologico: (name: string, value: string) => void;
  hematologico: IHematologico;
}

export const HematologicoForm = ({
  fieldsHematologico,
  handleInputChangeHematologico,
  hematologico,
}: Iprops) => {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      keyboardShouldPersistTaps="handled">
      <View style={styles.inner}>
        <Text style={styles.header}>Hematologico</Text>
      </View>
      {fieldsHematologico.map((field, index) => {
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
              gap: 10,
              columnGap: 10,
              rowGap: 10,
            }}>
            <Text style={{width: 66, textAlign: 'center', fontSize: 15}}>
              {field.name}
            </Text>
            <TextInput
              style={{
                width: 200,
                height: 50,
                marginBottom: 10,
                backgroundColor: 'rgb(255, 255, 255)',
                borderColor: 'rgba(0, 0, 0, 0.29)',
                borderRadius: 4,
                borderWidth: 1,
                color: 'black',
              }}
              keyboardType="numeric"
              onChangeText={text =>
                handleInputChangeHematologico(field.name, text)
              }
              value={
                hematologico[field.name as keyof IHematologico]?.toString() ||
                ''
              }
              placeholder={`Min: ${field.min} Max: ${field.max}`}
            />
            <Text style={{width: 75, textAlign: 'center', fontSize: 15}}>
              {field.medida}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
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

import React from 'react';
import {ICardioVascular, IGastroIntestital} from '../../../types/types';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';

interface IFields {
  name: string;
  label: string;
  min?: undefined;
  max?: undefined;
  medida?: undefined;
}

interface IField2 {
    name: string;
    label: string;
    min: number;
    max: number;
    medida: string;
}

interface Iprops {
  fieldsGastroIntestinal: Array<IFields | IField2>;
  gastroIntestinal: IGastroIntestital;
  handleCalculateGastroIntestinal: () => {
    glucosa: number;
    na: number;
    k: number;
  };
  ToleranciaVíaOralOptions: any;
  handleInputChangeGastroIntestinal: (name: string, value: string) => void;
}

export const GastroIntestinalForm = ({
  fieldsGastroIntestinal,
  gastroIntestinal,
  handleCalculateGastroIntestinal,
  ToleranciaVíaOralOptions,
  handleInputChangeGastroIntestinal,
}: Iprops) => {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      keyboardShouldPersistTaps="handled">
      <View style={styles.inner}>
        <Text style={styles.header}>GastroIntestinal</Text>
      </View>
      {fieldsGastroIntestinal.map(field => {
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
            {field.name === 'ToleranciaViaOral' ? (
              <Picker
                selectedValue={gastroIntestinal.ToleranciaViaOral}
                onValueChange={(itemValue, itemIndex) =>
                    handleInputChangeGastroIntestinal("ToleranciaViaOral", itemValue as any)
                }
                style={styles.picker}>
                {Object.entries(ToleranciaVíaOralOptions).map(
                  ([key, value]) => (
                    <Picker.Item key={key} label={key} value={value} />
                  ),
                )}
              </Picker>
            ) : (
              <>
                <Text style={{width: 66, textAlign: 'center', fontSize: 15}}>
                  {field.label}
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
                    handleInputChangeGastroIntestinal(field.name, text)
                  }
                  value={
                    gastroIntestinal[
                      field.name as keyof IGastroIntestital
                    ]?.toString() || ''
                  }
                  placeholder={`Min: ${field.min} Max: ${field.max}`}
                />
                <Text style={{width: 75, textAlign: 'center', fontSize: 15}}>
                  {field.medida}
                </Text>
              </>
            )}
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

import React from 'react';
import {ICardioVascular, IUterino} from '../../../types/types';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';

interface IFieldsUterino {
  name: string;
  label: string;
}

interface Iprops {
  fieldsUterino: Array<IFieldsUterino>;
  handleInputChangeUterino: (name: string, value: string) => void;
  HemorragiaOptions: any;
  BloodsOptions: any;
  uterino: IUterino
}

export const UterinoForm = ({
  fieldsUterino,
  handleInputChangeUterino,
  HemorragiaOptions,
  BloodsOptions,
  uterino
}: Iprops) => {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      keyboardShouldPersistTaps="handled">
      <View style={styles.inner}>
        <Text style={styles.header}>Uterino</Text>
      </View>
      <View style={styles.containerDrop}>
        <Text style={styles.label}>Hemorragia</Text>
        <Picker
          selectedValue={uterino.HemorragiaObstetrica}
          onValueChange={(itemValue, itemIndex) =>
            handleInputChangeUterino("HemorragiaObstétrica", itemValue as any)
          }
          style={styles.picker}>
          {Object.keys(HemorragiaOptions).map(key => (
            <Picker.Item key={key} label={key} value={key} />
          ))}
        </Picker>
      </View>
      <View style={styles.containerDrop}>
        <Text style={styles.label}>Sangre</Text>
        <Picker
          selectedValue={uterino.PerdidaVolumenSangre}
          onValueChange={(itemValue, itemIndex) =>
            handleInputChangeUterino("PerdidaVolumenSangre", itemValue as any)
          }
          style={styles.picker}>
          {Object.keys(BloodsOptions).map(key => (
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

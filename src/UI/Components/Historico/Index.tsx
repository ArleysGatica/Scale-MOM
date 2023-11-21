import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {Appbar, Avatar, Button, Card, IconButton} from 'react-native-paper';
import {fetchGetDatoClinicoByUserId} from '../../../services';
import {IDatosClinicoIndex, IDoctor, IPatient} from '../../../types/types';
import {CardHistorico} from './CardHistorico';

interface IParams {
  userId: string;
}

const Historico = () => {
  const route = useRoute();

  const {userId} = route.params as IParams;

  const [datoClinico, setDatoClinico] = useState<Array<IDatosClinicoIndex>>([]);
  const [user, setUser] = useState<IPatient | IDoctor>({});

  const navigation = useNavigation();

  useEffect(() => {
    const getDatoClinico = async () => {
      const datoClinicoResult = await fetchGetDatoClinicoByUserId(userId);

      setDatoClinico(datoClinicoResult.datosClinicos);
      delete datoClinicoResult.datosClinicos;

      setUser(datoClinicoResult);
    };

    getDatoClinico();
  }, []);

  const toFormPatient = () => {
    //@ts-ignore
    navigation.navigate('MyForm', {id: user.id});
  };

  return (
    <>
      <Appbar.Header style={{marginRight: 330}}>
        <Appbar.BackAction
          onPress={() => navigation.navigate('ListPatient' as never)}
          style={{backgroundColor: '#17C2EC'}}
        />
      </Appbar.Header>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}>
          {user.userType === 0
            ? `Datos clinicos de ${user.username}`
            : 'Historico de examenes realizados'}
        </Text>
      </View>
      {user.userType === 0 && (
        <View style={styles.boxButtonAction}>
          <Button
            icon="archive-arrow-up-outline"
            style={styles.btnCreate}
            onPress={toFormPatient}>
            Nuevo examen
          </Button>
        </View>
      )}
      <View style={{flex: 1, padding: 16}}>
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            gap: 16,
          }}>
          {datoClinico.map((datoClinico, index) => (
            <CardHistorico datoClinico={datoClinico} key={index} />
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: 90,
    backgroundColor: '#fff',
    borderRadius: 10,
    // Estilos de sombra para iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    // Estilos de sombra para Android
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    columnGap: 18,
    justifyContent: 'center',
  },
  boxButtonAction: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    flexDirection: 'row',
    columnGap: 12,
    paddingLeft: 8,
    paddingTop: 16,
  },
  btnCreate: {
    color: '#fff',
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#17C2EC',
  },
});

export default Historico;

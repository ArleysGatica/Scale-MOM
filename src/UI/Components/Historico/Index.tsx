import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Appbar, Avatar, Button, Card, IconButton } from 'react-native-paper';
import { fetchGetDatoClinicoByUserId } from '../../../services';
import { IDatosClinicoIndex, IDoctor, IPatient } from '../../../types/types';
import { CardHistorico } from './CardHistorico';
import { PieChartData as RNChartPieChartData } from 'react-native-svg-charts';
import { BarChartExample } from '../../../../grafic';

import * as Permissions from 'expo-permissions';

import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as XLSX from 'xlsx';

interface IParams {
  userId: string;
}

interface PieChartData extends RNChartPieChartData {
  key: number;
  amount: number;
  name?: string;
  svg: {
    fill: string;
  };
}

const Historico = () => {
  const route = useRoute();

  const { userId } = route.params as IParams;

  const [datosClinicos, setDatosClinicos] = useState<Array<IDatosClinicoIndex>>([]);
  const [user, setUser] = useState<IPatient | IDoctor>({});

  const [graficData, setGraficData] = useState<PieChartData[]>([]);

  const navigation = useNavigation();

  const downloadExcelFile = async () => {
    try {

      const dataMatrix = datosClinicos.map((datoClinico) => {
        // Excluir el campo específico (respiratorioValue en este caso)
        const { pacienteId, doctorId, ...restoDatosClinico } = datoClinico;
        return Object.values({ pacienteId: pacienteId.username, doctorId: doctorId.username, ...restoDatosClinico, });
      });

      const header = ['Paciente', 'Doctor'].concat(Object.keys(datosClinicos[0]).filter(key => key !== 'pacienteId' && key !== 'doctorId'));

      dataMatrix.unshift(header);

      console.log(dataMatrix);

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(dataMatrix);
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1', true);

      const excelBuffer = XLSX.write(wb, { type: 'base64' });

      const filePath = `${FileSystem.documentDirectory}${user?.username}.xlsx`;

      // Se escribe el archivo en el sistema de archivos
      FileSystem.writeAsStringAsync(filePath, excelBuffer, { encoding: FileSystem.EncodingType.Base64 }).then(() => {
        Sharing.shareAsync(filePath)
      });

    } catch (error) {
      console.error('Error al escribir o descargar el archivo XLSX:', error);
    }
  };

  useEffect(() => {
    const getDatoClinico = async () => {
      const datoClinicoResult = await fetchGetDatoClinicoByUserId(userId);

      let leveCount = 0;
      let medioCount = 0;
      let severoCount = 0;
      let extremoCount = 0;

      let dataGraficCopy: PieChartData[] = [];

      setDatosClinicos(datoClinicoResult.datosClinicos);

      datoClinicoResult.datosClinicos.map((datoClinico: IDatosClinicoIndex) => {
        if (datoClinico.escalaClinicaString === 'MML') leveCount++;
        if (datoClinico.escalaClinicaString === 'MMM') medioCount++;
        if (datoClinico.escalaClinicaString === 'MMS') severoCount++;
        if (datoClinico.escalaClinicaString === 'MME') extremoCount++;
      });

      if (leveCount > 0) dataGraficCopy.push({ key: 1, amount: leveCount, name: 'MML', svg: { fill: '#00FF00' } });
      if (medioCount > 0) dataGraficCopy.push({ key: 2, amount: medioCount, name: 'MMM', svg: { fill: '#FFFF00' } });
      if (severoCount > 0) dataGraficCopy.push({ key: 3, amount: severoCount, name: 'MMS', svg: { fill: '#FFA500' } });
      if (extremoCount > 0) dataGraficCopy.push({ key: 4, amount: extremoCount, name: 'MME', svg: { fill: '#FF0000' } });

      setGraficData(dataGraficCopy);

      delete datoClinicoResult.datosClinicos;

      setUser(datoClinicoResult);
    };

    getDatoClinico();
  }, []);

  useEffect(() => {
    const requestMediaLibraryPermission = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      console.log(status);
      if (status !== 'granted') {
        console.error('Permiso de la biblioteca de medios no concedido.');
      }
    };

    requestMediaLibraryPermission();
  }, []);

  const toFormPatient = () => {
    //@ts-ignore
    navigation.navigate('MyForm', { id: user.id });
  };

  const data: PieChartData[] = [
    { key: 1, amount: 0, name: 'MML', svg: { fill: '#00FF00' } },
    { key: 2, amount: 0, name: 'MMM', svg: { fill: '#FFFF00' } },
    { key: 3, amount: 0, name: 'MMS', svg: { fill: '#FFA500' } },
    { key: 4, amount: 0, name: 'MME', svg: { fill: '#FF0000' } },
  ];

  return (
    <>
      <Appbar.Header style={{ marginRight: 330 }}>
        <Appbar.BackAction
          onPress={() => navigation.navigate('ListPatient' as never)}
          style={{ backgroundColor: '#17C2EC' }}
        />
      </Appbar.Header>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          paddingBottom: 16,
        }}>
        <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>
          {user.userType === 0
            ? `Datos clinicos de ${user?.username}`
            : 'Historial de examenes realizados'}
        </Text>
      </View>
      {user.userType === 0 && (
        <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', flexDirection: 'column' }}>
          <View style={styles.boxButtonAction}>
            <Button style={styles.btnCreate} onPress={downloadExcelFile}>
              Enviar excel
            </Button>
            <Button
              icon="archive-arrow-up-outline"
              style={styles.btnCreate}
              onPress={toFormPatient}>
              Nuevo examen
            </Button>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', width: '100%', height: 50, }}>
            {data.map((item, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', width: '25%', borderRadius: 10, }}>
                <View style={{ width: 20, height: 20, backgroundColor: item.svg.fill, borderRadius: 10, }}></View>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', backgroundColor: 'white', }}>{item.name}</Text>
              </View>
            ))}
          </View>
        </View>

      )}
      <View style={{ flex: 1, paddingTop: 16 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            gap: 16,
          }}>
          {datosClinicos.map((datoClinico, index) => (
            <CardHistorico datoClinico={datoClinico} key={index} />
          ))}
        </ScrollView>
      </View>
      <Text
        style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', backgroundColor: 'white', }}>Grafica de datos</Text>
      <View style={{ flex: 1, paddingTop: 20, paddingBottom: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
        <BarChartExample data={graficData} />
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
    shadowOffset: { width: 0, height: 2 },
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
    width: '100%',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    flexDirection: 'row',
    columnGap: 12,
    paddingLeft: '11%',
    paddingBottom: 16,
    paddingTop: 16,
  },
  btnCreate: {
    color: '#fff',
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fill: '#fff',
    borderRadius: 18,
    borderColor: '#17C2EC',
    borderWidth: 1,
    width: 'auto',
  },
});

export default Historico;

import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Appbar, Avatar, Button, Card, IconButton } from 'react-native-paper';
import { fetchGetDatoClinicoByUserId } from '../../../services';
import { IDatosClinicoIndex, IDoctor, IPatient } from '../../../types/types';
import { CardHistorico } from './CardHistorico';
import { PieChartData as RNChartPieChartData } from 'react-native-svg-charts';
import { BarChartExample } from '../../../../grafic';
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';

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

  const [datoClinico, setDatoClinico] = useState<Array<IDatosClinicoIndex>>([]);
  const [user, setUser] = useState<IPatient | IDoctor>({});

  const [leve, setLeve] = useState(0);
  const [medio, setMedio] = useState(0)
  const [severo, setSevero] = useState(0);
  const [extremo, setExtremo] = useState(0);

  const navigation = useNavigation();

  const downloadExcelFile = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY_WRITE_ONLY);
      
      if (status !== 'granted') {
        console.error('Permiso de escritura en la biblioteca de medios no concedido.');
        return;
      }

      console.log(status);
      

      const data = [
        { Nombre: 'John', Edad: 30, Ciudad: 'New York' },
        { Nombre: 'Jane', Edad: 25, Ciudad: 'Los Angeles' },
        // ... más datos
      ];
  
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet([ ["Odd", "Even", "Total"], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [2, 4, 6, 8, 10, 12, 14, 16, 18, 20] , [3, 6, 9, 12, 15, 18, 21, 24, 27, 30]]);
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1', true);
  
      const excelBuffer = XLSX.write(wb, { type: 'base64' });
  
        const filePath = `${FileSystem.documentDirectory}example.xlsx`;
  
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

      setDatoClinico(datoClinicoResult.datosClinicos);

      datoClinicoResult.datosClinicos.map((datoClinico:IDatosClinicoIndex) => {
        if (datoClinico.escalaClinicaString === 'MML') leveCount++;
        if (datoClinico.escalaClinicaString === 'MMM') medioCount++;
        if (datoClinico.escalaClinicaString === 'MMS') severoCount++;
        if (datoClinico.escalaClinicaString === 'MME') extremoCount++;
      });

      setLeve(leveCount);
      setMedio(medioCount);
      setSevero(severoCount);
      setExtremo(extremoCount);

      delete datoClinicoResult.datosClinicos;

      setUser(datoClinicoResult);
    };

    getDatoClinico();
  }, []);

  useEffect(() => {
    const requestMediaLibraryPermission = async () => {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      if (status !== 'granted') {
        console.error('Permiso de la biblioteca de medios no concedido.');
      }
    };

    requestMediaLibraryPermission();
  }, []);

  const data: PieChartData[] = [
    { key: 1, amount: leve, name: 'MML', svg: { fill: '#00FF00' } },
    { key: 2, amount: medio, name: 'MMM', svg: { fill: '#FFFF00' } },
    { key: 3, amount: severo, name: 'MMS', svg: { fill: '#FFA500' } },
    { key: 4, amount: extremo, name: 'MME', svg: { fill: '#FF0000' } },
];
  const toFormPatient = () => {
    //@ts-ignore
    navigation.navigate('MyForm', { id: user.id });
  };

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
        <View style={styles.boxButtonAction}>
            <Button style={styles.btnCreate} onPress={downloadExcelFile}>
                Generar y Descargar Excel
            </Button>
          <Button
            icon="archive-arrow-up-outline"
            style={styles.btnCreate}
            onPress={toFormPatient}>
            Nuevo exam
          </Button>
        </View>
      )}
      <View style={{ flex: 1, paddingTop: 16}}>
        <ScrollView
        style={{flex:1}}
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
        <View style={{ flex: 1, paddingTop: 16, paddingBottom: 16}}>
        <BarChartExample data={data} />
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
    paddingLeft: '30%',
    paddingBottom: 16,
    paddingTop: 16,
  },
  btnCreate: {
    color: '#fff' ,
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

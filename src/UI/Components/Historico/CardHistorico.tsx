import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { IDatosClinicoIndex } from '../../../types/types';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IProps {
  datoClinico: IDatosClinicoIndex;
}

export const CardHistorico = ({ datoClinico }: IProps) => {

    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(new Date());
        

        let fechaDate = new Date(datoClinico.fechaRegistro)

        fechaDate.setDate(fechaDate.getDate() + 1)

        console.log(datoClinico.fechaRegistro);
        

        const fechaHoraMoment = moment(fechaDate);

        console.log(fechaHoraMoment.format('YYYY-MM-DD'));
        
        setFecha(fechaHoraMoment.format('YYYY-MM-DD'))// Obtiene '1990-01-01'
        setHora(fechaHoraMoment.format('HH:mm:ss'))
      } catch (error) {
        console.error('Error al procesar la fecha:', error);
      }
    };

    fetchData();
  }, []);

  const getColor = (escalaClinicaStr: string) => {
    if (escalaClinicaStr === "MML") return '#00FF00';
    if (escalaClinicaStr === "MMM") return '#FFFF00';
    if (escalaClinicaStr === "MMS") return '#FFA500';
    if (escalaClinicaStr === "MME") return '#FF0000';
    return '#000000';
  };

  return (<View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      maxHeight: '100%',
      borderColor: getColor(datoClinico.escalaClinicaString),
      borderRadius: 5,
      borderWidth: 5,
      width: '80%',
      height: 'auto',
      paddingBottom: 16,
      paddingTop: 16,
    }}>

    <View style={{ flex: 1, flexDirection: 'column', gap: 14 }}>
      <View style={{ flex: 1, maxHeight: "20%", flexDirection: 'column' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          Paciente
        </Text>

        <View style={{ flex: 1, flexDirection: 'row', gap: 18 }}>
          <Text style={{ fontSize: 16, width: 95}}>
            {datoClinico.pacienteId.username}
          </Text>
          <Text style={{ fontSize: 16 }}>
            {datoClinico.pacienteId.edad as number} años
          </Text>
        </View>
      </View>

      <View style={{ flex: 1, maxHeight: "20%", flexDirection: 'column' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  Médico
        </Text>
        <View style={{ flex: 1, flexDirection: 'row', gap: 18 }}>
          <Text style={{ fontSize: 16, width: 75 }}>
            {datoClinico.doctorId.username}
          </Text>
          <Text style={{ fontSize: 16, width: 50 }}>
            {datoClinico.doctorId.idMinsa}
          </Text>
        </View>
      </View>

      <View style={{ flex: 1, maxHeight: "20%", flexDirection: 'column' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  Diagnóstico
        </Text>
        <Text style={{ fontSize: 16 }}>
          <Text
            style={{
              fontSize: 16,
            }}>{`${datoClinico.escalaClinicaString} ${datoClinico.escalaClinica} pts`}</Text>
        </Text>
      </View>

      <View style={{ flex: 1, maxHeight: "20%", flexDirection: 'column' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          Fecha
        </Text>
        <Text> {fecha} {hora}</Text>
      </View>
    </View>
  </View>);
}

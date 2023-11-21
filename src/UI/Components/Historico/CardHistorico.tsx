import {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {IDatosClinicoIndex} from '../../../types/types';
import moment from 'moment';

interface IProps {
    datoClinico:IDatosClinicoIndex;
}

export const CardHistorico = ({ datoClinico }:IProps) => {

    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");

    useEffect(() => {
        // Crear un objeto moment a partir de la cadena
        const fechaHoraMoment = moment(datoClinico.fechaRegistro);
    
        // Obtener la fecha y la hora por separado
        setFecha(fechaHoraMoment.format('YYYY-MM-DD'))// Obtiene '1990-01-01'
        setHora(fechaHoraMoment.format('HH:mm:ss')) // Obtiene '00:00:00'
      }, []);

    const getColor = (escalaClinicaStr: string) => {
        if (escalaClinicaStr === "MML") return '#00FF00';
        if (escalaClinicaStr === "MMM") return '#FFFF00';
        if (escalaClinicaStr === "MMS") return '#FFA500';
        if (escalaClinicaStr === "MME") return '#FF0000';
        return '#000000';
      };
      
    return ( <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          maxHeight: '40%',
          borderColor: getColor(datoClinico.escalaClinicaString),
          borderRadius: 5,
          borderWidth: 5,
          width: '75%',
        }}>
        
        <View style={{flex: 1, flexDirection: 'column', gap:14}}>
          <View style={{flex: 1,maxHeight:"20%", flexDirection: 'column'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Paciente
            </Text>

            <View style={{flex: 1, flexDirection: 'row', gap: 24}}>
              <Text style={{fontSize: 16}}>
                  {datoClinico.pacienteId.username}
              </Text>
              <Text style={{fontSize: 16}}>
                  {datoClinico.pacienteId.edad as number} años
              </Text>
            </View>
          </View>

          <View style={{flex: 1,maxHeight:"20%", flexDirection: 'column'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Medico
            </Text>
            <View style={{flex: 1, flexDirection: 'row', gap:24}}>
              <Text style={{fontSize: 16}}>
                  {datoClinico.doctorId.username}
              </Text>
              <Text style={{fontSize: 16}}>
                  {datoClinico.doctorId.idMinsa}
              </Text>
            </View>
          </View>

          <View style={{flex: 1, maxHeight:"20%",flexDirection: 'column'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Diagnostico
            </Text>
            <Text style={{fontSize: 16}}>
            <Text
              style={{
                fontSize: 16,
              }}>{`${datoClinico.escalaClinicaString} ${datoClinico.escalaClinica} pts`}</Text>
            </Text>
          </View>

          <View style={{flex: 1, maxHeight:"20%", flexDirection: 'column'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Fecha
            </Text>
            <Text style={{fontSize: 18}}>
              {fecha}  {hora}
            </Text>
          </View>
        </View>
      </View> );
}

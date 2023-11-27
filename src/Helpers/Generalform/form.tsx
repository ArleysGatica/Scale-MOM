import React, { useState } from 'react';
import {
  ICardioVascular,
  IRenal,
  IRespiratorio,
  IHematologico,
  IHepatico,
  IUterino,
  INeurologico,
  IGastroIntestital,
} from '../../types/types';
import { View, Alert, StyleSheet } from 'react-native';
import { Appbar, Text, TextInput, Button } from 'react-native-paper';

import useValorMasAlto from '../../hook/useHighestNumber';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CardioVacularForm } from './form/CardioVascularForm';
import { RenalForm } from './form/RenalForm';
import { RespiratorioForm } from './form/RespiratorioForm';
import { HematologicoForm } from './form/HematologicoForm';
import { HepaticoForm } from './form/HepaticoForm';
import { NeurologicoForm } from './form/NeurologicoForm';
import { UterinoForm } from './form/UterinoForm';
import { GastroIntestinalForm } from './form/GastroIntestinalForm';
import { fetchAddResultPatient, fetchCreateDatoClinico } from '../../services';
import { useAppSelector } from '../../app/hook';
import moment from 'moment';

const fields = [
  { name: 'FC', label: 'FC:', min: 40, max: 140, medida: 'lpm' },
  {
    name: 'TASistolica',
    label: 'TASistolica:',
    min: 80,
    max: 180,
    medida: 'mmHg',
  },
  {
    name: 'TADiastolica',
    label: 'TADiastolica:',
    min: 40,
    max: 110,
    medida: 'mmHg',
  },
  { name: 'Temperatura', label: 'Temperatura:', min: 35, max: 40, medida: '°C' },
  { name: 'PH', label: 'PH:', min: 7, max: 8, medida: '' },
  { name: 'Lactato', label: 'Lactato:', min: 1.7, max: 4, medida: 'mmol/L' },
];

const fieldsRenal = [
  {
    name: 'Creatinina',
    label: 'Creatinina:',
    min: 0.4,
    max: 2.8,
    medida: 'mg/dL',
  },
  {
    name: 'AcidoUrico',
    label: 'Acido Urico:',
    min: 5.8,
    max: 10,
    medida: 'mg/dL',
  },
  {
    name: 'Proteinuria',
    label: 'Proteinuria:',
    min: 290,
    max: 3500,
    medida: 'mg/dL',
  },
  {
    name: 'TasadefiltracionGlomerular',
    label: 'Filtrado Glomerular:',
    min: 15,
    max: 110,
    medida: 'mL/min/1.73m2',
  },
  {
    name: 'DeficitBase',
    label: 'Deficit de Base:',
    min: 1.8,
    max: 10,
    medida: 'mmol/L',
  },
  { name: 'Orina', label: 'Orina:', min: 100, max: 2000, medida: 'mL' },
  { name: 'horas', label: 'horas:', min: 1, max: 24, medida: 'Hrs' },
  { name: 'Peso', label: 'Peso:', min: 40, max: 150, medida: 'KG' },
  { name: 'edad', label: 'edad:', min: 15, max: 100, medida: 'Años' },
];

const fieldsRespiratorio = [
  {
    name: 'FrecuenciaRespiratoria',
    label: 'Frecuencia Respiratoria:',
    min: 6,
    max: 40,
    medida: 'rpm',
  },
  {
    name: 'IndiceKirby',
    label: 'Indice de Kirby:',
    min: 300,
    max: 500,
    medida: 'PaO2/FiO2',
  },
  { name: 'Saturacion', label: 'Saturación:', min: 85, max: 100, medida: '%' },
];

const fieldsHematologico = [
  {
    name: 'Leucocitos',
    label: 'Leucocitos:',
    min: 1000,
    max: 30000,
    medida: 'mm3',
  },
  { name: 'Hemoglobina', label: 'Hemoglobina:', min: 6, max: 10, medida: 'g/dL' },
  {
    name: 'Plaquetas',
    label: 'Plaquetas:',
    min: 50000,
    max: 150000,
    medida: 'mm4',
  },
  {
    name: 'Fibrinogeno',
    label: 'Fibrinogeno:',
    min: 101,
    max: 310,
    medida: 'mg/dL',
  },
  { name: 'DimeroD', label: 'DimeroD:', min: 1000, max: 3000, medida: 'ng/mL' },
];

const fieldsHepatico = [
  {
    name: 'Transaminasas',
    label: 'Transaminasas:',
    min: 2,
    max: 150,
    medida: 'U/L',
  },
  { name: 'LDH', label: 'LDH:', min: 300, max: 900, medida: 'U/L' },
  {
    name: 'BilirrubinasTotales',
    label: 'BilirrubinasTotales:',
    min: 0.09,
    max: 3.7,
    medida: 'mg/dL',
  },
  {
    name: 'PresionColoidosmotica',
    label: 'PresiónColoidosmótica:',
    min: 15,
    max: 22,
    medida: 'mmHg',
  },
  { name: 'Albumina', label: 'Albumina:', min: 2, max: 5, medida: 'g/dL' },
  {
    name: 'GlobulinaSerica',
    label: 'GlobulinaSérica:',
    min: 2,
    max: 5,
    medida: 'g/dL',
  },
];

const fieldsNeurologico = [{ name: 'EscalaGlasgow', label: 'EscalaGlasgow:' }];

const fieldsUterino = [
  { name: 'HemorragiaObstetrica', label: 'HemorragiaObstétrica:' },
  { name: 'PerdidaVolumenSangre', label: 'PerdidaVolumenSangre:' },
];

const fieldsGastroIntestinal = [
  { name: 'ToleranciaViaOral', label: 'ToleranciaVíaOral:' },
  { name: 'Glucosa', label: 'Glucosa:', min: 45, max: 190, medida: 'mg/dL' },
  { name: 'NA', label: 'NA:', min: 120, max: 160, medida: 'mEq/L' },
  { name: 'K', label: 'K:', min: 3, max: 5.5, medida: 'mEq/L' },
];

interface IParams {
  id: string;
}

const MyForm = () => {
  //@ts-ignore
  const navigation = useNavigation();

  const currentDoctor = useAppSelector(state => state.doctors.currentDoctor);

  const route = useRoute();
  const id = (route.params as IParams)?.id;

  const [cardioData, setCardioData] = useState<ICardioVascular>({
    TASistolica: undefined,
    TADiastolica: undefined,
    Tam: undefined,
    FC: undefined,
    Temperatura: undefined,
    PH: undefined,
    Lactato: undefined,
    Indicedechoque: undefined,
    ValueTASistolica: 0,
    ValueTADiastolica: 0,
    ShockIndex: 0,
  });

  //segundo grupo
  const [renalData, setRenalData] = useState<IRenal>({
    Creatinina: undefined,
    AcidoUrico: undefined,
    Diuresis: undefined,
    Proteinuria: undefined,
    TasadefiltracionGlomerular: undefined,
    DeficitBase: undefined,
    Orina: 0,
    horas: 0,
    Peso: 0,
    edad: 0,
  });

  //tercer grupo
  const [respiratorio, setRespiratorio] = useState<IRespiratorio>({
    FrecuenciaRespiratoria: undefined,
    IndiceKirby: undefined,
    Saturacion: undefined,
  });

  //cuarto grupo
  const [hematologico, setHematologico] = useState<IHematologico>({
    Leucocitos: undefined,
    Hemoglobina: undefined,
    Plaquetas: undefined,
    Fibrinogeno: undefined,
    DimeroD: undefined,
    IRN: undefined,
  });

  //quinto grupo
  const [hepatico, setHepatico] = useState<IHepatico>({
    Transaminasas: undefined,
    LDH: undefined,
    BilirrubinasTotales: undefined,
    PresionColoidosmotica: undefined,
    Albumina: undefined,
    GlobulinaSerica: undefined,
    IndiceBriones: undefined,
  });

  const GROUPS_ENUM = {
    0: 'cardiovascular',
    1: 'renal',
    2: 'respiratorio',
    3: 'hematologico',
    4: 'hepatico',
    5: 'neurologico',
    6: 'uterino',
    7: 'gastrointestinal',
  };

  const [currentGroup, setCurrentGroup] = useState<number>(0);

  //sexto grupo
  const GlasgowOptions = {
    '15': 0,
    '13-14': 1,
    '10-12': 2,
    '9-3': 3,
  };

  const [neurologico, setNeurologico] = useState<INeurologico>({
    EscalaGlasgow: 0,
  });

  const HemorragiaOptions = {
    'Grado I': 0,
    'Grado II': 1,
    'Grado III': 2,
    'Grado IV': 3,
  };

  const BloodsOptions = {
    '≤15% (500-900 mL)': 0,
    '15-29% (1000-1499 mL)': 1,
    '30-40% (1500-1999 mL)': 2,
    '≥40% (≥2000 mL)': 3,
  };

  //septimo grupo
  const [uterino, setUterino] = useState<IUterino>({
    HemorragiaObstetrica: 0,
    PerdidaVolumenSangre: 0,
  });

  const ToleranciaVíaOralOptions = {
    Tolera: 0,
    'Intolerancia 3-4 días': 1,
    'Intolerancia ≥5 días': 2,
    'Sangrado del tubo digestivo': 3,
  };

  //octavo grupo
  const [gastroIntestinal, setGastroIntestinal] = useState<IGastroIntestital>({
    ToleranciaViaOral: 0,
    Glucosa: undefined,
    NA: undefined,
    K: undefined,
  });

  const assignValue = (objetoDeCampos:any, objetoPadre:any) => {
    const objetoRemodelado:any = {};

    objetoDeCampos.forEach((field: { name: string | number; }) => {
        objetoRemodelado[field.name] = objetoPadre[field.name];
      });

      return objetoRemodelado;
  }

  const handleCalculate = async () => {
    // //@ts-ignore
    // navigation.navigate('ListPatient', { id: Math.random() });

    if (
      handleCalculateRenal().creatinina === false ||
      handleCalculateRespiratorio().ik === false
    ) {
      return;
    }

    let resultCardio = encontrarValorMasAlto(handleCalculateCardio()) || 0;
    let resultadoRenal = encontrarValorMasAlto(handleCalculateRenal());
    let resultRespiratorio = encontrarValorMasAlto(handleCalculateRespiratorio()) || 0;
    let resultH = encontrarValorMasAlto(handleCalculateHematologico()) || 0;
    let resultHepatico = encontrarValorMasAlto(handleCalculateHepatico()) || 0;
    let resultG = encontrarValorMasAlto(handleCalculateGastroIntestinal()) || 0;

    let ResultSuma =
      (resultadoRenal as number) +
      resultRespiratorio +
      resultCardio +
      resultH +
      resultHepatico +

      resultG;

    const handleCalculateResult = () => {
      if (ResultSuma >= 0 && ResultSuma <= 3) {
        console.log(`MML ${ResultSuma}`);
        
        return { escalaClinica: ResultSuma, escalaClinicaString: 'MML' };
      } else if (ResultSuma >= 4 && ResultSuma <= 7) {
        console.log(`MMM ${ResultSuma}`);
        
        return { escalaClinica: ResultSuma, escalaClinicaString: 'MMM' };
      } else if (ResultSuma >= 8 && ResultSuma <= 11) {
        console.log(`MMS ${ResultSuma}`);
        
        return { escalaClinica: ResultSuma, escalaClinicaString: 'MMS' };
      } else if (ResultSuma >= 12 && ResultSuma <= 24) {
        console.log(`MSL ${ResultSuma}`);
        
        return { escalaClinica: ResultSuma, escalaClinicaString: 'MME' };
      }
    };

    let Resultado = handleCalculateResult();

    let datoClinico = {
      doctorId: currentDoctor?.id as string,
      pacienteId: id,
      escalaClinica: Resultado?.escalaClinica as number,
      escalaClinicaString: Resultado?.escalaClinicaString as string,
      fechaRegistro: moment().format('YYYY-MM-DD') || (moment().format('LTS')),
      gastroIntestinalValue: resultG,
      cardioVascularValue: resultCardio,
      hematologicoValue: resultH,
      hepaticoValue: resultHepatico,
      renalValue: resultadoRenal as number,
      neurologicoValue: neurologico.EscalaGlasgow as number,
      respiratorioValue: resultRespiratorio,
      ...assignValue(fields, cardioData),
    ...assignValue(fieldsRenal, renalData),
    ...assignValue(fieldsRespiratorio, respiratorio),
    ...assignValue(fieldsHematologico, hematologico),
    ...assignValue(fieldsHepatico, hepatico),
    ...assignValue(fieldsNeurologico, neurologico),
    ...assignValue(fieldsUterino, uterino),
    ...assignValue(fieldsGastroIntestinal, gastroIntestinal),


    };
    await fetchCreateDatoClinico(datoClinico);
  };

  const handleInputChangeCardio = (name: string, value: string) => {

    setCardioData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleCalculateCardio = () => {
    let cardioDataFCNumber = parseFloat(cardioData.FC?.toString() || '0');
    let cardioDataTASistolicaNumber = parseFloat(
      cardioData.TASistolica?.toString() || '0',
    );
    let cardioDataTADiastolicaNumber = parseFloat(
      cardioData.TADiastolica?.toString() || '0',
    );

    const calculateCardiacPressure = (fcValue: number | undefined): number => {
      if (fcValue) {
        if (
          (fcValue > 99 && fcValue <= 119) ||
          (fcValue >= 51 && fcValue <= 60)
        ) {
          return 1;
        } else if (
          (fcValue >= 120 && fcValue <= 139) ||
          (fcValue >= 41 && fcValue <= 50)
        ) {
          return 2;
        } else if (fcValue >= 140 || fcValue <= 40) {
          return 3;
        }
      }
      return 0;
    };

    const calculateTASistolicaValue = (
      TASistolica: number | undefined,
    ): number => {
      if (TASistolica) {
        if (TASistolica >= 101 && TASistolica <= 139) {
          return 0;
        } else if (
          (TASistolica >= 140 && TASistolica <= 179) ||
          (TASistolica >= 91 && TASistolica <= 100)
        ) {
          return 1;
        } else if (
          (TASistolica > 140 && TASistolica <= 90) ||
          TASistolica === 81 ||
          TASistolica >= 81
        ) {
          return 2;
        } else if (TASistolica <= 80) {
          return 3;
        }
      }
      return 0;
    };

    const calculateTADiastolicaValue = (
      TADiastolica: number | undefined,
    ): number => {
      if (TADiastolica) {
        if (TADiastolica >= 61 && TADiastolica <= 89) {
          return 0;
        } else if (
          (TADiastolica >= 90 && TADiastolica <= 109) ||
          (TADiastolica >= 51 && TADiastolica <= 60)
        ) {
          return 1;
        } else if (
          (TADiastolica > 110 && TADiastolica <= 50) ||
          TADiastolica === 41 ||
          TADiastolica >= 41
        ) {
          return 2;
        } else if (TADiastolica <= 40) {
          return 3;
        }
      }
      return 0;
    };

    const cardiacPressure = calculateCardiacPressure(cardioDataFCNumber);
    const tasistolicaValue = calculateTASistolicaValue(
      cardioDataTASistolicaNumber,
    );
    const tadiastolicaValue = calculateTADiastolicaValue(
      cardioDataTADiastolicaNumber,
    );

    setCardioData(prevData => ({
      ...prevData,
      CardiacPressure: cardiacPressure,
      ValueTASistolica: tasistolicaValue,
      ValueTADiastolica: tadiastolicaValue,
    }));

    if (cardioDataTASistolicaNumber && cardioDataTADiastolicaNumber) {
      const tam = (
        (cardioDataTADiastolicaNumber * 2 + cardioDataTASistolicaNumber) /
        3
      ).toFixed(2);
      const indicedechoque =
        (cardioDataFCNumber || 0) / (cardioDataTASistolicaNumber || 1);

      setCardioData(prevData => ({
        ...prevData,
        Tam: parseFloat(tam),
        Indicedechoque: indicedechoque,
      }));

      const shockIndex = indicedechoque || 0;

      if (shockIndex >= 0.7 && shockIndex <= 0.89) {
        setCardioData(prevData => ({ ...prevData, ShockIndex: 0 }));
      } else if (shockIndex >= 0.9 && shockIndex <= 0.99) {
        setCardioData(prevData => ({ ...prevData, ShockIndex: 1 }));
      } else if (shockIndex > 1 && shockIndex <= 1.69) {
        setCardioData(prevData => ({ ...prevData, ShockIndex: 2 }));
      } else if (shockIndex >= 1.7) {
        setCardioData(prevData => ({ ...prevData, ShockIndex: 3 }));
      }
    }

    return {
      cardiacPressure,
      tasistolicaValue,
      tadiastolicaValue,
    };

  }

  const handleInputChangeRenal = (name: string, value: string) => {
    setRenalData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCalculateRenal = () => {
    const calculateCreatinina = (): number | boolean => {
      let creatinina = parseFloat(renalData.Creatinina?.toString() || '0');

      if (creatinina <= 0.4) {
        // Alert.alert('El valor de la creatinina debe ser mayor a 0.4');
        return false;
      }

      if (creatinina) {
        if (creatinina >= 0.4 && creatinina <= 0.89) {
          return 0;
        } else if (creatinina >= 0.9 && creatinina <= 1.35) {
          return 1;
        } else if (creatinina >= 1.36 || creatinina <= 2.7) {
          return 2;
        } else if (creatinina >= 2.8) {
          return 3;
        }
      }
      return 0;
    };

    const calculateAcidoUrico = (): number => {
      let acidoUrico = parseFloat(renalData.AcidoUrico?.toString() || '0');

      if (acidoUrico) {
        if (acidoUrico <= 5.9) {
          return 0;
        } else if (acidoUrico >= 6 && acidoUrico <= 7.9) {
          return 1;
        } else if (acidoUrico >= 8 && acidoUrico <= 8.9) {
          return 2;
        } else if (acidoUrico >= 9) {
          return 3;
        }
      }
      return 0;
    };

    const calculateDiuresis = (): number | boolean => {
      let renalDataOrina = parseFloat(renalData.Orina?.toString() || '0');
      let renalDataHoras = parseFloat(renalData.horas?.toString() || '0');
      let renalDataPeso = parseFloat(renalData.Peso?.toString() || '0');

      if (renalDataOrina && renalDataHoras && renalDataPeso) {
        const diuresis = renalDataOrina / renalDataHoras / renalDataPeso;
        setRenalData({
          ...renalData,
          Diuresis: diuresis,
        });
      }
      let diuresis = renalData.Diuresis || 0;

      if (diuresis) {
        if (diuresis >= 0.51) {
          return 0;
        } else if (diuresis >= 0.31 && diuresis <= 0.5) {
          return 1;
        } else if (diuresis <= 0.3) {
          return 2;
        }
      }
      return 0;
    };

    const calculateProteinuria = (): number | boolean => {
      let proteinuria = parseFloat(renalData.Proteinuria?.toString() || '0');
      if (proteinuria) {
        if (proteinuria <= 299) {
          return 0;
        } else if (proteinuria >= 300 && proteinuria <= 499) {
          return 1;
        } else if (proteinuria >= 500 && proteinuria <= 3499) {
          return 2;
        } else if (proteinuria >= 3500) {
          return 3;
        }
      }
      return 0;
    };

    const calculateTasadefiltraciónGlomerular = (): number | boolean => {
      let tasadefiltraciónGlomerular =
        renalData.TasadefiltracionGlomerular || 0;
      if (renalData.Creatinina && renalData.edad) {
        const f = 0.7;
        const TFG =
          142 *
          Math.pow(Number(renalData.Creatinina) / f, -0.241) *
          Math.pow(Number(renalData.Creatinina) / f, -1.2) *
          Math.pow(0.9938, renalData.edad) *
          1.012;
        const roundedTFG = TFG.toFixed(2);
        setRenalData({
          ...renalData,
          TasadefiltracionGlomerular: parseFloat(roundedTFG),
        });
      }

      if (tasadefiltraciónGlomerular) {
        if (
          tasadefiltraciónGlomerular >= 61 &&
          tasadefiltraciónGlomerular <= 110
        ) {
          return 0;
        } else if (
          tasadefiltraciónGlomerular >= 31 &&
          tasadefiltraciónGlomerular <= 60
        ) {
          return 1;
        } else if (
          tasadefiltraciónGlomerular >= 16 &&
          tasadefiltraciónGlomerular <= 30
        ) {
          return 2;
        } else if (tasadefiltraciónGlomerular <= 15) {
          return 3;
        }
      }
      return 0;
    };

    const calculateDeficitBase = (): number | boolean => {
      let deficitBase = renalData.DeficitBase || 0;
      if (deficitBase) {
        if (deficitBase <= 1.9) {
          return 0;
        } else if (deficitBase >= 2 && deficitBase <= 5.9) {
          return 1;
        } else if (deficitBase >= 6 && deficitBase <= 9.9) {
          return 2;
        } else if (deficitBase <= 10) {
          return 3;
        }
      }
      return 0;
    };

    return {
      creatinina: calculateCreatinina(),
      acidourico: calculateAcidoUrico(),
      diuresis: calculateDiuresis(),
      proteinuria: calculateProteinuria(),
      tfg: calculateTasadefiltraciónGlomerular(),
      deficitbase: calculateDeficitBase(),
    };
  };

  const handleInputChangeRespiratorio = (name: string, value: string) => {
    setRespiratorio(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCalculateRespiratorio = () => {
    const calculateFrecuenciaRespiratoria = (): number => {
      let frValue = respiratorio.FrecuenciaRespiratoria || 0;
      if (frValue) {
        if (frValue >= 16 && frValue <= 23) {
          return 0;
        } else if (frValue >= 24 && frValue <= 29) {
          return 1;
        } else if (frValue >= 30 && frValue <= 39) {
          return 2;
        } else if (frValue >= 40 || frValue <= 6) {
          return 3;
        }
      }
      return 0;
    };

    const calculateIndiceKirby = (): number | boolean => {
      let IkValue = respiratorio.IndiceKirby || 0;
      if (IkValue < 300) {
        // Alert.alert('El valor del indice kirby debe ser mayor a 300');
        return false;
      }

      if (IkValue) {
        if (IkValue >= 401) {
          return 0;
        } else if (IkValue >= 351 && IkValue <= 400) {
          return 1;
        } else if (IkValue >= 301 && IkValue <= 350) {
          return 2;
        } else if (IkValue >= 300) {
          return 3;
        }
      }
      return 0;
    };

    const calculateSaturacion = (): number => {
      let StValue = respiratorio.Saturacion || 0;
      if (StValue) {
        if (StValue >= 94.1) {
          return 0;
        } else if (StValue >= 90.1 && StValue <= 94) {
          return 1;
        } else if (StValue >= 85.1 && StValue <= 90) {
          return 2;
        } else if (StValue <= 85) {
          return 3;
        }
      }
      return 0;
    };

    return {
      fr: calculateFrecuenciaRespiratoria(),
      ik: calculateIndiceKirby(),
      st: calculateSaturacion(),
    };
  };

  const handleInputChangeHematologico = (name: string, value: string) => {
    const numericValue = parseFloat(value) || undefined;

    setHematologico(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCalculateHematologico = () => {
    const calculateLeucocitos = (): number => {
      let leucocitos = hematologico.Leucocitos || 0;

      if (leucocitos) {
        if (leucocitos >= 4100 && leucocitos <= 16900) {
          return 0;
        } else if (
          (leucocitos >= 17000 && leucocitos <= 20900) ||
          (leucocitos >= 2100 && leucocitos <= 4000)
        ) {
          return 1;
        } else if (
          (leucocitos >= 21000 && leucocitos <= 29900) ||
          (leucocitos >= 1100 && leucocitos <= 2000)
        ) {
          return 2;
        } else if (leucocitos >= 1000 && leucocitos <= 30000) {
          return 3;
        }
      }
      return 0;
    };

    const calculateHemoglobina = (): number => {
      let hemoglobina = hematologico.Hemoglobina || 0;
      if (hemoglobina) {
        if (hemoglobina >= 10.1) {
          return 0;
        } else if (hemoglobina >= 8.1 && hemoglobina <= 10) {
          return 1;
        } else if (hemoglobina >= 6.1 && hemoglobina <= 8) {
          return 2;
        } else if (hemoglobina <= 6) {
          return 3;
        }
      }
      return 0;
    };

    const calculatePlaquetas = (): number => {
      let plaquetas = hematologico.Plaquetas || 0;
      if (plaquetas) {
        if (plaquetas >= 150000) {
          return 0;
        } else if (plaquetas >= 100100 && plaquetas <= 149000) {
          return 1;
        } else if (plaquetas >= 50100 && plaquetas <= 1000000) {
          return 2;
        } else if (plaquetas <= 50000) {
          return 3;
        }
      }
      return 0;
    };

    const calculateFibrinogeno = (): number => {
      let fibrinogeno = hematologico.Fibrinogeno || 0;
      const ValueDimeroD = hematologico.DimeroD || 0;
      const ValueIRN = hematologico.IRN || 0;
      if (fibrinogeno) {
        if (fibrinogeno >= 301) {
          return 0;
        } else if (fibrinogeno >= 201 && fibrinogeno <= 300) {
          return 1;
        } else if (fibrinogeno >= 101 && fibrinogeno <= 200) {
          return 2;
        } else if (
          (ValueIRN >= 2 && fibrinogeno <= 100) ||
          ValueDimeroD >= 3000
        ) {
          return 3;
        }
      }
      return 0;
    };

    const calculateDimeroD = (): number => {
      let dimeroD = hematologico.DimeroD || 0;
      const ValueFibrinogeno = hematologico.Fibrinogeno || 0;
      const ValueIRN = hematologico.IRN || 0;
      if (dimeroD) {
        if (dimeroD <= 999) {
          return 0;
        } else if (dimeroD >= 1000 && dimeroD <= 1999) {
          return 1;
        } else if (dimeroD >= 2000 && dimeroD <= 2999) {
          return 2;
        } else if (
          (ValueIRN >= 2 && ValueFibrinogeno <= 100) ||
          dimeroD >= 3000
        ) {
          return 3;
        }
      }
      return 0;
    };

    const calculateIRN = (): number => {
      let irn = hematologico.IRN || 0;
      const ValueDimeroD = hematologico.DimeroD || 0;
      const ValueFibrinogeno = hematologico.Fibrinogeno || 0;
      if (irn !== undefined) {
        if (irn >= 2) {
          return 0;
        } else if (irn >= 1.5 && irn <= 1.99) {
          return 1;
        } else if (irn >= 1.21 && irn <= 1.49) {
          return 2;
        } else if (
          (irn >= 2 && ValueFibrinogeno <= 100) ||
          ValueDimeroD >= 3000
        ) {
          return 3;
        }
      }
      return 0;
    };

    return {
      leucocitos: calculateLeucocitos(),
      hemoglobina: calculateHemoglobina(),
      plaquetas: calculatePlaquetas(),
      fibrinogeno: calculateFibrinogeno(),
      dimerod: calculateDimeroD(),
      irn: calculateIRN(),
    };
  };

  const handleInputChangeHepatico = (name: string, value: string) => {
    const numericValue = parseFloat(value) || undefined;

    setHepatico(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCalculateHepatico = () => {
    const calculateTransaminasas = (): number => {
      let transaminasas = hepatico.Transaminasas || 0;
      if (transaminasas) {
        if (transaminasas >= 2 && transaminasas <= 39) {
          return 0;
        } else if (transaminasas >= 40 && transaminasas <= 69) {
          return 1;
        } else if (transaminasas >= 70 && transaminasas <= 149) {
          return 2;
        } else if (transaminasas >= 150) {
          return 3;
        }
      }
      return 0;
    };

    const calculateLDH = (): number => {
      let ldh = hepatico.LDH || 0;
      if (ldh) {
        if (ldh <= 399) {
          return 0;
        } else if (ldh >= 400 && ldh <= 599) {
          return 1;
        } else if (ldh >= 600 && ldh <= 899) {
          return 2;
        } else if (ldh >= 900) {
          return 3;
        }
      }
      return 0;
    };

    const calculateBilirrubinasTotales = (): number => {
      let bilirrubinasTotales = hepatico.BilirrubinasTotales || 0;
      if (bilirrubinasTotales) {
        if (bilirrubinasTotales >= 0.09 && bilirrubinasTotales <= 1.16) {
          return 0;
        } else if (bilirrubinasTotales >= 1.17 && bilirrubinasTotales <= 1.86) {
          return 1;
        } else if (bilirrubinasTotales >= 1.87 && bilirrubinasTotales <= 3.4) {
          return 2;
        } else if (bilirrubinasTotales >= 3.5) {
          return 3;
        }
      }
      return 0;
    };

    const calculatePresiónColoidosmótica = (): number => {
      if (hepatico.Albumina && hepatico.GlobulinaSerica && cardioData.Tam) {
        const presióncoloidosmótica = (
          hepatico.Albumina * 5.54 +
          hepatico.GlobulinaSerica * 1.43
        ).toFixed(2);
        const indicebriones = (
          Number(presióncoloidosmótica) / cardioData.Tam
        ).toFixed(2);
        setHepatico(prevData => ({
          ...prevData,
          PresiónColoidosmótica: parseFloat(presióncoloidosmótica),
          Indicebriones: parseFloat(indicebriones),
        }));
      }

      let presiónColoidosmótica = hepatico.PresionColoidosmotica || 0;

      if (presiónColoidosmótica) {
        if (presiónColoidosmótica >= 3.1) {
          return 0;
        } else if (presiónColoidosmótica >= 2.6 && presiónColoidosmótica <= 3) {
          return 1;
        } else if (
          presiónColoidosmótica >= 2.1 &&
          presiónColoidosmótica <= 2.5
        ) {
          return 2;
        } else if (presiónColoidosmótica <= 2) {
          return 3;
        }
      }
      return 0;
    };

    const calculateAlbumina = (): number => {
      let albumina = hepatico.Albumina || 0;
      if (albumina) {
        if (albumina >= 3.5) {
          return 0;
        } else if (albumina >= 2.8 && albumina <= 3.4) {
          return 1;
        } else if (albumina >= 2.1 && albumina <= 2.7) {
          return 2;
        } else if (albumina <= 2) {
          return 3;
        }
      }
      return 0;
    };

    const calculateIndiceBriones = (): number => {
      let indicebriones = hepatico.IndiceBriones || 0;
      if (indicebriones) {
        if (indicebriones >= 0.21) {
          return 0;
        } else if (indicebriones >= 0.16 && indicebriones <= 0.2) {
          return 1;
        } else if (indicebriones >= 0.12 && indicebriones <= 0.15) {
          return 2;
        } else if (indicebriones <= 0.11) {
          return 3;
        }
      }
      return 0;
    };

    return {
      transaminasas: calculateTransaminasas(),
      ldh: calculateLDH(),
      bilirrubinasTotales: calculateBilirrubinasTotales(),
      presioncoloidosmotica: calculatePresiónColoidosmótica(),
      albumina: calculateAlbumina(),
      indicebriones: calculateIndiceBriones(),
    };
  };

  const handleInputChangeNeurologico = (name: string, value: string) => {
    const numericValue = parseFloat(value) || undefined;

    setNeurologico(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputChangeUterino = (name: string, value: string) => {
    const numericValue = parseFloat(value) || undefined;

    // name = "HemorragiaObstétrica"

    // console.log(name, value);

    setUterino(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputChangeGastroIntestinal = (name: string, value: string) => {
    const numericValue = parseFloat(value) || undefined;

    // console.log(name, value);

    setGastroIntestinal(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCalculateGastroIntestinal = () => {
    const calculateGlucosa = (): number => {
      let glucosa = gastroIntestinal.Glucosa || 0;
      if (glucosa) {
        if (glucosa >= 140 && glucosa <= 179) {
          return 0;
        } else if (
          (glucosa >= 61 && glucosa <= 139) ||
          (glucosa >= 180 && glucosa <= 400)
        ) {
          return 1;
        } else if (glucosa <= 50) {
          return 2;
        } else if (glucosa >= 401) {
          return 3;
        }
      }
      return 0;
    };

    const calculateNA = (): number => {
      let na = gastroIntestinal.NA || 0;
      if (na) {
        if (na >= 131 && na <= 144) {
          return 0;
        } else if ((na >= 145 && na <= 149) || (na >= 126 && na <= 130)) {
          return 1;
        } else if (na <= 125 || na >= 150) {
          return 2;
        }
      }
      return 0;
    };

    const calculateK = (): number => {
      let k = gastroIntestinal.K || 0;
      if (k) {
        if (k >= 3.51 && k <= 4.49) {
          return 0;
        } else if ((k >= 3.1 && k <= 3.5) || (k >= 4.5 && k <= 4.9)) {
          return 1;
        } else if (k >= 3 || k >= 5) {
          return 2;
        }
      }
      return 0;
    };

    return { glucosa: calculateGlucosa(), na: calculateNA(), k: calculateK() };
  };

  function esObjetoVacio(obj: any) {
    return Object.keys(obj).length === 0;
  }

  function encontrarValorMasAlto(objeto: any): number | undefined {
    let valores = Object.values(objeto);

    if (esObjetoVacio(objeto)) {
      return undefined;
    }

    let valorMasAlto = valores[0] as number;

    for (let i = 1; i < valores.length; i++) {
      if ((valores[i] as number) > valorMasAlto) {
        (valorMasAlto as number) = valores[i] as number;
      }
    }

    return valorMasAlto as number;
  }

  const [selectedValue, setSelectedValue] = useState('15');

  const handleCurrentGroup = () => {
    const validateMINMAX = (fieldArray: any, state: any, isError: boolean) => {
      fieldArray.forEach(
        (element: { min: number; max: number; name: string | number }) => {
          // console.log(element);

          if (element.min && element.max && !isError) {
            if (state[element.name]?.toString() === undefined) {
              isError = true;
              Alert.alert('Todos los campos son requeridos');
            }

            if (
              parseFloat(state[element.name]?.toString() as string) <
              element.min ||
              parseFloat(state[element.name]?.toString() as string) >
              element.max
            ) {
              Alert.alert(
                `El valor de ${element.name} debe estar entre ${element.min} y ${element.max}`,
              );
              isError = true;
            }
          }
        },
      );

      return isError;
    };

    let isError = false;

    console.log(currentGroup);

    if (currentGroup === 0) {
      isError = validateMINMAX(fields, cardioData, isError);
    } else if (currentGroup === 1) {
      isError = validateMINMAX(fieldsRenal, renalData, isError);
    } else if (currentGroup === 2) {
      isError = validateMINMAX(fieldsRespiratorio, respiratorio, isError);
    } else if (currentGroup === 3) {
      isError = validateMINMAX(fieldsHematologico, hematologico, isError);
    } else if (currentGroup === 4) {
      isError = validateMINMAX(fieldsHepatico, hepatico, isError);
    } else if (currentGroup === 6) {
      isError = validateMINMAX(fieldsUterino, uterino, isError);
    } else if (currentGroup === 7) {
      isError = validateMINMAX(
        fieldsGastroIntestinal,
        gastroIntestinal,
        isError,
      );
    }

    if (!isError) setCurrentGroup(prev => prev + 1);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => { }} />
        <Text style={{ fontSize: 25 }}>Salir</Text>
      </Appbar.Header>
      {GROUPS_ENUM[currentGroup as keyof typeof GROUPS_ENUM] ===
        'cardiovascular' && (
          <CardioVacularForm
            cardioData={cardioData}
            handleInputChange={handleInputChangeCardio}
            fields={fields}
          />
        )}
      {GROUPS_ENUM[currentGroup as keyof typeof GROUPS_ENUM] === 'renal' && (
        <RenalForm
          fieldsRenal={fieldsRenal}
          handleInputChangeRenal={handleInputChangeRenal}
          renalData={renalData}
        />
      )}
      {GROUPS_ENUM[currentGroup as keyof typeof GROUPS_ENUM] ===
        'respiratorio' && (
          <RespiratorioForm
            fieldsRespiratorio={fieldsRespiratorio}
            handleInputChangeRespiratorio={handleInputChangeRespiratorio}
            respiratorio={respiratorio}
          />
        )}
      {GROUPS_ENUM[currentGroup as keyof typeof GROUPS_ENUM] ===
        'hematologico' && (
          <HematologicoForm
            fieldsHematologico={fieldsHematologico}
            handleInputChangeHematologico={handleInputChangeHematologico}
            hematologico={hematologico}
          />
        )}

      {GROUPS_ENUM[currentGroup as keyof typeof GROUPS_ENUM] === 'hepatico' && (
        <HepaticoForm
          fieldsHepatico={fieldsHepatico}
          handleInputChangeHepatico={handleInputChangeHepatico}
          hepatico={hepatico}
        />
      )}
      {GROUPS_ENUM[currentGroup as keyof typeof GROUPS_ENUM] ===
        'neurologico' && (
          <NeurologicoForm
            GlasgowOptions={GlasgowOptions}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
          />
        )}
      {GROUPS_ENUM[currentGroup as keyof typeof GROUPS_ENUM] === 'uterino' && (
        <UterinoForm
          BloodsOptions={BloodsOptions}
          HemorragiaOptions={HemorragiaOptions}
          fieldsUterino={fieldsUterino}
          uterino={uterino}
          handleInputChangeUterino={handleInputChangeUterino}
        />
      )}
      {GROUPS_ENUM[currentGroup as keyof typeof GROUPS_ENUM] ===
        'gastrointestinal' && (
          <GastroIntestinalForm
            ToleranciaVíaOralOptions={ToleranciaVíaOralOptions}
            fieldsGastroIntestinal={fieldsGastroIntestinal}
            gastroIntestinal={gastroIntestinal}
            handleCalculateGastroIntestinal={handleCalculateGastroIntestinal}
            handleInputChangeGastroIntestinal={handleInputChangeGastroIntestinal}
          />
        )}
      {GROUPS_ENUM[currentGroup as keyof typeof GROUPS_ENUM] ===
        'gastrointestinal' ? (
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            backgroundColor: 'white',
            minHeight: 95,
            justifyContent: 'center',
          }}>
          <Button
            onPress={handleCalculate}
            icon="check"
            mode="contained"
            style={{ width: 200, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#17C2EC' }}>
            <Text style={{ fontSize: 20, color: 'white' }}>Calcular</Text>
          </Button>
        </View>
      ) : (
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            backgroundColor: 'white',
            minHeight: 95,
            justifyContent: 'center',
          }}>
          <Button
            onPress={handleCurrentGroup}
            icon="check"
            mode="contained"
            style={{ width: 200, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#17C2EC' }}>
            <Text style={{ fontSize: 20, color: 'white' }}>Siguiente</Text>
          </Button>
        </View>
      )}
    </>
  );
};

export default MyForm;

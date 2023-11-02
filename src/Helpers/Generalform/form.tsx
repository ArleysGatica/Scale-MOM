import React, { useState, useEffect, useRef } from 'react';
import { IFirstGroup, ISecondGroup, IThreeGroup, IFourGroup, IFiveGroup, InputsGeneral, InputsSelects } from '../../types/types';
import { View, Image, TouchableOpacity, SafeAreaView, StyleSheet, TouchableHighlight, Alert, ActivityIndicator, Pressable, ScrollView } from 'react-native';

import { Appbar, Text, TextInput, Button, } from 'react-native-paper';

import { Picker } from '@react-native-picker/picker';
import useValorMasAlto from '../../hook/useHighestNumber';

interface ICardioVascular {
    TASistolica?: number;
    TADiastolica?: number;
    Tam?: number;
    FC?: number;
    Temperatura?: number;
    PH?: number;
    Lactato?: number;
    Indicedechoque?: number;

    CardiacPressure?: number;
    ValueTASistolica?: number;
    ValueTADiastolica?: number;
    ShockIndex?: number;
}

const fields = [
    { name: 'FC', label: 'FC:' },
    { name: 'TASistolica', label: 'TASistolica:' },
    { name: 'TADiastolica', label: 'TADiastolica:' },
    { name: 'Temperatura', label: 'Temperatura:' },
    { name: 'PH', label: 'PH:' },
    { name: 'Lactato', label: 'Lactato:' },
];

interface IRenal {
    Creatinina?: number;
    AcidoUrico?: number;
    Orina?: number;
    horas?: number;
    Peso?: number;
    Diuresis?: number;
    Proteinuria?: number;
    TasadefiltraciónGlomerular?: number;
    edad?: number;
    DeficitBase?: number;
}

const fieldsRenal = [
    { name: 'Creatinina', label: 'Creatinina:' },
    { name: 'AcidoUrico', label: 'AcidoUrico:' },
    // { name: 'Diuresis', label: 'Diuresis:' },
    { name: 'Proteinuria', label: 'Proteinuria:' },
    { name: 'TasadefiltraciónGlomerular', label: 'TasadefiltraciónGlomerular:' },
    { name: 'DeficitBase', label: 'DeficitBase:' },
    { name: 'Orina', label: 'Orina:' },
    { name: 'horas', label: 'horas:' },
    { name: 'Peso', label: 'Peso:' },
    { name: 'edad', label: 'edad:' },
];

interface IRespiratorio {
    FrecuenciaRespiratoria?: number;
    IndiceKirby?: number;
    Saturación?: number;
}

const fieldsRespiratorio = [
    { name: 'FrecuenciaRespiratoria', label: 'FrecuenciaRespiratoria:' },
    { name: 'IndiceKirby', label: 'IndiceKirby:' },
    { name: 'Saturación', label: 'Saturación:' },
];

interface IHematologico {
    Leucocitos?: number;
    Hemoglobina?: number;
    Plaquetas?: number;
    Fibrinogeno?: number;
    DimeroD?: number;
    IRN?: number;
}

const fieldsHematologico = [
    { name: 'Leucocitos', label: 'Leucocitos:' },
    { name: 'Hemoglobina', label: 'Hemoglobina:' },
    { name: 'Plaquetas', label: 'Plaquetas:' },
    { name: 'Fibrinogeno', label: 'Fibrinogeno:' },
    { name: 'DimeroD', label: 'DimeroD:' },
    // { name: 'IRN', label: 'IRN:' },
];

interface IHepatico {
    Transaminasas?: number;
    LDH?: number;
    BilirrubinasTotales?: number;
    PresiónColoidosmótica?: number;
    Albumina?: number;
    GlobulinaSérica?: number;
    IndiceBriones?: number;
}

const fieldsHepatico = [
    { name: 'Transaminasas', label: 'Transaminasas:' },
    { name: 'LDH', label: 'LDH:' },
    { name: 'BilirrubinasTotales', label: 'BilirrubinasTotales:' },
    { name: 'PresiónColoidosmótica', label: 'PresiónColoidosmótica:' },
    { name: 'Albumina', label: 'Albumina:' },
    { name: 'GlobulinaSérica', label: 'GlobulinaSérica:' },
    // { name: 'IndiceBriones', label: 'IndiceBriones:' },
];

interface INeurologico {
    EscalaGlasgow?: number;
}

const fieldsNeurologico = [
    { name: 'EscalaGlasgow', label: 'EscalaGlasgow:' },
];

interface IUterino {
    HemorragiaObstétrica?: number;
    PerdidaVolumenSangre?: number;
}

const fieldsUterino = [
    { name: 'HemorragiaObstétrica', label: 'HemorragiaObstétrica:' },
    { name: 'PerdidaVolumenSangre', label: 'PerdidaVolumenSangre:' },
];

interface IGastroIntestital {
    ToleranciaVíaOral?: number;
    Glucosa?: number;
    NA?: number;
    K?: number;
}

const fieldsGastroIntestinal = [
    { name: 'ToleranciaVíaOral', label: 'ToleranciaVíaOral:' },
    { name: 'Glucosa', label: 'Glucosa:' },
    { name: 'NA', label: 'NA:' },
    { name: 'K', label: 'K:' },
];

const MyForm = () => {


    const [cardioData, setCardioData] = useState<ICardioVascular>({
        TASistolica: undefined,
        TADiastolica: undefined,
        Tam: undefined,
        FC: undefined,
        Temperatura: undefined,
        PH: undefined,
        Lactato: undefined,
        Indicedechoque: undefined,
        CardiacPressure: 0,
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
        TasadefiltraciónGlomerular: undefined,
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
        Saturación: undefined,
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
        PresiónColoidosmótica: undefined,
        Albumina: undefined,
        GlobulinaSérica: undefined,
        IndiceBriones: undefined,
    });

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
    }

    const BloodsOptions = {
        '≤15% (500-900 mL)': 0,
        '15-29% (1000-1499 mL)': 1,
        '30-40% (1500-1999 mL)': 2,
        '≥40% (≥2000 mL)': 3,
    }

    //septimo grupo
    const [uterino, setUterino] = useState<IUterino>({
        HemorragiaObstétrica: 0,
        PerdidaVolumenSangre: 0,
    });

    const ToleranciaVíaOralOptions = {
        'Tolera': 0,
        'Intolerancia 3-4 días': 1,
        'Intolerancia ≥5 días': 2,
        'Sangrado del tubo digestivo': 3,
    };

    //octavo grupo
    const [gastroIntestinal, setGastroIntestinal] = useState<IGastroIntestital>({
        ToleranciaVíaOral: 0,
        Glucosa: undefined,
        NA: undefined,
        K: undefined,
    });

    const handleInputChange = (name: string, value: string) => {

        setCardioData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleCalculate = () => {

        let cardioDataFCNumber = parseFloat(cardioData.FC?.toString() || '0');
        let cardioDataTASistolicaNumber = parseFloat(cardioData.TASistolica?.toString() || '0');
        let cardioDataTADiastolicaNumber = parseFloat(cardioData.TADiastolica?.toString() || '0');

        const calculateCardiacPressure = (fcValue: number | undefined): number => {
            if (fcValue) {
                if ((fcValue > 99 && fcValue <= 119) || (fcValue >= 51 && fcValue <= 60)) {
                    return 1;
                } else if ((fcValue >= 120 && fcValue <= 139) || (fcValue >= 41 && fcValue <= 50)) {
                    return 2;
                } else if (fcValue >= 140 || fcValue <= 40) {
                    return 3;
                }
            }
            return 0;
        };

        const calculateTASistolicaValue = (TASistolica: number | undefined): number => {
            if (TASistolica) {
                if (TASistolica >= 101 && TASistolica <= 139) {
                    return 0;
                } else if ((TASistolica >= 140 && TASistolica <= 179) || (TASistolica >= 91 && TASistolica <= 100)) {
                    return 1;
                } else if ((TASistolica > 140 && TASistolica <= 90) || TASistolica === 81 || TASistolica >= 81) {
                    return 2;
                } else if (TASistolica <= 80) {
                    return 3;
                }
            }
            return 0;
        };

        const calculateTADiastolicaValue = (TADiastolica: number | undefined): number => {
            if (TADiastolica) {
                if (TADiastolica >= 61 && TADiastolica <= 89) {
                    return 0;
                } else if ((TADiastolica >= 90 && TADiastolica <= 109) || (TADiastolica >= 51 && TADiastolica <= 60)) {
                    return 1;
                } else if ((TADiastolica > 110 && TADiastolica <= 50) || TADiastolica === 41 || TADiastolica >= 41) {
                    return 2;
                } else if (TADiastolica <= 40) {
                    return 3;
                }
            }
            return 0;
        };

        const cardiacPressure = calculateCardiacPressure(cardioDataFCNumber);
        const tasistolicaValue = calculateTASistolicaValue(cardioDataTASistolicaNumber);
        const tadiastolicaValue = calculateTADiastolicaValue(cardioDataTADiastolicaNumber);

        setCardioData(prevData => ({
            ...prevData,
            CardiacPressure: cardiacPressure,
            ValueTASistolica: tasistolicaValue,
            ValueTADiastolica: tadiastolicaValue,
        }));

        if (cardioDataTASistolicaNumber && cardioDataTADiastolicaNumber) {
            const tam = ((cardioDataTADiastolicaNumber * 2 + cardioDataTASistolicaNumber) / 3).toFixed(2);
            const indicedechoque = (cardioDataFCNumber || 0) / (cardioDataTASistolicaNumber || 1);

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

        if (handleCalculateRenal().creatinina === false || handleCalculateRespiratorio().ik === false) {
            return;
            
        }

        let resultadoRenal = encontrarValorMasAlto(handleCalculateRenal());
        let resultRespiratorio = encontrarValorMasAlto(handleCalculateRespiratorio()) || 0;
        let resultH = encontrarValorMasAlto(handleCalculateHematologico()) || 0;
        let resultHepatico = encontrarValorMasAlto(handleCalculateHepatico()) || 0;
        let resultG = encontrarValorMasAlto(handleCalculateGastroIntestinal()) || 0;

        let ResultSuma = (resultadoRenal as number) + resultRespiratorio + resultH + resultHepatico + resultG;

        const handleCalculateResult = () => {
            if (ResultSuma >= 0 && ResultSuma <= 3) {

                return `MML ${ResultSuma} BAJO RIESGO`
            } else if (ResultSuma >= 4 && ResultSuma <= 7) {
                return `MMM ${ResultSuma} RIESGO Intermedio`
            } else if (ResultSuma >= 8 && ResultSuma <= 11) {
                return `MMS ${ResultSuma} RIESGO ALTO`
            } else if (ResultSuma >= 12 && ResultSuma <= 24) {
                return `MME ${ResultSuma} RIESGO MUY ALTO`
            }

        }

        let R = handleCalculateResult();
        
        console.log(R);
        

    };

    const handleInputChangeRenal = (name: string, value: string) => {

        setRenalData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleCalculateRenal = () => {

        const calculateCreatinina = (): number | boolean => {
            let creatinina = parseFloat(renalData.Creatinina?.toString() || '0');

            if (creatinina <= 0.4) {
                Alert.alert('El valor de la creatinina debe ser mayor a 0.4');
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
        }

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
        }

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
        }

        const calculateTasadefiltraciónGlomerular = (): number | boolean => {
            let tasadefiltraciónGlomerular = renalData.TasadefiltraciónGlomerular || 0;
            if (renalData.Creatinina && renalData.edad) {
                const f = 0.7;
                const TFG = 142 * Math.pow(Number(renalData.Creatinina) / f, -0.241) * Math.pow(Number(renalData.Creatinina) / f, -1.200) * Math.pow(0.9938, renalData.edad) * 1.012;
                const roundedTFG = TFG.toFixed(2);
                setRenalData({
                    ...renalData,
                    TasadefiltraciónGlomerular: parseFloat(roundedTFG),
                });
            }

            if (tasadefiltraciónGlomerular) {
                if (tasadefiltraciónGlomerular >= 61 && tasadefiltraciónGlomerular <= 110) {
                    return 0;
                } else if (tasadefiltraciónGlomerular >= 31 && tasadefiltraciónGlomerular <= 60) {
                    return 1;
                } else if (tasadefiltraciónGlomerular >= 16 && tasadefiltraciónGlomerular <= 30) {
                    return 2;
                } else if (tasadefiltraciónGlomerular <= 15) {
                    return 3;
                }
            }
            return 0;
        }

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
        }

        return { creatinina: calculateCreatinina(), acidourico: calculateAcidoUrico(), diuresis: calculateDiuresis(), proteinuria: calculateProteinuria(), tfg: calculateTasadefiltraciónGlomerular(), deficitbase: calculateDeficitBase() }

    }

    const handleInputChangeRespiratorio = (name: string, value: string) => {
    

        setRespiratorio(prevData => ({
            ...prevData,
            [name]: value,
        }));
    }

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
                Alert.alert('El valor del indice kirby debe ser mayor a 300');
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
                    return 3
                }
            }
            return 0;
        }

        const calculateSaturacion = (): number => {
            let StValue = respiratorio.Saturación || 0;
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
        }

        return { fr: calculateFrecuenciaRespiratoria(), ik: calculateIndiceKirby(), st: calculateSaturacion() }
    }

    const handleInputChangeHematologico = (name: string, value: string) => {
        const numericValue = parseFloat(value) || undefined;

        setHematologico(prevData => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleCalculateHematologico = () => {

        const calculateLeucocitos = (): number => {
            let leucocitos = hematologico.Leucocitos || 0;

            if (leucocitos) {
                if (leucocitos >= 4100 && leucocitos <= 16900) {
                    return 0;
                } else if ((leucocitos >= 17000 && leucocitos <= 20900) || (leucocitos >= 2100 && leucocitos <= 4000)) {
                    return 1;
                } else if ((leucocitos >= 21000 && leucocitos <= 29900) || (leucocitos >= 1100 && leucocitos <= 2000)) {
                    return 2;
                } else if ((leucocitos >= 1000 && leucocitos <= 30000)) {
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
        }

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
        }

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
                } else if ((ValueIRN >= 2 && fibrinogeno <= 100) || (ValueDimeroD >= 3000)) {
                    return 3;
                }
            }
            return 0;
        }

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
                } else if ((ValueIRN >= 2 && ValueFibrinogeno <= 100) || (dimeroD >= 3000)) {
                    return 3;
                }
            }
            return 0;
        }

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
                } else if ((irn >= 2 && (ValueFibrinogeno <= 100)) || (ValueDimeroD >= 3000)) {
                    return 3;
                }
            }
            return 0;
        }

        return { leucocitos: calculateLeucocitos(), hemoglobina: calculateHemoglobina(), plaquetas: calculatePlaquetas(), fibrinogeno: calculateFibrinogeno(), dimerod: calculateDimeroD(), irn: calculateIRN() }
    }

    const handleInputChangeHepatico = (name: string, value: string) => {
        const numericValue = parseFloat(value) || undefined;

        setHepatico(prevData => ({
            ...prevData,
            [name]: value,
        }));
    }

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
        }

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
        }

        const calculatePresiónColoidosmótica = (): number => {
            if (hepatico.Albumina && hepatico.GlobulinaSérica && cardioData.Tam) {
                const presióncoloidosmótica = (hepatico.Albumina * 5.54 + hepatico.GlobulinaSérica * 1.43).toFixed(2);
                const indicebriones = (Number(presióncoloidosmótica) / cardioData.Tam).toFixed(2);
                setHepatico(prevData => ({
                    ...prevData,
                    PresiónColoidosmótica: parseFloat(presióncoloidosmótica),
                    Indicebriones: parseFloat(indicebriones),
                }));
            }

            let presiónColoidosmótica = hepatico.PresiónColoidosmótica || 0;

            if (presiónColoidosmótica) {
                if (presiónColoidosmótica >= 3.1) {
                    return 0;
                } else if (presiónColoidosmótica >= 2.6 && presiónColoidosmótica <= 3) {
                    return 1;
                } else if (presiónColoidosmótica >= 2.1 && presiónColoidosmótica <= 2.5) {
                    return 2;
                } else if (presiónColoidosmótica <= 2) {
                    return 3;
                }
            }
            return 0;
        }

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
        }

        const calculateIndiceBriones = (): number => {
            let indicebriones = hepatico.IndiceBriones || 0;
            if (indicebriones) {
                if (indicebriones >= 0.21) {
                    return 0;
                } else if (indicebriones >= 0.16 && indicebriones <= 0.20) {
                    return 1;
                } else if (indicebriones >= 0.12 && indicebriones <= 0.15) {
                    return 2;
                } else if (indicebriones <= 0.11) {
                    return 3;
                }
            }
            return 0;
        }

        return { transaminasas: calculateTransaminasas(), ldh: calculateLDH(), bilirrubinasTotales: calculateBilirrubinasTotales(), presioncoloidosmotica: calculatePresiónColoidosmótica(), albumina: calculateAlbumina(), indicebriones: calculateIndiceBriones() }
    }

    const handleInputChangeNeurologico = (name: string, value: string) => {
        const numericValue = parseFloat(value) || undefined;

        setNeurologico(prevData => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleInputChangeUterino = (name: string, value: string,) => {
        const numericValue = parseFloat(value) || undefined;
        setUterino(prevData => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleInputChangeGastroIntestinal = (name: string, value: string) => {
        const numericValue = parseFloat(value) || undefined;
        setGastroIntestinal(prevData => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleCalculateGastroIntestinal = () => {

        const calculateGlucosa = (): number => {
            let glucosa = gastroIntestinal.Glucosa || 0;
            if (glucosa) {
                if (glucosa >= 140 && glucosa <= 179) {
                    return 0;
                } else if ((glucosa >= 61 && glucosa <= 139) || (glucosa >= 180 && glucosa <= 400)) {
                    return 1;
                } else if (glucosa <= 50) {
                    return 2;
                } else if (glucosa >= 401) {
                    return 3;
                }
            }
            return 0;
        }

        const calculateNA = (): number => {
            let na = gastroIntestinal.NA || 0;
            if (na) {
                if (na >= 131 && na <= 144) {
                    return 0;
                } else if ((na >= 145 && na <= 149) || (na >= 126 && na <= 130)) {
                    return 1;
                } else if ((na <= 125) || (na >= 150)) {
                    return 2;
                }
            }
            return 0;
        }

        const calculateK = (): number => {
            let k = gastroIntestinal.K || 0;
            if (k) {
                if (k >= 3.51 && k <= 4.49) {
                    return 0;
                } else if ((k >= 3.1 && k <= 3.5) || (k >= 4.5 && k <= 4.9)) {
                    return 1;
                } else if ((k >= 3) || (k >= 5)) {
                    return 2;
                }
            }
            return 0;
        }

        return { glucosa: calculateGlucosa(), na: calculateNA(), k: calculateK() }
    }

    function esObjetoVacio(obj: any) {
        return Object.keys(obj).length === 0;
    }

    function encontrarValorMasAlto(objeto: any): number | undefined {
        let valores = Object.values(objeto);

        if (esObjetoVacio(objeto)) {
            return undefined;
        }

        let valorMasAlto = (valores[0] as number);

        for (let i = 1; i < valores.length; i++) {
            if ((valores[i] as number) > valorMasAlto) {
                (valorMasAlto as number) = (valores[i] as number);
            }
        }

        return valorMasAlto as number;
    }

    const [selectedValue, setSelectedValue] = useState('15');



    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => { }} />
                <Text style={{ fontSize: 25 }}>
                    Salir
                </Text>
            </Appbar.Header>
            <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
                <View style={styles.inner}>
                    <Text style={styles.header}>General</Text>
                    <Text style={styles.header}>CardioVascular</Text>
                </View>
                {
                    fields.map((field, index) => {
                        return (
                            <View key={field.name} style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: '100%',
                                height: 80,
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                gap: 10,
                                columnGap: 10,
                                rowGap: 10,

                            }}
                            >
                                <Text
                                    style={{ width: 75, textAlign: 'center', fontSize: 15, }}
                                >{field.name}</Text>
                                <TextInput
                                    style={{
                                        width: 200, height: 50,
                                        marginBottom: 10,
                                        backgroundColor: 'rgb(255, 255, 255)',
                                        borderColor: 'rgba(0, 0, 0, 0.29)',
                                        borderRadius: 4,
                                        borderWidth: 1,
                                        color: 'black',
                                    }}
                                    keyboardType='numeric'
                                    onChangeText={(text) => handleInputChange(field.name, text)}
                                    value={cardioData[field.name as keyof ICardioVascular]?.toString() || ''}
                                />

                            </View>
                        )
                    })}
                <View style={styles.inner}>
                    <Text style={styles.header}>Renal</Text>
                </View>
                {
                    fieldsRenal.map((field, index) => {
                        return (
                            <View key={field.name} style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: '100%',
                                height: 80,
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                gap: 10,
                                columnGap: 10,
                                rowGap: 10,

                            }}
                            >
                                <Text
                                    style={{ width: 75, textAlign: 'center', fontSize: 15, }}
                                >{field.name}</Text>
                                <TextInput
                                    style={{
                                        width: 200, height: 50,
                                        marginBottom: 10,
                                        backgroundColor: 'rgb(255, 255, 255)',
                                        borderColor: 'rgba(0, 0, 0, 0.29)',
                                        borderRadius: 4,
                                        borderWidth: 1,
                                        color: 'black',
                                    }}
                                    keyboardType='numeric'
                                    onChangeText={(text) => handleInputChangeRenal(field.name, text)}
                                    value={renalData[field.name as keyof IRenal]?.toString() || ''}
                                />

                            </View>
                        )
                    })
                }
                <View style={styles.inner}>
                    <Text style={styles.header}>Respiratorio</Text>
                </View>
                {
                    fieldsRespiratorio.map((field, index) => {
                        return (
                            <View key={field.name} style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: '100%',
                                height: 80,
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                gap: 10,
                                columnGap: 10,
                                rowGap: 10,

                            }}
                            >
                                <Text
                                    style={{ width: 66, textAlign: 'center', fontSize: 15, }}
                                >{field.name}
                                </Text>
                                <TextInput
                                    style={{
                                        width: 200, height: 50,
                                        marginBottom: 10,
                                        backgroundColor: 'rgb(255, 255, 255)',
                                        borderColor: 'rgba(0, 0, 0, 0.29)',
                                        borderRadius: 4,
                                        borderWidth: 1,
                                        color: 'black',
                                    }}
                                    keyboardType='numeric'
                                    onChangeText={(text) => handleInputChangeRespiratorio(field.name, text)}
                                    value={respiratorio[field.name as keyof IRespiratorio]?.toString() || ''}
                                />

                            </View>
                        )
                    })
                }
                <View style={styles.inner}>
                    <Text style={styles.header}>Hemotologico</Text>
                </View>
                {
                    fieldsHematologico.map((field, index) => {
                        return (
                            <View key={field.name} style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: '100%',
                                height: 80,
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                gap: 10,
                                columnGap: 10,
                                rowGap: 10,

                            }}
                            >
                                <Text
                                    style={{ width: 66, textAlign: 'center', fontSize: 15, }}
                                >{field.name}
                                </Text>
                                <TextInput
                                    style={{
                                        width: 200, height: 50,
                                        marginBottom: 10,
                                        backgroundColor: 'rgb(255, 255, 255)',
                                        borderColor: 'rgba(0, 0, 0, 0.29)',
                                        borderRadius: 4,
                                        borderWidth: 1,
                                        color: 'black',
                                    }}
                                    keyboardType='numeric'
                                    onChangeText={(text) => handleInputChangeHematologico(field.name, text)}
                                    value={hematologico[field.name as keyof IHematologico]?.toString() || ''}
                                />

                            </View>
                        )
                    })
                }
                <View style={styles.inner}>
                    <Text style={styles.header}>Hepatico</Text>
                </View>
                {
                    fieldsHepatico.map((field, index) => {
                        return (
                            <View key={field.name} style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: '100%',
                                height: 80,
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                gap: 10,
                                columnGap: 10,
                                rowGap: 10,

                            }}
                            >
                                <Text
                                    style={{ width: 66, textAlign: 'center', fontSize: 15, }}
                                >{field.name}
                                </Text>
                                <TextInput
                                    style={{
                                        width: 200, height: 50,
                                        marginBottom: 10,
                                        backgroundColor: 'rgb(255, 255, 255)',
                                        borderColor: 'rgba(0, 0, 0, 0.29)',
                                        borderRadius: 4,
                                        borderWidth: 1,
                                        color: 'black',
                                    }}
                                    keyboardType='numeric'
                                    onChangeText={(text) => handleInputChangeHepatico(field.name, text)}
                                    value={hepatico[field.name as keyof IHepatico]?.toString() || ''}
                                />
                            </View>
                        )
                    })
                }
                <View style={styles.inner}>
                    <Text style={styles.header}>Neurologico fieldsUterino</Text>
                </View>
                <View style={styles.containerDrop}>
                    <Text style={styles.label}> Escala de Glasgow</Text>
                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedValue(itemValue)
                        }
                        style={styles.picker}
                    >
                        {Object.keys(GlasgowOptions).map((key) => (
                            <Picker.Item
                                key={key}
                                label={key}
                                value={key}
                            />
                        ))}
                    </Picker>
                </View>

                <View style={styles.inner}>
                    <Text style={styles.header}>Uterino</Text>
                </View>
                <View style={styles.containerDrop}>
                    <Text style={styles.label}>Hemorragia</Text>
                    <Picker
                        selectedValue={fieldsUterino}
                        onValueChange={(itemValue, itemIndex) =>
                            handleInputChangeUterino(itemIndex as any, itemValue as any)
                        }
                        style={styles.picker}
                    >
                        {Object.keys(HemorragiaOptions).map((key) => (
                            <Picker.Item
                                key={key}
                                label={key}
                                value={key}
                            />
                        ))}
                    </Picker>
                </View>
                <View style={styles.containerDrop}>
                    <Text style={styles.label}>Sangre</Text>
                    <Picker
                        selectedValue={fieldsUterino}
                        onValueChange={(itemValue, itemIndex) =>
                            handleInputChangeUterino(itemIndex as any, itemValue as any)
                        }
                        style={styles.picker}
                    >
                        {Object.keys(BloodsOptions).map((key) => (
                            <Picker.Item
                                key={key}
                                label={key}
                                value={key}
                            />
                        ))}
                    </Picker>
                </View>

                <View>
                    <View style={styles.inner}>
                        <Text style={styles.header}>GastroIntestinal</Text>
                    </View>
                    {
                        Object.entries(gastroIntestinal).map(([key, value]) => {
                            return (
                                <View key={key} style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    width: '100%',
                                    height: 80,
                                    justifyContent: 'center',
                                    flexWrap: 'wrap',
                                    gap: 10,
                                    columnGap: 10,
                                    rowGap: 10,
                                }}
                                >
                                    {key === 'ToleranciaVíaOral' ? (
                                        <Picker
                                            selectedValue={gastroIntestinal.ToleranciaVíaOral}
                                            onValueChange={(itemValue, itemIndex) =>
                                                handleCalculateGastroIntestinal()}
                                            style={styles.picker}
                                        >
                                            {Object.keys(ToleranciaVíaOralOptions).map((key) => (
                                                <Picker.Item
                                                    key={key}
                                                    label={key}
                                                    value={key}
                                                />
                                            ))}
                                        </Picker>

                                    ) : (
                                        <>
                                            <Text
                                                style={{ width: 66, textAlign: 'center', fontSize: 15, }}
                                            >{key}
                                            </Text>
                                            <TextInput
                                                style={{
                                                    width: 200, height: 50,
                                                    marginBottom: 10,
                                                    backgroundColor: 'rgb(255, 255, 255)',
                                                    borderColor: 'rgba(0, 0, 0, 0.29)',
                                                    borderRadius: 4,
                                                    borderWidth: 1,
                                                    color: 'black',
                                                }}
                                                keyboardType='numeric'
                                                onChangeText={(text) => handleInputChangeGastroIntestinal(key, text)}
                                                value={value?.toString() || ''}
                                            />
                                        </>

                                    )

                                    }


                                </View>
                            )



                        })
                    }
                    {/* <Text style={styles.selectedText}>Valor seleccionado: {selectedValue}</Text>  fieldsHepatico
                    <Text style={styles.selectedText}>Clasificación: {selectedValue} - Valor: {GlasgowOptions[selectedValue as keyof typeof GlasgowOptions]}</Text> */}

                </View>

                <TouchableOpacity style={styles.button} onPress={handleCalculate}>
                    <Text>Calcular</Text>
                </TouchableOpacity>

                {/* <View style={{ width: '100%', alignItems: 'center', top: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 20 }}>Cardiovascular</Text>
                    <Text style={{ fontSize: 20 }}>Renal</Text> fieldsRespiratorio
               fieldsGastroIntestinal
                <View style={styles.resultContainer}>
                    <Text>Tam: {cardioData.Tam?.toString() || ''}</Text>
                    <Text>Indicedechoque: {cardioData.Indicedechoque?.toString() || ''}</Text>
                </View>
                </View> */}

            </ScrollView>
        </>
    )
}

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
        flexGrow: 1,
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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


export default MyForm;


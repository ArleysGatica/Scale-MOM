import React, { useState, useEffect, useRef } from 'react';
import { IFirstGroup, ISecondGroup, IThreeGroup, IFourGroup, IFiveGroup, InputsGeneral, InputsSelects } from '../../types/types';
import { View, Image, TouchableOpacity, SafeAreaView, StyleSheet, TouchableHighlight, Alert, ActivityIndicator, Pressable, ScrollView } from 'react-native';

import { Appbar, Text, TextInput, Button, } from 'react-native-paper';

import { Picker } from '@react-native-picker/picker';

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
    { name: 'Diuresis', label: 'Diuresis:' },
    { name: 'Proteinuria', label: 'Proteinuria:' },
    { name: 'TasadefiltraciónGlomerular', label: 'TasadefiltraciónGlomerular:' },
    { name: 'DeficitBase', label: 'DeficitBase:' },
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
    { name: 'IRN', label: 'IRN:' },
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
    { name: 'IndiceBriones', label: 'IndiceBriones:' },
];

interface INeurologico {
    EscalaGlasgow: { [key: string]: number };
}

const fieldsNeurologico = [
    { name: 'EscalaGlasgow', label: 'EscalaGlasgow:' },
];

interface IUterino {
    HemorragiaObstétrica?: { [key: string]: number }
    PerdidaVolumenSangre?: { [key: string]: number }
}

const fieldsUterino = [
    { name: 'HemorragiaObstétrica', label: 'HemorragiaObstétrica:' },
    { name: 'PerdidaVolumenSangre', label: 'PerdidaVolumenSangre:' },
];

interface IGastroIntestital {
    ToleranciaVíaOral?: { [key: string]: number };
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
        EscalaGlasgow: GlasgowOptions,
    });

    const [selectedValueINeurologico, setSelectedValueINeurologico] = useState<number | null>(null);

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
        HemorragiaObstétrica: HemorragiaOptions,
        PerdidaVolumenSangre: BloodsOptions,
    });

    const [selectedValueHemorragia, setSelectedValueHemorragia] = useState<number | null>(null);
    const [selectedValueBloods, setSelectedValueBloods] = useState<number | null>(null);

    const ToleranciaVíaOralOptions = {
        'Tolera': 0,
        'Intolerancia 3-4 días': 1,
        'Intolerancia ≥5 días': 2,
        'Sangrado del tubo digestivo': 3,
    };

    //octavo grupo
    const [gastroIntestinal, setGastroIntestinal] = useState<IGastroIntestital>({
        ToleranciaVíaOral: ToleranciaVíaOralOptions,
        Glucosa: undefined,
        NA: undefined,
        K: undefined,
    });

    const [selectedViaOral, setSelectedValueViaOral] = useState<number | null>(null);

    const handleInputChange = (name: string, value: string) => {
        const numericValue = parseFloat(value) || undefined;

        setCardioData(prevData => ({
            ...prevData,
            [name]: numericValue,
        }));
    };

    const handleCalculate = () => {
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

        const cardiacPressure = calculateCardiacPressure(cardioData.FC);
        const tasistolicaValue = calculateTASistolicaValue(cardioData.TASistolica);
        const tadiastolicaValue = calculateTADiastolicaValue(cardioData.TADiastolica);

        setCardioData(prevData => ({
            ...prevData,
            CardiacPressure: cardiacPressure,
            ValueTASistolica: tasistolicaValue,
            ValueTADiastolica: tadiastolicaValue,
        }));

        if (cardioData.TASistolica && cardioData.TADiastolica) {
            const tam = ((cardioData.TADiastolica * 2 + cardioData.TASistolica) / 3).toFixed(2);
            const indicedechoque = (cardioData.FC || 0) / (cardioData.TASistolica || 1);

            setCardioData(prevData => ({
                ...prevData,
                Tam: parseFloat(tam),
                Indicedechoque: parseFloat(indicedechoque.toFixed(2)),
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
    };

    const handleInputChangeRenal = (name: string, value: string) => {

        const numericValue = parseFloat(value) || undefined;

        setRenalData(prevData => ({
            ...prevData,
            [name]: numericValue,
        }));
    }

    const handleCalculateRenal = () => {

        const calculateCreatinina = (fcValue: number | undefined): number => {
            if (fcValue) {
                if (fcValue >= 0.4 && fcValue <= 0.89) {
                    return 0;
                } else if (fcValue >= 0.9 && fcValue <= 1.35) {
                    return 1;
                } else if (fcValue >= 1.36 || fcValue <= 2.7) {
                    return 2;
                } else if (fcValue >= 2.8) {
                    return 3;
                }
            }
            return 0;
        };

        const calculateAcidoUrico = (fcValue: number | undefined): number => {

            if (fcValue) {
                if (fcValue <= 5.9) {
                    return 0;
                } else if (fcValue >= 6 && fcValue <= 7.9) {
                    return 1;
                } else if (fcValue >= 8 && fcValue <= 8.9) {
                    return 2;
                } else if (fcValue >= 9) {
                    return 3;
                }
            }
            return 0;
        }

        const calculateDiuresis = (fcValue: number | undefined): number => {

            if (renalData.Orina && renalData.horas && renalData.Peso) {
                const diuresis = (renalData.Orina / renalData.horas / renalData.Peso).toFixed(2);
                setRenalData({
                    ...renalData,
                    Diuresis: parseFloat(diuresis),
                });
            }

            if (fcValue) {
                if (fcValue >= 0.51) {
                    return 0;
                } else if (fcValue >= 0.31 && fcValue <= 0.5) {
                    return 1;
                } else if (fcValue <= 0.3) {
                    return 2;
                }
            }
            return 0;
        }

        const calculateProteinuria = (fcValue: number | undefined): number => {
            if (fcValue) {
                if (fcValue <= 299) {
                    return 0;
                } else if (fcValue >= 300 && fcValue <= 499) {
                    return 1;
                } else if (fcValue >= 500 && fcValue <= 3499) {
                    return 2;
                } else if (fcValue >= 3500) {
                    return 3;
                }
            }
            return 0;
        }

        const calculateTasadefiltraciónGlomerular = (fcValue: number | undefined): number => {

            if (renalData.Creatinina && renalData.edad) {
                const f = 0.7;
                const TFG = 142 * Math.pow(Number(renalData.Creatinina) / f, -0.241) * Math.pow(Number(renalData.Creatinina) / f, -1.200) * Math.pow(0.9938, renalData.edad) * 1.012;
                const roundedTFG = TFG.toFixed(2);
                setRenalData({
                    ...renalData,
                    TasadefiltraciónGlomerular: parseFloat(roundedTFG),
                });
            }

            if (fcValue) {
                if (fcValue >= 61 && fcValue <= 110) {
                    return 0;
                } else if (fcValue >= 31 && fcValue <= 60) {
                    return 1;
                } else if (fcValue >= 16 && fcValue <= 30) {
                    return 2;
                } else if (fcValue <= 15) {
                    return 3;
                }
            }
            return 0;
        }

        const calculateDeficitBase = (fcValue: number | undefined): number => {
            if (fcValue) {
                if (fcValue <= 1.9) {
                    return 0;
                } else if (fcValue >= 2 && fcValue <= 5.9) {
                    return 1;
                } else if (fcValue >= 6 && fcValue <= 9.9) {
                    return 2;
                } else if (fcValue <= 10) {
                    return 3;
                }
            }
            return 0;
        }

    }

    const handleInputChangeRespiratorio = (name: string, value: string) => {
        const numericValue = parseFloat(value) || undefined;

        setRespiratorio(prevData => ({
            ...prevData,
            [name]: numericValue,
        }));
    }

    const handleCalculateRespiratorio = () => {

        const calculateFrecuenciaRespiratoria = (fcValue: number | undefined): number => {
            if (fcValue) {
                if (fcValue >= 16 && fcValue <= 23) {
                    return 0;
                } else if (fcValue >= 24 && fcValue <= 29) {
                    return 1;
                } else if (fcValue >= 30 && fcValue <= 39) {
                    return 2;
                } else if (fcValue >= 40 || fcValue <= 6) {
                    return 3;
                }
            }
            return 0;
        };

        const calculateIndiceKirby = (fcValue: number | undefined): number => {
            if (fcValue) {
                if (fcValue >= 401) {
                    return 0;
                } else if (fcValue >= 351 && fcValue <= 400) {
                    return 1;
                } else if (fcValue >= 301 && fcValue <= 350) {
                    return 2;
                } else if (fcValue >= 300) {
                    return 3
                }
            }
            return 0;
        }

        const calculateSaturacion = (fcValue: number | undefined): number => {
            if (fcValue) {
                if (fcValue >= 94.1) {
                    return 0;
                } else if (fcValue >= 90.1 && fcValue <= 94) {
                    return 1;
                } else if (fcValue >= 85.1 && fcValue <= 90) {
                    return 2;
                } else if (fcValue <= 85) {
                    return 3;
                }
            }
            return 0;
        }
    }

    const handleInputChangeHematologico = (name: string, value: string) => {
        const numericValue = parseFloat(value) || undefined;

        setHematologico(prevData => ({
            ...prevData,
            [name]: numericValue,
        }));
    }

    const handleCalculateHematologico = () => {

        const calculateLeucocitos = (fcValue: number | undefined): number => {
            if (fcValue) {
                if (fcValue >= 4100 && fcValue <= 16900) {
                    return 0;
                } else if ((fcValue >= 17000 && fcValue <= 20900) || (fcValue >= 2100 && fcValue <= 4000)) {
                    return 1;
                } else if ((fcValue >= 21000 && fcValue <= 29900) || (fcValue >= 1100 && fcValue <= 2000)) {
                    return 2;
                } else if ((fcValue >= 1000 && fcValue <= 30000)) {
                    return 3;
                }
            }
            return 0;
        };

        const calculateHemoglobina = (fcValue: number | undefined): number => {
            if (fcValue) {
                if (fcValue >= 10.1) {
                    return 0;
                } else if (fcValue >= 8.1 && fcValue <= 10) {
                    return 1;
                } else if (fcValue >= 6.1 && fcValue <= 8) {
                    return 2;
                } else if (fcValue <= 6) {
                    return 3;
                }
            }
            return 0;
        }

        const calculatePlaquetas = (fcValue: number | undefined): number => {
            if (fcValue) {
                if (fcValue >= 150000) {
                    return 0;
                } else if (fcValue >= 100100 && fcValue <= 149000) {
                    return 1;
                } else if (fcValue >= 50100 && fcValue <= 1000000) {
                    return 2;
                } else if (fcValue <= 50000) {
                    return 3;
                }
            }
            return 0;
        }

        const calculateFibrinogeno = (fcValue: number | undefined): number => {
            const ValueDimeroD = hematologico.DimeroD || 0;
            const ValueIRN = hematologico.IRN || 0;
            if (fcValue) {
                if (fcValue >= 301) {
                    return 0;
                } else if (fcValue >= 201 && fcValue <= 300) {
                    return 1;
                } else if (fcValue >= 101 && fcValue <= 200) {
                    return 2;
                } else if ((ValueIRN >= 2 && fcValue <= 100) || (ValueDimeroD >= 3000)) {
                    return 3;
                }
            }
            return 0;
        }

        const calculateDimeroD = (fcValue: number | undefined): number => {
            const ValueFibrinogeno = hematologico.Fibrinogeno || 0;
            const ValueIRN = hematologico.IRN || 0;
            if (fcValue) {
                if (fcValue <= 999) {
                    return 0;
                } else if (fcValue >= 1000 && fcValue <= 1999) {
                    return 1;
                } else if (fcValue >= 2000 && fcValue <= 2999) {
                    return 2;
                } else if ((ValueIRN >= 2 && ValueFibrinogeno <= 100) || (fcValue >= 3000)) {
                    return 3;
                }
            }
            return 0;
        }

        const calculateIRN = (fcValue: number | undefined): number => {
            const ValueDimeroD = hematologico.DimeroD || 0;
            const ValueFibrinogeno = hematologico.Fibrinogeno || 0;
            if (fcValue !== undefined) {
                if (fcValue >= 2) {
                    return 0;
                } else if (fcValue >= 1.5 && fcValue <= 1.99) {
                    return 1;
                } else if (fcValue >= 1.21 && fcValue <= 1.49) {
                    return 2;
                } else if ((fcValue >= 2 && (ValueFibrinogeno <= 100)) || (ValueDimeroD >= 3000)) {
                    return 3;
                }
            }
            return 0;
        }
    }

    const handleInputChangeHepatico = (name: string, value: string) => {
        const numericValue = parseFloat(value) || undefined;

        setHepatico(prevData => ({
            ...prevData,
            [name]: numericValue,
        }));
    }

    const handleCalculateHepatico = () => {

        const calculateTransaminasas = (fcValue: number | undefined): number => {
            if (fcValue) {
                if (fcValue >= 2 && fcValue <= 39) {
                    return 0;
                } else if (fcValue >= 40 && fcValue <= 69) {
                    return 1;
                } else if (fcValue >= 70 && fcValue <= 149) {
                    return 2;
                } else if (fcValue >= 150) {
                    return 3;
                }
            }
            return 0;
        };

        const calculateLDH = (fcValue: number | undefined): number => {
            if (fcValue) {
                if (fcValue <= 399) {
                    return 0;
                } else if (fcValue >= 400 && fcValue <= 599) {
                    return 1;
                } else if (fcValue >= 600 && fcValue <= 899) {
                    return 2;
                } else if (fcValue >= 900) {
                    return 3;
                }
            }
            return 0;
        }

        const calculateBilirrubinasTotales = (fcValue: number | undefined): number => {
            if (fcValue) {
                if (fcValue >= 0.09 && fcValue <= 1.16) {
                    return 0;
                } else if (fcValue >= 1.17 && fcValue <= 1.86) {
                    return 1;
                } else if (fcValue >= 1.87 && fcValue <= 3.4) {
                    return 2;
                } else if (fcValue >= 3.5) {
                    return 3;
                }
            }
            return 0;
        }

        const calculatePresiónColoidosmótica = (fcValue: number | undefined): number => {
            if (hepatico.Albumina && hepatico.GlobulinaSérica && cardioData.Tam) {
                const presióncoloidosmótica = (hepatico.Albumina * 5.54 + hepatico.GlobulinaSérica * 1.43).toFixed(2);
                const indicebriones = (Number(presióncoloidosmótica) / cardioData.Tam).toFixed(2);
                setHepatico(prevData => ({
                    ...prevData,
                    PresiónColoidosmótica: parseFloat(presióncoloidosmótica),
                    Indicebriones: parseFloat(indicebriones),
                }));
            }

            if (fcValue) {
                if (fcValue >= 3.1) {
                    return 0;
                } else if (fcValue >= 2.6 && fcValue <= 3) {
                    return 1;
                } else if (fcValue >= 2.1 && fcValue <= 2.5) {
                    return 2;
                } else if (fcValue <= 2) {
                    return 3;
                }
            }
            return 0;
        }

        const calculateAlbumina = (fcValue: number | undefined): number => {
            if (fcValue) {
                if (fcValue >= 3.5) {
                    return 0;
                } else if (fcValue >= 2.8 && fcValue <= 3.4) {
                    return 1;
                } else if (fcValue >= 2.1 && fcValue <= 2.7) {
                    return 2;
                } else if (fcValue <= 2) {
                    return 3;
                }
            }
            return 0;
        }

        const calculateIndiceBriones = (fcValue: number | undefined): number => {
            if (fcValue) {
                if (fcValue >= 0.21) {
                    return 0;
                } else if (fcValue >= 0.16 && fcValue <= 0.20) {
                    return 1;
                } else if (fcValue >= 0.12 && fcValue <= 0.15) {
                    return 2;
                } else if (fcValue <= 0.11) {
                    return 3;
                }
            }
            return 0;
        }
    }

    const handleInputChangeNeurologico = (name: string, value: string, selectedValue: number) => {
        const numericValue = parseFloat(value) || undefined;
        setSelectedValueINeurologico(selectedValue)

        setNeurologico(prevData => ({
            ...prevData,
            [name]: numericValue,
        }));
    }

    const handleInputChangeUterino = (name: string, value: string, selectedValue: number) => {
        const numericValue = parseFloat(value) || undefined;
        setSelectedValueHemorragia(selectedValue);
        setSelectedValueBloods(selectedValue);
        setUterino(prevData => ({
            ...prevData,
            [name]: numericValue,
        }));
    }

    const handleInputChangeGastroIntestinal = (name: string, value: string, selectedValue: number) => {
        const numericValue = parseFloat(value) || undefined;
        setSelectedValueViaOral(selectedValue);
        setGastroIntestinal(prevData => ({
            ...prevData,
            [name]: numericValue,
        }));
    }

    const handleCalculateGastroIntestinal = () => {

        const calculateGlucosa = (fcValue: number | undefined): number => {
            if (fcValue) {
                if (fcValue >= 140 && fcValue <= 179) {
                    return 0;
                } else if ((fcValue >= 61 && fcValue <= 139) || (fcValue >= 180 && fcValue <= 400)) {
                    return 1;
                } else if (fcValue <= 50) {
                    return 2;
                } else if (fcValue >= 401) {
                    return 3;
                }
            }
            return 0;
        }

        const calculateNA = (fcValue: number | undefined): number => {
            if (fcValue) {
                if (fcValue >= 131 && fcValue <= 144) {
                    return 0;
                } else if ((fcValue >= 145 && fcValue <= 149) || (fcValue >= 126 && fcValue <= 130)) {
                    return 1;
                } else if ((fcValue <= 125) || (fcValue >= 150)) {
                    return 2;
                }
            }
            return 0;
        }

        const calculateK = (fcValue: number | undefined): number => {
            if (fcValue) {
                if (fcValue >= 3.51 && fcValue <= 4.49) {
                    return 0;
                } else if ((fcValue >= 3.1 && fcValue <= 3.5) || (fcValue >= 4.5 && fcValue <= 4.9)) {
                    return 1;
                } else if ((fcValue >= 3) || (fcValue >= 5)) {
                    return 2;
                }
            }
            return 0;
        }
    }

    const [categoryGeneral, setCategoryGeneral] = useState({
        CardioVascular: {
            PH: cardioData.PH, TASistolica: cardioData.TASistolica, TADiastolica: cardioData.ValueTADiastolica, Temperatura: cardioData.Temperatura, Lactato: cardioData.Lactato, Indicedechoque: cardioData.ShockIndex,
        },
        Renal: {
            AcidoUrico: renalData.AcidoUrico, Proteinuria: renalData.Proteinuria, Creatinina: renalData.Creatinina, DeficitBase: renalData.DeficitBase, Diuresis: renalData.Diuresis, TasadefiltraciónGlomerular: renalData.TasadefiltraciónGlomerular,
        },
        Respiratorio: {
            FrecuenciaRespiratoria: respiratorio.FrecuenciaRespiratoria, IndiceKirby: respiratorio.IndiceKirby, Saturación: respiratorio.Saturación,
        },
        Hematologico: {
            Leucocitos: hematologico.Leucocitos, Hemoglobina: hematologico.Hemoglobina, Plaquetas: hematologico.Plaquetas, DimeroD: hematologico.DimeroD, Fibrinogeno: hematologico.Fibrinogeno, IRN: hematologico.IRN,
        },

        Hepaticos: {
            Transaminasas: hepatico.Transaminasas, LDH: hepatico.LDH, BilirrubinasTotales: hepatico.BilirrubinasTotales, PresiónColoidosmótica: hepatico.PresiónColoidosmótica, Albumina: hepatico.Albumina, GlobulinaSérica: hepatico.GlobulinaSérica, IndiceBriones: hepatico.IndiceBriones,
        },
        Neurologico: {
            EscalaGlasgow: neurologico.EscalaGlasgow
        },

        Uterino: {
            HemorragiaObstétrica: uterino.HemorragiaObstétrica, PerdidaVolumenSangre: uterino.PerdidaVolumenSangre
        },

        GastroIntestital: {
            ToleranciaVíaOral: gastroIntestinal.ToleranciaVíaOral, Glucosa: gastroIntestinal.Glucosa, NA: gastroIntestinal.NA, K: gastroIntestinal.K,
        },
    });

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

    const miArray = {
        PH: 10,
        TASistolica: 20,
        TADiastolica: 30,
        Temperatura: 40,
        Lactato: 50,
        Indicedechoque: 60,
    };

    const resultado = encontrarValorMasAlto(categoryGeneral.CardioVascular);
    // const resultado2 = encontrarValorMasAlto(categoryGeneral.Renal);
    // const resultado3 = encontrarValorMasAlto(categoryGeneral.Respiratorio);
    // const resultado4 = encontrarValorMasAlto(categoryGeneral.Hematologico);
    // const resultado5 = encontrarValorMasAlto(categoryGeneral.Hepaticos);
    // const resultado6 = encontrarValorMasAlto(categoryGeneral.Neurologico);
    // const resultado7 = encontrarValorMasAlto(categoryGeneral.Uterino);
    // const resultado8 = encontrarValorMasAlto(categoryGeneral.GastroIntestital);
    console.log(resultado);

    useEffect(() => {

        setCategoryGeneral({
            CardioVascular: {
                PH: cardioData.PH, TASistolica: cardioData.TASistolica, TADiastolica: cardioData.ValueTADiastolica, Temperatura: cardioData.Temperatura, Lactato: cardioData.Lactato, Indicedechoque: cardioData.ShockIndex,
            },
            Renal: {
                AcidoUrico: renalData.AcidoUrico, Proteinuria: renalData.Proteinuria, Creatinina: renalData.Creatinina, DeficitBase: renalData.DeficitBase, Diuresis: renalData.Diuresis, TasadefiltraciónGlomerular: renalData.TasadefiltraciónGlomerular,
            },
            Respiratorio: {
                FrecuenciaRespiratoria: respiratorio.FrecuenciaRespiratoria, IndiceKirby: respiratorio.IndiceKirby, Saturación: respiratorio.Saturación,
            },
            Hematologico: {
                Leucocitos: hematologico.Leucocitos, Hemoglobina: hematologico.Hemoglobina, Plaquetas: hematologico.Plaquetas, DimeroD: hematologico.DimeroD, Fibrinogeno: hematologico.Fibrinogeno, IRN: hematologico.IRN,
            },

            Hepaticos: {
                Transaminasas: hepatico.Transaminasas, LDH: hepatico.LDH, BilirrubinasTotales: hepatico.BilirrubinasTotales, PresiónColoidosmótica: hepatico.PresiónColoidosmótica, Albumina: hepatico.Albumina, GlobulinaSérica: hepatico.GlobulinaSérica, IndiceBriones: hepatico.IndiceBriones,
            },
            Neurologico: {
                EscalaGlasgow: neurologico.EscalaGlasgow
            },

            Uterino: {
                HemorragiaObstétrica: uterino.HemorragiaObstétrica, PerdidaVolumenSangre: uterino.PerdidaVolumenSangre
            },

            GastroIntestital: {
                ToleranciaVíaOral: gastroIntestinal.ToleranciaVíaOral, Glucosa: gastroIntestinal.Glucosa, NA: gastroIntestinal.NA, K: gastroIntestinal.K,
            },

        });

    }, [cardioData.PH,
    cardioData.TASistolica,
    cardioData.ValueTADiastolica,
    cardioData.Temperatura,
    cardioData.Lactato,
    cardioData.ShockIndex,
    renalData.AcidoUrico,
    renalData.Proteinuria,
    renalData.Creatinina,
    renalData.DeficitBase,
    renalData.Diuresis,
    renalData.TasadefiltraciónGlomerular,
    respiratorio.FrecuenciaRespiratoria,
    respiratorio.IndiceKirby,
    respiratorio.Saturación,
    hematologico.Leucocitos,
    hematologico.Hemoglobina,
    hematologico.Plaquetas,
    hematologico.DimeroD,
    hematologico.Fibrinogeno,
    hematologico.IRN,
    hepatico.Transaminasas,
    hepatico.LDH,
    hepatico.BilirrubinasTotales,
    hepatico.PresiónColoidosmótica,
    hepatico.Albumina,
    hepatico.GlobulinaSérica,
    hepatico.IndiceBriones,
    neurologico.EscalaGlasgow,
    uterino.HemorragiaObstétrica,
    uterino.PerdidaVolumenSangre,
    gastroIntestinal.ToleranciaVíaOral,
    gastroIntestinal.Glucosa,
    gastroIntestinal.NA,
    gastroIntestinal.K,
    ])

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
                                            selectedValue={ToleranciaVíaOralOptions}
                                            onValueChange={(itemValue, itemIndex) =>
                                                handleInputChangeGastroIntestinal(key, itemValue.toString(), selectedValue as any)
                                            }
                                        >
                                            {/*@ts-ignore   */}
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
                                                onChangeText={(text) => handleInputChangeGastroIntestinal(key, text, selectedValue as any)}
                                                value={value?.toString() || ''}
                                            />
                                        </>

                                    )

                                    }


                                </View>
                            )



                        })
                    }
                    {/* <Text style={styles.selectedText}>Valor seleccionado: {selectedValue}</Text>
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


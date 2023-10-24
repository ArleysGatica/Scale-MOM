import React, { useState, useEffect } from 'react';
import { IFirstGroup, ISecondGroup, IThreeGroup, IFourGroup, IFiveGroup, InputsGeneral, InputsSelects } from '../../types/types';
import { Text, View, TextInput, Image, Button, TouchableOpacity, SafeAreaView, StyleSheet, TouchableHighlight, Alert, ActivityIndicator, Pressable } from 'react-native';

import FormularyPart from '../../UI/Page/Formulary';

const defaultValues: InputsGeneral = {
    Temperatura: 0,
    PH: 0,
    Lactato: 0,
    AcidoUrico: 0,
    Proteinuria: 0,
    DeficitBase: 0,
    FrecuenciaRespiratoria: 0,
    IndiceKirby: 0,
    Saturación: 0,
    Leucocitos: 0,
    Hemoglobina: 0,
    Plaquetas: 0,
    Fibrinogeno: 0,
    DimeroD: 0,
    "Transaminasas (AST / ALT)": 0,
    LDH: 0,
    BilirrubinasTotales: 0,
    Glucosa: 0,
    "NA+": 0,
    "K+": 0,
};

const MyForm = () => {

    // const [CardiacPressure, setCardiacPressure] = useState<number | any>({ name: 'presion cardiaca', value: 0, category: 'CardioVascular' });
    //firtsGroup
    const [formData, setFormData] = useState<IFirstGroup>({});
    const [CardiacPressure, setCardiacPressure] = useState<number | undefined>(0);
    const [ValueTASistolica, setValueTASistolica] = useState<number | undefined>(0);
    const [ValueTADiastolica, setValueTADiastolica] = useState<number | undefined>(0);
    const [ShockIndex, setShockIndex] = useState<number | undefined>(0);

    //secondGroup
    const [formDataSecondGroup, setFormDataSecondGroup] = useState<ISecondGroup>({});
    const [albumina, setAlbumina] = useState<number | undefined>(0.0);
    const [presiónColoidosmótica, setPresiónColoidosmótica] = useState<number | undefined>(0);
    const [IndiceBriones, setIndiceBriones] = useState<number | undefined>(0);

    const [formDataGeneral, setFormDataGeneral] = useState<InputsGeneral>(defaultValues);
    const [ValueAcidoUrico, setValueAcidoUrico] = useState<number | undefined>(0);//acido urico
    const [ValueTemperatura, setValueTemperatura] = useState<number | undefined>(0);//temperatura
    const [ValuePH, setValuePH] = useState<number | undefined>(0);//ph
    const [ValueLactato, setValueLactato] = useState<number | undefined>(0);//lactato
    const [ValueProteinuria, setValueProteinuria] = useState<number | undefined>(0);//proteinuria
    const [ValueDeficitBase, setValueDeficitBase] = useState<number | undefined>(0);//deficit base
    const [ValueFrecuenciaRespiratoria, setValueFrecuenciaRespiratoria] = useState<number | undefined>(0);
    const [ValueIndiceKirby, setValueIndiceKirby] = useState<number | undefined>(0);//indice kirby
    const [ValueSaturación, setValueSaturación] = useState<number | undefined>(0);//saturación
    const [ValueLeucocitos, setValueLeucocitos] = useState<number | undefined>(0);//leucocitos
    const [ValueHemoglobina, setValueHemoglobina] = useState<number | undefined>(0);//hemoglobina
    const [ValuePlaquetas, setValuePlaquetas] = useState<number | undefined>(0);//plaquetas
    const [ValueFibrinogeno, setValueFibrinogeno] = useState<number | undefined>(0);//fibrinogeno
    const [ValueDimeroD, setValueDimeroD] = useState<number | undefined>(0);//dimero d
    const [ValueTransaminasas, setValueTransaminasas] = useState<number | undefined>(0);//transaminasas
    const [ValueLDH, setValueLDH] = useState<number | undefined>(0);//LDH
    const [ValueBilirrubinasTotales, setValueBilirrubinasTotales] = useState<number | undefined>(0);//bilirrubinas totales
    const [ValueGlucosa, setValueGlucosa] = useState<number | undefined>(0);//glucosa
    const [ValueNA, setValueNA] = useState<number | undefined>(0);//NA
    const [ValueK, setValueK] = useState<number | undefined>(0);//K

    //firt group

    const fields: { name: keyof IFirstGroup; stateKey: string; readOnly: boolean }[] = [
        { name: 'FC', stateKey: 'cardiacPressure', readOnly: false },
        { name: 'TASistolica', stateKey: 'valueTASistolica', readOnly: false },
        { name: 'TADiastolica', stateKey: 'valueTADiastolica', readOnly: false },
        { name: 'Tam', stateKey: 'tam', readOnly: true },
        { name: 'Indicedechoque', stateKey: 'indicedechoque', readOnly: true },
    ];

    useEffect(() => {
        calculateResults();
    }, [formData.FC, formData.TASistolica, formData.TADiastolica, formData.Indicedechoque]);

    const handleInputChange = (name: keyof IFirstGroup, value: any) => {
        const numericValue = parseFloat(value) || undefined;

        setFormData({
            ...formData,
            [name]: numericValue,
        });

        const field = fields.find((field) => field.name === name);

        if (!field) {

            if (name === 'FC') {
                const fcValue = numericValue || 0;
                if (fcValue > 99 && fcValue <= 119) {
                    setCardiacPressure(1);
                } else if (fcValue >= 120 && fcValue <= 139) {
                    setCardiacPressure(2);
                } else if (fcValue >= 140 || fcValue <= 40) {
                    setCardiacPressure(3);
                } else {
                    setCardiacPressure(0);
                }
            }

            if (name === 'TASistolica') {
                const TASistolica = numericValue || 0;
                if (TASistolica >= 101 && TASistolica <= 139) {
                    setValueTASistolica(0);
                } else if ((TASistolica >= 140 && TASistolica <= 179) || (TASistolica >= 91 && TASistolica <= 100)) {
                    setValueTASistolica(1);
                } else if ((TASistolica > 140 && TASistolica <= 90) || TASistolica === 81 || TASistolica >= 81) {
                    setValueTASistolica(2);
                } else if (TASistolica <= 80) {
                    setValueTASistolica(3);
                }
            }

            if (name === 'TADiastolica') {
                const TADiastolica = numericValue || 0;
                if (TADiastolica >= 61 && TADiastolica <= 89) {
                    setValueTADiastolica(0);
                } else if ((TADiastolica >= 90 && TADiastolica <= 109) || (TADiastolica >= 51 && TADiastolica <= 60)) {
                    setValueTADiastolica(1);
                } else if ((TADiastolica > 110 && TADiastolica <= 50) || TADiastolica === 41 || TADiastolica >= 41) {
                    setValueTADiastolica(2);
                } else if (TADiastolica <= 40) {
                    setValueTADiastolica(3);
                }
            }

        }
    };

    const calculateResults = () => {
        if (formData.TASistolica && formData.TADiastolica) {
            const tam = ((formData.TADiastolica * 2 + formData.TASistolica) / 3).toFixed(2);
            const indicedechoque = (formData.FC || 0) / formData.TASistolica;
            setFormData({
                ...formData,
                Tam: parseFloat(tam),
                Indicedechoque: parseFloat(indicedechoque.toFixed(2)),
            });
        }

        const shockIndex = formData.Indicedechoque || 0;
        if (shockIndex >= 0.7 && shockIndex <= 0.89) {
            setShockIndex(0);
        } else if (shockIndex >= 0.9 && shockIndex <= 0.99) {
            setShockIndex(1);
        } else if (shockIndex > 1 && shockIndex <= 1.69) {
            setShockIndex(2);
        } else if (shockIndex >= 1.7) {
            setShockIndex(3);
        }
    };

    //segundo grupo

    const fieldsSecondGroup: { name: keyof ISecondGroup; stateKey: string; readOnly: boolean }[] = [
        { name: 'Albumina', stateKey: 'albumina', readOnly: false },
        { name: 'GlobulinaSérica', stateKey: 'globulinaSérica', readOnly: false },
        { name: 'PresiónColoidosmótica', stateKey: 'presiónColoidosmótica', readOnly: true },
        { name: 'Indicebriones', stateKey: 'indicebriones', readOnly: true },
    ];

    const handleInputChangeSecondGroup = (name: keyof ISecondGroup, value: any) => {
        const numericValue = parseFloat(value) || undefined;

        setFormDataSecondGroup({
            ...formDataSecondGroup,
            [name]: numericValue,
        });

        const fieldSecund = fieldsSecondGroup.find((field) => field.name === name);

        if (!fieldSecund) {

            if (name === 'Albumina') {
                const ALBUMINA = numericValue || 0;
                if (ALBUMINA >= 3.1) {
                    setAlbumina(0);
                } else if (ALBUMINA >= 2.6 && ALBUMINA <= 3) {
                    setAlbumina(1);
                } else if (ALBUMINA >= 2.1 && ALBUMINA <= 2.5) {
                    setAlbumina(2);
                } else if (ALBUMINA <= 2) {
                    setAlbumina(3);
                }
            }
        }
    }

    const calculateResultsSecondGroup = () => {
        if (formDataSecondGroup.Albumina && formDataSecondGroup.GlobulinaSérica && formData.Tam) {
            const presióncoloidosmótica = (formDataSecondGroup.Albumina * 5.54 + formDataSecondGroup.GlobulinaSérica * 1.43).toFixed(2);
            const indicebriones = (Number(presióncoloidosmótica) / formData.Tam).toFixed(2);
            setFormDataSecondGroup({
                ...formDataSecondGroup,
                PresiónColoidosmótica: parseFloat(presióncoloidosmótica),
                Indicebriones: parseFloat(indicebriones),
            });

        }

        const PRESIONCOLOISOMOTICA = formDataSecondGroup.PresiónColoidosmótica || 0;
        if (PRESIONCOLOISOMOTICA >= 21) {
            setPresiónColoidosmótica(0);
        } else if (PRESIONCOLOISOMOTICA >= 19 && PRESIONCOLOISOMOTICA <= 20) {
            setPresiónColoidosmótica(1);
        } else if (PRESIONCOLOISOMOTICA >= 16 && PRESIONCOLOISOMOTICA <= 18) {
            setPresiónColoidosmótica(2);
        } else if (PRESIONCOLOISOMOTICA <= 15) {
            setPresiónColoidosmótica(3);
        }

        const INDICEBRIONES = formDataSecondGroup.Indicebriones || 0;
        if (INDICEBRIONES >= 0.21) {
            setIndiceBriones(0);
        } else if (INDICEBRIONES >= 0.16 && INDICEBRIONES <= 0.20) {
            setIndiceBriones(1);
        } else if (INDICEBRIONES >= 0.12 && INDICEBRIONES <= 0.15) {
            setIndiceBriones(2);
        } else if (INDICEBRIONES <= 0.11) {
            setIndiceBriones(3);
        }

    };

    useEffect(() => {
        calculateResultsSecondGroup();
    }, [formDataSecondGroup.Albumina, formDataSecondGroup.GlobulinaSérica, formData.Tam, formDataSecondGroup.Indicebriones, formDataSecondGroup.PresiónColoidosmótica]);

    //threeGroup

    //threeGroup
    const [formDataThreeGroup, setFormDataThreeGroup] = useState<IThreeGroup>({});
    const [creatinina, setCreatinina] = useState<number | undefined>(0);

    const fieldsThreeGroup: { name: keyof IThreeGroup; stateKey: string; readOnly: boolean }[] = [
        { name: 'Creatinina', stateKey: 'creatinina', readOnly: false },
        { name: 'Edad', stateKey: 'edad', readOnly: false },
        { name: 'TasadefiltraciónGlomerular', stateKey: 'tasadefiltraciónGlomerular', readOnly: true },
    ];

    const handleInputChangeThreeGroup = (name: keyof IThreeGroup, value: string) => {
        const numericValue = parseFloat(value) || undefined;

        setFormDataThreeGroup({
            ...formDataThreeGroup,
            [name]: numericValue,
        });

        const fieldThree = fieldsThreeGroup.find((field) => field.name === name);

        if (!fieldThree) {
            if (name === 'Creatinina') {
                const creatininaValue = numericValue || 0;
                if (creatininaValue >= 0.4 && creatininaValue <= 0.89) {
                    setCreatinina(0);

                } else if (creatininaValue >= 0.9 && creatininaValue <= 1.35) {
                    setCreatinina(1);

                } else if (creatininaValue >= 1.36 && creatininaValue <= 2.7) {
                    setCreatinina(2);
                } else if (creatininaValue >= 2.8) {
                    setCreatinina(3);
                }
            }

        };
    }

    const calculateResultsThreeGroup = () => {
        if (formDataThreeGroup.Creatinina && formDataThreeGroup.Edad) {
            const f = 0.7;
            const TFG = 142 * Math.pow(Number(formDataThreeGroup.Creatinina) / f, -0.241) * Math.pow(Number(formDataThreeGroup.Creatinina) / f, -1.200) * Math.pow(0.9938, formDataThreeGroup.Edad) * 1.012;
            const roundedTFG = TFG.toFixed(2);
            setFormDataThreeGroup({
                ...formDataThreeGroup,
                TasadefiltraciónGlomerular: parseFloat(roundedTFG),
            });
        }
    };

    useEffect(() => {
        calculateResultsThreeGroup();
    }, [formDataThreeGroup.Creatinina, formDataThreeGroup.Edad]);


    const [formDataFourGroup, setFormDataFourGroup] = useState<IFourGroup>({});
    const [diuresisValue, setDiuresisValue] = useState<number | undefined>(0);

    const calculateDiuresis = () => {

        if (formDataFourGroup.Orina && formDataFourGroup.hors && formDataFourGroup.Peso) {
            const diuresis = (formDataFourGroup.Orina / formDataFourGroup.hors / formDataFourGroup.Peso).toFixed(2);
            setFormDataFourGroup({
                ...formDataFourGroup,
                Diuresis: parseFloat(diuresis),
            });
        }
        const diuresis = formDataFourGroup.Diuresis || 0;
        const hors = formDataFourGroup.hors || 0;

        if (diuresis >= 0.51) {
            setDiuresisValue(0);
        } else if (diuresis >= 0.31 && diuresis <= 0.5) {
            setDiuresisValue(1);
        } else if (diuresis <= 0.3) {
            if (hors <= 12) {
                setDiuresisValue(2);
            } else {
                setDiuresisValue(3);
            }
        }
    };

    useEffect(() => {
        calculateDiuresis();
    }, [formDataFourGroup.Orina, formDataFourGroup.hors, formDataFourGroup.Peso]);


    const handleInputChangeFourGroup = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const numericValue = parseFloat(value) || undefined;

        setFormDataFourGroup({
            ...formDataFourGroup,
            [name]: numericValue,
        });

    };

    //fiveGroup
    const [formDataFiveGroup, setFormDataFiveGroup] = useState<IFiveGroup>({});
    const [ValueIRN, setValueIRN] = useState<number | undefined>(0);

    const handleInputChangeFiveGroup = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const numericValue = parseFloat(value) || undefined;

        setFormDataFiveGroup({
            ...formDataFiveGroup,
            [name]: numericValue,
        });
    };


    const calculateResultsFiveGroup = () => {
        if (formDataFiveGroup.TPN) {
            const TPP = 22;
            const resultINR = Math.pow(TPP / formDataFiveGroup.TPN, 1.2).toFixed(2);
            setFormDataFiveGroup({
                ...formDataFiveGroup,
                IRN: parseFloat(resultINR),
            });
        }

        const DIMEROD = ValueDimeroD;
        const FIBRINOGENO = ValueFibrinogeno;

        const IRN = formDataFiveGroup.IRN || 0;
        if (IRN >= 2) {
            setValueIRN(3);
            console.log('extremo', ValueIRN);

        } else if (IRN >= 1.5 && IRN <= 1.99) {
            setValueIRN(2);
            console.log(ValueIRN, 'severo');

        } else if (IRN >= 1.21 && IRN <= 1.49) {
            setValueIRN(1);
            console.log(ValueIRN, 'moderado');


        } else if ((IRN >= 2 && (FIBRINOGENO !== undefined && FIBRINOGENO <= 100)) || (DIMEROD !== undefined && DIMEROD >= 3000)) {
            setValueIRN(0);
            console.log(ValueIRN, 'leve');

        }
    }

    useEffect(() => {
        calculateResultsFiveGroup();
    }, [formDataFiveGroup.TPN]);


    const handleInputChangeGeneral = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const numericValue = parseFloat(value) || undefined;
        setFormDataGeneral({
            ...formDataGeneral,
            [name]: numericValue,
        });
    };

    useEffect(() => {
        if (formDataGeneral.AcidoUrico !== undefined) {
            const AcidoUricoValue = formDataGeneral.AcidoUrico;
            if (AcidoUricoValue <= 5.9) {
                setValueAcidoUrico(0);
            } else if (AcidoUricoValue >= 6 && AcidoUricoValue <= 7.9) {
                setValueAcidoUrico(1);
            } else if (AcidoUricoValue >= 8 && AcidoUricoValue <= 8.9) {
                setValueAcidoUrico(2);
            } else if (AcidoUricoValue >= 9) {
                setValueAcidoUrico(3);
            }
        }

        if (formDataGeneral.Temperatura !== undefined) {
            const TemperaturaValue = formDataGeneral.Temperatura;
            if (TemperaturaValue >= 36.1 && TemperaturaValue <= 37.9) {
                setValueTemperatura(0);
                console.log('leve', ValueTemperatura);
            }
            else if ((TemperaturaValue >= 38 && TemperaturaValue <= 38.9) || (TemperaturaValue >= 35.6 && TemperaturaValue <= 36)) {
                setValueTemperatura(1);
                console.log('moderado', ValueTemperatura);
            }
            else if ((TemperaturaValue >= 39 && TemperaturaValue <= 39.9) || (TemperaturaValue >= 35.1 && TemperaturaValue <= 35.5)) {
                setValueTemperatura(2);
                console.log('severo', ValueTemperatura);
            }
            else if (TemperaturaValue >= 40 || TemperaturaValue <= 35) {
                setValueTemperatura(3);
            }
        }

        if (formDataGeneral.PH !== undefined) {
            const PHValue = formDataGeneral.PH;

            if (PHValue >= 7.39 && PHValue <= 7.44) {
                setValuePH(0);
            } else if ((PHValue >= 7.45 && PHValue <= 7.49) || (PHValue >= 7.31 && PHValue <= 7.38)) {
                setValuePH(1);
            } else if ((PHValue >= 7.50 && PHValue <= 7.54) || (PHValue >= 7.21 && PHValue <= 7.30)) {
                setValuePH(2);
            } else if (PHValue >= 7.20 && PHValue <= 7.55) {
                setValuePH(3);
            }
        }

        if (formDataGeneral.Lactato !== undefined) {
            const LactatoValue = formDataGeneral.Lactato;
            if (LactatoValue <= 1.79) {
                setValueLactato(0);
            } else if (LactatoValue >= 1.8 && LactatoValue <= 1.99) {
                setValueLactato(1);
            } else if (LactatoValue >= 2 && LactatoValue <= 3.9) {
                setValueLactato(2);
            } else if (LactatoValue >= 4) {
                setValueLactato(3);
            }
        }

        if (formDataGeneral.Proteinuria !== undefined) {
            const ProteinuriaValue = formDataGeneral.Proteinuria;
            if (ProteinuriaValue <= 299) {
                setValueProteinuria(0);

            } else if (ProteinuriaValue >= 300 && ProteinuriaValue <= 499) {
                setValueProteinuria(1);

            } else if (ProteinuriaValue >= 500 && ProteinuriaValue <= 3499) {
                setValueProteinuria(2);

            } else if (ProteinuriaValue >= 3500) {
                setValueProteinuria(3);
            }
        }

        if (formDataGeneral.DeficitBase !== undefined) {
            const DeficitBaseValue = formDataGeneral.DeficitBase;
            if (DeficitBaseValue <= 1.9) {
                setValueDeficitBase(0);
            } else if ((DeficitBaseValue >= 2 && DeficitBaseValue <= 5.9)) {
                setValueDeficitBase(1);
            } else if ((DeficitBaseValue >= 6 && DeficitBaseValue <= 9.9)) {
                setValueDeficitBase(2);
            } else if (DeficitBaseValue >= 10) {
                setValueDeficitBase(3);
            }
        }

        if (formDataGeneral.FrecuenciaRespiratoria !== undefined) {
            const FrecuenciaRespiratoriaValue = formDataGeneral.FrecuenciaRespiratoria;
            if (FrecuenciaRespiratoriaValue >= 16 && FrecuenciaRespiratoriaValue <= 23) {
                setValueFrecuenciaRespiratoria(0);
            } else if ((FrecuenciaRespiratoriaValue >= 24 && FrecuenciaRespiratoriaValue <= 29) || (FrecuenciaRespiratoriaValue >= 11 && FrecuenciaRespiratoriaValue <= 15)) {
                setValueFrecuenciaRespiratoria(1);
            } else if ((FrecuenciaRespiratoriaValue >= 30 && FrecuenciaRespiratoriaValue <= 39) || (FrecuenciaRespiratoriaValue >= 7 && FrecuenciaRespiratoriaValue <= 10)) {
                setValueFrecuenciaRespiratoria(2);
            } else if (FrecuenciaRespiratoriaValue >= 40 || FrecuenciaRespiratoriaValue <= 6) {
                setValueFrecuenciaRespiratoria(3);
            }
        }

        if (formDataGeneral.IndiceKirby !== undefined) {
            const IndiceKirbyValue = formDataGeneral.IndiceKirby;
            if (IndiceKirbyValue >= 401) {
                setValueIndiceKirby(0);
            } else if (IndiceKirbyValue >= 351 && IndiceKirbyValue <= 400) {
                setValueIndiceKirby(1);
            } else if (IndiceKirbyValue >= 301 && IndiceKirbyValue <= 350) {
                setValueIndiceKirby(2);
            } else if (IndiceKirbyValue >= 300) {
                setValueIndiceKirby(3);
            }
        }

        if (formDataGeneral.Saturación !== undefined) {
            const SaturaciónValue = formDataGeneral.Saturación;
            if (SaturaciónValue >= 94.1) {
                setValueSaturación(0);
            } else if (SaturaciónValue >= 90.1 && SaturaciónValue <= 94) {
                setValueSaturación(1);
            } else if (SaturaciónValue >= 85.1 && SaturaciónValue <= 90) {
                setValueSaturación(2);
            } else if (SaturaciónValue <= 85) {
                setValueSaturación(3);
            }
        }

        if (formDataGeneral.Leucocitos !== undefined) {
            const LeucocitosValue = formDataGeneral.Leucocitos;
            if (LeucocitosValue >= 4100 && LeucocitosValue <= 16900) {
                setValueLeucocitos(0);
            } else if ((LeucocitosValue >= 17000 && LeucocitosValue <= 20900) || (LeucocitosValue >= 2100 && LeucocitosValue <= 4000)) {
                setValueLeucocitos(1);
            } else if ((LeucocitosValue >= 21000 && LeucocitosValue <= 29900) || (LeucocitosValue >= 1100 && LeucocitosValue <= 2000)) {
                setValueLeucocitos(2);
            } else if ((LeucocitosValue >= 1000 && LeucocitosValue <= 30000)) {
                setValueLeucocitos(3);
            }
        }

        if (formDataGeneral.Hemoglobina !== undefined) {
            const HemoglobinaValue = formDataGeneral.Hemoglobina;
            if (HemoglobinaValue >= 10.1) {
                setValueHemoglobina(0);
            } else if (HemoglobinaValue >= 8.1 && HemoglobinaValue <= 10) {
                setValueHemoglobina(1);
            } else if (HemoglobinaValue >= 6.1 && HemoglobinaValue <= 8) {
                setValueHemoglobina(2);
            } else if (HemoglobinaValue <= 6) {
                setValueHemoglobina(3);
            }
        }

        if (formDataGeneral.Plaquetas !== undefined) {
            const PlaquetasValue = formDataGeneral.Plaquetas;

            if (PlaquetasValue >= 150000) {
                setValuePlaquetas(0);
            } else if (PlaquetasValue >= 100100 && PlaquetasValue <= 149000) {
                setValuePlaquetas(1);
            } else if (PlaquetasValue >= 50100 && PlaquetasValue <= 1000000) {
                setValuePlaquetas(2);
            } else if (PlaquetasValue <= 50000) {
                setValuePlaquetas(3);
            }
        }

        if (formDataGeneral.DimeroD !== undefined) {

            const INRVALUE = ValueIRN;
            const FIBRINOGENO = ValueFibrinogeno;
            const DimeroDValue = formDataGeneral.DimeroD;
            if (DimeroDValue <= 999) {
                setValueDimeroD(0);
            } else if (DimeroDValue >= 1000 && DimeroDValue <= 1999) {
                setValueDimeroD(1);
            } else if (DimeroDValue >= 2000 && DimeroDValue <= 2999) {
                setValueDimeroD(2);
            } else if ((INRVALUE !== undefined && INRVALUE >= 2 && (FIBRINOGENO !== undefined && FIBRINOGENO <= 100)) || (DimeroDValue >= 3000)) {
                setValueDimeroD(3);
            }
        }

        if (formDataGeneral.Fibrinogeno !== undefined) {
            const INRVALUE = ValueIRN;
            const DIMEROD = ValueDimeroD;

            const FibrinogenoValue = formDataGeneral.Fibrinogeno;
            if (FibrinogenoValue >= 301) {
                setValueFibrinogeno(0);
                console.log('leve', ValueFibrinogeno);

            } else if (FibrinogenoValue >= 201 && FibrinogenoValue <= 300) {
                setValueFibrinogeno(1);
                console.log('moderado', ValueFibrinogeno);

            } else if (FibrinogenoValue >= 101 && FibrinogenoValue <= 200) {
                setValueFibrinogeno(2);
                console.log('severo', ValueFibrinogeno);

            } else if ((INRVALUE !== undefined && INRVALUE >= 2 && FibrinogenoValue <= 100) || (DIMEROD !== undefined && DIMEROD >= 3000)) {
                setValueFibrinogeno(3);
                console.log('extremo', ValueFibrinogeno);

            }
        }

        if (formDataGeneral['Transaminasas (AST / ALT)'] !== undefined) {
            const TransaminasasValue = formDataGeneral['Transaminasas (AST / ALT)'];

            if (TransaminasasValue >= 2 && TransaminasasValue <= 39) {
                setValueTransaminasas(0);
            } else if (TransaminasasValue >= 40 && TransaminasasValue <= 69) {
                setValueTransaminasas(1);
            } else if (TransaminasasValue >= 70 && TransaminasasValue <= 149) {
                setValueTransaminasas(2);
            } else if (TransaminasasValue >= 150) {
                setValueTransaminasas(3);
            }
        }

        if (formDataGeneral.LDH !== undefined) {
            const LDHValue = formDataGeneral.LDH;
            if (LDHValue <= 399) {
                setValueLDH(0);
            } else if (LDHValue >= 400 && LDHValue <= 599) {
                setValueLDH(1);
            } else if (LDHValue >= 600 && LDHValue <= 899) {
                setValueLDH(2);
            } else if (LDHValue >= 900) {
                setValueLDH(3);
            }
        }

        if (formDataGeneral.BilirrubinasTotales !== undefined) {
            const BilirrubinasTotalesValue = formDataGeneral.BilirrubinasTotales || 0;
            if (BilirrubinasTotalesValue >= 0.09 && BilirrubinasTotalesValue <= 1.16) {
                setValueBilirrubinasTotales(0);
            } else if (BilirrubinasTotalesValue >= 1.17 && BilirrubinasTotalesValue <= 1.86) {
                setValueBilirrubinasTotales(1);
            } else if (BilirrubinasTotalesValue >= 1.87 && BilirrubinasTotalesValue <= 3.4) {
                setValueBilirrubinasTotales(2);
            } else if (BilirrubinasTotalesValue >= 3.5) {
                setValueBilirrubinasTotales(3);
            }
        }

        if (formDataGeneral.Glucosa !== undefined) {
            const GlucosaValue = formDataGeneral.Glucosa;
            if (GlucosaValue >= 140 && GlucosaValue <= 179) {
                setValueGlucosa(0);
                console.log('leve', ValueGlucosa);
            } else if ((GlucosaValue >= 61 && GlucosaValue <= 139) || (GlucosaValue >= 180 && GlucosaValue <= 400)) {
                setValueGlucosa(1);
                console.log('moderado', ValueGlucosa);
            } else if (GlucosaValue <= 50) {
                setValueGlucosa(2);
                // console.log('severo', ValueGlucosa);
            } else if (GlucosaValue >= 401) {
                setValueGlucosa(3);
                console.log('extremo', ValueGlucosa);
            }
        }

        if (formDataGeneral['NA+'] !== undefined) {
            const NAValue = formDataGeneral['NA+'];
            if (NAValue >= 131 && NAValue <= 144) {
                setValueNA(0);
                console.log('leve', ValueNA);

            } else if ((NAValue >= 145 && NAValue <= 149) || (NAValue >= 126 && NAValue <= 130)) {
                setValueNA(1);
                console.log('moderado', ValueNA);

            } else if ((NAValue <= 125) || (NAValue >= 150)) {
                setValueNA(2);
                // console.log('severo', ValueNA);

            } else if (NAValue <= 0) {
                setValueNA(3);
                console.log('Nada', ValueNA);

            }
        }

        if (formDataGeneral['K+'] !== undefined) {
            const KValue = formDataGeneral['K+'] || 0;

            if (KValue >= 3.51 && KValue <= 4.49) {
                setValueK(0);
            } else if ((KValue >= 4.5 && KValue <= 4.9) || (KValue >= 3.1 && KValue <= 3.5)) {
                setValueK(1);
            } else if ((KValue >= 5) || (KValue <= 3)) {
                setValueK(2);
            } else if ((KValue >= 0)) {
                setValueK(3);
            }
        }

    }, [
        formDataGeneral.AcidoUrico, ValueAcidoUrico,
        formDataGeneral.Temperatura, ValueTemperatura,
        formDataGeneral.PH, ValuePH,
        formDataGeneral.Lactato, ValueLactato,
        formDataGeneral.Proteinuria, ValueProteinuria,
        formDataGeneral.DeficitBase, ValueDeficitBase,
        formDataGeneral.FrecuenciaRespiratoria, ValueFrecuenciaRespiratoria,
        formDataGeneral.IndiceKirby, ValueIndiceKirby,
        formDataGeneral.Saturación, ValueSaturación,
        formDataGeneral.Leucocitos, ValueLeucocitos,
        formDataGeneral.Hemoglobina, ValueHemoglobina,
        formDataGeneral.Plaquetas, ValuePlaquetas,
        formDataGeneral.DimeroD, ValueDimeroD,
        formDataGeneral.Fibrinogeno, ValueFibrinogeno,
        formDataGeneral['Transaminasas (AST / ALT)'], ValueTransaminasas,
        formDataGeneral.LDH, ValueLDH,
        formDataGeneral.BilirrubinasTotales, ValueBilirrubinasTotales,
        formDataGeneral.Glucosa, ValueGlucosa,
        formDataGeneral['NA+'], ValueNA,
        formDataGeneral['K+'], ValueK
    ]);

    //Tolerancia
    const [ToleraValue, setToleraValue] = useState<InputsSelects>({});
    const [puntosTolerancia, setPuntos] = useState<number | undefined>(undefined);

    const opcionesToleranciaVíaOral: { [key: string]: number } = {
        'Tolera': 0,
        'Intolerancia 3-4 días': 1,
        'Intolerancia ≥5 días': 2,
        'Sangrado del tubo digestivo': 3,
    };

    const handleSelectChange = (selectedOption: string) => {
        const puntosAsignados = opcionesToleranciaVíaOral[selectedOption];

        setToleraValue({
            ...ToleraValue,
            ToleranciaVíaOral: selectedOption,
        });
        setPuntos(puntosAsignados);
    };

    //estalaglasgow
    const [formDataScale, setFormDataScale] = useState<InputsSelects>({});
    const [puntoScale, setPuntoScale] = useState<number | undefined>(undefined);

    const opcionesEscalaGlasgow: { [key: string]: number } = {
        '15': 0,
        '14': 1,
        '13-9': 2,
        '≤8': 3,
    };

    const handleSelectChangeScale = (selectedOption: string) => {
        const puntosAsignados = opcionesEscalaGlasgow[selectedOption];

        setFormDataScale({
            ...formDataScale,
            EscalaGlasgow: selectedOption,
        });
        setPuntoScale(puntosAsignados);
    };

    const [formDataHemorragia, setFormDataHemorragia] = useState<InputsSelects>({});
    const [puntosHemorragia, setPuntosHemorragia] = useState<number | undefined>(undefined);

    const opcionesHemorragiaObstétrica: { [key: string]: number } = {
        'Grado I': 0,
        'Grado II': 1,
        'Grado III': 2,
        'Grado IV': 3,
    };

    const handleSelectChangeHemorragia = (selectedOption: string) => {
        const puntosAsignados = opcionesHemorragiaObstétrica[selectedOption];

        setFormDataHemorragia({
            ...formDataHemorragia,
            HemorragiaObstétrica: selectedOption,
        });
        setPuntosHemorragia(puntosAsignados);
    };

    const [categoryGeneral, setCategoryGeneral] = useState({
        CardioVascular: {
            PH: ValuePH, TASistolica: ValueTASistolica, TADiastolica: ValueTADiastolica, Temperatura: ValueTemperatura, Lactato: ValueLactato, Indicedechoque: IndiceBriones,
        },
        Renal: {
            AcidoUrico: ValueAcidoUrico, Proteinuria: ValueProteinuria, Creatinina: creatinina, DeficitBase: ValueDeficitBase, Diuresis: diuresisValue, TasadefiltraciónGlomerular: formDataThreeGroup.TasadefiltraciónGlomerular,
        },
        Respiratorio: {
            FrecuenciaRespiratoria: ValueFrecuenciaRespiratoria, IndiceKirby: ValueIndiceKirby, Saturación: ValueSaturación,
        },
        Hematologico: {
            Leucocitos: ValueLeucocitos, Hemoglobina: ValueHemoglobina, Plaquetas: ValuePlaquetas, DimeroD: ValueDimeroD, Fibrinogeno: ValueFibrinogeno, IRN: ValueIRN,
        },

        Hepaticos: {
            Transaminasas: ValueTransaminasas, LDH: ValueLDH, BilirrubinasTotales: ValueBilirrubinasTotales, PresiónColoidosmótica: presiónColoidosmótica, Albumina: albumina, GlobulinaSérica: formDataSecondGroup.GlobulinaSérica, IndiceBriones: IndiceBriones,
        },
        Neurologico: {
            EscalaGlasgow: puntoScale
        },

        Uterino: {
            HemorragiaObstétrica: puntosHemorragia
        },

        GastroIntestital: {
            ToleranciaVíaOral: puntosTolerancia, Glucosa: ValueGlucosa, NA: ValueNA, K: ValueK,
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
    const resultado2 = encontrarValorMasAlto(categoryGeneral.Renal);
    const resultado3 = encontrarValorMasAlto(categoryGeneral.Respiratorio);
    const resultado4 = encontrarValorMasAlto(categoryGeneral.Hematologico);
    const resultado5 = encontrarValorMasAlto(categoryGeneral.Hepaticos);
    const resultado6 = encontrarValorMasAlto(categoryGeneral.Neurologico);
    const resultado7 = encontrarValorMasAlto(categoryGeneral.Uterino);
    const resultado8 = encontrarValorMasAlto(categoryGeneral.GastroIntestital);
    console.log(resultado);

    useEffect(() => {

        setCategoryGeneral({
            CardioVascular: {
                PH: ValuePH, TASistolica: ValueTASistolica, TADiastolica: ValueTADiastolica, Temperatura: ValueTemperatura, Lactato: ValueLactato, Indicedechoque: IndiceBriones,
            },
            Renal: {
                AcidoUrico: ValueAcidoUrico, Proteinuria: ValueProteinuria, Creatinina: creatinina, DeficitBase: ValueDeficitBase, Diuresis: diuresisValue, TasadefiltraciónGlomerular: formDataThreeGroup.TasadefiltraciónGlomerular,
            },
            Respiratorio: {
                FrecuenciaRespiratoria: ValueFrecuenciaRespiratoria, IndiceKirby: ValueIndiceKirby, Saturación: ValueSaturación,
            },
            Hematologico: {
                Leucocitos: ValueLeucocitos, Hemoglobina: ValueHemoglobina, Plaquetas: ValuePlaquetas, DimeroD: ValueDimeroD, Fibrinogeno: ValueFibrinogeno, IRN: ValueIRN,
            },

            Hepaticos: {
                Transaminasas: ValueTransaminasas, LDH: ValueLDH, BilirrubinasTotales: ValueBilirrubinasTotales, PresiónColoidosmótica: presiónColoidosmótica, Albumina: albumina, GlobulinaSérica: formDataSecondGroup.GlobulinaSérica, IndiceBriones: IndiceBriones,
            },
            Neurologico: {
                EscalaGlasgow: puntoScale
            },

            Uterino: {
                HemorragiaObstétrica: puntosHemorragia
            },
            GastroIntestital: {
                ToleranciaVíaOral: puntosTolerancia, Glucosa: ValueGlucosa, NA: ValueNA, K: ValueK,
            },

        });

    }, [ValuePH,
        ValueTASistolica,
        ValueTADiastolica,
        ValueTemperatura,
        ValueLactato,
        IndiceBriones,
        ValueAcidoUrico,
        ValueProteinuria,
        creatinina,
        ValueDeficitBase,
        diuresisValue,
        formDataThreeGroup.TasadefiltraciónGlomerular,
        ValueFrecuenciaRespiratoria,
        ValueIndiceKirby,
        ValueSaturación,
        ValueLeucocitos,
        ValueHemoglobina,
        ValuePlaquetas,
        ValueDimeroD,
        ValueFibrinogeno,
        ValueIRN,
        ValueTransaminasas,
        ValueLDH,
        ValueBilirrubinasTotales,
        presiónColoidosmótica,
        albumina,
        formDataSecondGroup.GlobulinaSérica,
        IndiceBriones,
        puntoScale,
        puntosHemorragia,
        puntosTolerancia,
        ValueGlucosa,
        ValueNA,
        ValueK
    ])

    console.log(fields);

    const HolaMundo = 'Hola Mundo'

    return (
        <>
            <FormularyPart
                fields={fields}
                formData={formData}
                handleInputChange={handleInputChange}
                fieldsSecondGroup={fieldsSecondGroup}
                formDataSecondGroup={formDataSecondGroup}
                handleInputChangeSecondGroup={handleInputChangeSecondGroup}
                HolaMundo={HolaMundo}
                miArray={miArray}
            />

        </>
    )
}

export default MyForm;


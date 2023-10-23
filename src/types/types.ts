// types.ts

export type RootStackParamList = {
    Welcome: undefined;
    Login: undefined;
    DoctorCreationForm: undefined;
    DashboardScreen: undefined;
    CustomBottomTabNavigator: undefined;
    HomeScreen: undefined;
};

export interface IFirstGroup {
    FC?: number;
    TASistolica?: number;
    TADiastolica?: number;
    Tam?: number;
    Indicedechoque?: number;
}

export interface ISecondGroup {
    Albumina?: number;
    GlobulinaSérica?: number;
    PresiónColoidosmótica?: number;
    Indicebriones?: number;
}

export interface IThreeGroup {
    Creatinina?: number
    Edad?: number;
    TasadefiltraciónGlomerular?: number;
}

export interface IFourGroup {
    Orina?: number;
    hors?: number;
    Peso?: number;
    Diuresis?: number;
}

export interface IFiveGroup {
    TPN?: number;
    IRN?: number;
}

export type InputsGeneral = {
    Temperatura?: number;
    PH?: number;
    Lactato?: number;
    AcidoUrico?: number;
    Proteinuria?: number;
    DeficitBase?: number;
    FrecuenciaRespiratoria?: number;
    IndiceKirby?: number;
    Saturación?: number;
    Leucocitos?: number;
    Hemoglobina?: number;
    Plaquetas?: number;
    Fibrinogeno?: number;
    DimeroD?: number;
    "Transaminasas (AST / ALT)"?: number;
    LDH?: number;
    BilirrubinasTotales?: number;
    Glucosa?: number;
    "NA+"?: number;
    "K+"?: number;
}

export type InputsSelects = {
    type?: string | number | boolean;
    ToleranciaVíaOral?: string;
    PerdidaVolumenSanguíneo?: string;
    HemorragiaObstétrica?: string;
    EscalaGlasgow?: string;
}

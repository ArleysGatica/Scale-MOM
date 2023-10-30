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

export interface IDoctor {
    id?: string;
    username?: string;
    password?: string;
    idMinsa?: string;
    userType?:number;
}

export interface IPatient {
    id?: string;
    username?: string;
    dni?: String;
    nameEncargado?: String;
    telefonoEncargado?: Number;
    telefono?: Number;
    resultado?: String;
    edad?: Number;
    userType?:number;
}

export interface ILogin {
    username: string;
    password: string;
}

export type status = "idle" | "loading" | "succeeded" | "failed";

export interface IGeneral {
    id?: string;
    // idDoctor?: string;
    // idPaciente?: string;
    // createdAt?: string;
    // updatedAt?: string;
    // status?: string;
    firstGroup?: IFirstGroup;
    secondGroup?: ISecondGroup;
    threeGroup?: IThreeGroup;
    fourGroup?: IFourGroup;
    fiveGroup?: IFiveGroup;
    inputsGeneral?: InputsGeneral;
    inputsSelects?: InputsSelects;
}

export interface IGeneralState {
    adduserUse: boolean;
    userUse: Array<any>;
    dataGeneral: Array<IGeneral>;
    status: status;
    error?: string | undefined;
}


// extraReducers: (builder) => {
//     builder
//         .addCase(fetchDoctorByIdAsync.pending, (state) => {
//             state.status = "loading";
//         })
//         .addCase(fetchDoctorByIdAsync.fulfilled, (state, action) => {
//             state.status = "succeeded";
//             state.dataGeneral = action.payload;
//         })
//         .addCase(fetchDoctorByIdAsync.rejected, (state, action) => {
//             state.status = "failed";
//             state.error = action.error.message;
//         })
//         .addCase(addDoctor.pending, (state) => {
//             state.status = "loading";
//         })
//         .addCase(addDoctor.fulfilled, (state, action) => {
//             state.status = "succeeded";
//             state.dataGeneral = action.payload;
//         })
//         .addCase(addDoctor.rejected, (state, action) => {
//             state.status = "failed";
//             state.error = action.error.message;
//         });
// },
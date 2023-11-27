export interface ICardioVascular {
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

export interface IRenal {
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

export interface IRespiratorio {
  FrecuenciaRespiratoria?: number;
  IndiceKirby?: number;
  Saturación?: number;
}

export interface IHematologico {
  Leucocitos?: number;
  Hemoglobina?: number;
  Plaquetas?: number;
  Fibrinogeno?: number;
  DimeroD?: number;
  IRN?: number;
}

export interface IHepatico {
  Transaminasas?: number;
  LDH?: number;
  BilirrubinasTotales?: number;
  PresiónColoidosmótica?: number;
  Albumina?: number;
  GlobulinaSérica?: number;
  IndiceBriones?: number;
}

export interface INeurologico {
  EscalaGlasgow?: number;
}

export interface IUterino {
  HemorragiaObstétrica?: number;
  PerdidaVolumenSangre?: number;
}

export interface IGastroIntestital {
  ToleranciaVíaOral?: number;
  Glucosa?: number;
  NA?: number;
  K?: number;
}

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  DoctorCreationForm: undefined;
  DashboardScreen: undefined;
  CustomBottomTabNavigator: undefined;
  HomeScreen: undefined;
  ListDoctor: undefined;
  ListPatient: undefined;
};

export interface IDoctor {
  id?: string;
  username?: string;
  password?: string;
  idMinsa?: string;
  userType?: number;
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
  userType?: number;
}

export interface ILogin {
  username: string;
  password: string;
}

export type status = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface IGeneral {
  id?: string;
  idDoctor?: string;
  idPatient?: string;
  date?: string;
  cardioVascular?: ICardioVascular;
  renal?: IRenal;
  respiratorio?: IRespiratorio;
  hematologico?: IHematologico;
  hepatico?: IHepatico;
  neurologico?: INeurologico;
  uterino?: IUterino;
  gastroIntestital?: IGastroIntestital;
}

export interface IDoctorSlice {
  adduserUse: boolean;
  userUse: Array<any>;
  dataGeneral: Array<IGeneral>;
  status: status;
  error?: string | undefined;
  currentDoctor?: IDoctor;
}
export interface IDatosClinicoCreate {
  id?: string;
  AcidoUrico: string;
  Albumina: string;
  BilirrubinasTotales: string;
  Creatinina: string;
  DeficitBase: string;
  DimeroD: string;
  EscalaGlasgow: number;
  FC: string;
  Fibrinogeno: string;
  FrecuenciaRespiratoria: string;
  GlobulinaSérica: string;
  Glucosa: string;
  Hemoglobina: string;
  HemorragiaObstétrica: string;
  IndiceKirby: string;
  K: string;
  LDH: string;
  Lactato: string;
  Leucocitos: string;
  NA: string;
  Orina: string;
  PH: string;
  PerdidaVolumenSangre: string;
  Peso: string;
  Plaquetas: string;
  PresiónColoidosmótica: string;
  Proteinuria: string;
  Saturación: string;
  TADiastolica: string;
  TASistolica: string;
  TasadefiltraciónGlomerular: string;
  Temperatura: string;
  ToleranciaVíaOral: number;
  Transaminasas: string;
  cardioVascularValue: number;
  doctorId: string;
  edad: string;
  escalaClinica: number;
  escalaClinicaString: string;
  fechaRegistro: string;
  gastroIntestinalValue: number;
  hematologicoValue: number;
  hepaticoValue: number;
  horas: string;
  neurologicoValue: number;
  pacienteId: string;
  renalValue: number;
  respiratorioValue: number;
}
export interface IDatosClinicoIndex {
  cardioVascularValue: number;
  doctorId: IDoctor;
  escalaClinica: number;
  escalaClinicaString: string;
  fechaRegistro: string;
  gastroIntestinalValue: number;
  hematologicoValue: number;
  hepaticoValue: number;
  id: string;
  neurologicoValue: number;
  pacienteId: IPatient;
  renalValue: number;
  respiratorioValue: number;
}

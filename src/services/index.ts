import { IDoctor, ILogin, IPatient } from "../types/types"
import axios from "axios";

interface IResponse {
    url?: string;
    method?: string;
    body?: any;
    controller?: any;
}

interface IAdminUser{
    // id?: string;
    username?: string;
    password?: string;
}

export const ConexionFetch = async ({ url, method, body, controller }: IResponse) => {
    const baseURL = 'http://192.168.1.23:3000/api';
    const requestURL = url ? `${baseURL}/${controller}/${url}` : `${baseURL}/${controller}`;
    

    try {
        if (method === 'GET') {
            const response = await axios.get(requestURL);
            return response.data;
        }

        if (method === 'POST') {
            const response = await axios.post(requestURL, body);
            return response.data;
        }

        if (method === 'PUT') {
            const response = await axios.put(requestURL, body);
            return response.data;
        }

        if (method === 'DELETE') {
            const response = await axios.delete(requestURL, { data: body });
            return response.data;
        }

        console.log(requestURL);
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error;
    }
};
 
// http://192.168.1.20:3000/api/user/653d87fcc6fb2046d9477c2b

//Doctors
export const fetchDoctorById = async (id: string) => {
    return await ConexionFetch({ url: id, method: 'GET', controller: "doctors" })
}

export const fetchCreateDoctor = async (doctor: IDoctor) => {
    return await ConexionFetch({ body: doctor, method: 'POST', controller: "user" })
}

export const login = async (user: ILogin) => {
    return await ConexionFetch({ body: user, method: 'POST', controller: "login" })
}

export const fetchDeleteDoctor = async (id: string) => {
    return await ConexionFetch({ url: id, method: 'DELETE', controller: "user" })
}

export const fetchUpdateDoctors = async (id: string, doctor: IDoctor) => {
    return await ConexionFetch({ url: id, body: doctor, method: 'PUT', controller: "user" })
}

//Patients
export const fetchCreatePatient = async (paciente: IPatient) => {
    return await ConexionFetch({ body: paciente, method: 'POST', controller: "user" })
}

export const fetchDeletePatient = async (id: string) => {
    return await ConexionFetch({ url: id, method: 'DELETE', controller: "user" })
}

export const fetchUpdatePatient = async (id: string, paciente: IPatient) => {
    return await ConexionFetch({ url: id, body: paciente, method: 'PUT', controller: "user" })
}

export const fetchAddResultPatient = async (id: string, resultado: any) => {
    return await ConexionFetch({ url: `resultado/${id}`, body: resultado, method: 'PUT', controller: "paciente" })
}

export const fetchGetPatient = async () => {
    return await ConexionFetch({ method: 'GET', controller: "paciente" })
}

export const fetchGetDoctors = async () => {
    return await ConexionFetch({ method: 'GET', controller: "doctors" })
}

export const fetchPatientById = async (id: string) => {
    return await ConexionFetch({ url: id, method: 'GET', controller: "doctors" })
}

//UsersAdmin
export const getUserById = async (id: string) => {
    return await ConexionFetch({ url: id, method: 'GET', controller: "user" })
}



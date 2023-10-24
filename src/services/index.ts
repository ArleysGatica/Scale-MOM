import { IDoctor } from "../types/types"

export const ConexionFetch = async (url: string, method: string, body: any) => {

    const URL = 'http://localhost:3000/api/doctors/'

    const response = await fetch(URL + url, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    return await response.json()
}

export const fetchDoctorById = async (id: string) => {
    return await ConexionFetch(id, 'GET', null)
}

export const fetchCreateDoctor = async (doctor: IDoctor) => {
    return await ConexionFetch('', 'POST', doctor)
}

export const fetchDeleteDoctor = async (id: string) => {
    return await ConexionFetch(id, 'DELETE', null)
}
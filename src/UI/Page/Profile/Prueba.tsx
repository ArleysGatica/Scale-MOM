import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Button, StyleSheet } from 'react-native';

interface Paciente {
    id: string;
    nombre: string;
}

interface Medico {
    id: string;
    nombre: string;
    activo: boolean;
}

const pacientesData: Paciente[] = [
    { id: '1', nombre: 'Paciente 1' },
    { id: '2', nombre: 'Paciente 2' },
    { id: '3', nombre: 'Paciente 3' },
];

const medicosData: Medico[] = [
    { id: '1', nombre: 'Médico 1', activo: true },
    { id: '2', nombre: 'Médico 2', activo: false },
];

export default function PruebaHome() {
    const [searchText, setSearchText] = useState<string>('');
    const [filteredPacientes, setFilteredPacientes] = useState<Paciente[]>([]);
    const [medicoActivo, setMedicoActivo] = useState<Medico | null>(null);

    const handleSearch = () => {
        const filtered = pacientesData.filter((paciente) =>
            paciente.nombre.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredPacientes(filtered);
    };

    const handleSetActiveMedico = (medico: Medico) => {
        setMedicoActivo(medico);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inicio para Médicos</Text>

            {/* Búsqueda de Pacientes */}
            <TextInput
                placeholder="Buscar Paciente"
                style={styles.input}
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
            />
            <Button title="Buscar" onPress={handleSearch} />

            {/* Lista de Pacientes */}
            <FlatList
                data={filteredPacientes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Text style={styles.item}>{item.nombre}</Text>}
                style={styles.list}
            />

            {/* Médico Activo */}
            {medicoActivo ? (
                <View>
                    <Text style={styles.subtitle}>Médico Activo:</Text>
                    <Text style={styles.activeMedico}>{medicoActivo.nombre}</Text>
                </View>
            ) : (
                <Text>No hay médico activo en este momento.</Text>
            )}

            {/* Lista de Médicos */}
            <Text style={styles.subtitle}>Lista de Médicos:</Text>
            {medicosData.map((medico) => (
                <View key={medico.id} style={styles.medicoItem}>
                    <Text style={styles.medicoName}>{medico.nombre}</Text>
                    <Button title="Activar" onPress={() => handleSetActiveMedico(medico)} />
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: '100%',
        width: '100%',
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
    },
    item: {
        fontSize: 16,
        marginBottom: 10,
    },
    list: {
        marginTop: 20,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    activeMedico: {
        fontSize: 16,
        marginBottom: 20,
    },
    medicoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    medicoName: {
        marginRight: 10,
    },
});

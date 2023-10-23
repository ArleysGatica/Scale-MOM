import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

type Doctor = {
    name?: string;
    password?: string;
    idMinsa?: string;
};

type Props = {
    onCreateDoctor?: (doctor: Doctor) => void;
};

const DoctorCreationForm: React.FC<Props> = ({ onCreateDoctor }) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [idMinsa, setIdMinsa] = useState('');

    const handleCreateDoctor = () => {
        const newDoctor: Doctor = {
            name,
            password,
            idMinsa,
        };
        if (onCreateDoctor) {
            onCreateDoctor(newDoctor);
        }
        setName('');
        setPassword('');
        setIdMinsa('');
    };

    return (
        <View>
            <Text>Create New Doctor</Text>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <TextInput
                placeholder="ID MINSA"
                value={idMinsa}
                onChangeText={(text) => setIdMinsa(text)}
            />
            <Button title="Create Doctor" onPress={handleCreateDoctor} />
        </View>
    );
};

export default DoctorCreationForm;

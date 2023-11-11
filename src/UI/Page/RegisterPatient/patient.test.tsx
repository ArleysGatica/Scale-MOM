import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RegisterPatient from './patient';

describe('RegisterPatient', () => {
    test('renders text elements correctly', () => {
        const { getByText } = render(<RegisterPatient />);

        const salirText = getByText('Salir');
        expect(salirText).toBeTruthy();

    });

    test('input changes value correctly', () => {
        const { getByPlaceholderText } = render(<RegisterPatient />);

        const input = getByPlaceholderText('Input Placeholder'); 
        fireEvent.changeText(input, 'Nuevo valor');

        expect(input.props.value).toBe('Nuevo valor');
    });

    test('button click works correctly', () => {
        const mockHandler = jest.fn(); 
        const { getByText } = render(<RegisterPatient />);

        const button = getByText('Registrar'); 
        fireEvent.press(button);

        expect(mockHandler).toHaveBeenCalled();
    });
});

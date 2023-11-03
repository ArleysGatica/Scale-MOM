import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Login } from './Login'; 

describe('Login Component', () => {
    it('should render login inputs and button', () => {
        const { getByTestId } = render(<Login />);

        const usernameInput = getByTestId('username-input');
        const passwordInput = getByTestId('password-input');
        const loginButton = getByTestId('login-button');

        expect(usernameInput).toBeDefined();
        expect(passwordInput).toBeDefined();
        expect(loginButton).toBeDefined();
    });

    it('should simulate user login action', () => {
        const { getByTestId } = render(<Login />);

        const usernameInput = getByTestId('username-input');
        const passwordInput = getByTestId('password-input');
        const loginButton = getByTestId('login-button');

        // fireEvent.changeText(usernameInput, 'exampleUser');
        // fireEvent.changeText(passwordInput, 'examplePassword');

        // fireEvent.press(loginButton);

    });
});

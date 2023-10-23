
import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import { Login } from './Login';

describe('Login', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<Login navigation={null as any} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should call handleLogin when button is pressed with correct credentials', () => {
        const { getByTestId, getByPlaceholderText } = render(<Login navigation={null as any} />);
        const nameInput = getByPlaceholderText('Name');
        const usernameInput = getByPlaceholderText('username');
        const button = getByTestId('login-button');

        fireEvent.changeText(nameInput, 'admin');
        fireEvent.changeText(usernameInput, 'admin');
        fireEvent.press(button);

    });

    it('should call handleLogin when button is pressed with incorrect credentials', () => {
        const { getByTestId, getByPlaceholderText } = render(<Login navigation={null as any} />);
        const nameInput = getByPlaceholderText('Name');
        const usernameInput = getByPlaceholderText('username');
        const button = getByTestId('login-button');

        fireEvent.changeText(nameInput, 'wrong');
        fireEvent.changeText(usernameInput, 'wrong');
        fireEvent.press(button);

    });
});

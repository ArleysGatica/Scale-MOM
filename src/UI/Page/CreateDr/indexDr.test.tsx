// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react-native';
// import CreateDr from './index';

// describe('CreateDr', () => {
//   test('calls fetchCreateDoctor when id is not provided', async () => {
//     const fetchCreateDoctor = jest.fn();
//     const { getByText, getByPlaceholderText } = render(
//       <CreateDr fetchCreateDoctor={fetchCreateDoctor} />
//     );

//     const usernameInput = getByPlaceholderText('Username');
//     const idMinsaInput = getByPlaceholderText('ID Minsa');
//     const submitButton = getByText('Submit');

//     fireEvent.changeText(usernameInput, 'testuser');
//     fireEvent.changeText(idMinsaInput, 'testid');

//     fireEvent.press(submitButton);

//     await waitFor(() => expect(fetchCreateDoctor).toHaveBeenCalled());
//     expect(fetchCreateDoctor).toHaveBeenCalledWith({
//       username: 'testuser',
//       idMinsa: 'testid',
//       userType: 2,
//     });
//   });

//   test('calls fetchUpdateDoctors when id is provided', async () => {
//     const fetchUpdateDoctors = jest.fn();
//     const { getByText, getByPlaceholderText } = render(
//       <CreateDr id={1} fetchUpdateDoctors={fetchUpdateDoctors} />
//     );

//     const usernameInput = getByPlaceholderText('Username');
//     const idMinsaInput = getByPlaceholderText('ID Minsa');
//     const submitButton = getByText('Submit');

//     fireEvent.changeText(usernameInput, 'testuser');
//     fireEvent.changeText(idMinsaInput, 'testid');

//     fireEvent.press(submitButton);

//     await waitFor(() => expect(fetchUpdateDoctors).toHaveBeenCalled());
//     expect(fetchUpdateDoctors).toHaveBeenCalledWith(1, {
//       username: 'testuser',
//       idMinsa: 'testid',
//     });
//   });
// });
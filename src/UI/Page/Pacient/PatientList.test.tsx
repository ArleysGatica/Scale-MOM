import React from 'react';
import { render } from '@testing-library/react-native';
import ListPatient from './PatientList';


describe('PatientList Component', () => {
    it('should render without crashing', () => {
        const { getByTestId } = render(<ListPatient />);
        const patientList = getByTestId('patient-list');
        expect(patientList).toBeDefined();
    });

    it('should have an empty list of patients by default', () => {
        const { getByTestId } = render(<ListPatient />);
        const patientList = getByTestId('patient-list');
        expect(patientList.props.data).toEqual([]);
    });

    it('should update the list of patients when setListPatient is called', () => {
        const { getByTestId } = render(<ListPatient />);
        const patientList = getByTestId('patient-list');
        const newPatientList = [
            {
                name: 'Maria Lopez',
                age: 35,
                phone: '86349918',
                dni: '121-161199-1002M',
                Namecharge: 'Juan Perez',
                phonecharge: '88340917'
            }];
        patientList.props.setListPatient(newPatientList);
        expect(patientList.props.data).toEqual(newPatientList);
    });
});
import { Alert } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { act } from 'react-test-renderer';
//@ts-ignore
import { handleCalculateRenal } from './form';

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

describe('handleCalculateRenal', () => {

  it('should return 2 when acido urico is between 8 and 8.9', () => {
    const renalData = {
      Creatinina: 1.2,
      AcidoUrico: 8.5,
      Orina: 1000,
      horas: 24,
      Peso: 70,
      Proteinuria: 500,
      edad: 30,
      TasadefiltraciónGlomerular: 80,
      DeficitBase: 3,
    };

    const { acidourico } = handleCalculateRenal(renalData);

    expect(acidourico).toEqual(2);
  });

  it('should return 3 when acido urico is greater than or equal to 9', () => {
    const renalData = {
      Creatinina: 1.2,
      AcidoUrico: 9.5,
      Orina: 1000,
      horas: 24,
      Peso: 70,
      Proteinuria: 500,
      edad: 30,
      TasadefiltraciónGlomerular: 80,
      DeficitBase: 3,
    };

    const { acidourico } = handleCalculateRenal(renalData);

    expect(acidourico).toEqual(3);
  });

  it('should calculate diuresis correctly', () => {
    const renalData = {
      Creatinina: 1.2,
      AcidoUrico: 6.5,
      Orina: 1000,
      horas: 24,
      Peso: 70,
      Proteinuria: 500,
      edad: 30,
      TasadefiltraciónGlomerular: 80,
      DeficitBase: 3,
      Diuresis: 0,
    };

    const { diuresis } = handleCalculateRenal(renalData);

    expect(diuresis).toEqual(0.6);
  });

  it('should return 0 when diuresis is greater than or equal to 0.51', () => {
    const renalData = {
      Creatinina: 1.2,
      AcidoUrico: 6.5,
      Orina: 1000,
      horas: 24,
      Peso: 70,
      Proteinuria: 500,
      edad: 30,
      TasadefiltraciónGlomerular: 80,
      DeficitBase: 3,
      Diuresis: 0.6,
    };

    const { diuresis } = handleCalculateRenal(renalData);

    expect(diuresis).toEqual(0);
  });

  it('should return 1 when diuresis is between 0.31 and 0.5', () => {
    const renalData = {
      Creatinina: 1.2,
      AcidoUrico: 6.5,
      Orina: 500,
      horas: 24,
      Peso: 70,
      Proteinuria: 500,
      edad: 30,
      TasadefiltraciónGlomerular: 80,
      DeficitBase: 3,
      Diuresis: 0.4,
    };

    const { diuresis } = handleCalculateRenal(renalData);

    expect(diuresis).toEqual(1);
  });

  it('should return 2 when diuresis is less than or equal to 0.3', () => {
    const renalData = {
      Creatinina: 1.2,
      AcidoUrico: 6.5,
      Orina: 200,
      horas: 24,
      Peso: 70,
      Proteinuria: 500,
      edad: 30,
      TasadefiltraciónGlomerular: 80,
      DeficitBase: 3,
      Diuresis: 0.1,
    };

    const { diuresis } = handleCalculateRenal(renalData);

    expect(diuresis).toEqual(2);
  });

  it('should return 0 when proteinuria is less than or equal to 299', () => {
    const renalData = {
      Creatinina: 1.2,
      AcidoUrico: 6.5,
      Orina: 1000,
      horas: 24,
      Peso: 70,
      Proteinuria: 200,
      edad: 30,
      TasadefiltraciónGlomerular: 80,
      DeficitBase: 3,
    };

    const { proteinuria } = handleCalculateRenal(renalData);

    expect(proteinuria).toEqual(0);
  });

  it('should return 1 when proteinuria is between 300 and 499', () => {
    const renalData = {
      Creatinina: 1.2,
      AcidoUrico: 6.5,
      Orina: 1000,
      horas: 24,
      Peso: 70,
      Proteinuria: 400,
      edad: 30,
      TasadefiltraciónGlomerular: 80,
      DeficitBase: 3,
    };

    const { proteinuria } = handleCalculateRenal(renalData);

    expect(proteinuria).toEqual(1);
  });

  it('should return 2 when proteinuria is between 500 and 3499', () => {
    const renalData = {
      Creatinina: 1.2,
      AcidoUrico: 6.5,
      Orina: 1000,
      horas: 24,
      Peso: 70,
      Proteinuria: 2000,
      edad: 30,
      TasadefiltraciónGlomerular: 80,
      DeficitBase: 3,
    };

    const { proteinuria } = handleCalculateRenal(renalData);

    expect(proteinuria).toEqual(2);
  });

  it('should return 3 when proteinuria is greater than or equal to 3500', () => {
    const renalData = {
      Creatinina: 1.2,
      AcidoUrico: 6.5,
      Orina: 1000,
      horas: 24,
      Peso: 70,
      Proteinuria: 5000,
      edad: 30,
      TasadefiltraciónGlomerular: 80,
      DeficitBase: 3,
    };

    const { proteinuria } = handleCalculateRenal(renalData);

    expect(proteinuria).toEqual(3);
  });

  it('should calculate TFG correctly', () => {
    const renalData = {
      Creatinina: 1.2,
      AcidoUrico: 6.5,
      Orina: 1000,
      horas: 24,
      Peso: 70,
      Proteinuria: 500,
      edad: 30,
      TasadefiltraciónGlomerular: 0,
      DeficitBase: 3,
    };

    act(() => {
      handleCalculateRenal(renalData);
    });

    expect(renalData.TasadefiltraciónGlomerular).toEqual(80.13);
  });

  it('should return 0 when TFG is between 61 and 110', () => {
    const renalData = {
      Creatinina: 1.2,
      AcidoUrico: 6.5,
      Orina: 1000,
      horas: 24,
      Peso: 70,
      Proteinuria: 500,
      edad: 30,
      TasadefiltraciónGlomerular: 80,
      DeficitBase: 3,
    };

    const { tfg } = handleCalculateRenal(renalData);

    expect(tfg).toEqual(0);
  });

  it('should return 1 when TFG is between 31 and 60', () => {
    const renalData = {
      Creatinina: 2.5,
      AcidoUrico: 6.5,
      Orina: 1000,
      horas: 24,
      Peso: 70,
      Proteinuria: 500,
      edad: 30,
      TasadefiltraciónGlomerular: 50,
      DeficitBase: 3,
    };

    const { tfg } = handleCalculateRenal(renalData);

    expect(tfg).toEqual(1);
  });

  it('should return 2 when TFG is between 16 and 30', () => {
    const renalData = {
      Creatinina: 3,
      AcidoUrico: 6.5,
      Orina: 1000,
      horas: 24,
      Peso: 70,
      Proteinuria: 500,
      edad: 30,
      TasadefiltraciónGlomerular: 20,
      DeficitBase: 3,
    };

    const { tfg } = handleCalculateRenal(renalData);

    expect(tfg).toEqual(2);
  });

  it('should return 3 when TFG is less than or equal to 15', () => {
    const renalData = {
      Creatinina: 3,
      AcidoUrico: 6.5,
      Orina: 1000,
      horas: 24,
      Peso: 70,
      Proteinuria: 500,
      edad: 30,
      TasadefiltraciónGlomerular: 10,
      DeficitBase: 3,
    };

    const { tfg } = handleCalculateRenal(renalData);

    expect(tfg).toEqual(3);
  });

  it('should return 0 when deficit base is less than or equal to 1.9', () => {
    const renalData = {
      Creatinina: 1.2,
      AcidoUrico: 6.5,
      Orina: 1000,
      horas: 24,
      Peso: 70,
      Proteinuria: 500,
      edad: 30,
      TasadefiltraciónGlomerular: 80,
      DeficitBase: 1.5,
    };

    const { deficitbase } = handleCalculateRenal(renalData);

    expect(deficitbase).toEqual(0);
  });

  it('should return 1 when deficit base is between 2 and 5.9', () => {
    const renalData = {
      Creatinina: 1.2,
      AcidoUrico: 6.5,
      Orina: 1000,
      horas: 24,
      Peso: 70,
      Proteinuria: 500,
      edad: 30,
      TasadefiltraciónGlomerular: 80,
      DeficitBase: 4,
    };

    const { deficitbase } = handleCalculateRenal(renalData);

    expect(deficitbase).toEqual(1);
  });

  it('should return 2 when deficit base is between 6 and 9.9', () => {
    const renalData = {
      Creatinina: 1.2,
      AcidoUrico: 6.5,
      Orina: 1000,
      horas: 24,
      Peso: 70,
      Proteinuria: 500,
      edad: 30,
      TasadefiltraciónGlomerular: 80,
      DeficitBase: 7,
    };

    const { deficitbase } = handleCalculateRenal(renalData);

    expect(deficitbase).toEqual(2);
  });

  it('should return 3 when deficit base is greater than or equal to 10', () => {
    const renalData = {
      Creatinina: 1.2,
      AcidoUrico: 6.5,
      Orina: 1000,
      horas: 24,
      Peso: 70,
      Proteinuria: 500,
      edad: 30,
      TasadefiltraciónGlomerular: 80,
      DeficitBase: 15,
    };

    const { deficitbase } = handleCalculateRenal(renalData);

    expect(deficitbase).toEqual(3);
  });
});
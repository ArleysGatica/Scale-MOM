import { useState, useEffect } from 'react';

function useValorMasAlto(objeto: Record<string, number>) {
    const [valorMasAlto, setValorMasAlto] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (Object.keys(objeto).length === 0) {
            setValorMasAlto(undefined);
        } else {
            const valores = Object.values(objeto);
            let maxValor = valores[0];

            for (let i = 1; i < valores.length; i++) {
                if (typeof valores[i] === 'number' && valores[i] > (maxValor as number)) {
                    maxValor = valores[i];
                }
            }

            setValorMasAlto(maxValor);
        }
    }, [objeto]);

    return valorMasAlto;
}

export default useValorMasAlto;
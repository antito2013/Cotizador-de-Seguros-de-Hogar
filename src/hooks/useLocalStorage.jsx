import { useEffect, useState } from "react";

const useLocalStorage = (clave, valorInicial) => {
const obtener = () => {
    if (!localStorage.getItem(clave)) {
        localStorage.setItem(clave,JSON.stringify(valorInicial));
    return valorInicial; 
    }
    return JSON.parse(localStorage.getItem(clave));
    
}
    const [valor, setValor] = useState(obtener); 

    useEffect(() => localStorage.setItem(clave, JSON.stringify(valor)), [valor]);
    return [valor, setValor];
};

export default useLocalStorage;
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Formulario from "./components/Formulario";
import Historial from "./components/Historial";
import HistorialContext from "./context/HistorialContext";
import CotizadorContext from "./context/CotizadorContext";
import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
const App = () => {
  const [elementos, setElementos] = useState({
    metros: 20,
    propiedad: 0,
    ubicacion: 0,
  });
  const [presupuestos, setPresupuestos] = useLocalStorage("presupuestos", []);
  return (
    <>
      <HistorialContext.Provider value={{ presupuestos, setPresupuestos }}>
        <CotizadorContext.Provider value={{ elementos, setElementos }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" index element={<Formulario />}></Route>
              <Route path="/historial" element={<Historial />}></Route>
            </Routes>
          </BrowserRouter>
        </CotizadorContext.Provider>
      </HistorialContext.Provider>
    </>
  );
};
export default App;

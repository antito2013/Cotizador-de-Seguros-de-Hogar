import { Link } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa6";
import Opciones from "./Opciones";
import { useEffect, useState } from "react";
import useCotizador from "../hooks/useCotizador";
import useHistorial from "../hooks/useHistorial";
import Swal from "sweetalert2";

const Formulario = () => {
  const [precio, setPrecio] = useState(0);
  const [datos, setDatos] = useState([]);
  const { elementos, setElementos } = useCotizador();
  const { presupuestos, setPresupuestos } = useHistorial();
  const realizarCotizacion = () => {
    const { metros, propiedad, ubicacion } = elementos;
    if (metros < 20 || propiedad == 0 || ubicacion == 0) {
      Swal.fire("Error", "Por favor complete los datos", "error");
    }
    const cuenta = 4000 * metros * propiedad * ubicacion;
    setPrecio(cuenta);
  };

  useEffect(() => {
    const leer = async () => setDatos(await (await fetch("/data.json")).json());
    leer();
  }, []);
  const guardar = () => {
    setPresupuestos([
      ...presupuestos,
      {
        fecha: new Date().toDateString(),
        ...elementos,
        cuenta:
          4000 * elementos.metros * elementos.propiedad * elementos.ubicacion,
      },
    ]);
    setPrecio(0);
  };

  return (
    <>
      <nav>
        <Link to="/historial">
          <FaClipboardList />
        </Link>
      </nav>

      <form action="" onSubmit={(e) => e.preventDefault()}>
        <Opciones
          datos={datos.filter(({ categoria }) => categoria == "propiedad")}
          label={"Tipo de Propiedad"}
          tipo={"propiedad"}
        />
        <Opciones
          datos={datos.filter(({ categoria }) => categoria == "ubicacion")}
          label={"Ubicacion"}
          tipo={"ubicacion"}
        />
        <label htmlFor="metros">Metros Cuadrados</label>
        <input
          type="number"
          id="metros"
          min={20}
          defaultValue={20}
          onInput={(e) =>
            setElementos({
              ...elementos,
              metros: isNaN(parseInt(e.target.value))
                ? 20
                : parseInt(e.target.value) < 20
                ? 20
                : parseInt(e.target.value),
            })
          }
        />
        <button type="button" onClick={realizarCotizacion}>
          Cotizar
        </button>
      </form>
      {precio != 0 && (
        <>
          <p>El Precio Estimado es de ${precio.toFixed(2)}</p>
          <form onSubmit={(e) => e.preventDefault()}>
            <button type="button" onClick={guardar}>Guardar</button>
          </form>
        </>
      )}
    </>
  );
};
export default Formulario;

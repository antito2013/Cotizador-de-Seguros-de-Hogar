import { Link } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import useHistorial from "../hooks/useHistorial";
import Presupuesto from "./Presupuesto";

const Historial = () => {
  const { presupuestos } = useHistorial();
  return (
    <>
      <nav>
        <Link to={"/"}>
          <FaHouse />
        </Link>
      </nav>
      <ul>
        {presupuestos.map((elemento, indice) => (
          <Presupuesto key={indice} {...elemento} />
        ))}
      </ul>
    </>
  );
};
export default Historial;

const Presupuesto = (props) => {
  return (
    <li>
      {Object.keys(props).map((propiedad, indice) => (
        <p key={indice}>
            {propiedad}:{props[propiedad]}</p>
      ))}
    </li>
  );
};
export default Presupuesto;

import "./NoHayBusqueda.css";
import { Link } from "react-router-dom";

const NoHayBusqueda = () => {
  return (
    <div className="center-viewport">
      <div className="rectangle">
        <div className="loaderRadar-contaner"></div>
        <div className="loadernohaybusqueda">
          <span></span>
        </div>

        <div className="content">
          <h1 className="no-hay-busqueda ">
            No hay productos que coincidan con tu Búsqueda
          </h1>
          <ul className="punto-container">
            <li className="punto1">Intente filtrar el precio nuevamente</li>
            <li className="punto2">
              Precio Mínimo y Precio Máximo no están definidos
            </li>
            <li className="punto2">
              Respete el orden del filtrado por número "Mínimo" y "Máximo"
            </li>
            <button className="btn btn-primary boton-seguir-comprando">
              <Link className="LinkStyle" to="/home">
                Seguir comprando
              </Link>
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NoHayBusqueda;

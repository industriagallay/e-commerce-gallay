import "./Baneados.css";
import { Link } from "react-router-dom";
import baneao from "../../assets/img/baneao.jpg";

const Baneados = () => {
  return (
    <div className="container-fluid baneados-container">
      <div className="row mx-auto">
        <div className="col-lg-9">
          <img
            src={baneao}
            className="imagen-baneado img-fluid"
            alt="imagen baneado papu"
          />
        </div>
        <div className="texto-paralos-baneados col-lg-3 text-center">
          <h1 className="estasbaneado">¡Su cuenta a sido Baneada!</h1>
          <p className="subtitulobaneados">
            Lo sentimos, no tienes acceso a comprar en esta página.
          </p>
          <p className="emailbaneados">
            Si tienes alguna pregunta o necesitas más información, contáctanos
            en:
          </p>

          <Link
            className="emailadmin"
            to="mailto:administrador@example.com"
            style={{ textDecoration: "none", color: "rgb(71, 71, 236)" }}
          >
            industriagallay@gmail.com
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Baneados;

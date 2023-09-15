import axios from "axios";
import { useForm } from "react-hook-form";
import swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import "./SignUpForm.css";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  dni: number;
  phone: number;
  password: string;
};

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>();

  const crearCuenta = async (data: FormValues) => {
    try {
      await axios.post(
        "https://industria-gallay-server.onrender.com/api/register",
        data
      );

      swal.fire({
        position: "center",
        icon: "success",
        title: "cliente creado correctamente!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/login");
    } catch (error) {
      swal.fire({
        position: "center",
        icon: "error",
        title: "Oops...",
        text: "Ocurrio un error inesperado!",
      });
      console.error(error);
    }
  };

  return (
    <div>
      <div className="header2">
        <h2 className="slide-from-right">
          <span>Registrate Y Disfrutá De Nuestras Ofertas </span>
        </h2>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <form
              className="SignUpform ml-auto"
              onSubmit={handleSubmit(crearCuenta)}
            >
              <div className="header">Registrarse</div>
              <div className="inputs">
                <input
                  type="text"
                  placeholder="nombre"
                  className="input"
                  {...register("firstName", {
                    required: true,
                  })}
                />
                {errors.firstName?.type === "required" && (
                  <p className="text-danger">El campo nombre es requerido</p>
                )}
                <input
                  type="text"
                  placeholder="apellido"
                  className="input"
                  {...register("lastName", {
                    required: true,
                  })}
                />
                {errors.lastName?.type === "required" && (
                  <p className="text-danger">El campo apellido es requerido</p>
                )}
                <input
                  placeholder="correo electrónico"
                  className="input"
                  type="text"
                  {...register("email", {
                    required: true,
                  })}
                />
                {errors.email?.type === "required" && (
                  <p className="text-danger">El campo email es requerido</p>
                )}
                <input
                  type="number"
                  placeholder="DNI"
                  className="input"
                  {...register("dni", {
                    required: true,
                  })}
                />
                {errors.dni?.type === "required" && (
                  <p className="text-danger">El campo dni es requerido</p>
                )}
                <input
                  type="number"
                  placeholder="telefono"
                  className="input"
                  {...register("phone", {
                    required: true,
                  })}
                />
                {errors.phone?.type === "required" && (
                  <p className="text-danger">El campo telefono es requerido</p>
                )}
                <input
                  placeholder="contraseña"
                  className="input"
                  type="password"
                  {...register("password", {
                    required: true,
                  })}
                />
                {errors.password?.type === "required" && (
                  <p className="text-danger">
                    El campo contraseña es requerido
                  </p>
                )}
                <div className="checkbox-container"></div>
                <button className="sigin-btn" type="submit">
                  Crear Cuenta
                </button>
                <p className="signup-link">
                  ya tenes cuenta? <Link to="/login">Inicia sesión</Link>
                </p>
              </div>
            </form>
          </div>
          <div className="col-lg-6 col-md-4 col-sm-2 d-flex align-items-center justify-content-center">
            <div className="cardOff">
              <p className="parrafoProducto">Productos a partir De</p>
              <p className="priceOff text-center">$5.000</p>
              <ul className="listsOff">
                <li className="listOff">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      id="SVGRepo_tracerCarrier"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        fill="#ffffff"
                        d="M21.5821 5.54289C21.9726 5.93342 21.9726 6.56658 21.5821 6.95711L10.2526 18.2867C9.86452 18.6747 9.23627 18.6775 8.84475 18.293L2.29929 11.8644C1.90527 11.4774 1.89956 10.8443 2.28655 10.4503C2.67354 10.0562 3.30668 10.0505 3.70071 10.4375L9.53911 16.1717L20.1679 5.54289C20.5584 5.15237 21.1916 5.15237 21.5821 5.54289Z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>{" "}
                    </g>
                  </svg>
                  <span> La mejor calidad </span>
                </li>
                <li className="listOff">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      id="SVGRepo_tracerCarrier"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        fill="#ffffff"
                        d="M21.5821 5.54289C21.9726 5.93342 21.9726 6.56658 21.5821 6.95711L10.2526 18.2867C9.86452 18.6747 9.23627 18.6775 8.84475 18.293L2.29929 11.8644C1.90527 11.4774 1.89956 10.8443 2.28655 10.4503C2.67354 10.0562 3.30668 10.0505 3.70071 10.4375L9.53911 16.1717L20.1679 5.54289C20.5584 5.15237 21.1916 5.15237 21.5821 5.54289Z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>{" "}
                    </g>
                  </svg>
                  <span> Envíos a todo el país </span>
                </li>
                <li className="listOff">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      id="SVGRepo_tracerCarrier"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        fill="#ffffff"
                        d="M21.5821 5.54289C21.9726 5.93342 21.9726 6.56658 21.5821 6.95711L10.2526 18.2867C9.86452 18.6747 9.23627 18.6775 8.84475 18.293L2.29929 11.8644C1.90527 11.4774 1.89956 10.8443 2.28655 10.4503C2.67354 10.0562 3.30668 10.0505 3.70071 10.4375L9.53911 16.1717L20.1679 5.54289C20.5584 5.15237 21.1916 5.15237 21.5821 5.54289Z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>{" "}
                    </g>
                  </svg>
                  <span> Faciles maneras de Pago</span>
                </li>
                <li className="listOff">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      id="SVGRepo_tracerCarrier"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        fill="#ffffff"
                        d="M21.5821 5.54289C21.9726 5.93342 21.9726 6.56658 21.5821 6.95711L10.2526 18.2867C9.86452 18.6747 9.23627 18.6775 8.84475 18.293L2.29929 11.8644C1.90527 11.4774 1.89956 10.8443 2.28655 10.4503C2.67354 10.0562 3.30668 10.0505 3.70071 10.4375L9.53911 16.1717L20.1679 5.54289C20.5584 5.15237 21.1916 5.15237 21.5821 5.54289Z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>{" "}
                    </g>
                  </svg>
                  <span> Consulta Cualquier duda </span>
                </li>
                <li className="listOff">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      id="SVGRepo_tracerCarrier"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        fill="#ffffff"
                        d="M21.5821 5.54289C21.9726 5.93342 21.9726 6.56658 21.5821 6.95711L10.2526 18.2867C9.86452 18.6747 9.23627 18.6775 8.84475 18.293L2.29929 11.8644C1.90527 11.4774 1.89956 10.8443 2.28655 10.4503C2.67354 10.0562 3.30668 10.0505 3.70071 10.4375L9.53911 16.1717L20.1679 5.54289C20.5584 5.15237 21.1916 5.15237 21.5821 5.54289Z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>{" "}
                    </g>
                  </svg>
                  <span> Productos Personalizados </span>
                </li>
                <li className="listOff">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      id="SVGRepo_tracerCarrier"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        fill="#ffffff"
                        d="M21.5821 5.54289C21.9726 5.93342 21.9726 6.56658 21.5821 6.95711L10.2526 18.2867C9.86452 18.6747 9.23627 18.6775 8.84475 18.293L2.29929 11.8644C1.90527 11.4774 1.89956 10.8443 2.28655 10.4503C2.67354 10.0562 3.30668 10.0505 3.70071 10.4375L9.53911 16.1717L20.1679 5.54289C20.5584 5.15237 21.1916 5.15237 21.5821 5.54289Z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>{" "}
                    </g>
                  </svg>
                  <span> Servicio 24/7 </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

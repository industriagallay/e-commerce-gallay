import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import swal from "sweetalert2";
import "./Login.css";
import "../../components/navbar2/NavBar2.css";
import "../../components/navbar1/NavBar1.css";
import Cookies from "js-cookie";
import { apiUrl } from "../../url";

type FormValues = {
  firstName: string;
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>();

  const iniciarSesion = async (formData: FormValues) => {
    try {
      const response = await axios.post(`${apiUrl}/api/login`, formData);


      if (!response.data.isActive) {
        swal
          .fire({
            position: "center",
            icon: "error",
            title: "Usuario baneado",
            text: "Tu cuenta ha sido suspendida. Contacta al administrador para más información.",
            showConfirmButton: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              navigate("/baneados");
            }
          });
      } else if (response.data.isAdmin) {
        navigate("/admin");
      } else {
        const token = response.data.token;
        Cookies.set("token", token);
        navigate("/home");
      }
    } catch (error) {
      swal.fire({
        position: "center",
        icon: "error",
        title: "Oops...",
        text: "Ocurrió un error al iniciar sesión!",
      });
      console.error(error);
    }
  };

  return (
    <div className="background-herramientas">
      <div></div>

      <div className="container-md login">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-12 col-md-12 col-sm-12 mx-auto">
            <form className="Loginform " onSubmit={handleSubmit(iniciarSesion)}>
              <div className="Loginheader Loginform">Bienvenido</div>
              <div className="Logininputs">
                <label htmlFor="email"></label>
                <input
                  type="text"
                  id="email"
                  placeholder="correo electrónico"
                  className="Logininput"
                  {...register("email", {
                    required: true,
                  })}
                />
                {errors.email?.type === "required" && (
                  <p className="text-danger">
                    El campo correo electrónico es requerido
                  </p>
                )}
                {""}

                <label htmlFor="password"></label>
                <input
                  type="password"
                  id="password"
                  placeholder="Contraseña"
                  className="Logininput"
                  {...register("password", {
                    required: true,
                  })}
                />
                {errors.password?.type === "required" && (
                  <p className="text-danger">
                    El campo contraseña es requerido
                  </p>
                )}
                {""}
                <div className="Logincheckbox-container"></div>
                <button className="Loginsigin-btn" type="submit">
                  Iniciar Sesión
                </button>
                <Link to="/" aria-current="page" className="Loginforget">
                  Olvidaste tu contraseña?
                </Link>
                <p className="signup-link">
                  aún no tenes cuenta? <Link to="/signup">regístrate</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

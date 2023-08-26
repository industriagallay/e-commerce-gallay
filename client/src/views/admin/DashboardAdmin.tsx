import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import swal from "sweetalert2";
import CloudinaryImageUpload from "../../components/cloudinary/CloudinaryImageUpload";
import "../../components/navbar1/NavBar1.css";
import "./DashboardAdmin.css";
import { VITE_CLOUDINARY_NAME } from "../../variable";
import ObjectID from "bson-objectid";

type FormValues = {
  name: string;
  description: string;
  backgroundImage: string;
  stock: number;
  price: number;
};

interface Client {
  _id: ObjectID;
  firstName: string;
  lastName: string;
  email: string;
  dni: string;
  phone: string;
  isActive: boolean;
}

const DashboardAdmin: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [originalClientes, setOriginalClientes] = useState<Client[]>([]);
  const [clientes, setClientes] = useState<Client[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const cloudinaryName = VITE_CLOUDINARY_NAME || "";
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>();

  const clearImage = () => {
    setImageUrl("");
  };

  const crearProducto = async (data: FormValues) => {
    try {
      const dataWithImage = {
        ...data,
        backgroundImage: imageUrl,
      };
      const response = await axios.post(
        "http://localhost:3001/products",
        dataWithImage
      );
      console.log(response);

      swal.fire({
        position: "center",
        icon: "success",
        title: "producto creado correctamente!",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
      clearImage();
    } catch (error) {
      swal.fire({
        position: "center",
        icon: "error",
        title: "Oops...",
        text: "Ocurrió un error inesperado!",
      });
      console.error(error);
    }
  };

  const handleImageUpload = (imageUrl: string) => {
    setImageUrl(imageUrl);
  };

  const fetchClients = async (page: number) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/clients/allclient?page=${page}&perPage=7`
      );
      if (response.status === 200) {
        const data = response.data;
        setClientes(data);
      } else {
        console.error("Error fetching clients:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  useEffect(() => {
    fetchClients(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setOriginalClientes(clientes);
  }, [clientes]);

  const filteredClientes = originalClientes.filter((cliente) =>
    cliente.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchFilteredClients = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/clients?search=${searchQuery}&page=${currentPage}&perPage=7`
      );
      if (response.status === 200) {
        const data = response.data;
        setClientes(data);
      } else {
        console.error("Error fetching clients:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const clientsPerPage = 7;
  const totalPages = Math.ceil(originalClientes.length / clientsPerPage);

  const startIndex = (currentPage - 1) * clientsPerPage;
  const endIndex = startIndex + clientsPerPage;
  const paginatedClientes = filteredClientes.slice(startIndex, endIndex);

  const desactivarUsuario = async (userId: string, isActive: boolean) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/clients/delete/${userId}`
      );

      if (response.status === 200) {
        // Actualizar la lista de clientes después de la desactivación exitosa
        const updatedClientes = clientes.map((cliente) => {
          if (cliente._id.toString() === userId) {
            // Convertir ObjectID a string
            return {
              ...cliente,
              isActive: !isActive, // Cambiar el valor de isActive
            };
          }
          return cliente;
        });

        setClientes(updatedClientes);

        // Mostrar una confirmación al usuario
        swal.fire({
          position: "center",
          icon: "success",
          title: isActive
            ? "Cliente desactivado correctamente"
            : "Cliente activado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error("Error al desactivar el cliente:", response.statusText);
      }
    } catch (error) {
      console.error("Error al desactivar el cliente:", error);
    }
  };

  return (
    <div className="perrito-admin">
      <div className="row">
        <div className="col-8">
          <form
            className="admin ml-auto mt-5 mb-5"
            onSubmit={handleSubmit(crearProducto)}
            encType="multipart/form-data"
            onReset={clearImage}
          >
            <div className="header-admin">crea tu producto</div>
            <div className="inputs-admin">
              <input
                type="text"
                placeholder="nombre"
                className="input-admin"
                {...register("name", {
                  required: true,
                })}
              />
              {errors.name?.type === "required" && (
                <p className="text-danger">El campo nombre es requerido</p>
              )}
              <input
                type="text"
                placeholder="descripcion"
                className="input-admin"
                {...register("description", {
                  required: true,
                })}
              />
              {errors.description?.type === "required" && (
                <p className="text-danger">El campo descripcion es requerido</p>
              )}
              <CloudinaryImageUpload
                onImageUpload={handleImageUpload}
                cloudinaryName={cloudinaryName}
                clearImage={clearImage}
                initialImage={imageUrl}
              />
              <input
                type="number"
                placeholder="stock"
                className="input-admin"
                {...register("stock", {
                  required: true,
                })}
              />
              {errors.stock?.type === "required" && (
                <p className="text-danger">El campo stock es requerido</p>
              )}
              <input
                type="number"
                placeholder="precio"
                className="input-admin"
                {...register("price", {
                  required: true,
                })}
              />
              {errors.price?.type === "required" && (
                <p className="text-danger">El campo precio es requerido</p>
              )}
              <div className="checkbox-container-admin"></div>
              <button
                className="sigin-btn-admin"
                type="submit"
                disabled={!imageUrl}
              >
                Crear Producto
              </button>
            </div>
          </form>
        </div>
        <div
          className="col-4 fs-1 mt-5 mb-5 p-5 text-center"
          style={{
            color: "white",
            border: "solid",
            width: "15em",
            height: "25em",
            backgroundColor: "black",
            borderRadius: "25px",
            opacity: "0.9",
          }}
        >
          Bienvenido admin! <br />
          <p className="fs-4">
            Este es tu panel, aca tenes una breve explicación de como funcionan
            las tres secciones que vas a encontrar
          </p>
          <br />
          <ul>
            <li className="fs-5 text-start">
              SECCION CREA TU PRODUCTO: En esta seccion vas a poder crear todos
              los productos de tu inventario llenando un simple formulario.
            </li>
            <hr />
            <li className="fs-5 text-start">
              SECCION CLIENTES: Aquí vas a poder visualizar la lista de clientes
              que te hicieron al menos una compra, vas a poder acceder a sus
              datos de contacto. También vas a poder buscar cliente por e-mail o
              DNI y desactivar clientes para que no puedan acceder a la función
              de comprar en caso que sea necesario (ACLARACIÓN: a los clientes
              los vas a poder activar y desactivar cuando quieras tan solo con
              un click)
            </li>
            <hr />
            <li className="fs-5 text-start">
              SECCION HISTORIAL DE COMPRAS: Finalmente te brindamos una sección
              donde vas a poder ver todas las compras realizadas, como asi
              tambien buscar una compra por un cliente en específico, buscar
              compra por estado y cambiarle el estado a las compras dependiendo
              si el cliente ya abono el pago, si el/los productos fueron
              entregados o si la compra fue cancelada
            </li>
          </ul>
        </div>
        <hr
          className="mx-auto mb-5"
          style={{ border: "solid", opacity: "1", width: "80%" }}
        />
      </div>
      <div className="row">
        {" "}
        <div className="col-12 text-center">
          <div
            className="col-10 mx-auto mt-5 mb-5 p-5"
            style={{
              border: "solid",
              backgroundColor: "white",
              opacity: "0.9",
              borderRadius: "18px",
              lineHeight: "3em",
              fontSize: "1.2em",
            }}
          >
            <h1>Clientes</h1>
            <div className="text-end mb-5">
              <input
                style={{ width: "14em" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="&nbsp;&nbsp;Buscar cliente por nombre"
              />
              <button
                className="ms-4"
                onClick={() => {
                  fetchFilteredClients();
                }}
              >
                Buscar
              </button>
            </div>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Email</th>
                  <th>DNI</th>
                  <th>Teléfono</th>
                  <th>Bannear Usuario</th>
                </tr>
              </thead>
              <tbody>
                {paginatedClientes.map((cliente, index) => (
                  <tr key={cliente._id.toString()}>
                    <td>{startIndex + index + 1}</td>
                    <td>{cliente.firstName}</td>
                    <td>{cliente.lastName}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.dni}</td>
                    <td>{cliente.phone}</td>
                    <td>
                      <button
                        onClick={() =>
                          desactivarUsuario(
                            cliente._id.toString(),
                            cliente.isActive
                          )
                        }
                      >
                        {cliente.isActive ? "Desactivar" : "Activar"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <nav
              aria-label="Page navigation example"
              className="d-flex justify-content-center"
            >
              <ul className="pagination">
                <li className="page-item">
                  <button
                    className="page-link"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>
                {[...Array(totalPages)].map((_, page) => (
                  <li
                    className={`page-item ${
                      currentPage === page + 1 ? "active" : ""
                    }`}
                    key={page}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(page + 1)}
                    >
                      {page + 1}
                    </button>
                  </li>
                ))}
                <li className="page-item">
                  <button
                    className="page-link"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import swal from "sweetalert2";
import CloudinaryImageUpload from "../../components/cloudinary/CloudinaryImageUpload";
import "../../components/navbar1/NavBar1.css";
import "./DashboardAdmin.css";
import { VITE_CLOUDINARY_NAME } from "../../variable";
import ObjectID from "bson-objectid";
import React from "react";
import moment from "moment";
import "moment/locale/es";
import { apiUrl } from "../../url";

moment.locale("es");

type FormValues = {
  name: string;
  description: string;
  backgroundImage: string;
  stock: number;
  price: number;
  categories: string;
};

interface Purchase {
  _id: string;
  idClient: string;
  products: Array<{
    productId: string;
    quantity: number;
    price: number;
    _id: string;
  }>;
  totalPrice: number;
  selectedStatus: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface Client {
  _id: ObjectID;
  firstName: string;
  lastName: string;
  email: string;
  dni: string;
  phone: string;
  isActive: boolean;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  backgroundImage: string;
  stock: number;
  price: number;
  categories: "handle" | "blade" | "knife";
  createdAt: string;
  updatedAt: string;
}

interface DashboardAdminProps {
  product?: Product;
  isAdmin: boolean;
  isLoggedIn: boolean;
}

const DashboardAdmin: React.FC<DashboardAdminProps> = ({
  isAdmin,
  isLoggedIn,
}) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [searchQueryClientes, setSearchQueryClientes] = useState("");
  const [searchQueryClientName, setSearchQueryClientName] = useState("");
  const [filteredComprasByClientName, setFilteredComprasByClientName] =
    useState<Purchase[]>([]);
  const [originalClientes, setOriginalClientes] = useState<Client[]>([]);
  const [purchaseStatusMap, setPurchaseStatusMap] = useState<{
    [key: string]: string;
  }>({});
  const [clientes, setClientes] = useState<Client[]>([]);
  const [compras, setCompras] = useState<Purchase[]>([]);
  const [searchQueryPurchases, _setSearchQueryPurchases] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageCompras, setCurrentPageCompras] = useState<number>(1);
  const [productos, setProductos] = useState<Product[]>([]);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] =
    useState<string>("categoria1");
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
        categories: selectedCategory,
      };
      await axios.post(`${apiUrl}/products`, dataWithImage);

      swal.fire({
        position: "center",
        icon: "success",
        title: "Producto creado correctamente!",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
      clearImage();
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        swal.fire({
          position: "center",
          icon: "error",
          title: "Admin!",
          text: "No se pueden crear dos productos con el mismo nombre",
        });
      } else {
        swal.fire({
          position: "center",
          icon: "error",
          title: "Oops...",
          text: "Ocurrió un error inesperado!",
        });
      }
      console.error(error);
    }
  };

  const handleImageUpload = (imageUrl: string) => {
    setImageUrl(imageUrl);
  };

  const fetchClients = async (page: number) => {
    try {
      const response = await axios.get(
        `${apiUrl}/clients/allclient?page=${page}&perPage=7`
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

  const fetchFilteredClients = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/clients?search=${searchQueryClientes}&page=${currentPage}&perPage=7`
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

  const filteredClientesList = originalClientes.filter((cliente) =>
    cliente.firstName.toLowerCase().includes(searchQueryClientes.toLowerCase())
  );

  const clientsPerPage = 7;
  const totalPages = Math.ceil(filteredClientesList.length / clientsPerPage);

  const startIndex = (currentPage - 1) * clientsPerPage;
  const endIndex = startIndex + clientsPerPage;
  const paginatedClientes = filteredClientesList.slice(startIndex, endIndex);

  const filteredCompras = compras.filter((compra) =>
    compra.status.toLowerCase().includes(searchQueryPurchases.toLowerCase())
  );

  const comprasPerPage = 7;
  const totalPagesCompras = Math.ceil(filteredCompras.length / comprasPerPage);

  const startIndexCompras = (currentPageCompras - 1) * comprasPerPage;
  const endIndexCompras = startIndexCompras + comprasPerPage;
  filteredCompras.slice(startIndexCompras, endIndexCompras);

  const desactivarUsuario = async (userId: string, isActive: boolean) => {
    try {
      const newIsActive = !isActive;

      const response = await axios.put(`${apiUrl}/clients/active/${userId}`, {
        isActive: newIsActive,
      });

      if (response.status === 200) {
        const updatedClientes = clientes.map((cliente) => {
          if (cliente._id.toString() === userId) {
            return {
              ...cliente,
              isActive: newIsActive,
            };
          }
          return cliente;
        });

        setClientes(updatedClientes);

        swal.fire({
          position: "center",
          icon: "success",
          title: newIsActive
            ? "Cliente activado correctamente"
            : "Cliente desactivado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error(
          "Error al activar/desactivar el cliente:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error al activar/desactivar el cliente:", error);
    }
  };

  const fetchPurchases = async (): Promise<Purchase[]> => {
    try {
      const respuesta = await axios.get<Purchase[]>(`${apiUrl}/purchases`);
      const compra = respuesta.data;
      return compra;
    } catch (error) {
      console.error("Error al obtener las compras:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchPurchases()
      .then((purchaseData) => {
        setCompras(purchaseData);
        const initialStatusMap: { [key: string]: string } = {};
        purchaseData.forEach((purchase) => {
          purchase.selectedStatus = purchase.status;
          initialStatusMap[purchase._id] = purchase.status;
        });
        setPurchaseStatusMap(initialStatusMap);
      })
      .catch((error) => {
        console.error("Error al obtener las compras:", error.message);
      });
  }, []);

  useEffect(() => {
    fetchPurchases()
      .then((purchaseData) => {
        setCompras(purchaseData);
      })
      .catch((error) => {
        console.error("Error al obtener las compras:", error.message);
      });
  }, []);

  const fetchProductos = async (): Promise<Product[]> => {
    try {
      const response = await axios.get<Product[]>(`${apiUrl}/products`);
      const productosData = response.data;
      return productosData;
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchProductos()
      .then((productosData) => {
        setProductos(productosData);
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error.message);
      });
  }, []);

  if (!isLoggedIn || !isAdmin) {
    navigate("/home");
    return null;
  }

  const handleStatusChange = async (purchasesId: string, newStatus: string) => {
    try {
      await axios.put(`${apiUrl}/purchases/${purchasesId}`, {
        status: newStatus,
      });
      setPurchaseStatusMap((prevStatusMap) => ({
        ...prevStatusMap,
        [purchasesId]: newStatus,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const filterComprasByClientName = (clientName: string) => {
    if (clientName.trim() === "") {
      setFilteredComprasByClientName(compras);
    } else {
      const filteredCompras = compras.filter((compra) =>
        clientes
          .find(
            (cliente) => cliente._id.toString() === compra.idClient.toString()
          )
          ?.firstName.toLowerCase()
          .includes(clientName.toLowerCase())
      );
      setFilteredComprasByClientName(filteredCompras);
    }
  };

  return (
    <div className="container-fluid perrito-admin ">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 mb-4  justify-content-center">
          <form
            className="admin ml-auto mt-5 mb-5 center-content"
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
              <select
                style={{ height: "3em", borderRadius: "6px" }}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option> Elegí una categoría </option>
                <option value="handle">Cabo</option>
                <option value="blade">Hoja</option>
                <option value="knife">Cuchillo</option>
              </select>
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
        <div className="container-sm center-content">
          <div className="row justify-content-center">
            <div
              className="col-lg-6 col-md-12 col-sm-4 mb-4 text-center"
              style={{
                color: "white",
                border: "solid",
                backgroundColor: "black",
                borderRadius: "25px",
                opacity: "0.9",
              }}
            >
              <h1 className="h1-admin-dashbordadmin">Bienvenido admin!</h1>{" "}
              <br />
              <p className="fs-4">
                Este es tu panel, aca tenes una breve explicación de como
                funcionan las tres secciones que vas a encontrar
              </p>
              <br />
              <ul>
                <li className="fs-5 text-start">
                  SECCION CREA TU PRODUCTO: En esta seccion vas a poder crear
                  todos los productos de tu inventario llenando un simple
                  formulario.
                </li>
                <hr />
                <li className="fs-5 text-start">
                  SECCION CLIENTES: Aquí vas a poder visualizar la lista de
                  clientes que te hicieron al menos una compra, vas a poder
                  acceder a sus datos de contacto. También vas a poder buscar
                  cliente por e-mail o DNI y desactivar clientes para que no
                  puedan acceder a la función de comprar en caso que sea
                  necesario (ACLARACIÓN: a los clientes los vas a poder activar
                  y desactivar cuando quieras tan solo con un click)
                </li>
                <hr />
                <li className="fs-5 text-start">
                  SECCION HISTORIAL DE COMPRAS: Finalmente te brindamos una
                  sección donde vas a poder ver todas las compras realizadas,
                  como asi tambien buscar una compra por un cliente en
                  específico y cambiarle el estado a las compras dependiendo si
                  el cliente ya abono el pago, si el/los productos fueron
                  entregados o si la compra fue cancelada
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr
          className="mx-auto mb-5"
          style={{ border: " 1px solid", opacity: "1", width: "80%" }}
        />
      </div>
      <div className="container-fluid table-responsive center-content-tabllaa">
        <div className="row">
          <div className="text-center">
            <div
              className="contenido-tabla col-lg-12 col-md-12 col-sm-12 mb-4 mx-auto mt-5 mb-5 p-5 d-block"
              style={{
                border: "solid",
                backgroundColor: "white",
                opacity: "0.9",
                borderRadius: "18px",
                lineHeight: "3em",
                fontSize: "1.2em",
              }}
            >
              <h1 className="h1-admin-dashbordadmin">Clientes</h1>
              <div className="text-end mb-5">
                <input
                  style={{ width: "14em" }}
                  value={searchQueryClientes}
                  onChange={(e) => setSearchQueryClientes(e.target.value)}
                  placeholder="&nbsp;&nbsp;Buscar cliente por nombre"
                />
                <button
                  className="ms-4"
                  onClick={() => {
                    fetchFilteredClients();
                  }}
                >
                  <h5 className="h5buscar-admin"> Buscar</h5>
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
                    <tr key={index}>
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
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Anterior
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
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Siguiente
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <hr
        className="mx-auto mb-5"
        style={{ border: "1px solid", opacity: "1", width: "80%" }}
      />
      <div className="container-fluid table-responsive center-content-tabllaa">
        <div className="row justify-content-center">
          <div className="text-center">
            <div
              className="contenido-tabla col-lg-12 col-md-12 col-sm-12 mb-4 mx-auto mt-5 mb-5 p-5 d-block"
              style={{
                border: "solid",
                backgroundColor: "white",
                opacity: "0.9",
                borderRadius: "18px",
                lineHeight: "3em",
                fontSize: "1.2em",
              }}
            >
              <h1>Historial de compras</h1>
              <div className="mb-5 d-flex justify-content-between">
                <div>
                  <input
                    style={{ width: "14em" }}
                    value={searchQueryClientName}
                    onChange={(e) => {
                      setSearchQueryClientName(e.target.value);
                      filterComprasByClientName(e.target.value);
                    }}
                    placeholder="&nbsp;&nbsp;Buscar cliente por nombre"
                  />
                </div>
              </div>
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Cliente</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio por unidad</th>
                    <th>Precio total</th>
                    <th>Estado</th>
                    <th>Fecha de compra</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredComprasByClientName.map((compra, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {
                          clientes.find(
                            (cliente) =>
                              cliente._id.toString() ===
                              compra.idClient.toString()
                          )?.firstName
                        }{" "}
                        {
                          clientes.find(
                            (cliente) =>
                              cliente._id.toString() ===
                              compra.idClient.toString()
                          )?.lastName
                        }
                      </td>
                      <td>
                        {compra.products.map((producto, productoIndex) => (
                          <p key={productoIndex}>
                            {
                              productos.find(
                                (p) => p._id === producto.productId
                              )?.name
                            }
                          </p>
                        ))}
                      </td>
                      <td>
                        {compra.products.map((producto, index) => (
                          <p key={index}>{producto.quantity}</p>
                        ))}
                      </td>
                      <td>
                        {compra.products.map((producto, index) => (
                          <p key={index}>{producto.price}</p>
                        ))}
                      </td>
                      <td>{compra.totalPrice}</td>
                      <td>
                        <select
                          value={purchaseStatusMap[compra._id] || ""}
                          onChange={(e) =>
                            handleStatusChange(compra._id, e.target.value)
                          }
                        >
                          <option value="pending pay">Pendiente de pago</option>
                          <option value="paid">Pagado</option>
                          <option value="sent">Enviado</option>
                          <option value="submitted">Entregado</option>
                          <option value="canceled">Cancelado</option>
                        </select>
                      </td>
                      <td>
                        {moment(compra.createdAt).format("D/M/YYYY H:mm")}
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
                  <li
                    className={`page-item ${
                      currentPageCompras === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      disabled={currentPageCompras === 1}
                      onClick={() =>
                        setCurrentPageCompras(currentPageCompras - 1)
                      }
                    >
                      Anterior
                    </button>
                  </li>
                  {[...Array(totalPagesCompras)].map((_, page) => (
                    <li
                      className={`page-item ${
                        currentPageCompras === page + 1 ? "active" : ""
                      }`}
                      key={page}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPageCompras(page + 1)}
                      >
                        {page + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPageCompras === totalPagesCompras ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      disabled={currentPageCompras === totalPagesCompras}
                      onClick={() =>
                        setCurrentPageCompras(currentPageCompras + 1)
                      }
                    >
                      Siguiente
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import swal from "sweetalert2";
import larryTexto from "../../assets/larry-texto.png";
import NavBar2 from "../../components/navbar2/NavBar2";
import CloudinaryImageUpload from "../../components/cloudinary/CloudinaryImageUpload";
import "../../components/navbar1/NavBar1.css";
import "./DashboardAdmin.css";
import { VITE_CLOUDINARY_NAME } from "../../variable";

type FormValues = {
  name: string;
  description: string;
  backgroundImage: string;
  stock: number;
  price: number;
};

const DashboardAdmin = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const cloudinaryName = VITE_CLOUDINARY_NAME || "";
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>();

  const crearProducto = async (data: FormValues) => {
    try {
      const dataWithImage = {
        ...data,
        backgroundImage: imageUrl, // Asigna la URL de la imagen subida al campo 'backgroundImage'
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

  // Asegúrate de llamar a la función onImageUpload con la URL de la imagen.
  const handleImageUpload = (imageUrl: string) => {
    setImageUrl(imageUrl); // Actualizamos el estado imageUrl con la URL de la imagen subida.
  };

  return (
    <div className="perrito-admin">
      <NavBar2
        handleLogout={function (): void {
          throw new Error("Function not implemented.");
        }}
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />

      <div className="container formAdmin-container">
        <div className="row">
          <div className="col-8">
            <form
              className="admin ml-auto"
              onSubmit={handleSubmit(crearProducto)}
              encType="multipart/form-data"
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
                  <p className="text-danger">
                    El campo descripcion es requerido
                  </p>
                )}
                <CloudinaryImageUpload
                  onImageUpload={handleImageUpload}
                  cloudinaryName={cloudinaryName}
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
          <div className="col-4">
            <h3 className="es-lo-maximo"></h3>
            <img
              className="larry animate_animated animate_backInRight"
              src={larryTexto}
              alt="larry-bob-esponja"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;

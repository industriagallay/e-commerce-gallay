import { useState, useEffect } from "react";
import CloudinaryImageUpload from "../cloudinary/CloudinaryImageUpload";
import axios from "axios";
import { useForm } from "react-hook-form";
import swal from "sweetalert2";
import ObjectId from "bson-objectid";
import "./UpdateProductBtn.css";
import yunque2 from "../../assets/yunque2.jpg";
import { VITE_CLOUDINARY_NAME } from "../../variable";
import { useParams, useNavigate } from "react-router-dom";

type FormValues = {
  name: string;
  description: string;
  backgroundImage: string;
  stock: number;
  price: number;
};

interface Product {
  _id: ObjectId;
  name: string;
  description: string;
  backgroundImage: string;
  stock: number;
  price: number;
}

interface UpdateProductBtnProps {
  product: Product;
}

const UpdateProductBtn: React.FC<UpdateProductBtnProps> = ({ product }) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [productData, setProductData] = useState<Product | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>("");
  const navigate = useNavigate();
  const { id } = useParams();
  const cloudinaryName = VITE_CLOUDINARY_NAME || "";
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>();

  useEffect(() => {
    if (id !== undefined) {
      const fetchProduct = async (productId: string) => {
        try {
          const response = await axios.get<Product>(
            `http://localhost:3001/products/id/${encodeURIComponent(productId)}`
          );
          const productData = response.data;
          setProductData(productData);
          setSelectedImageUrl(productData?.backgroundImage || "");
        } catch (error) {
          console.error("Error al obtener los detalles del producto:", error);
        }
      };

      fetchProduct(id);
    }
  }, [id]);

  useEffect(() => {
    if (productData) {
      reset({
        name: productData.name || "",
        description: productData.description || "",
        stock: productData.stock || 0,
        price: productData.price || 0,
        backgroundImage: selectedImageUrl || "",
      });
    }
  }, [productData, reset, selectedImageUrl]);

  const modificarProducto = async (data: FormValues) => {
    try {
      if (!productData) {
        console.error("El producto no está definido");
        return;
      }

      const dataWithImage = {
        ...data,
        backgroundImage: imageUrl,
      };
      const response = await axios.put(
        `http://localhost:3001/products/put/${productData._id}`,
        dataWithImage
      );
      console.log({ respuesta: response });

      swal.fire({
        position: "center",
        icon: "success",
        title: "producto modificado correctamente!",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
      clearImage();
      navigate("/home");
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

  const clearImage = () => {
    setImageUrl("");
  };

  const handleImageUpload = (imageUrl: string) => {
    setImageUrl(imageUrl);
    setSelectedImageUrl(imageUrl);
  };

  return (
    <>
      {productData ? (
        <div
          style={{
            backgroundImage: `url(${yunque2})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
          }}
        >
          <form
            className="admin ml-auto mt-5 mb-5"
            onSubmit={handleSubmit(modificarProducto)}
            encType="multipart/form-data"
            onReset={clearImage}
          >
            <div className="header-admin text-center">
              Hola admin! gestióna desde aca todos los campos de tus productos
            </div>
            <div className="inputs-admin">
              <p>No olvides seleccionar una foto</p>
              <CloudinaryImageUpload
                onImageUpload={handleImageUpload}
                cloudinaryName={cloudinaryName}
                clearImage={clearImage}
                initialImage={selectedImageUrl}
              />
              <input
                type="text"
                placeholder="nombre"
                className="input-admin"
                {...register("name", {
                  required: true,
                })}
                defaultValue={product?.name}
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
                defaultValue={product?.description}
              />
              {errors.description?.type === "required" && (
                <p className="text-danger">El campo descripcion es requerido</p>
              )}
              <input
                type="number"
                placeholder="stock"
                className="input-admin"
                {...register("stock", {
                  required: true,
                })}
                defaultValue={product?.stock}
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
                defaultValue={product?.price}
              />
              {errors.price?.type === "required" && (
                <p className="text-danger">El campo precio es requerido</p>
              )}
              <div className="checkbox-container-admin">
                {/* ...contenido del checkbox... */}
              </div>
              <button className="sigin-btn-admin" type="submit">
                Modificar Producto
              </button>
            </div>
          </form>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </>
  );
};

export default UpdateProductBtn;

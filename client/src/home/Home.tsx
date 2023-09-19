import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap, Expo } from "gsap";
import mano1 from "../assets/img/mano1.jpeg";
import axios from "axios";
import ProductCard from "../components/cardsProductos/ProductCard";
import Swal from "sweetalert2";
import ObjectId from "bson-objectid";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Home.css";
import { apiUrl } from "../url";

interface Product {
  categories: string;
  _id: ObjectId;
  name: string;
  description: string;
  backgroundImage: string;
  stock: number;
  price: number;
}

let totalPages = 0;

const Home: React.FC = () => {
  useEffect(() => {
    AOS.init({
      mirror: true,
    });
  }, []);

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 9;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_isHoverEnabled, setIsHoverEnabled] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriceFilter, setSelectedPriceFilter] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  let lastMinPrice = minPrice;
  let lastMaxPrice = maxPrice;
  const navigate = useNavigate();

  const showAllProducts = () => {
    const filteredKnifeProducts = products.filter(
      (product) => product.categories === "knife"
    );

    if (filteredKnifeProducts.length < (currentPage - 1) * productsPerPage) {
      setCurrentPage(1);
    }

    setFilteredProducts(filteredKnifeProducts);
  };

  useEffect(() => {
    totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  }, [filteredProducts]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(`${apiUrl}/products`);

        const filteredKnifeProducts = response.data.filter(
          (product) => product.categories === "knife"
        );

        setProducts(filteredKnifeProducts);
        setFilteredProducts(filteredKnifeProducts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setSelectedFilter("");
      setSelectedPriceFilter("");
      setMinPrice(undefined);
      setMaxPrice(undefined);
    }
  };

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const productsToShow = filteredProducts.slice(startIndex, endIndex);

  const handleMinPriceChange = (value: string) => {
    const numericValue = value.replace(/\D/g, "");

    if (numericValue.length <= 5) {
      setMinPrice(Number(numericValue));
    }
  };

  const handleMaxPriceChange = (value: string) => {
    const numericValue = value.replace(/\D/g, "");

    if (numericValue.length <= 5) {
      setMaxPrice(Number(numericValue));
    }
  };
  const handleRangeSearch = () => {
    if (minPrice !== undefined && maxPrice !== undefined) {
      if (minPrice > maxPrice) {
        navigate("/nohaybusqueda");
        return;
      }

      if (minPrice !== lastMinPrice || maxPrice !== lastMaxPrice) {
        const filtered = products.filter(
          (product) => product.price >= minPrice && product.price <= maxPrice
        );
        setFilteredProducts(filtered);
        lastMinPrice = minPrice;
        lastMaxPrice = maxPrice;
      }
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filterValue = event.target.value;

    setSelectedFilter(filterValue);

    if (filterValue === "1") {
      showAllProducts();
    } else if (filterValue === "3") {
      const filtered = products.filter((product) => product.price > 2500);
      setFilteredProducts(filtered);
    } else if (filterValue === "4") {
      const filtered = products.filter((product) => product.price <= 2500);
      setFilteredProducts(filtered);
    }
  };

  const handlePriceFilterChange = (filter: string) => {
    setSelectedPriceFilter(filter);

    if (filter === "hasta") {
      const filtered = products.filter((product) => product.price <= 2500);
      setFilteredProducts(filtered);
    } else if (filter === "rango") {
      const filtered = products.filter(
        (product) => product.price > 2500 && product.price <= 4500
      );
      setFilteredProducts(filtered);
    } else if (filter === "mas") {
      const filtered = products.filter((product) => product.price > 4500);
      setFilteredProducts(filtered);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const [animationsCompleted, setAnimationsCompleted] = useState(false);
  useEffect(() => {
    if (!animationsCompleted) {
      const Homeimg_img = document.querySelector(".home__img img");
      const Hometitle = document.querySelector(".home__title");

      const Homeyear = document.querySelector(".home__year");
      const Homescroll = document.querySelector(".home__scroll");
      const Homeprimary = document.querySelector(".home__primary");
      const Homesecondary = document.querySelector(".home__secondary");
      const delay = 0.0;

      setTimeout(() => {
        gsap.from(Homeprimary, {
          onComplete: () => {
            gsap.to(Homeprimary, {
              width: "100%",
              ease: Expo.easeInOut,
              delay: 0.4,
              duration: 0.5,
              transition: 0.4,
            });
          },
        });

        gsap.from(Homesecondary, {
          onComplete: () => {
            gsap.to(Homesecondary, {
              width: "100%",
              ease: Expo.easeInOut,
              delay: 0.5,
              duration: 0.5,
              transition: 0.6,
            });
          },
        });
      }, delay * 1000);

      gsap.from(Hometitle, {
        opacity: 0,
        duration: 2,
        delay: 1.5,
        y: 100,
      });

      gsap.from(Homeimg_img, {
        opacity: 0,
        duration: 2,
        delay: 1.5,
        y: -100,
      });

      gsap.from(Homescroll, {
        opacity: 0,
        duration: 3,
        x: -100,
      });

      gsap.from(Homeyear, {
        opacity: 0,
        duration: 1.5,
        delay: 1.5,
        x: 100,
        // });
      });

      setAnimationsCompleted(true);
    }
  }, [animationsCompleted]);

  const handleDeleteProduct = async (product: Product) => {
    try {
      setIsHoverEnabled(false);

      const swalResult = await Swal.fire({
        title:
          "¿Estás seguro de eliminar este producto? Esta acción es irreversible",
        showCancelButton: true,
        confirmButtonText: "Borrar",
      });

      if (swalResult.isConfirmed) {
        const response = await axios.delete(
          `${apiUrl}/products/${product._id}`
        );

        if (response.status === 200) {
          Swal.fire("¡Producto borrado correctamente!", "", "success");

          setProducts((prevProducts) =>
            prevProducts.filter((p) => p._id !== product._id)
          );
        } else {
          Swal.fire("No se pudo borrar el producto", "", "error");
        }
      } else if (swalResult.isDenied) {
        Swal.fire("La acción fue cancelada", "", "info");
      }

      setIsHoverEnabled(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Ups...",
        text: "Ocurrió un error inesperado",
      });
    }
  };

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
    navigate(`/product/edit/${product._id}`);
  };
  useEffect(() => {
    AOS.refreshHard();
  }, [filteredProducts]);

  return (
    <div>
      <header className="l-header"></header>

      <main className="main-bg">
        <div className="home">
          <div className="home__primary col-lg-6 col-md-12">
            <h1 className="home__title">Industria Gallay</h1>
            <div className="home__img">
              <img src={mano1} alt="image-home " />
            </div>
          </div>

          <div className="home__secondary col-lg-6 col-md-12">
            {/* <a className="home__scroll" href="#about">
              SCROLLDOWN
            </a> */}
            <span className="home__year">Bienvenido</span>
          </div>
        </div>
      </main>

      <div className="container-justify-content-start">
        <div className="row-scroll row">
          <div className="col-12 col-md-4 col-lg-3">
            <div className="filter-container ">
              <div className="vertical-filter">
                <div className="search-container">
                  <input
                    className="input-filtrado-vertical"
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>

                <div>
                  <div className="form-select-filtro-container">
                    <select
                      className="form-select-filtro form-select-sm"
                      aria-label=".form-select-sm example"
                      style={{ width: "94%" }}
                      value={selectedFilter}
                      onChange={handleFilterChange}
                    >
                      <option value="" disabled>
                        Filtrar por...
                      </option>

                      <option className="option-filter-vertical" value="3">
                        Mayor Precio
                      </option>
                      <option className="option-filter-vertical" value="4">
                        Menor Precio
                      </option>
                    </select>
                    <button
                      onClick={showAllProducts}
                      className="show-all-button"
                    >
                      Mostrar Todos
                    </button>
                  </div>
                </div>
                <div className="precioContainer">
                  <span className="precioFiltroA-B">Rango de Precio</span>
                  <p
                    className={`Hasta ${
                      selectedPriceFilter === "hasta" ? "selected" : ""
                    }`}
                    onClick={() => handlePriceFilterChange("hasta")}
                  >
                    Hasta $2.500
                  </p>
                  <p
                    className={`precio A ${
                      selectedPriceFilter === "rango" ? "selected" : ""
                    }`}
                    onClick={() => handlePriceFilterChange("rango")}
                  >
                    $2.500 a $4.500
                  </p>
                  <p
                    className={`Mas_deprecio_B ${
                      selectedPriceFilter === "mas" ? "selected" : ""
                    }`}
                    onClick={() => handlePriceFilterChange("mas")}
                  >
                    Más de $4.500
                  </p>
                </div>
                <div className="MIN_MAX_Container">
                  <input
                    inputMode="numeric"
                    placeholder="Mínimo"
                    className="Min-number"
                    type="text"
                    value={minPrice !== undefined ? minPrice.toString() : ""}
                    onChange={(event) =>
                      handleMinPriceChange(event.target.value)
                    }
                    maxLength={5}
                  />
                  <div className="line-between-inputs"></div>
                  <input
                    inputMode="numeric"
                    placeholder="Máximo"
                    className="Max-number"
                    type="text"
                    value={maxPrice !== undefined ? maxPrice.toString() : ""}
                    onChange={(event) =>
                      handleMaxPriceChange(event.target.value)
                    }
                    maxLength={5}
                  />
                  <div className="Arrow-iconSelect" onClick={handleRangeSearch}>
                    <i className="biarrow bi-arrow-right-circle"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-8 col-lg-8">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3">
              {productsToShow.map((product, index) => (
                <div key={`product-${index}`}>
                  <ProductCard
                    product={product}
                    hovered={product.price === hoveredCard}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    setProducts={setProducts}
                    onClick={() => handleCardClick(product)}
                    onDelete={() => handleDeleteProduct(product)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Anterior
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
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
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;

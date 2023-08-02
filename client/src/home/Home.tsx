import React, { useEffect, useState } from "react";
import { gsap, Expo } from "gsap";
import mano1 from "../assets/img/mano1.jpeg";
import NavBar1 from "../components/navbar1/NavBar1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Home.css";
import "../assets/css/style.css";
import "../components/navbar1/NavBar1.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  description: string;
  backgroundImage: string;
  stock: number;
  price: number;

  // Add other properties of the product if needed
}

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  interface Category {
    name: string;
    subcategories: string[];
    showSubcategories: boolean;
  }
  useEffect(() => {
    // Aquí puedes realizar la llamada a la API para obtener las categorías y subcategorías
    // y luego asignarlas al estado de "categories" usando setCategories
    const fetchedCategories: Category[] = [
      {
        name: "Categoría 1",
        subcategories: [
          "Subcategoría 1.1",
          "Subcategoría 1.2",
          "Subcategoría 1.3",
        ],
        showSubcategories: false,
      },
      {
        name: "Categoría 2",
        subcategories: ["Subcategoría 2.1", "Subcategoría 2.2"],
        showSubcategories: false,
      },
      // Agrega más categorías según tus necesidades
    ];
    setCategories(fetchedCategories);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProducts(products);
      } catch (error) {
        // Handle error, e.g., show an error message
      }
    };

    fetchProducts();
  }, []);

  const toggleSubcategories = (index: number) => {
    setCategories((prevCategories) => {
      const updatedCategories = prevCategories.map((category, i) => ({
        ...category,
        showSubcategories: i === index ? !category.showSubcategories : false,
      }));
      return updatedCategories;
    });
  };

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

  const getProducts = async (): Promise<Product[]> => {
    try {
      const response = await axios.get<Product[]>(
        "http://localhost:3001/products"
      );
      return response.data; // Assuming the server returns an array of products
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div>
      <header className="l-header">
        <NavBar1 />
      </header>

      <main className="main-bg">
        <div className="home">
          <div className="home__primary">
            <h1 className="home__title">
              Industria <br />
              Gallay
            </h1>
            <div className="home__img ">
              <img src={mano1} alt="image-home " />
            </div>
          </div>

          <div className="home__secondary">
            <a className="home__scroll" href="#about">
              SCROLLDOWN
            </a>
            <span className="home__year">Bienvenido</span>
          </div>
        </div>
      </main>

      <div className="container-justify-content-start">
        <div className="row-scroll">
          <div className="col-2">
            <div className="filter-container ">
              <div className="vertical-filter">
                <div className="search-container">
                  <input
                    className="input-filtrado-vertical"
                    type="text"
                    placeholder="Buscar productos..."
                  />
                </div>

                <div>
                  <select
                    className="form-select-filtro form-select-sm"
                    aria-label=".form-select-sm example"
                    style={{ width: "94%" }}
                  >
                    <input
                      className="option-filter-vertical"
                      type="texto"
                      placeholder="Ordenar Por.."
                    ></input>

                    <option className="option-filter-vertical" value="1">
                      Todos
                    </option>
                    <option className="option-filter-vertical" value="2">
                      Destacados
                    </option>
                    <option className="option-filter-vertical" value="3">
                      Mayor Precio
                    </option>
                    <option className="option-filter-vertical" value="3">
                      Menor Precio
                    </option>
                  </select>
                </div>
                <div className="categories-container">
                  {categories.map((category, index) => (
                    <div key={category.name} className="category-filter">
                      <h3
                        className={`h3-filtro-vertical ${
                          category.showSubcategories ? "active" : ""
                        }`}
                        onClick={() => toggleSubcategories(index)}
                      >
                        {category.name}
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className={
                            category.showSubcategories ? "arrow-down" : ""
                          }
                        />
                      </h3>

                      {category.showSubcategories && (
                        <ul className="ul-filtrado-vertical">
                          {category.subcategories.map((subcat) => (
                            <li key={subcat}>{subcat}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-10">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 me-auto g-4">
              {products.map((product) => (
                <div className="col-inicio-sesion" key={product.id}>
                  <div className="card-inicio-productos h-100">
                    <img
                      src={product.backgroundImage}
                      className="card-img-top-inicio"
                      alt={product.name}
                    />
                    <div className="card-body-inicio-productos">
                      <h5 className="card-title-inicio">{product.name}</h5>
                      <p className="card-title-inicio">{product.description}</p>
                      <p className="card-text-inicio">
                        precio: ${product.price}
                      </p>
                      <p className="card-text-inicio">stock: {product.stock}</p>
                      <Link to="/" aria-current="page" className="">
                        <button className="add-to-cart-btn justify-content-start">
                          Sumar al carrito
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

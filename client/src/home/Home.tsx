import React, { useEffect, useRef, useState } from "react";
import { gsap, Expo } from "gsap";
import mano1 from "../assets/img/mano1.jpeg";
import NavBar1 from "../components/navbar1/NavBar1";
import useClickOutside from "../components/hooks/useEffect";
import "./Home.css";
import "../assets/css/style.css";
import "../components/navbar1/NavBar1.css";

const Home = () => {
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

  /*ToggleSubCategorias*/
  const selectRef = useRef<HTMLSelectElement>(null);

  useClickOutside(selectRef, () => setSubcategoriasVisible(false));

  const handleCategoriasToggle = (categoria: string) => {
    if (selectedCategoria === categoria) {
      // Si haces clic en la misma categoría, simplemente cambia la visibilidad
      setSubcategoriasVisible(!subcategoriasVisible);
      setSelectedCategoria(null);
      setSubcategoriasVisible(false);
    } else {
      // Si haces clic en una nueva categoría, muestra sus subcategorías
      setSelectedCategoria(categoria);
      setSubcategoriasVisible(true);
    }
  };

  const [selectedCategoria, setSelectedCategoria] = useState<string | null>(
    null
  );
  const [subcategoriasVisible, setSubcategoriasVisible] = useState(false);

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
            <div className="home__img">
              <img src={mano1} alt="image-home" />
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
      <div className="container-md mt-5">
        <div className="row">
          <div className="select-padding col-md-8 ">
            <select
              ref={selectRef}
              className="form-select"
              aria-label="Default select example"
              defaultValue="default" // Aquí establece el valor predeterminado
              onChange={(e) => handleCategoriasToggle(e.target.value)}
            >
              <option value="default" disabled selected>
                Categorias
              </option>
              <option value="cuchillo">Cuchillo</option>
              <option value="hoja">Hoja</option>
              <option value="mango">Mango</option>
            </select>

            {selectedCategoria === "cuchillo" && subcategoriasVisible && (
              <optgroup label="Cuchillo">
                <option value="1">Cuchillo1</option>
                <option value="2">Cuchillo2</option>
                <option value="3">Cuchillo3</option>
              </optgroup>
            )}
            {selectedCategoria === "hoja" && subcategoriasVisible && (
              <optgroup label="Hoja">
                <option value="4">Carbono</option>
                <option value="5">Hierro</option>
                <option value="6">Acero</option>
              </optgroup>
            )}
            {selectedCategoria === "mango" && subcategoriasVisible && (
              <optgroup label="Mango">
                <option value="7">marfil</option>
                <option value="8">Roble</option>
                <option value="9">Acero</option>
              </optgroup>
            )}
          </div>
          <div className="col-md-4">
            <select
              className=" form-select"
              aria-label="Default select example"
            >
              <option value="default" disabled>
                Ordenar Por
              </option>
              <option value="1">Todo </option>
              <option value="2">Destacado</option>
              <option value="3">Mayor Precio</option>
              <option value="3">Menor Precio</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

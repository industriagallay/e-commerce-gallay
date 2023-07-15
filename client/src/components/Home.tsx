// import React from "react";
// import NavBar2 from "./navbar2/NavBar2";
// import black1 from "../assets/black1.jpeg";
// import "./Home.css";

// const Home = () => {
//   return (
//     <div>
//       <NavBar2 />
//       <div className="container-fluid ">
//         <div className="position-relative ">
//           <div className="row" id="my-custom-row">
//             <img src={black1} className="img-fluid col-12-md" alt="arte2 " />

//             <div className="row align-items-center ">
//               <div className="col text-center position-absolute top-50 start-50 translate-middle text-center">
//                 <h1 className="" text-white>
//                   Industria
//                 </h1>
//                 <h2 className="" text-white>
//                   Gallay
//                 </h2>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useRef, useState } from "react";
import { gsap, Expo } from "gsap";
import "../components/Home.css"
import "../assets/css/style.css";


import mano1 from "../assets/img/mano1.jpeg";

const Home = () => {
  /*GSAP */
  useEffect(() => {
    const Homeimg_img = document.querySelector(".home__img img");
  
    const Hometitle = document.querySelector(".home__title");

    const Homeyear = document.querySelector(".home__year");
    const Homescroll = document.querySelector(".home__scroll");
    const Homeprimary = document.querySelector(".home__primary");
    const Homesecondary = document.querySelector(".home__secondary");
    const delay = 0.0;

    setTimeout(() => {
      gsap.from(Homeprimary, {
        // duration:0,
        // overwrite:"none",

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
        // duration:0,
        // overwrite: "none",

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
    });
  });

  const toggleRef = useRef(null);
  const navRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <header className="l-header">
        <nav className="nav bd-grid">
          <button
            className="show"
            ref={toggleRef}
            id="nav-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          ></button>
          <div>
            <a href="" className="nav__logo">
              Fashion
            </a>
          </div>

          <nav>
            <div
              ref={navRef}
              id="nav-menu"
              className={isMenuOpen ? "show" : ""}
            >
              <ul className="nav__list">
                <li className="nav__item">
                  <a className="nav__link"> Home</a>{" "}
                </li>
                <li className="nav__item">
                  <a href="" className="nav__link">
                    {" "}
                    Woman
                  </a>{" "}
                </li>
                <li className="nav__item">
                  <a href="" className="nav__link">
                    {" "}
                    Man
                  </a>{" "}
                </li>
                <li className="nav__item">
                  <a href="" className="nav__link">
                    Explore
                  </a>{" "}
                </li>
              </ul>
            </div>
          </nav>
        </nav>
      </header>

      <main className="main-bg">
        {/* HOME*/}
        <div className="home">
          <div className="home__primary">
            <h1 className="home__title">
              Fashion Online <br />
              Store
            </h1>
            <div className="home__img">
              <img src={mano1} alt="image-home" />
            </div>
            
          </div>

          <div className="home__secondary">
            <a className="home__scroll" href="#about">
              SCROLLDOWN
            </a>
            <span className="home__year">2023</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

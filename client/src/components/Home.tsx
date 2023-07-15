import React, { useEffect, useRef, useState } from "react";
import { gsap, Expo } from "gsap";
import "../components/Home.css";
import "../assets/css/style.css";
import mano1 from "../assets/img/mano1.jpeg";
import { Link } from "react-router-dom";
import NavBar1 from "./navbar1/NavBar1";
import "../components/navbar1/NavBar1.css";

const Home = () => {
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
    });
  });

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
      <section>
        <h1> QUIERO MI SCROOOOOOOOOLLLLLLLLLLLLLL</h1>
      </section>
    </div>
  );
};

export default Home;

import React from "react";
import Header from "../../components/Header";
import Hero from "../Hero";
import Destaque from "../Destaque";
import Sobre from "../SobreNos";
import ComoPedir from "../ComoPedir";
import Galeria from "../Galeria";
import Contato from "../Contato";
import Footer from "../Footer";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Destaque />
      <Galeria />
      <ComoPedir />
      <Sobre />
      <Contato />
      <Footer />
    </>
  );
};

export default Home;

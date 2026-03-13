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
      <Sobre />
      <ComoPedir />
      <Galeria />
      <Contato />
      <Footer />
    </>
  );
};

export default Home;

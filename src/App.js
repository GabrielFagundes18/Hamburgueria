import "./App.css";
import Header from "./components/Header";
import Contato from "./page/Contato";
import Destaque from "./page/Destaque";
import ComoPedir from "./page/ComoPedir";
import Hero from "./page/Hero";
import Sobre from "./page/SobreNos";
import Galeria from "./page/Galeria";
import Footer from "./page/Footer";


function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Destaque />
      <Sobre/>
      <ComoPedir/>
      <Galeria/>
      <Contato />
      <Footer/>
    </div>
  );
}

export default App;

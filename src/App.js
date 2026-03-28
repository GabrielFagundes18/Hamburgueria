import "./App.css";

import Cardapio from "./page/Cardapio";
import Sucesso from "./components/Sucesso/Sucesso";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cardapio" element={<Cardapio />} />
          <Route path="/sucesso" element={<Sucesso />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

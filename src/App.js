import "./App.css";

import Cardapio from "./page/Cardapio";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cardapio" element={<Cardapio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { useState } from "react";
import "./style.css";
import Button from "../../components/Button";
const imagens = [
  { url: "https://images.unsplash.com/photo-1550547660-d9450f859349", size: "grande" },
  { url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd", size: "normal" },
  { url: "https://images.unsplash.com/photo-1606755962773-d324e0a13086", size: "vertical" },
  { url: "https://images.unsplash.com/photo-1550317138-10000687a72b", size: "normal" },
  { url: "https://images.unsplash.com/photo-1600891964092-4316c288032e", size: "normal" },
  { url: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d", size: "horizontal" },

  { url: "https://images.unsplash.com/photo-1513104890138-7c749659a591", size: "normal" },
  { url: "https://images.unsplash.com/photo-1551782450-17144efb9c50", size: "normal" },
  { url: "https://images.unsplash.com/photo-1544025162-d76694265947", size: "vertical" },
  { url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836", size: "normal" },
  { url: "https://images.unsplash.com/photo-1559847844-5315695dadae", size: "horizontal" },
  { url: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092", size: "normal" }
];

const Galeria = () => {

  const [visivel, setVisivel] = useState(6);
  const [imagemAtiva, setImagemAtiva] = useState(null);

  const toggleGaleria = () => {
    if (visivel >= imagens.length) {
      setVisivel(6);
    } else {
      setVisivel(imagens.length);
    }
  };

  return (
    <section className="galeria-section" id="galeria">

      <div className="galeria-header">
        <h2>Nossa <span>Galeria</span></h2>
        <p>Veja alguns dos nossos burgers mais pedidos</p>
      </div>

      <div className="galeria-grid">

        {imagens.slice(0, visivel).map((img, index) => (
          <img
            key={index}
            src={img.url}
            alt="burger"
            className={img.size}
            onClick={() => setImagemAtiva(img.url)}
          />
        ))}

      </div>

      <div className="galeria-btn" >
        <Button onClick={toggleGaleria} variant="secondary">
  {visivel >= imagens.length ? "Mostrar Menos" : "Mostrar Mais"}
</Button>
      </div>

      {imagemAtiva && (
        <div className="lightbox" onClick={() => setImagemAtiva(null)}>
          <span className="close">✕</span>
          <img src={imagemAtiva} alt="burger grande" />
        </div>
      )}

    </section>
  );
};

export default Galeria;
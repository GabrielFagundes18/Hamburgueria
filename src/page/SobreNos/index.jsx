import React, { useState, useEffect } from "react";
import "./style.css";
import Button from "../../components/Button";

const slides = [
  {
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349",
    title: "Nossa História",
    text: "A Ninja Burger nasceu da ideia de que a rapidez de um mestre das sombras deve caminhar lado a lado com a precisão de um grande chef. Em nossa cozinha, cada ingrediente é selecionado com o rigor de um treinamento milenar, garantindo que o blend de carne suculento e os molhos artesanais cheguem à mesa com o frescor e a potência que o seu paladar exige. Mais do que apenas saciar a fome, nossa missão é oferecer uma experiência furtiva contra o comum, onde a tecnologia e o sabor se unem para criar o hambúrguer perfeito para quem não tem tempo a perder, mas não abre mão da excelência.",
  },
  {
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    title: "Ingredientes Frescos",
    text: "Na Ninja Burger, a excelência começa na seleção rigorosa de cada componente. Nosso blend de carne é preparado diariamente com cortes selecionados para garantir a suculência máxima, abraçado por pães artesanais de fermentação natural, como o brioche amanteigado, sempre selados na chapa. Utilizamos queijos de alta pureza para o derretimento perfeito e vegetais frescos, colhidos e fatiados no dia para manter a crocância. Para finalizar, nossos molhos autorais trazem o equilíbrio de sabores que transforma um simples lanche em uma experiência gastronômica ágil e memorável.",
  },
  {
    img: "https://images.unsplash.com/photo-1606755962773-d324e0a13086",
    title: "Receitas Exclusivas",
    text: "Os Lanches Especiais da Ninja Burger são o ponto alto de nossa engenharia gastronômica, onde a tradição do churrasco encontra a precisão técnica. Destacamos criações como o Shogun Double, com dois blends de carne de 160g e camadas generosas de bacon crocante caramelizado, e o Cyber Onion, que utiliza anéis de cebola empanados em panko para uma textura futurista. Cada especialidade é montada com queijos fundidos artesanalmente e finalizada com nossos molhos secretos, garantindo uma explosão de sabores que você não encontrará em nenhum outro lugar, tudo servido com a agilidade que o seu dia a dia exige.",
  },
  {
    img: "https://images.unsplash.com/photo-1550317138-10000687a72b",
    title: "Experiência",
    text: "A experiência na Ninja Burger foi projetada para ser tão ágil quanto impactante, unindo a velocidade da tecnologia à hospitalidade de uma hamburgueria de elite. Desde o momento em que o pedido é realizado em nossa interface intuitiva até a entrega final, cada etapa é cronometrada para que o cliente receba um produto em sua temperatura e textura ideais, sem esperas desnecessárias. Nosso ambiente — físico ou digital — reflete essa modernidade, oferecendo um acompanhamento em tempo real e um sistema de fidelidade que valoriza cada escolha, transformando o simples ato de comer um hambúrguer em um momento de conveniência, precisão e, acima de tudo, muito sabor.",
  },
];

const Sobre = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const intervalo = setInterval(nextSlide, 10000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <section className="sobre" id="Sobre">
      <div className="sobre-header">
        <span className="tag">Sobre Nós</span>
        <p>Conheça a história e a qualidade por trás dos nossos burgers.</p>
      </div>
      <div className="carousel">
        <div className="carousel-img">
          <img src={slides[index].img} alt="burger" />
        </div>

        <div className="carousel-text">
          <h2>{slides[index].title}</h2>
          <p>{slides[index].text}</p>

          <Button 
    variant="primary" 
    onClick={() => window.location.href="/menu"}
  >
    Ver Cardápio
  </Button>
        </div>

        <button className="btn-prev" onClick={prevSlide}>
          ‹
        </button>
        <button className="btn-next" onClick={nextSlide}>
          ›
        </button>
      </div>

      <div className="dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={i === index ? "dot active" : "dot"}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default Sobre;

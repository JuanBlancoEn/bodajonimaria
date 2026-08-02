import "./WeddingHeader.css";

function WeddingHeader() {
  return (
    <section className="wedding-header">

      <img
        src="/jonimaria.jpg"
        alt="Jonatan y María"
        className="wedding-image"
      />

      <div className="header-content">

        <h1>
          Jonatan y María Giorgiana
        </h1>

        <p className="date">
          15 Agosto 2026
        </p>

        <p className="message">
          Gracias por acompañarnos en este día tan especial.
        </p>

      </div>

    </section>
  );
}

export default WeddingHeader;
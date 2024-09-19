import React from "react";
import "./Home.css";
import fondo from './assets/fondo.png';
import playa from './assets/playa.png';

function Home() {
  return (
    <div className="home" id="home">
      <img src={fondo} alt="fondo" className="background-image" />
      <div className="hero">
        <h1>Bienvenidos a Turiscarribean de cali</h1>
        <p>Bienvenido a Turiscarribean, tu puerta de entrada a las maravillas del Caribe. Fundada con la misión de brindar experiencias únicas y memorables, Turiscarribean se dedica a ofrecer una gama completa de servicios turísticos que incluyen tours personalizados, alojamiento de calidad y actividades emocionantes para todo tipo de viajeros.</p>
        <a href="#about" className="cta">Descubre más</a>
      </div>

      <section id="destinos">
        <h3><span>Destinos</span> populares</h3>
        <p>Descubre nuestros destinos turísticos más populares:</p>
        <div className="cards">
          <div className="card" style={{ backgroundImage: `url(${playa})` }}>
            <h3>Playa blanca</h3>
            <p>
            Playa Blanca no se encuentra en Cartagena sino a isla de Barú unos 75 minutos en vehiculo o 35 minutos en lancha
            rápida
            desde el muelle de la Bodeguita en Cartagena. Isla Barú es una de las Islas del Rosario en Colombia.
            </p>
          </div>
          <div className="card" style={{ backgroundImage: `url(${playa})` }}>
            <h3>Playa blanca</h3>
            <p>
            Si bien no es sorprendente que, como una de las playas más impresionantes de Cartagena, Colombia, ¡Playa Blanca
            sea
            bastante popular entre cualquier turista que busque una escapada a la playa durante su viaje a Colombia!
            </p>
          </div>
          <div className="card" style={{ backgroundImage: `url(${playa})` }}>
            <h3>Playa blanca</h3>
            <p>
            Conocer Playa Blanca es una de las mejores decisiones que puedes tomar si te encuentras de visita en Cartagena, su
            hermoso paisaje, y los servicios que se ofrecen te harán vivir una experiencia de otro mundo.
            </p>
          </div>
        </div>
      </section>

      <section className="blanca"></section>

      <section className="section2" id="actividades">
        <h3>Actividades</h3>
        <p>Explora nuestras actividades turísticas:</p>
        <div className="cards">
          <div className="card" style={{ backgroundImage: `url(${playa})` }}>
            <h3>Playa blanca</h3>
            <p>
            Playa Blanca no se encuentra en Cartagena sino a isla de Barú unos 75 minutos en vehiculo o 35 minutos en
                lancha rápida desde el muelle de la Bodeguita en Cartagena. Isla Barú es una de las Islas del Rosario en Colombia.
            </p>
          </div>
          <div className="card" style={{ backgroundImage: `url(${playa})` }}>
            <h3>Playa blanca</h3>
            <p>
            Si bien no es sorprendente que, como una de las playas más impresionantes de Cartagena, Colombia, ¡Playa
            Blanca sea bastante popular entre cualquier turista que busque una escapada a la playa durante su viaje a Colombia!
            </p>
          </div>
          <div className="card" style={{ backgroundImage: `url(${playa})` }}>
            <h3>Playa blanca</h3>
            <p>
            Conocer Playa Blanca es una de las mejores decisiones que puedes tomar si te encuentras de visita en
                Cartagena, su
                hermoso paisaje, y los servicios que se ofrecen te harán vivir una experiencia de otro mundo.
            </p>
          </div>
        </div>
      </section>

      
    </div>
  );
}

export default Home;

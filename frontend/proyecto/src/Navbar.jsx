import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css"
import logo from './assets/logo.png';
import buscar from './assets/buscar.png';
function Navbar() {
  return (
    <div className='Navbar'>
  <nav role="navigation" aria-label="Main navigation">
  <img src={logo} alt="logo" />
      <ul>
        <li>
          <strong>Turiscaribbean</strong>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">Admin</Link>
        </li>
        <li>
          <Link to="/services">Peticiones</Link>
        </li>
        <li>
          <Link to="/Perfil">Perfil</Link>
        </li>
        <li>
          <Link to="/contact">Contactenos</Link>
        </li>
        <li>
          <Link to="/Login">Login</Link>
        </li>
      </ul>
    </nav>
    <div className='search-box'>
  <input type="text" placeholder='Buscar' />
  <img src={buscar} alt="lupa" className="search-icon" />
</div>


    </div>
  

  );
}

export default Navbar;
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './login.css'

export function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { email, password });
      if (response.data.message === 'BIENVENIDO A LA PLATAFORMA') {
        alert('bienvenido ')
        navigate('/Productos'); // Redirige a la página de productos
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Contraseña Incorreccta');
    }
  };

    

    return(
        <main>
            <form onSubmit={handleLogin}>
                <div>
                    <h1> Inicio de sesion para proyecto</h1>
                    <input type="email" placeholder="email" onChange ={e => setEmail(e.target.value)} required/>
                    <input type="password" placeholder="contraseña" onChange ={e => setPassword(e.target.value)} required/>
                </div>
                <button>INGRESAR</button>
                <p> Si no tienes cuenta  <Link to="/Register">Ingressa Aqui</Link></p>
            </form>
            
        </main>
    )
    
}
export default Login;
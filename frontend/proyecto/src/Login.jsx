import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './login.css'

export function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/login', { email, password });
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
                <p> Si no tienes cuenta  <a href="/Register">Ingressa Aqui</a></p>
            </form>
            
        </main>
    )
    
}
export default Login;
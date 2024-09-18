import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home'; 
import  Login  from './Login';
import Productos from './Productos'
import Register from './Register'


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
    
        <Navbar />
     
       
        <Routes>
        <Route path="/" element={<Home />} /> // Ruta para el componente Home
        <Route path="/login" element={<Login />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/Register" element={<Register />} />
        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
//1 - importamos modulo con require
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//  configuracion
const app = express();
app.use(express.json());
app.use(cors());

// conexion mongo atlas 
const MONGO_URL = "mongodb+srv://jalmpa77:Adso45**@adso45.to30h.mongodb.net/Usuarios?retryWrites=true&w=majority&appName=ADSO45";

mongoose.connect(MONGO_URL)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true},
  password: { type: String, required: true },
});

const Admin = mongoose.model('Admin', adminSchema, 'admin') // apunta a a coleccion admin 

//4 - rutas Login 

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. buscamos el correo 
    const usuario = await Admin.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 2. Comparo la contrasena 
    bcrypt.compare(password, usuario.password, (err, validPassword) => {
      console.log('Error:', err);
      console.log('Valid Password:', validPassword);
      if (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      if (validPassword) {
        return res.json({ message: 'BIENVENIDO A LA PLATAFORMA' });
      } else {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    });
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

 // ruta de register mongo
 app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const   usuario = await Admin.findOne({email})
    if (usuario) {
      return res.status(400).json({message: " El usaurio ya existe"})
      }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({ email, password: hashedPassword })

    const savedAdmin = await newAdmin.save(); 

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (err) {
    console.error('Error al registrar usuario:', err);

    // Handle potential validation errors
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Error interno del servidor' });
  }});


   

//5 - poner a escuchar al servidor
app.listen(8081,()=>{
  console.log("servidor escuchando...");
})
    
    
    
  
    
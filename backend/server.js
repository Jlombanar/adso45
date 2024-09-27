//1 - importamos modulo con require
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//2 - configuracion
const app = express();
app.use(express.json());
app.use(cors());

// conexion mongo atlas 
const MONGO_URL = "mongodb+srv://jalmpa77:Adso45**@adso45.to30h.mongodb.net/Usuarios?retryWrites=true&w=majority&appName=ADSO45";

mongoose.connect(MONGO_URL)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, validate: { validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/g.test(v), message: 'Please enter a valid email address' } },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

//4 - rutas Login 
app.post('/login', (req, res) => {
    const db = "SELECT * FROM administradores WHERE email = ? AND password = ?";
    conexion.query(db, [req.body.email, req.body.password], (err, data) => {
      if (err) return res.status(50).json({ success: false, message: "Error en el inicio de sesión" });
      
        
  
      if (data.length > 0) {
        return res.status(200).json({ success: true, message: "BIENVENIDO A LA PLATAFORMA" });
      } else {
        return res.status(401).json({ success: false, message: "Usuario o contraseña incorrectos" });
      }
    });
  });

 // ruta de register
 app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const   usuario = await User.findOne({email})
    if (usuario) {
      return res.status(400).json({message: " El usaurio ya existe"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword });

    const savedUser = await user.save(); 

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
    
    
    
  
    
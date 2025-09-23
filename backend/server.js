//1 - importamos modulo con require
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require ("bcrypt")
const cors = require("cors");
require('dotenv').config();


//2 - configuracion
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'https://adso84.devsoluciones.com' // reemplaza con la URL de tu frontend
}));
app.get('/', (req, res) => {
  res.send('Servidor activo 🚀');
});

// conexión a Mongo Atlas con variable de entorno
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Conectado a MongoDB Atlas"))
.catch((err) => console.error("❌ Error al conectar a MongoDB:", err));


//3 - definimos modelos

const datosshema = new mongoose.Schema({
  email: { type:String,required:true},
  password:{type: String, required:true}

})
const datos = mongoose.model("Datos", datosshema,'Usuarios');

// ruta de Login 
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. buscamos el correo 
    const usuario = await datos.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ message: 'Correo electrónico o contraseña no válidos' });
    }

    // 2. Comparo la contrasena 
    bcrypt.compare(password, usuario.password, (err, validPassword) => {
      console.log('Error:', err);
      console.log('Valid Password:', validPassword);
      if (err) {
        return res.status(500).json({ message: 'Error del servidor ' });
      }
      if (validPassword) {
        return res.json({ message: 'BIENVENIDO A LA PLATAFORMA' });
      } else {
        return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
      }
    });
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error del servidor ' });
  }
});




//ruta de registar

app.post('/register',async (req,res) =>{
  const {email,password} = req.body;

  try {
    const usuarioexiste=await datos.findOne ({email})
    if(usuarioexiste){
      return res.status(400).json({message: "usuario ya existe"})
      }
      // creo el usuario nuevo
      const hashPassword = await bcrypt.hash(password, 10);
      const newUsuario= new datos ({email, password: hashPassword})
      const saveUsuarios = await newUsuario.save()
      res.status(201).json ({message:'Usuario Registrado Correctamente'})
  } catch (error) {
    console.error('error al registrar el usuario',error)
    
  }
}

)

app.get('/status', async (req, res) => {
  try {
    const usuarios = await datos.countDocuments();
    const estadoMongo = mongoose.connection.readyState === 1 ? '🟢 Conectado' : '🔴 No conectado';

    res.json({
      estado_servidor: '🟢 Activo',
      estado_mongo: estadoMongo,
      usuarios_registrados: usuarios,
      hora_local: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' }),
      entorno: process.env.NODE_ENV || 'desconocido'
    });
  } catch (error) {
    res.status(500).json({
      estado_servidor: '🔴 Error',
      mensaje: 'No se pudo obtener el estado del servidor',
      error: error.message
    });
  }
});


// 5 - Escuchar en Render
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});  
    
    
  
    
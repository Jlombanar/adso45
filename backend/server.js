//1 - importamos modulo con require
const express = require("express");
const mongoose= require("mongoose");
const bcryp = require ("bcrypt")
const cors = require("cors");

//2 - configuracion
const app = express();
app.use(express.json());
app.use(cors());

//3 - conexion mongo  atlas
const MONGO_URL = "mongodb+srv://jalmpa77:ADSOVIRTUAL@virtual.ui3qi.mongodb.net/datos?retryWrites=true&w=majority&appName=VIRTUAL"
mongoose.connect(MONGO_URL)
.then(() => console.log("conectado a mongo"))
.catch((err) => console.log(err))

//4 - definir modelos
const datosShema= new mongoose.Schema({
  email: { type:String,required: true},
  password: { type:String,required: true}
  
});
const Datos = mongoose.model ('Datos',datosShema,'Usuarios')


 // ruta de register
 app.post('/register',async (req,res)=>{
  const {email,password}= req.body;

  // vamos a consultar si el correo  existe 

  try {
    const usuarioexiste =await Datos.findOne ({email})
    if (usuarioexiste) {
      return res.status(400).json({message: "el correo ya existe"})
      }
      // si no existe el correo, vamos a crear un nuevo usuario
      const hashPassword = await bcryp.hash(password, 10);
      const newUsuario =new Datos ({email, password: hashPassword})
      const saveUsuarios= await newUsuario.save();
      res.status(201).json ({message:'usuario registrado correctamente'})
      
  } catch (error) {
    console.error ('error al registar el usuario', error)
  }

  
 }
)



//5 - poner a escuchar al servidor
app.listen(8081,()=>{
  console.log("servidor escuchando...");
})
    
    
    
  
    
//1 - importamos modulo con require
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require ("bcrypt")
const cors = require("cors");


//2 - configuracion
const app = express();
app.use(express.json());
app.use(cors());

//  conexion a mongo atlas

const MONGO_URL="mongodb+srv://jalmpa77:ADSOFINAL@ficha45.ogo5r.mongodb.net/datos?retryWrites=true&w=majority&appName=ficha45"
mongoose.connect(MONGO_URL)
.then(() => console.log("conectado a mongo"))
.catch((err) => console.log(err))

//3 - definimos modelos

const datosshema = new mongoose.Schema({
  email: { type:String,requerid:true},
  password:{type: String, requerid:true}

})
const datos = mongoose.model("Datos", datosshema,'Usuarios');



// ruta del login



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



//5 - poner a escuchar al servidor
app.listen(8081,()=>{
  console.log("servidor escuchando...");
})
    
    
    
  
    
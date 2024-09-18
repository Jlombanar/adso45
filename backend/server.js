//1 - importamos modulo con require
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

//2 - configuracion
const app = express();
app.use(express.json());
app.use(cors());

//3 - conexion
const conexion = mysql.createConnection({
    host: "localhost",
    database: "personas",
    user: "root",
    password: ""
});

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
 app.post('/register',(req,res)=>{
  const{email,password}= req.body;
  // verificacion de correo
  const dbchek ="SELECT * FROM administradores WHERE email =?";
  conexion.query(dbchek,[email],(err,data) =>{
    if (data.length> 0){
      return res.status(400).json({success:false,message:"el correo ya existe"})
    } else{
      // insertar datos a mi bases de datos 
      const dbinsert="INSERT INTO administradores (email,password) VALUES (?,?)";
      conexion.query(dbinsert,[email,password],(err,data)=>{
        if (err) {
          console.error(err)
        }
        return res.status(200).json({success:true,message:"usuario creado con exito"})
      }
    )

    }
  }
)
 }
)



//5 - poner a escuchar al servidor
app.listen(8081,()=>{
  console.log("servidor escuchando...");
})
    
    
    
  
    
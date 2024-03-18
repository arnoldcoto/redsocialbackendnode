import  Express  from "express";
const app = Express();
import { usuario } from "./routes/routeUser.js";
import { publicacion } from "./routes/routePublicacion.js";
import { usuarioCrud } from "./routes/routeUserCRUD.js";
import { comentario } from "./routes/routerComentario.js";
import cors from 'cors';


// Middleware 
app.use(Express.json());
const corsOptions = {
    origin : 'http://localhost:5173', 
    credentials : true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions));
// Rutas
app.use('/api/usuario', usuario);
app.use('/api/publicacion', publicacion);
app.use('/api/usuarioCrud', usuarioCrud);
app.use('/api/comentarios', comentario);


//Puerto
app.listen(4000, ()=>{

    console.log("Escuchando en el puerto 4000");

});
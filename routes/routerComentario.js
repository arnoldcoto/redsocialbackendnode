import  Express  from "express";
const comentario = Express();

import { postComentario , getComentarios,
     deleteComentario, putComentario } from "../controllers/controllerComentario.js";

comentario.post ('/:id',  postComentario)

comentario.get ('/:id' , getComentarios);

comentario.delete ('/:id' , deleteComentario);

comentario.put ('/:id' , putComentario);

export {comentario}
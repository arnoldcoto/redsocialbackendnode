import  Express  from "express";
const usuario = Express();

import { postUsuario, getUsuario,
         putUsuario, deleteUsuario,
         actualizarContrasena, getAuth } from "../controllers/controllerUser.js"

usuario.use(Express.json());

usuario.post('', postUsuario);

usuario.get('/:nombre_usuario', getUsuario);

usuario.get('/auth/:nombre_usuario/:pass', getAuth);

usuario.put('/:nombre_usuario', putUsuario);

usuario.put('/actualizar_pass/:nombre_usuario', actualizarContrasena);

usuario.delete('/:nombre_usuario', deleteUsuario);

export {
    usuario
}
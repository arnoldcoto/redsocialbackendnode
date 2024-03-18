import  Express  from "express";
const usuarioCrud = Express();
import { getUsuarios, postUsuarios, 
    deleteUsuario, getUsuariosId, 
    putUsuario } from "../controllers/controllerUserCRUD.js";

usuarioCrud.post('',postUsuarios )
usuarioCrud.get('', getUsuarios)
usuarioCrud.put('/:nombre_usuario', putUsuario)
usuarioCrud.delete('/:nombre_usuario', deleteUsuario)
usuarioCrud.get('/:nombre_usuario', getUsuariosId)


export {
    usuarioCrud
}


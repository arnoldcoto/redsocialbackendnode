import { response } from "express";
import { db } from "../db/conn.js";

const putComentario = async (req, res)=>{

    try{

        const {id} = req.params;
        const {comentario} = req.body;
        const params =[comentario, id];

        const sql = ` update tbl_comentarios 
                    set comentario = $1
                    where id = $2 returning id, 'Actualizacion Exitosa' mensaje `;
    
        const result = await db.query(sql , params);
        
        res.json(result);

    }catch(err){
        res.status(500).json({mensaje: err.message})
    }

}

const postComentario = async (req, res) => {

    try {


        const { id } = req.params;

        const { nombre_usuario, comentario } = req.body;

        const params = [id, nombre_usuario, comentario];

        const ver = await req.params

        const bod = await req.body

        
        console.log(ver);

        console.log(bod)
        
        const sql = ` insert into tbl_comentarios 
                        (id_publicacion, nombre_usuario, comentario)
                        values 
                        ($1, $2, $3)
                      returning  id, nombre_usuario, comentario, 'Insercion Exitosa' mensaje `;

        const result = await (db.query(sql, params));

        console.log(result);


        res.json(result)

    } catch (err) {
        res.status(500).json({ mensaje: err.message });
    }


}

const deleteComentario = async (req, res) => {

    try {

        console.log("Ingreso aquiiiiii");
        const params = [req.params.id];

        console.log(params);
        
        const sql = `delete from tbl_comentarios 
            where id = $1 
            returning id, 'Publicación Borrada' mensaje `;

        const result = await db.query(sql, params);
        console.log(result)

        res.json(result);

    } catch (err) {
        
        res.status(500).json({mensaje : err.message})

    }


}



const getComentarios = async (req, res) => {
    try {

    
        const { id, id_publicacion } = req.params;

        const ret = await req.params;

        const sql = `SELECT id, comentario, nombre_usuario, fecha_comentario
                     FROM tbl_comentarios
                     WHERE id_publicacion = $1`;


        const result = await db.query(sql, [id, id_publicacion]);

        console.log(result)


        res.json(result);
        
    } catch (err) {
        console.error("Error al obtener comentarios:", err);
        res.status(500).json({ mensaje: "Error al obtener comentarios" });
    }
};



export {
    postComentario,
    getComentarios,
    deleteComentario, 
    putComentario
}
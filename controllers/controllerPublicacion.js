import { db } from "../db/conn.js";

const putPublicacion = async (req, res)=>{

    try{

        const {id} = req.params;
        const {caption} = req.body;
        const params =[caption, id];

        const sql = ` update tbl_publicacion 
                    set caption = $1
                    where id = $2 returning id, 'Actualizacion Exitosa' mensaje `;
    
        const result = await db.query(sql , params);
        
        res.json(result);

    }catch(err){
        res.status(500).json({mensaje: err.message})
    }

}

const postPublicacion = async (req, res) => {

    try {

        const {
            caption,
            nombre_usuario
        } = req.body;

        console.log("Entra en console");

        const params = [caption, nombre_usuario];

        const sql = ` insert into tbl_publicacion 
                        (caption, nombre_usuario  )
                        values 
                        ($1, $2)
                      returning  id, nombre_usuario, 'Insercion Exitosa' mensaje `;

        const result = await (db.query(sql, params));


        res.json(result)

    } catch (err) {
        res.status(500).json({ mensaje: err.message });
    }



}

const deletePublicacion = async (req, res) => {

    try {
        const params = [req.params.id];

        const sql = `update tbl_publicacion 
                    set activo = false 
                where id = $1 
                returning id, 'Publicación Borrada' mensaje `;

        const result = await db.query(sql, params);

        res.json(result);

    } catch (err) {
        
        res.status(500).json({mensaje : err.message})

    }


}

const getPublicaciones = async (req, res) => {

    try {

        const sql = `select id, 
                            caption, 
                            nombre_usuario, 
                            fecha_post
                    from tbl_publicacion 
                    where activo = true
                    order by fecha_post desc`

        const result = await db.query(sql);

        if (result.length > 0) {
            res.json(result);
        } else {
            res.status(404).json({ mensaje: "Sin datos que mostrar" });
        }



    } catch (err) {

        res.status(500).json({ mensaje: "Error en busqueda de post" });

    }

}


export {
    postPublicacion,
    getPublicaciones,
    deletePublicacion, 
    putPublicacion
}
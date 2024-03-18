import { db } from "../db/conn.js";

const getAuth = async (req, res)=>{

    const {nombre_usuario , pass} = req.params;

    console.log(nombre_usuario, pass);

    const sql = `select nombre_usuario from tbl_usuarios 
                    where nombre_usuario = $1 
                    and contrasena = $2  `;

    const result = await db.query(sql, [nombre_usuario, pass]);

    console.log(result);

    if (result.length === 0 ){
        res.status(404).json({mensaje: "Usuario y Contraseña no coinciden"})
    }else {
        res.json(result);
    }
}

const postUsuario = async (req, res) => {

    try {

        const { nombre_usuario,
            correo_electronico,
            contrasena,
            nombre,
            apellido,
            confirmacion_con } = req.body;

        const params = [nombre_usuario,
            correo_electronico,
            contrasena,
            nombre,
            apellido,
            2];

        const sql = ` insert into tbl_usuarios 
                    (nombre_usuario, 
                    correo_electronico, 
                    contrasena,
                    nombre, 
                    apellido, id_rol)
                    values 
                    ($1, $2, $3, $4, $5, 2) returning nombre_usuario, 'creado con exito' mensaje `;

        if (contrasena === confirmacion_con) {
            const result = await db.query(sql, params);
            res.status(200).json(result)
        } else {
            res.status(400).json({ mensaje: "Las contraseñas no coinciden" })
        }


    } catch (err) {

        res.status(500).json(err);

    }




}

const getUsuario = async (req, res) => {

    try {
        const nombre_usuario = req.params.nombre_usuario;

        const sql = `select correo_electronico,
                            nombre, 
                            apellido
                        from tbl_usuarios where nombre_usuario = $1`;

        const result = await db.query(sql, [nombre_usuario]);

        if (result.length === 0) {
            res.status(404).json({ mensaje: "No hay registros" })
        } else {
            res.status(200).json(result);
        }
    } catch (err) {
        res.status(500).json({ mensaje: err.message })
    }



}

const putUsuario = async (req, res) => {

    try {

        const { correo_electronico,
            nombre,
            apellido } = req.body;
        const nombre_usuario = req.params.nombre_usuario;

        const params = [correo_electronico, nombre, apellido, nombre_usuario];

        const sql = `update tbl_usuarios 
                    set correo_electronico = $1, 
                        nombre = $2, 
                        apellido = $3
                    where nombre_usuario = $4 returning nombre_usuario , 'actualizado con exito' mensaje `;

        const result = await db.query(sql, params);

        if (result.length === 0) {
            res.status(404).json({ mensaje: "Registro no existe no puede ser actualizado" })
        } else {
            res.status(200).json(result);
        }
    } catch (err) {
        res.status(500).json({ mensaje: err.message });
    }

}

const actualizarContrasena = async (req, res) => {

    try {

        
        const nombre_usuario = req.params.nombre_usuario;

        const { contrasena, confirmacion_con } = req.body;

        const params = [contrasena, nombre_usuario];


        const sql = `update tbl_usuarios 
                    set contrasena = $1
                where nombre_usuario = $2 returning nombre_usuario , 'actualizacion exitosa' mensaje`;

        if (contrasena === confirmacion_con) {

            const result = await db.query(sql, params);
            
            if (result.length === 0) {
                res.status(404).json({ mensaje: "Usuario no existente" })
            } else {
                res.status(200).json(result)
            }

        }else{
            res.status(404).json({mensaje : "Contraseñas no coinciden"})
        }
    } catch (err) {
        res.status(500).json({ mensaje: err.message })
    }

}

const deleteUsuario = (req, res) => {


}

export {
    postUsuario,
    getUsuario,
    putUsuario,
    deleteUsuario,
    actualizarContrasena, 
    getAuth
}
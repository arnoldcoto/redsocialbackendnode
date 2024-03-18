import pg from 'pg-promise';
const pgp = pg();
import dotenv from 'dotenv'
dotenv.config();


const user = process.env.USER;
const pass = process.env.PASS;
const dataBase = process.env.DB;
const host = process.env.HOST;
const portDb = process.env.PORT_DB;


const conectionString = `postgresql://${user}:${pass}$@${host}:${portDb}/${dataBase}`;
const db = pgp(conectionString);

db.connect()
    .then( ()=>{
        console.log("Conexion Exitosa");
    })
    .catch( (err)=>{
        console.log(`Error de Conexión ${err}`);
    })

export {db};
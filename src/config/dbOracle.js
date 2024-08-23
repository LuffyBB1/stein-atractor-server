import oracle from 'oracledb'
import dotenv from 'dotenv'
import measureTime from '../utils/measureTime.js'
import { migrateFromOracle } from '../services/proyectoService.js'

dotenv.config()

const dbConfig = {
  user: process.env.ORACLE_USER,
  password: process.env.ORACLE_PASSWORD,
  connectString: process.env.ORACLE_CONNECT_STRING
}

let db

export async function initialize() {
  try {
    console.log('Inicializando la base de datos Oracle...')
    db = await oracle.getConnection(dbConfig)
    console.log('Conectado a Oracle')
    measureTime(migrateFromOracle)()
    return db
  } catch (err) {
    console.error('Error durante la inicialización de la base de datos Oracle:', err)
    throw err
  }
}

export async function close() {
  try {
    await db.close()
    console.log('Conexión a la base de datos Oracle cerrada')
  } catch (err) {
    console.error('Error al cerrar la conexión a la base de datos Oracle:', err)
  }
}

export async function executeQuery(query, args = []) {
  try {
    const result = await db.execute(query, args, { outFormat: oracle.OUT_FORMAT_OBJECT })
    return result.rows
  } catch (err) {
    console.error('Error al ejecutar la consulta a la base de datos Oracle:', err)
    throw err
  }
}  
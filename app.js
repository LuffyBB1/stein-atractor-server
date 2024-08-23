import express from 'express';
import { connect } from './src/config/dbMongo.js';

import {initialize, close } from './src/config/dbOracle.js'

const app = express();
const port = 3000;

// Variable para almacenar la conexión
let dbConnection;

// Inicializar la conexión a OracleDB y MongoDB
async function init() {
  try {
    await connect();
    await initialize(); // Asegúrate de que esto se haga correctamente
  } catch (err) {
    console.error('Error durante la inicialización:', err);
    process.exit(1);
  }
}

// Inicializar la conexión antes de configurar las rutas
init();

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

process.on('exit', async () => {
  if (dbConnection) {
    await close(dbConnection);
  }
});

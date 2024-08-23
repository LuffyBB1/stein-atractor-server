import { initialize, close } from '../config/dbOracle.js';
import { jsonConstruct } from '../utils/projectMapping.js';
import { mongoServices } from './projectsMonitoreoService.js';


export async function changeMonitoring(tableName, connection) {
    try {
        const query = `
            SELECT * 
            FROM ${tableName} 
            WHERE MIGRATE = 'N'
        `;

        const result = await connection.execute(query);
        const rows=result.rows
        const documento = []
        for (const row of rows){
            const mappedRow = await jsonConstruct(tableName, row);
            documento.push(mappedRow);
        }
        console.log(`resultado query: ${tableName}`, documento)
        return documento; 
        } 
     catch (error) {
        console.error(`Error procesando la tabla ${tableName}:`, error);
    }
}

export async function changesProcessor(documentoArray, tableName, connection) {

    const tableNameLowerCase = tableName.toLowerCase();

    for (const documento of documentoArray){
        const operation = documento["OPERACION"].toLowerCase();
        const functionName = `${tableNameLowerCase}_${operation}_mongo`;

    if (typeof mongoServices[functionName] === 'function'){
        try {
            const isSuccess = await mongoServices[functionName](documento);

            if (isSuccess) {
                const updateQuery = `
                    UPDATE ${tableName} 
                    SET MIGRATE = 'Y' 
                    WHERE FECHA_CAMBIO = :fecha_cambio
                `;
                await connection.execute(updateQuery, {
                    fecha_cambio: documento["FECHA_CAMBIO"],
                });
                console.log(`Registro ${documento["NUMPROY"]}-${documento["LINEA"]} actualizado con éxito.`);
            }
        } catch (error) {
            console.error(`Error al procesar ${functionName} para el registro ${documento["NUMPROY"]}-${documento["LINEA"]}:`, error);
        }
    } else {
        console.log(`Función ${functionName} no encontrada.`);
    }
}
await connection.commit();  
}


export function startMonitoring(interval = 10000) {
    const tablesToMonitor = [
        'IB_X_TEMP_CAB_PROYECTOS_TBL',
        'IB_X_TEMP_HORAS_PROYECTO_TBL',
        'IB_X_TEMP_GASTOS_PROYECTO_TBL',
        'IB_X_TEMP_MATERIALES_TBL',
        'IB_X_TEMP_SUBCONT_PROYECTO_TBL',
    ];

    setInterval(async () => {
        const connection = await initialize();
        for (const tableName of tablesToMonitor) {
            const queryResult= await changeMonitoring(tableName, connection);
           if (queryResult) changesProcessor(queryResult, tableName, connection);
        }
        await close();
    }, interval);
}
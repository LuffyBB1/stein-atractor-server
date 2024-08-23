export const mongoServices = {
    async ib_x_temp_horas_proyecto_tbl_insert_mongo(documento) {
        console.log('Insertando en Mongo:', documento);
        // Aquí iría la lógica para insertar en MongoDB
        return true; // Retornar true si fue exitoso
    },
    async ib_x_temp_horas_proyecto_tbl_update_mongo(documento) {
        console.log('Actualizando en Mongo:', documento);
        // Aquí iría la lógica para actualizar en MongoDB
        return true; // Retornar true si fue exitoso
    },
    async ib_x_temp_horas_proyecto_tbl_delete_mongo(documento) {
        console.log('Eliminando en Mongo:', documento);
        // Aquí iría la lógica para eliminar en MongoDB
        return true; // Retornar true si fue exitoso
    },
    // Agrega más funciones según sea necesario
};
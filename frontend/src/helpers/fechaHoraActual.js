export function obtenerFechaYHoraActual() {
    // Obtenemos la fecha y hora actual en la zona horaria de República Dominicana
    const fechaHoraActualRD = new Date().toLocaleString('es-DO', { timeZone: 'America/Santo_Domingo' });

    // Retornamos la fecha y hora en la zona horaria de República Dominicana
    return fechaHoraActualRD;
}
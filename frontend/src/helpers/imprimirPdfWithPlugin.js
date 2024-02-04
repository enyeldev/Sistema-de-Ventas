import jsPDF from 'jspdf';

export const generatePDF = () => {
    // Crear un nuevo documento jsPDF con orientación 'landscape' (horizontal)
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm', // Establecer las unidades en milímetros
        format: [], // Establecer el tamaño del papel (ancho x alto)
    });

    // Agregar contenido al PDF
    doc.text('Ejemplo de PDF para impresora matricial', 10, 10);

    // Guardar el archivo PDF
    doc.autoPrint();
    doc.output('dataurlnewwindow');
};

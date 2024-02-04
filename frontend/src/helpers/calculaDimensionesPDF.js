export const calculatePageSize = (contentWidth, contentHeight) => {
    // Ajustar el tamaño de la página según el contenido más un margen adicional si es necesario
    const extraMargin = 20; // Puedes ajustar esto según sea necesario
    return {
        width: contentWidth + extraMargin,
        height: contentHeight + extraMargin,
    };
};
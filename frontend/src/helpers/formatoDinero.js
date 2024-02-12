export function formatoDinero(monto) {
  

  const montoFormateado = monto.toLocaleString("es-DO", {
    style: "currency",
    currency: "DOP",
  });

  return montoFormateado;
}

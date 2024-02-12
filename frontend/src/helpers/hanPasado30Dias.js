import moment from "moment";

export function hanPasado30Dias(fechaInicial, fechaActual) {
  const fechaInicialFormateada = formatearFecha(fechaInicial);
  const fechaActualFormateada = formatearFecha(fechaActual);

  const fechaInicialObj = moment(fechaInicialFormateada);
  const fechaActualObj = moment(fechaActualFormateada);

  console.log(fechaInicialObj);
  console.log(fechaActualObj);

  const diasDiferencia = fechaActualObj.diff(fechaInicialObj, "days");

  const estaVencido = diasDiferencia >= 30;

  return estaVencido;
}

function formatearFecha(fecha) {
  const fechaSeparada = fecha.split(",", 1)[0];

  const [dia, mes, year] = fechaSeparada.split("/");

  const fechaFormateada = `${year}/${mes}/${dia}`;

  return fechaFormateada;
}

import moment from "moment";
import { formatearFecha } from "./hanPasado30Dias";
export function hanPasado7Dias(fechaInicial, fechaActual) {
  const fechaInicialFormateada = formatearFecha(fechaInicial);
  const fechaActualFormateada = formatearFecha(fechaActual);

  const fechaInicialObj = moment(fechaInicialFormateada);
  const fechaActualObj = moment(fechaActualFormateada);

  const diasDiferencia = fechaActualObj.diff(fechaInicialObj, "days");

  const estaVencido = diasDiferencia > 7;

  return estaVencido;
}

/* eslint-disable react/prop-types */

import { formatoDinero } from "../helpers/formatoDinero";
import { hanPasado30Dias } from "../helpers/hanPasado30Dias";
import { obtenerFechaYHoraActual } from "../helpers/fechaHoraActual";

import { AddIcon } from "@chakra-ui/icons";
import { Tr, Td } from "@chakra-ui/react";

export const ItemInicio = ({
  codigoProducto,
  nombre,
  cantidadStock,
  minStock,
  precioCompraUnd,
  precioVentaUnd,
  ganancia,
  agotado,
  enBaja,
}) => {
  return (
    <Tr data-id={codigoProducto}>
      <Td>{nombre}</Td>
      <Td textAlign={"center"}>{cantidadStock}</Td>
      <Td textAlign={"center"}>{minStock}</Td>
      <Td>{formatoDinero(parseFloat(precioCompraUnd))}</Td>
      <Td>{formatoDinero(parseFloat(precioVentaUnd))}</Td>
      <Td>{formatoDinero(parseFloat(ganancia))}</Td>
      <Td>{agotado ? "Agotado" : "No agotado"}</Td>
      <Td>{enBaja ? "En baja" : "No en baja"}</Td>
    </Tr>
  );
};

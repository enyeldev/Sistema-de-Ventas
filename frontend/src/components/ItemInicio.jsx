/* eslint-disable react/prop-types */
import { formatoDinero } from "../helpers/formatoDinero";

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
  tramo,
}) => {
  return (
    <Tr data-id={codigoProducto}>
      <Td>{codigoProducto}</Td>
      <Td>{nombre}</Td>
      <Td textAlign={"center"}>{tramo ? tramo : "---"}</Td>
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

/* eslint-disable react/prop-types */

import { formatoDinero } from "../helpers/formatoDinero";
import { AddIcon } from "@chakra-ui/icons";
import { Tr, Td } from "@chakra-ui/react";

export const ItemReimprimirFacturaCredito = ({
  codigoFactura,
  nombreCliente,
  telefonoCliente,
  despachadoPor,
  montoInicial,
  montoActual,
  fechaInicial,
  fechaUtlimoPago,
  mostrarModal
}) => {
  //   const fechaActual = obtenerFechaYHoraActual();
  //   const fechaVencida = hanPasado30Dias(fecha, fechaActual);

  return (
    <Tr data-id={codigoFactura}>
      <Td>{codigoFactura}</Td>
      <Td>{nombreCliente}</Td>
      <Td>{telefonoCliente}</Td>
      <Td>{despachadoPor}</Td>
      <Td>{formatoDinero(parseFloat(montoInicial))}</Td>
      <Td>{formatoDinero(parseFloat(montoActual))}</Td>
      <Td>{fechaInicial}</Td>
      <Td>{fechaUtlimoPago}</Td>
      <Td>
        <AddIcon
          color={"blue"}
          cursor={"pointer"}
          fontSize={"large"}
          // display={agotado ? 'none' : 'block'}
          onClick={mostrarModal}
        />
      </Td>
    </Tr>
  );
};

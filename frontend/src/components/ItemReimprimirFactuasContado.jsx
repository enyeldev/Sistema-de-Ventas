/* eslint-disable react/prop-types */

import { formatoDinero } from "../helpers/formatoDinero";
import { AddIcon } from "@chakra-ui/icons";
import { Tr, Td } from "@chakra-ui/react";

export const ItemReimprimirFacturaContado = ({
  atendidoPor,
  codigoFactura,
  costoTotal,
  devueltaCliente,
  fecha,
  nombreCliente,
  pagoCliente,
  telefonoCliente,
  mostrarModal,
}) => {
  //   const fechaActual = obtenerFechaYHoraActual();
  //   const fechaVencida = hanPasado30Dias(fecha, fechaActual);

  return (
    <Tr data-id={codigoFactura}>
      <Td>{codigoFactura}</Td>
      <Td textAlign={"center"}>
        {nombreCliente == "" ? "- - -" : nombreCliente}
      </Td>
      <Td textAlign={"center"}>
        {telefonoCliente == "" ? "- - -" : telefonoCliente}
      </Td>
      <Td textAlign={"center"}>{atendidoPor == "" ? "- - -" : atendidoPor}</Td>
      <Td>{formatoDinero(parseFloat(costoTotal))}</Td>
      <Td>{formatoDinero(parseFloat(pagoCliente))}</Td>
      <Td>{formatoDinero(parseFloat(devueltaCliente))}</Td>
      <Td>{fecha}</Td>
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

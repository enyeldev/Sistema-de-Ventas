/* eslint-disable react/prop-types */

import { formatoDinero } from "../helpers/formatoDinero";
import { AddIcon } from "@chakra-ui/icons";
import { Tr, Td } from "@chakra-ui/react";

export const ItemReimprimirDevolucionContado = ({
  codigoFactura,
  fecha,
  total,
  mostrarModal,
}) => {
  //   const fechaActual = obtenerFechaYHoraActual();
  //   const fechaVencida = hanPasado30Dias(fecha, fechaActual);

  return (
    <Tr data-id={codigoFactura}>
      <Td>{codigoFactura}</Td>
      <Td>{fecha}</Td>
      <Td>{formatoDinero(parseFloat(total))}</Td>
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

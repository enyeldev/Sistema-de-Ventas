/* eslint-disable react/prop-types */

import { formatoDinero } from "../helpers/formatoDinero";
import { hanPasado30Dias } from "../helpers/hanPasado30Dias";
import { obtenerFechaYHoraActual } from "../helpers/fechaHoraActual";

import { AddIcon } from "@chakra-ui/icons";
import { Tr, Td } from "@chakra-ui/react";

export const ItemDeudaBusqueda = ({
  codigoDeuda,
  nombreCliente,

  montoDeuda,
  montoActualDeuda,
  fecha,

  mostrarModal,
}) => {
  const fechaActual = obtenerFechaYHoraActual();
  const fechaVencida = hanPasado30Dias(fecha, fechaActual);

  return (
    <Tr data-id={codigoDeuda} className={`${fechaVencida ? "bg-red-300" : ""}`}>
      <Td>{nombreCliente}</Td>
      <Td>{formatoDinero(parseFloat(montoDeuda))}</Td>
      <Td>{formatoDinero(parseFloat(montoActualDeuda))}</Td>
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

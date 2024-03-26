/* eslint-disable react/prop-types */

import { formatoDinero } from "../helpers/formatoDinero";
import { AddIcon } from "@chakra-ui/icons";
import { Tr, Td } from "@chakra-ui/react";

export const ItemProdDevolucionSelect = ({
  nombre,
  precioTotal,
  precioCadaUno,
  descuento,
  cantidad,
  mostrarModal,
  id,
}) => {
  return (
    <Tr data-id={id}>
      <Td>{nombre}</Td>
      <Td textAlign={"center"}>{cantidad}</Td>
      <Td textAlign={"center"}>
        {descuento
          ? formatoDinero(parseFloat(precioCadaUno - descuento))
          : formatoDinero(parseFloat(precioCadaUno))}
      </Td>
      <Td textAlign={"center"}>{formatoDinero(parseFloat(precioTotal))}</Td>
      <Td>
        <AddIcon
          color={"blue"}
          cursor={"pointer"}
          fontSize={"large"}
          onClick={mostrarModal}
        />
      </Td>
    </Tr>
  );
};

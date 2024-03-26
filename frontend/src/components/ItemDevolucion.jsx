/* eslint-disable react/prop-types */
import { formatoDinero } from "../helpers/formatoDinero";

import { Tr, Td } from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";

export const ItemDevolucion = ({
  cantidad,
  nombre,
  total,
  eliminarItemVenta,
  id,
}) => {
  return (
    <>
      <Tr data-id={id}>
        <Td textAlign={"center"}>{cantidad}</Td>
        <Td>{nombre}</Td>
        <Td>{formatoDinero(total)}</Td>
        <Td>
          <div className="cursor-pointer" onClick={eliminarItemVenta}>
            <DeleteIcon color={"red"} />
          </div>
        </Td>
      </Tr>
    </>
  );
};

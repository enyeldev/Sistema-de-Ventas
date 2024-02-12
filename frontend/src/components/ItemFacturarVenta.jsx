/* eslint-disable react/prop-types */
import { formatoDinero } from "../helpers/formatoDinero";
import { Tr, Td } from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";

export const ItemFacturarVenta = ({
  descripcion,
  cantidad,
  precio,
  eliminarItemVenta,
  id,
}) => {
  const total = parseInt(cantidad) * parseInt(precio);

  
  return (
    <>
      <Tr data-id={id}>
        <Td>{cantidad}</Td>
        <Td>{descripcion.toUpperCase()}</Td>
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

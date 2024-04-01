/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
} from "@chakra-ui/react";

import { Alerta } from "../components/Alerta";
import { ItemInicio } from "../components/ItemInicio";
import { useState } from "react";

export const ModalInicio = ({ modal, setModal }) => {
  const [alerta, setAlerta] = useState({});

  const cerrarModal = () => {
    setAlerta({});
    setModal({ datos: [], titulo: "", show: false });
  };

  const { msg } = alerta;
  return (
    <Modal isOpen={modal.show} onClose={cerrarModal}>
      <ModalOverlay />
      <ModalContent maxW={"90%"}>
        <ModalHeader>{modal.titulo}</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-around"}
          //   alignItems={"center"}
        >
          <TableContainer width={""}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Nombre del productos</Th>
                  <Th>Cantidad en inventario</Th>
                  <Th>Minimo inventario</Th>
                  <Th>Precio de compra C/U</Th>
                  <Th>Precio de venta C/U</Th>
                  <Th>Ganancia</Th>
                  <Th>Agotado</Th>
                  <Th>En baja</Th>
                </Tr>
              </Thead>

              <Tbody>
                {modal.datos.map(
                  ({
                    nombre,
                    cantidadStock,
                    minStock,
                    precioCompraUnd,
                    precioVentaUnd,
                    ganancia,
                    agotado,
                    enBaja,
                    codigoProducto,
                  }) => {
                    return (
                      <ItemInicio
                        agotado={agotado}
                        cantidadStock={cantidadStock}
                        codigoProducto={codigoProducto}
                        enBaja={enBaja}
                        ganancia={ganancia}
                        minStock={minStock}
                        nombre={nombre}
                        precioCompraUnd={precioCompraUnd}
                        precioVentaUnd={precioVentaUnd}
                        key={codigoProducto}
                      />
                    );
                  }
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>

        <ModalFooter display={"flex"} flexDirection={"column"} gap={4}>
          {msg && <Alerta alerta={alerta} />}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

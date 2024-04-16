/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useState } from "react";
import { clienteAxios } from "../config/axios";

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
  Heading,
  Text,
  Input,
} from "@chakra-ui/react";
import { TailSpin } from "react-loader-spinner";
import { Alerta } from "../components/Alerta";
import { ItemInicio } from "../components/ItemInicio";

export const ModalInicio = ({
  modal,
  setModal,
  listaProdcutos,
  setListaProdcutos,
}) => {
  const [alerta, setAlerta] = useState({});
  const [cargandoBusqueda, setCargandoBusqueda] = useState(false);

  const cerrarModal = () => {
    setAlerta({});
    setModal({ datos: [], titulo: "", show: false });
  };

  const hanldeChange = async (nombre) => {
    const url =
      modal.filtro == "productos"
        ? `/inicio/filtraProductos/${nombre}`
        : modal.filtro == "baja"
        ? `/inicio/filtraProductosEnBaja/${nombre}`
        : `/inicio/filtraProductosAgotados/${nombre}`;

    setCargandoBusqueda(true);
    try {
      const respuesta = await clienteAxios.get(url);
      setListaProdcutos([...respuesta.data.producotsFiltrado]);
    } catch (error) {
      console.log(error);
    }

    setCargandoBusqueda(false);
  };

  const { msg } = alerta;
  return (
    <Modal isOpen={modal.show} onClose={cerrarModal}>
      <ModalOverlay />
      <ModalContent maxW={"90%"}>
        <ModalHeader
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          paddingRight={"4em"}
        >
          {modal.titulo}
          <div className="flex flex-col gap-1">
            <Heading fontSize={"large"}>
              {modal.filtro == "productos"
                ? "Buscar productos"
                : modal.filtro == "baja"
                ? "Buscar productos en baja"
                : "Buscar productos agotados"}
            </Heading>
            <Input
              placeholder={
                "Ej: Aceite de transmicion ATF , Liquido de freno wagner"
              }
              background={"gray.100"}
              // borderColor={`${errorCobrarInput ? "red" : "gray.200"}`}
              onChange={async ({ target }) => {
                await hanldeChange(target.value);
              }}
            />
          </div>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-around"}
          //   alignItems={"center"}
        >
          {cargandoBusqueda ? (
            <div className="w-[100%] flex flex-col justify-center items-center gap-3">
              <Text fontSize={"x-large"} fontWeight={"600"}>
                Buscando productos
              </Text>
              <TailSpin
                width={70}
                height={70}
                color="blue"
                strokeWidth={3}
                visible={true}
              />
            </div>
          ) : (
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
                  {listaProdcutos.map(
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
          )}
        </ModalBody>

        <ModalFooter display={"flex"} flexDirection={"column"} gap={4}>
          {msg && <Alerta alerta={alerta} />}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

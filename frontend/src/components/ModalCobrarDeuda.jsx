/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { formatoDinero } from "../helpers/formatoDinero";
import { clienteAxios } from "../config/axios";
import { obtenerFechaYHoraActual } from "../helpers/fechaHoraActual";
import { imprimirFacturaDeuda } from "../helpers/facturasFunciones";
import { buscarCodigoFacturaDeuda } from "../helpers/deudasFunciones";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Heading,
  Text,
  Input,
  Button,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";

import { TailSpin } from "react-loader-spinner";

import { Alerta } from "../components/Alerta";

import { generarNuevoIngresoVenta } from "../helpers/ingresosFunciones";

export const ModalCobrarDeuda = ({
  modal,
  setModalDeuda,
  setShowModalFacturaDeuda,
  setDatosFacturaDeuda,
  setCobro,
  cobro,
}) => {
  // if (modal.datos == null) {
  //     return
  // }
  const [pagoCliente, setPagoCliente] = useState("");
  const [errorInput, setErrorInput] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [cargandoBusqueda, setCargandoBusqueda] = useState(false);
  const [arrProductosDeudas, setArrProductosDeudas] = useState([]);
  const regexEntero = /^-?\d+$/;

  useEffect(() => {
    const productosDeLaDeuda = async () => {
      try {
        const respuesta = await clienteAxios.get(
          `/deudas/buscarProductosDeuda/${modal.datos.codigoDeuda}`
        );
        return respuesta;
      } catch (error) {
        console.log(error);
      }
    };

    productosDeLaDeuda()
      .then((response) => {
        console.log(response.data.productosDeudas);
        setArrProductosDeudas([...response.data.productosDeudas]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const { codigoDeuda } = modal.datos;

  const cerrarModal = () => {
    // setCantidad(1)
    // setTotal(parseFloat(precioVentaUnd))
    setAlerta({});
    setModalDeuda({ show: false, datos: modal.datos });
  };

  const realizarPago = async (e) => {
    e.preventDefault();

    const regexPagoValidation = regexEntero.test(pagoCliente);

    if (
      pagoCliente == "" ||
      parseFloat(pagoCliente) > parseFloat(modal.datos.montoActualDeuda) ||
      parseFloat(pagoCliente) <= 0 ||
      !regexPagoValidation
    ) {
      setErrorInput(true);
      return;
    }

    const fecha = obtenerFechaYHoraActual();
    setCargandoBusqueda(true);
    try {
      await clienteAxios.put("/deudas/pagarDeudas", {
        codigoDeuda,
        montoPago: pagoCliente,
        fecha,
      });

      await clienteAxios.post("/deudas/historialDePagos", {
        codigoDeuda,
        montoPago: pagoCliente.toString(),
        fecha,
      });

      await generarNuevoIngresoVenta(pagoCliente, 3, "Pago de deuda");

      const codigoFacturaDeuda = await buscarCodigoFacturaDeuda(codigoDeuda);

      console.log(codigoFacturaDeuda);
      const datosFacturaDeuda = await imprimirFacturaDeuda(codigoFacturaDeuda);

      console.log("holaaa");

      console.log(datosFacturaDeuda);
      setDatosFacturaDeuda(datosFacturaDeuda);

      cerrarModal();
      setShowModalFacturaDeuda(true);
    } catch (error) {
      console.log(error);
      setAlerta({
        titulo: "Error",
        msg: error.response.data.msg,
        status: "error",
      });
    }

    setCargandoBusqueda(false);
    setCobro(!cobro);
  };

  const { msg } = alerta;

  return (
    <Modal isOpen={modal.show} onClose={cerrarModal}>
      <ModalOverlay />
      <ModalContent maxW={700}>
        <ModalHeader>Cobrar Deuda</ModalHeader>
        <ModalCloseButton />
        <ModalBody display={"flex"} flexDirection={"column"} gap={2}>
          <div className="w-full">
            <TableContainer width={""}>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Cantidad</Th>
                    <Th>Descripcion</Th>
                    <Th>Total</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {arrProductosDeudas.map(
                    ({
                      cantidadProducto,
                      codigoProducto,
                      monto,
                      nombreProducto,
                    }) => {
                      return (
                        <Tr key={codigoProducto}>
                          <Td textAlign={"center"}>{cantidadProducto}</Td>
                          <Td>{nombreProducto}</Td>
                          <Td>{formatoDinero(parseFloat(monto))}</Td>
                        </Tr>
                      );
                    }
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
          <div className="w-full flex items-center gap-5">
            <div className="">
              <Heading fontSize={"larger"}>Monto Restante:</Heading>

              <Text>
                {formatoDinero(parseFloat(modal.datos.montoActualDeuda))}
              </Text>
            </div>

            <form onSubmit={realizarPago}>
              <div className="flex flex-col gap-2">
                <Heading fontSize={"larger"}>Pago Cliente:</Heading>
                <Input
                  borderColor={`${errorInput ? "red" : "gray.200"}`}
                  background={"gray.100"}
                  placeholder={"Ej: 500, 750, 3400"}
                  onChange={({ target }) => {
                    setErrorInput(false);
                    setPagoCliente(target.value);
                  }}
                  autoFocus
                />

                <Button colorScheme="blue" type="submit">
                  {cargandoBusqueda ? (
                    <TailSpin
                      width={30}
                      height={30}
                      color="#fff"
                      strokeWidth={3}
                      visible={cargandoBusqueda}
                    />
                  ) : (
                    "Cobrar Deuda"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </ModalBody>

        <ModalFooter display={"flex"} flexDirection={"column"} gap={2}>
          {msg && <Alerta alerta={alerta} />}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

import { useState, useEffect } from "react";
import { clienteAxios } from "../config/axios";
// import { formatoDinero } from '../helpers/formatoDinero'

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  // Td,
  TableContainer,
  Input,
  Heading,
  // Text,
  Button,
  Td,
} from "@chakra-ui/react";

// import { AddIcon } from '@chakra-ui/icons'
import { Alerta } from "../components/Alerta";
import { TailSpin } from "react-loader-spinner";
import { ItemReimprimirFactura } from "../components/ItemReimprimriFacturas";
import { ModalCobrarDeuda } from "../components/ModalCobrarDeuda";
import { ModalFacturaDeuda } from "../components/ModalFacturaDeuda";

export const ReimprimirFacturasCrdito = () => {
  const [arrFacturas, setArrFacturas] = useState([]);
  const [buscarPorCodigo, setBuscarPorCodigo] = useState(true);
  const [alerta, setAlerta] = useState({});
  const [cargandoBusqueda, setCargandoBusqueda] = useState(false);
  const [errorInput, setErrorInput] = useState(false);
  const [parametroBusqueda, setParametroBusqueda] = useState("");
  const regexCodigo = /^[0-9]+$/;
  const regexNombre = /.*[a-zA-Z].*/;

  useEffect(() => {
    const cargarFacturas = async () => {
      const respuesta = await clienteAxios.get(
        "/facturas/mostrarTodasFacturasDeudas"
      );

      console.log(respuesta.data.facturasDeudas);
      setArrFacturas(respuesta.data.facturasDeudas.reverse());
    };

    cargarFacturas();
  }, []);

  //Buscar por codigo
  const buscarFacturaPorCodigo = async (e) => {
    e.preventDefault();

    const regexValidation = regexCodigo.test(parametroBusqueda);

    if (parametroBusqueda.length == 0 || !regexValidation) {
      setErrorInput(true);
      return;
    }

    setErrorInput(false);
    setCargandoBusqueda(true);
    setAlerta({});

    try {
      const url = `/facturas/buscarFacturasDeudasPorCodigo/${parametroBusqueda}`;
      const respuesta = await clienteAxios.get(url);
      console.log(respuesta.data.datosFactura);
      setArrFacturas([respuesta.data.datosFactura]);
    } catch (error) {
      console.log(error);
      setAlerta({
        titulo: "Error",
        msg: error.response.data.msg,
        status: "error",
      });
    }
    setCargandoBusqueda(false);
  };

  //Buscar por nombre
  const bucarFacturaPorNombre = async (e) => {
    e.preventDefault();

    const regexValidation = regexNombre.test(parametroBusqueda);
    if (parametroBusqueda.length == 0 || !regexValidation) {
      setErrorInput(true);
      return;
    }

    setErrorInput(false);
    setAlerta({});

    try {
      // const url = `/producto/buscarProductoPorNombre/${parametroBusqueda}`;
      // const respuesta = await clienteAxios.get(url);
      // console.log(respuesta.data);
      // setArrProductos([...respuesta.data.productos]);
    } catch (error) {
      console.log(error);
      setAlerta({
        titulo: "Error",
        msg: error.response.data.msg,
        status: "error",
      });
    }
    setCargandoBusqueda(false);
  };

  const { msg } = alerta;

  return (
    <div className="w-[85%] max-h-screen bg-gray-100 rounded-md p-2">
      <div className="w-full h-full flex flex-col gap-2">
        {/* {modalDeuda.show && <ModalCobrarDeuda modal={modalDeuda} setModalDeuda={setModalDeuda} setShowModalFacturaDeuda={setShowModalFacturaDeuda} setDatosFacturaDeuda={setDatosFacturaDeuda} />}

                {showModalFacturaDeuda && <ModalFacturaDeuda
                    showModalFacturaDeuda={showModalFacturaDeuda}
                    setShowModalFacturaDeuda={setShowModalFacturaDeuda}
                    datosFacturaDeuda={datosFacturaDeuda} />} */}

        <div className="w-full bg-white rounded-md shadow-md p-2">
          <div className="w-full max-h-[20%]">
            <form
              action=""
              className="flex items-end gap-3"
              onSubmit={
                buscarPorCodigo ? buscarFacturaPorCodigo : bucarFacturaPorNombre
              }
            >
              <div className="flex flex-col gap-2 w-[50%]">
                <Heading htmlFor="codigo" fontSize={"large"}>
                  {buscarPorCodigo
                    ? "Codigo de la factura"
                    : "Nombre del cliente"}
                </Heading>
                <Input
                  background={"gray.100"}
                  borderColor={`${errorInput ? "red" : "gray.200"}`}
                  id="codigo"
                  placeholder={
                    buscarPorCodigo
                      ? "Ej: 897217091241 , 4478"
                      : "Ej: Pedro, Jose"
                  }
                  onChange={({ target }) => setParametroBusqueda(target.value)}
                  value={parametroBusqueda}
                  autoFocus
                />
              </div>

              <div className="w-[50%] flex flex-col gap-2">
                <Button
                  colorScheme="blue"
                  type="button"
                  onClick={() => {
                    setParametroBusqueda("");
                    setArrFacturas([]);
                    setAlerta({});
                    setErrorInput(false);
                    setBuscarPorCodigo(!buscarPorCodigo);
                  }}
                >
                  {buscarPorCodigo
                    ? "Buscar por nombre de cliente"
                    : "Buscar por codigo de factura"}
                </Button>

                <Button colorScheme="green" type="submit">
                  {cargandoBusqueda ? (
                    <TailSpin
                      width={50}
                      height={55}
                      color="#fff"
                      strokeWidth={3}
                      visible={cargandoBusqueda}
                    />
                  ) : (
                    "Buscar factura"
                  )}
                </Button>
              </div>
            </form>

            {msg && (
              <div className="w-full py-3">
                <Alerta alerta={alerta} />
              </div>
            )}
          </div>
        </div>

        <div className="w-full bg-white rounded-md shadow-md p-2">
          <div className="h-full overflow-y-scroll">
            <TableContainer width={""}>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Codigo Factura</Th>
                    <Th>Nombre Cliente</Th>
                    <Th>Telefono Cliente</Th>
                    <Th>Despachado Por</Th>
                    <Th>Monto Inicial</Th>
                    <Th>Monto Actual</Th>
                    <Th>Fecha Inicial</Th>
                    <Th>Fecha Utlimo Pago</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {arrFacturas.length == 0 ? (
                    <Td>
                      <div className="">
                        <Heading fontSize={"larger"}>
                          No hay facturas de deudas
                        </Heading>
                      </div>
                    </Td>
                  ) : (
                    arrFacturas.map(
                      ({
                        codigoFacturaDeuda,
                        nombreCliente,
                        telefonoCliente,
                        despachadoPor,
                        montoDeuda,
                        montoActualDeuda,
                        fecha,
                        fechaUltimoPago,
                      }) => {
                        return (
                          <ItemReimprimirFactura
                            key={codigoFacturaDeuda}
                            codigoFactura={codigoFacturaDeuda}
                            despachadoPor={despachadoPor}
                            fechaInicial={fecha}
                            fechaUtlimoPago={fechaUltimoPago}
                            montoActual={montoActualDeuda}
                            montoInicial={montoDeuda}
                            nombreCliente={nombreCliente}
                            telefonoCliente={telefonoCliente}
                          />
                        );
                      }
                    )
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

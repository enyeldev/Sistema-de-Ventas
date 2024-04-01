import { useState, useEffect } from "react";
import { clienteAxios } from "../config/axios";
import { imprimirFacturaDevolucionContado } from "../helpers/facturasFunciones";

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

import { Alerta } from "../components/Alerta";
import { TailSpin } from "react-loader-spinner";
import { ItemReimprimirDevolucionContado } from "../components/ItemReimprimirFacturaDevolucionContado";
import { ModalFacturaDevueltaAlContado } from "../components/ModalFacturaDevueltaAlContado";

export const ReimprimirFacturasDevolucionContado = () => {
  const [arrFacturas, setArrFacturas] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [cargandoBusqueda, setCargandoBusqueda] = useState(false);
  const [errorInput, setErrorInput] = useState(false);
  const [parametroBusqueda, setParametroBusqueda] = useState("");
  const [datosFacturaDevueltaContado, setDatosFacturaDevueltaContado] =
    useState({});
  const [showModalFacturaDevueltaContado, setShowModalFacturaDevueltaContado] =
    useState(false);
  const regexCodigo = /^[0-9]+$/;

  useEffect(() => {
    const cargarFacturas = async () => {
      const respuesta = await clienteAxios.get(
        "/facturas/mostrarTodasFacturasDevolucionesContado"
      );

      setArrFacturas(respuesta.data.facturasDevolucionContado.reverse());
    };

    cargarFacturas();
  }, []);

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
      const url = `/facturas/buscarFacturasDevolucionContadoPorCodigo/${parametroBusqueda}`;
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

  const mostrarModalFacturaDevolucionContado = async ({ currentTarget }) => {
    const idTarget = currentTarget.parentElement.parentElement.dataset.id;

    const datos = arrFacturas.find((e) => e.codigoFactura == idTarget);

    // console.log(datos);

    const { codigoFactura } = datos;

    const datosFactura = await imprimirFacturaDevolucionContado(codigoFactura);
    setDatosFacturaDevueltaContado(datosFactura);
    setShowModalFacturaDevueltaContado(true);
  };

  const { msg } = alerta;
  return (
    <div className="w-[85%] max-h-screen bg-gray-100 rounded-md p-2">
      <div className="w-full h-full flex flex-col gap-2">
        {showModalFacturaDevueltaContado && (
          <ModalFacturaDevueltaAlContado
            datosFacturaDevueltaContado={datosFacturaDevueltaContado}
            setShowModalFacturaDevueltaContado={
              setShowModalFacturaDevueltaContado
            }
            showModalFacturaDevueltaContado={showModalFacturaDevueltaContado}
          />
        )}

        <div className="w-full bg-white rounded-md shadow-md p-2">
          <div className="w-full max-h-[20%]">
            <form
              action=""
              className="flex items-end gap-3"
              onSubmit={buscarFacturaPorCodigo}
            >
              <div className="flex flex-col gap-2 w-[50%]">
                <Heading htmlFor="codigo" fontSize={"large"}>
                  Codigo de la factura
                </Heading>
                <Input
                  background={"gray.100"}
                  borderColor={`${errorInput ? "red" : "gray.200"}`}
                  id="codigo"
                  placeholder={"Ej: 897217091241 , 4478"}
                  onChange={({ target }) => setParametroBusqueda(target.value)}
                  value={parametroBusqueda}
                  autoFocus
                />
              </div>

              <div className=" flex  gap-2">
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

        <div className="w-full h-[85%] bg-white rounded-md shadow-md p-2 overflow-y-scroll">
          <div className="">
            <TableContainer width={""}>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Codigo Factura</Th>
                    <Th>Fecha</Th>
                    <Th>Total devuelto</Th>
                    <Th></Th>
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
                    arrFacturas.map(({ codigoFactura, fecha, total }) => {
                      return (
                        <ItemReimprimirDevolucionContado
                          key={codigoFactura}
                          codigoFactura={codigoFactura}
                          fecha={fecha}
                          total={total}
                          mostrarModal={mostrarModalFacturaDevolucionContado}
                        />
                      );
                    })
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

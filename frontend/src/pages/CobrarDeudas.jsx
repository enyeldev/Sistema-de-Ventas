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
} from "@chakra-ui/react";

// import { AddIcon } from '@chakra-ui/icons'
import { Alerta } from "../components/Alerta";
import { TailSpin } from "react-loader-spinner";
import { ItemDeudaBusqueda } from "../components/ItemDeudaBusqueda";
import { ModalCobrarDeuda } from "../components/ModalCobrarDeuda";
import { ModalFacturaDeuda } from "../components/ModalFacturaDeuda";

export const CobrarDeudas = () => {
  const [parametroBusqueda, setParametroBusqueda] = useState("");
  const [errorInput, setErrorInput] = useState(false);
  const [cargandoBusqueda, setCargandoBusqueda] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [buscarPorCodigo, setBuscarPorCodigo] = useState(true);
  const [arrDeudasBusuqeda, setArrDeudasBusqueda] = useState([]);
  const [modalDeuda, setModalDeuda] = useState({});
  const [showModalFacturaDeuda, setShowModalFacturaDeuda] = useState(false);
  const [datosFacturaDeuda, setDatosFacturaDeuda] = useState({});
  const [cobro, setCobro] = useState(false);

  useEffect(() => {
    const showAllDeudas = async () => {
      const respuesta = await clienteAxios.get("/deduas/buscarTodasDeudas");
      return respuesta;
    };

    showAllDeudas()
      .then((response) => {
        setAlerta({});
        const { todasLasDeudas } = response.data;
        // console.log(todasLasDeudas);
        setArrDeudasBusqueda(todasLasDeudas.reverse());

        // console.log(arrDeudasBusuqeda);
      })
      .catch((error) => {
        console.log(error);
        setAlerta({
          titulo: "Error",
          msg: error.response.data.msg,
          status: "error",
        });
      });
  }, [cobro]);

  const regexCodigo = /^[0-9]+$/;
  const regexNombre = /.*[a-zA-Z].*/;

  const buscarDeudaPorCodigo = async (e) => {
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
      const url = `/deudas/buscarDeudaPorCodigo/${parametroBusqueda}`;
      const respuesta = await clienteAxios.get(url);

      const { datosDeuda } = respuesta.data;

      setArrDeudasBusqueda([datosDeuda]);
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

  const bucarDeudaPorNombre = async (e) => {
    e.preventDefault();

    const regexValidation = regexNombre.test(parametroBusqueda);
    if (parametroBusqueda.length == 0 || !regexValidation) {
      setErrorInput(true);
      return;
    }

    setErrorInput(false);
    setAlerta({});

    try {
      const url = `/deudas/buscarDeudaPorNombre/${parametroBusqueda}`;
      const respuesta = await clienteAxios.get(url);

      const { deudas } = respuesta.data;

      setArrDeudasBusqueda(deudas);
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

  const mostrarModal = ({ currentTarget }) => {
    const idTarget = currentTarget.parentElement.parentElement.dataset.id;

    // console.log(arrDeudasBusuqeda);
    const datos = arrDeudasBusuqeda.find((e) => e.codigoDeuda == idTarget);

    console.log(datos);
    setModalDeuda({ show: true, datos });
  };

  const { msg } = alerta;

  return (
    <div className="w-[85%] min-h-screen bg-gray-100 rounded-md p-2">
      <div className="w-full h-full flex flex-col gap-2">
        {modalDeuda.show && (
          <ModalCobrarDeuda
            modal={modalDeuda}
            setModalDeuda={setModalDeuda}
            setShowModalFacturaDeuda={setShowModalFacturaDeuda}
            setDatosFacturaDeuda={setDatosFacturaDeuda}
            setCobro={setCobro}
            cobro={cobro}
          />
        )}

        {showModalFacturaDeuda && (
          <ModalFacturaDeuda
            showModalFacturaDeuda={showModalFacturaDeuda}
            setShowModalFacturaDeuda={setShowModalFacturaDeuda}
            datosFacturaDeuda={datosFacturaDeuda}
          />
        )}

        <div className="w-full bg-white rounded-md shadow-md p-2">
          <div className="w-full max-h-[20%]">
            <form
              action=""
              className="flex items-end gap-3"
              onSubmit={
                buscarPorCodigo ? buscarDeudaPorCodigo : bucarDeudaPorNombre
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
                      : "Ej: Filtro de aire, Liquido de freno"
                  }
                  onChange={({ target }) => setParametroBusqueda(target.value)}
                  value={parametroBusqueda}
                  autoFocus
                />
              </div>

              <div className="w-[50%] flex gap-2">
                <Button
                  colorScheme="blue"
                  type="button"
                  onClick={() => {
                    setParametroBusqueda("");
                    // setArrProductos([])
                    setAlerta({});
                    setErrorInput(false);
                    setBuscarPorCodigo(!buscarPorCodigo);
                  }}
                >
                  {buscarPorCodigo ? "Buscar por nombre" : "Buscar por codigo"}
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
                    "Buscar deuda"
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
                    <Th>Nombre Cliente</Th>
                    <Th>Telefono Cliente</Th>
                    <Th>Monto Inicial</Th>
                    <Th>Monto Actual</Th>
                    <Th>Fecha</Th>
                    <Th>Despachao Por</Th>
                    <Th></Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {arrDeudasBusuqeda.map(
                    ({
                      codigoDeuda,
                      despachadoPor,
                      fecha,
                      montoActualDeuda,
                      montoDeuda,
                      nombreCliente,
                      telefonoCliente,
                    }) => {
                      return (
                        <ItemDeudaBusqueda
                          key={codigoDeuda}
                          codigoDeuda={codigoDeuda}
                          despachadoPor={despachadoPor}
                          fecha={fecha}
                          montoActualDeuda={montoActualDeuda}
                          montoDeuda={montoDeuda}
                          nombreCliente={nombreCliente}
                          telefonoCliente={telefonoCliente}
                          mostrarModal={mostrarModal}
                        />
                      );
                    }
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

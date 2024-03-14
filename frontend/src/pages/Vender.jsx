import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { clienteAxios } from "../config/axios";
import { formatoDinero } from "../helpers/formatoDinero";
import {
  generarNuevaVenta,
  generarVentasItems,
} from "../helpers/ventasFunciones";
import { generarNuevoIngresoVenta } from "../helpers/ingresosFunciones";
import { descontarProductoStock } from "../helpers/productosFunciones";
import {
  generarFacturaVenta,
  imprimirFacturaVenta,
} from "../helpers/facturasFunciones";

import { TailSpin } from "react-loader-spinner";
import { Alerta } from "../components/Alerta";
import { ItemProdBusqueda } from "../components/ItemProdBusqueda";
import { ModalDataProdVenta } from "../components/ModalDataProdVenta";
import { ItemVenta } from "../components/ItemVenta";
import { ModalFacturaVenta } from "../components/ModalFacturaVenta";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Input,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";

export const Vender = () => {
  const { auth } = useAuth();
  const [buscarPorCodigo, setBuscarPorCodigo] = useState(true);
  const [errorInput, setErrorInput] = useState(false);
  const [errorCobrarInput, setErrorCobrarInput] = useState(false);
  const [cargandoBusqueda, setCargandoBusqueda] = useState(false);
  const [cargandoCobro, setCargandoCobro] = useState(false);
  const [showModalFacturaVenta, setShowModalFacturaVenta] = useState(false);
  const [parametroBusqueda, setParametroBusqueda] = useState("");
  const [arrProductos, setArrProductos] = useState([]);
  const [arrProductosVent, setArrProductosVent] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [modal, setModal] = useState({ show: false, datos: null });
  const [pagoCliente, setPagoCliente] = useState(0);
  const [datosFacturaVenta, setDatosFacturaVenta] = useState({});

  // Calcular el total de venta, sin productos financiados
  const totalVenta = arrProductosVent.reduce((total, e) => {
    return total + e.total;
  }, 0);

  const devueltaCliente = pagoCliente - totalVenta;

  const regexCodigo = /^[0-9]+$/;
  const regexNombre = /.*[a-zA-Z].*/;

  const mostrarModal = ({ currentTarget }) => {
    const idTarget = currentTarget.parentElement.parentElement.dataset.id;

    const datos = arrProductos.find((e) => e.codigoProducto == idTarget);

    console.log(datos);
    setModal({ show: true, datos });
  };

  //Callbacks para buscar producto
  //Buscar por codigo
  const buscarProductoPorCodigo = async (e) => {
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
      const url = `/producto/buscarProductoPorCodigo/${parametroBusqueda}`;
      const respuesta = await clienteAxios.get(url);

      console.log(respuesta.data);
      // Verificar si ya fue buscado este producto
      const existeProductoSeleccionado = arrProductos.some(
        (e) => e.codigoProducto == respuesta.data.codigoProducto
      );

      if (existeProductoSeleccionado) {
        setArrProductos([...arrProductos]);
        setAlerta({
          titulo: "Advertencia ",
          msg: "El producto ya fue buscado",
          status: "warning",
        });
      } else {
        setArrProductos([respuesta.data]);
      }
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
  const bucarProductoPorNombre = async (e) => {
    e.preventDefault();

    const regexValidation = regexNombre.test(parametroBusqueda);
    if (parametroBusqueda.length == 0 || !regexValidation) {
      setErrorInput(true);
      return;
    }

    setErrorInput(false);
    setAlerta({});

    try {
      const url = `/producto/buscarProductoPorNombre/${parametroBusqueda}`;
      const respuesta = await clienteAxios.get(url);

      console.log(respuesta.data);

      setArrProductos([...respuesta.data.productos]);
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

  const eliminarItemVenta = ({ currentTarget }) => {
    const idElement = currentTarget.parentElement.parentElement.dataset.id;
    const nuevoArry = arrProductosVent.filter(
      (e) => e.codigoProducto !== idElement
    );
    setArrProductosVent([...nuevoArry]);
  };

  const cobrarVenta = async (e) => {
    e.preventDefault();
    setErrorCobrarInput(false);

    if (
      arrProductosVent.length == 0 ||
      pagoCliente == 0 ||
      pagoCliente < totalVenta
    ) {
      setErrorCobrarInput(true);
      return;
    }

    setCargandoCobro(true);

    // Generar nueva venta
    const codigoVenta = await generarNuevaVenta({
      totalVenta,
      pagoCliente,
      devueltaCliente,
      auth,
    });

    // Generar VentaItems
    await generarVentasItems(arrProductosVent, codigoVenta);

    //Agregar Ingreso
    await generarNuevoIngresoVenta(totalVenta, 1, "Venta de productos");

    //Descontar productos del stock
    await descontarProductoStock(arrProductosVent);

    //Generar factura e Imprimir factura
    const codigoFactura = await generarFacturaVenta(codigoVenta);

    const dataFactura = await imprimirFacturaVenta(codigoFactura);

    setDatosFacturaVenta(dataFactura);
    setShowModalFacturaVenta(true);

    // Restaurar valores por default
    setParametroBusqueda("");
    setArrProductosVent([]);
    setArrProductos([]);
    setPagoCliente(0);
    setCargandoCobro(false);
    setAlerta({});
  };

  const { msg } = alerta;

  return (
    <div className="w-[85%] min-h-screen  bg-gray-100 rounded-md">
      <div className="flex relative p-2 gap-2 h-full">
        {showModalFacturaVenta && (
          <ModalFacturaVenta
            showModalFacturaVenta={showModalFacturaVenta}
            setShowModalFacturaVenta={setShowModalFacturaVenta}
            datosFacturaVenta={datosFacturaVenta}
          />
        )}

        <ModalDataProdVenta
          modal={modal}
          setModal={setModal}
          arrProductosVent={arrProductosVent}
          setArrProductosVent={setArrProductosVent}
        />

        <div className=" w-[40%] flex flex-col gap-2">
          <div className="bg-white rounded-md shadow-md p-3 h-[70%] overflow-y-scroll">
            <TableContainer width={""}>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Cantidad</Th>
                    <Th>Descripcion</Th>
                    <Th>Total</Th>
                    <Th></Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {arrProductosVent.map(
                    ({
                      cantidad,
                      codigoProducto,
                      financiado,
                      nombre,
                      total,
                    }) => {
                      return (
                        <ItemVenta
                          cantidad={cantidad}
                          id={codigoProducto}
                          financiado={financiado}
                          nombre={nombre}
                          total={total}
                          eliminarItemVenta={eliminarItemVenta}
                          key={codigoProducto}
                        />
                      );
                    }
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </div>

          <div className="w-fulll h-[30%] p-3 bg-white shadow-md rounded-md flex justify-between">
            <div className="">
              <Heading fontSize={"large"}>Total:</Heading>
              <Text fontSize={"large"}>{formatoDinero(totalVenta)}</Text>
            </div>

            <div className="">
              <Heading fontSize={"large"}>Devuelta:</Heading>
              <Text fontSize={"large"}>
                {pagoCliente > 0
                  ? formatoDinero(devueltaCliente)
                  : "- - - - - - -"}
              </Text>
            </div>

            <div className="flex flex-col gap-2">
              <Heading fontSize={"large"}>Pago Cliente:</Heading>
              <form className="flex flex-col gap-2" onSubmit={cobrarVenta}>
                <Input
                  placeholder={"Ej: 1200 , 350"}
                  background={"gray.100"}
                  borderColor={`${errorCobrarInput ? "red" : "gray.200"}`}
                  onChange={({ target }) => {
                    let valorActual = target.value;
                    valorActual < totalVenta
                      ? setErrorCobrarInput(true)
                      : (setPagoCliente(target.value),
                        setErrorCobrarInput(false));
                  }}
                />

                <Button type="submit" colorScheme="blue" width={"full"}>
                  {cargandoCobro ? (
                    <TailSpin
                      width={30}
                      height={30}
                      color="#fff"
                      strokeWidth={3}
                      visible={cargandoCobro}
                    />
                  ) : (
                    "Cobrar"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="w-[60%] flex flex-col gap-2">
          <div className="w-full h-full bg-white rounded-md shadow-md p-3">
            <div className="flex flex-col gap-2">
              <div className="w-full max-h-[20%]">
                <form
                  action=""
                  className="flex items-end gap-3"
                  onSubmit={
                    buscarPorCodigo
                      ? buscarProductoPorCodigo
                      : bucarProductoPorNombre
                  }
                >
                  <div className="flex flex-col gap-2 w-[50%]">
                    <Heading htmlFor="codigo" fontSize={"large"}>
                      {buscarPorCodigo
                        ? "Codigo del producto"
                        : "Nombre del producto"}
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
                      onChange={({ target }) =>
                        setParametroBusqueda(target.value)
                      }
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
                        setArrProductos([]);
                        setAlerta({});
                        setErrorInput(false);
                        setBuscarPorCodigo(!buscarPorCodigo);
                      }}
                    >
                      {buscarPorCodigo
                        ? "Buscar por nombre"
                        : "Buscar por codigo"}
                    </Button>

                    <Button colorScheme="green" type="submit">
                      {cargandoBusqueda ? (
                        <TailSpin
                          width={30}
                          height={30}
                          color="#fff"
                          strokeWidth={3}
                          visible={cargandoBusqueda}
                        />
                      ) : (
                        "Buscar producto"
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
              <div className=" w-full max-h-[80%] overflow-y-scroll">
                <TableContainer width={""}>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Descripcion</Th>
                        <Th>Cant. Inventario</Th>
                        <Th>Costo C/U</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      {arrProductos.map(
                        ({
                          nombre,
                          precioVentaUnd,
                          agotado,
                          enBaja,
                          codigoProducto,
                          cantidadStock,
                        }) => {
                          return (
                            <ItemProdBusqueda
                              nombre={nombre}
                              precio={parseFloat(precioVentaUnd)}
                              agotado={agotado}
                              enBaja={enBaja}
                              cantidad={cantidadStock}
                              key={codigoProducto}
                              id={codigoProducto}
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

          {/* <div className="w-full h-[30%] bg-white rounded-md shadow-md p-3 flex gap-3 justify-between">
            <div className="flex flex-col gap-2">
              <Heading fontSize={"larger"}>Nombre Cliente:</Heading>
              <Input
                background={"gray.100"}
                placeholder={"Ej: Ramon, Carlos Andres"}
                borderColor={`${errorNombreCliente ? "red" : "gray.200"}`}
                onChange={({ target }) => {
                  setNombreCliente(target.value.toUpperCase());
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Heading fontSize={"larger"}>Telefono Cliente:</Heading>

              <Input
                background={"gray.100"}
                placeholder={"Ej: 8091234567"}
                borderColor={`${errorTelefonoCliente ? "red" : "gray.200"}`}
                onChange={({ target }) => {
                  setTelefonoCliente(target.value);
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Heading fontSize={"larger"}>Atendido Por:</Heading>

              <Input
                background={"gray.100"}
                placeholder={"Ej: Ramon, Carlos Andres"}
                borderColor={`${errorAtendidoPor ? "red" : "gray.200"}`}
                onChange={({ target }) => {
                  setAtendidoPor(target.value.toUpperCase());
                }}
              />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

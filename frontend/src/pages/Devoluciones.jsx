import { useState } from "react";
import { clienteAxios } from "../config/axios";
import { formatoDinero } from "../helpers/formatoDinero";
import { generarFacturaDevolucionContado } from "../helpers/facturasFunciones";
import {
  generarNuevaDevolucionAlContado,
  devovlerProductosAlContado,
} from "../helpers/devolucionesFunciones";

import { obtenerFechaYHoraActual } from "../helpers/fechaHoraActual";
import { hanPasado7Dias } from "../helpers/hanPasado7Dias";

import { imprimirFacturaDevolucionContado } from "../helpers/facturasFunciones";

import {
  Button,
  Heading,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import { Alerta } from "../components/Alerta";
import { TailSpin } from "react-loader-spinner";
import { ItemProdDevolucionSelect } from "../components/ItemPrdDevolucionSelect";
import { ModalProdDevoluciones } from "../components/ModalProdDevoluciones";
import { ItemDevolucion } from "../components/ItemDevolucion";
import { ModalFacturaDevueltaAlContado } from "../components/ModalFacturaDevueltaAlContado";

export const Devoluciones = () => {
  const [parametroBusqueda, setParametroBusqueda] = useState("");
  const [alerta, setAlerta] = useState({});
  const [cargandoDevolucion, setCargandoDevolucion] = useState(false);
  const [cargandoBusqueda, setCargandoBusqueda] = useState(false);
  const [arrProductosSelect, setArrProductosSelect] = useState([]);
  const [arrProductosDevolucion, setArrProductosDevolucion] = useState([]);
  const [modal, setModal] = useState({ show: false, datos: null });
  const [showModalFacturaDevueltaContado, setShowModalFacturaDevueltaContado] =
    useState(false);
  const [datosFacturaDevueltaContado, setDatosFacturaDevueltaContado] =
    useState({});

  const regexCodigo = /^[0-9]+$/;
  const totalDevolver = arrProductosDevolucion.reduce((total, e) => {
    return total + e.total;
  }, 0);

  // Funcion que busco loo productos de la deuda, conel codigo de la factura
  const buscarProductos = async (e) => {
    e.preventDefault();
    setAlerta({});

    const regexValidation = regexCodigo.test(parametroBusqueda);

    if (parametroBusqueda.length == 0 || !regexValidation) {
      setAlerta({
        titulo: "Error",
        msg: "El codigo es inavilo",
        status: "error",
      });
      return;
    }

    setCargandoBusqueda(true);

    try {
      const respuesta = await clienteAxios.get(
        `/devoluciones/buscarProductosFactura/${parametroBusqueda}`
      );

      if (respuesta.data.productosVenta.length == 0) {
        setAlerta({
          titulo: "Advertencia",
          msg: "No quedan productos en esta venta, se han devuelto todos",
          status: "warning",
        });

        setCargandoBusqueda(false);
        return;
      }

      const fechaActual = obtenerFechaYHoraActual();
      const fechaInicial = respuesta.data.venta.fecha;

      const estaVencido = hanPasado7Dias(fechaInicial, fechaActual);

      console.log(estaVencido);
      console.log(fechaInicial);

      if (estaVencido) {
        console.log(
          "Ya han pasado 7 dias de esta venta, no se permiten devoluciones"
        );
        setAlerta({
          titulo: "Error",
          msg: "Ya han pasado 7 dias de esta venta, no se permiten devoluciones",
          status: "error",
        });
      }

      setArrProductosSelect([...respuesta.data.productosVenta]);
    } catch (error) {
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

    const datos = arrProductosSelect.find((e) => e.codigoProducto == idTarget);

    console.log(datos);
    setModal({ show: true, datos });
  };

  const eliminarItemVenta = ({ currentTarget }) => {
    const idElement = currentTarget.parentElement.parentElement.dataset.id;
    const nuevoArry = arrProductosDevolucion.filter(
      (e) => e.codigoProducto !== idElement
    );
    setArrProductosDevolucion([...nuevoArry]);
  };

  const realizarDevolucion = async () => {
    setAlerta({});

    if (arrProductosDevolucion.length == 0 || totalDevolver == 0) {
      setAlerta({
        titulo: "Error",
        msg: "Debe seleccionar productos para la devolucion",
        status: "error",
      });
      return;
    }

    try {
      setCargandoDevolucion(true);
      // generar una nueva devolucion
      const respuesta = await generarNuevaDevolucionAlContado({
        codigoFactura: parametroBusqueda,
        totalDevolver,
      });

      const codigoDevolucion = respuesta;

      console.log(codigoDevolucion);

      // agregar productos de la devolucion
      const respuestaProductos = await devovlerProductosAlContado({
        arrProductosDevolucion,
        codigoDevolucion,
      });

      setAlerta({
        titulo: "Completado",
        msg: respuestaProductos,
        status: "success",
      });

      const codigoFactura = await generarFacturaDevolucionContado(
        codigoDevolucion
      );

      console.log(codigoFactura);
      const datosFactura = await imprimirFacturaDevolucionContado(
        codigoFactura
      );
      console.log(datosFactura);
      // console.log(codigoFactura);

      setArrProductosSelect([]);
      setArrProductosDevolucion([]);
      setDatosFacturaDevueltaContado(datosFactura);
      setShowModalFacturaDevueltaContado(true);
    } catch (error) {
      console.log(error);
    }

    // try {
    //   setCargandoDevolucion(true);
    // const respuesta = await clienteAxios.post(
    //   "/devoluciones/devolverProductos",
    //   arrProductosDevolucion
    // );

    //   setAlerta({
    //     titulo: "Completado",
    //     msg: respuesta.data.msg,
    //     status: "success",
    //   });

    //   setArrProductosSelect([]);
    //   setArrProductosDevolucion([]);

    //   // traer datos para la factura de la devolucion
    //   const respuestaDatosFactura = await imprimirFacturaDevolucionContado(
    //     parametroBusqueda
    //   );

    //   const datosFacturaDevolucion = {
    //     ...respuestaDatosFactura,
    //     fecha: obtenerFechaYHoraActual(),
    //   };

    //   console.log(datosFacturaDevolucion);
    //   setDatosFacturaDevueltaContado(datosFacturaDevolucion);
    //   setShowModalFacturaDevueltaContado(true);
    // } catch (error) {
    //   console.log(error);
    // }

    setCargandoDevolucion(false);
    // console.log(arrProductosDevolucion);
  };

  const { msg } = alerta;

  return (
    <div className="w-[85%] max-h-screen  bg-gray-100 rounded-md p-2 flex gap-2">
      {modal.show && (
        <ModalProdDevoluciones
          modal={modal}
          setModal={setModal}
          arrProductosDevoluciones={arrProductosDevolucion}
          setArrProductosDevoluciones={setArrProductosDevolucion}
        />
      )}

      {showModalFacturaDevueltaContado && (
        <ModalFacturaDevueltaAlContado
          datosFacturaDevueltaContado={datosFacturaDevueltaContado}
          setShowModalFacturaDevueltaContado={
            setShowModalFacturaDevueltaContado
          }
          showModalFacturaDevueltaContado={showModalFacturaDevueltaContado}
        />
      )}

      <div className="w-[40%] flex flex-col gap-2">
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
                {arrProductosDevolucion.map(
                  ({
                    nombreProducto,
                    codigoProducto,
                    cantidad,
                    total,
                    // costoActualProducto,
                  }) => {
                    return (
                      <ItemDevolucion
                        cantidad={cantidad}
                        id={codigoProducto}
                        nombre={nombreProducto}
                        total={total}
                        key={codigoProducto}
                        eliminarItemVenta={eliminarItemVenta}
                      />
                    );
                  }
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </div>

        <div className="w-fulll h-[30%] p-3 bg-white shadow-md rounded-md flex gap-2">
          <div className="">
            <Heading fontSize={"large"}>Total a devolver:</Heading>
            <Text fontSize={"large"}>{formatoDinero(totalDevolver)}</Text>
          </div>

          <div className="">
            <Button colorScheme="blue" onClick={realizarDevolucion}>
              {cargandoDevolucion ? (
                <TailSpin
                  width={30}
                  height={30}
                  color="#fff"
                  strokeWidth={3}
                  visible={cargandoDevolucion}
                />
              ) : (
                "Realizar devolucion"
              )}
            </Button>
          </div>
        </div>
      </div>
      <div className="w-[60%]">
        <div className="w-full h-full bg-white shadow-md rounded-md p-2 flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <form className="flex items-end gap-2" onSubmit={buscarProductos}>
              <div className=" w-[40%] flex flex-col gap-2">
                <Heading fontSize={"large"}>Codigo factura</Heading>
                <Input
                  background={"gray.100"}
                  id="codigo"
                  placeholder={"Ej: 1234, 0982"}
                  onChange={({ currentTarget }) =>
                    setParametroBusqueda(currentTarget.value)
                  }
                  autoFocus
                />
              </div>
              <div className="">
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
                    "Buscar productos"
                  )}
                </Button>
              </div>
            </form>
            {msg && <Alerta alerta={alerta} />}
          </div>

          <div className=" w-full max-h-[80%] overflow-y-scroll">
            <TableContainer width={""}>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Descripcion</Th>
                    <Th>Cantidad</Th>
                    <Th>Costo C/U</Th>
                    <Th>Total</Th>
                    <Th></Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {arrProductosSelect.map(
                    ({
                      //codigoVenta,
                      codigoProducto,
                      nombreProducto,
                      cantidadProducto,
                      costoVentaItem,
                      costoActualProducto,
                      descuento,
                    }) => {
                      return (
                        <ItemProdDevolucionSelect
                          cantidad={cantidadProducto}
                          id={codigoProducto}
                          nombre={nombreProducto}
                          precioCadaUno={costoActualProducto}
                          precioTotal={costoVentaItem}
                          descuento={descuento}
                          key={codigoProducto}
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

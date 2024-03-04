import { useState } from "react";
// import { generarCodigoVentaItem } from "../helpers/generarCodigoItemVenta";
import { formatoDinero } from "../helpers/formatoDinero";
import { obtenerFechaYHoraActual } from "../helpers/fechaHoraActual";

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

import { Alerta } from "../components/Alerta";
import { ItemFacturarVenta } from "../components/ItemFacturarVenta";
import { ModalFacturaComprobante } from "../components/ModalFacturaComprobante";

export const FacturarVenta = () => {
  const [alerta, setAlerta] = useState({});
  const [productos, setProductos] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [totalProducto, setTotalProducto] = useState("");
  const [errorCantidad, setErrorCantidad] = useState(false);
  const [errorPrecio, setErrorPrecio] = useState(false);
  const [errorDescripcion, setErrorDescripcion] = useState(false);
  const [errorCobrarInput, setErrorCobrarInput] = useState(false);
  const [pagoCliente, setPagoCliente] = useState(0);
  // const [nombreCliente, setNombreCliente] = useState("");
  // const [telefonoCliente, setTelefonoCliente] = useState("");
  // const [atendidoPor, setAtendidoPor] = useState("");
  // const [errorNombreCliente, setErrorNombreCliente] = useState(false);
  // const [errorAtendidoPor, setErrorAtendidoPor] = useState(false);
  // const [errorTelefonoCliente, setErrorTelefonoCliente] = useState(false);
  const [showModalFacturaVenta, setShowModalFacturaVenta] = useState(false);
  const [datosFacturaVenta, setDatosFacturaVenta] = useState({});

  const total = productos.reduce((total, e) => {
    return total + e.precioTotal * e.cantidad;
  }, 0);

  const devueltaCliente = pagoCliente - total;

  // const regexNombreCliente = /^([A-Za-z]+\s*)+$/;
  // const regexTelefonoCliente = /^\d{10}$/;

  // funcion agregar producto
  const agregarProductos = (e) => {
    e.preventDefault();
    setErrorCantidad(false);
    setErrorPrecio(false);
    setErrorDescripcion(false);
    setAlerta({});

    if (parseInt(cantidad) == 0 || cantidad == "") {
      setErrorCantidad(true);
      setAlerta({
        titulo: "Error ",
        msg: "La cantidad es invalida",
        status: "error",
      });
      return;
    }

    if (parseInt(totalProducto) == 0 || totalProducto == "") {
      setErrorPrecio(true);
      setAlerta({
        titulo: "Error ",
        msg: "El precio es invalido",
        status: "error",
      });
      return;
    }

    if (descripcion == "") {
      setErrorDescripcion(true);
      setAlerta({
        titulo: "Error ",
        msg: "La descripcion es invalida",
        status: "error",
      });
      return;
    }

    const productoObj = {
      codigoProducto: "",
      descripcion: descripcion.toUpperCase(),
      cantidad,
      precioCadaUno: parseFloat(totalProducto) / parseInt(cantidad),
      precioTotal: parseFloat(totalProducto),
    };

    setProductos([...productos, productoObj]);
  };

  // Callback para elimianr productos
  const eliminarItemVenta = ({ currentTarget }) => {
    const idElement = currentTarget.parentElement.parentElement.dataset.id;
    const nuevoArry = productos.filter((e) => e.codigoProducto !== idElement);
    setProductos([...nuevoArry]);
  };

  // Generar factura
  const generarFactura = (e) => {
    e.preventDefault();

    setErrorCobrarInput(false);

    if (productos.length == 0) {
      setAlerta({
        titulo: "Error ",
        msg: "No hay productos agregados",
        status: "error",
      });
      return;
    }

    if (pagoCliente == 0 || pagoCliente < total) {
      setAlerta({
        titulo: "Error ",
        msg: "El pago del cliente es invalido",
        status: "error",
      });
      return;
    }

    const datosVenta = {
      costoTotal: parseFloat(total),
      pagoCliente: parseFloat(pagoCliente),
      devueltaCliente: parseFloat(devueltaCliente),
      fecha: obtenerFechaYHoraActual(),
    };
    // Pasar datos al Modal de la facura y mostrar el modal
    setDatosFacturaVenta({
      codigoFactura: "",
      datosVenta,
      productosVendidos: productos,
    });

    setShowModalFacturaVenta(true);
  };

  const { msg } = alerta;

  return (
    <div className="w-[85%] min-h-screen  bg-gray-100 rounded-md">
      <div className="w-full h-full flex flex-col gap-2 p-2 ">
        {showModalFacturaVenta && (
          <ModalFacturaComprobante
            showModalFacturaVenta={showModalFacturaVenta}
            setShowModalFacturaVenta={setShowModalFacturaVenta}
            datosFacturaVenta={datosFacturaVenta}
          />
        )}

        <div className="w-full h-[75%] p-3 bg-white shadow-md rounded-md flex flex-col gap-4">
          <form onSubmit={agregarProductos}>
            <div className="w-full flex items-end gap-2 ">
              <div className="flex flex-col gap-2 w-1/3">
                <Heading fontSize={"larger"}>Descripcion</Heading>

                <Input
                  background={"gray.100"}
                  borderColor={`${errorDescripcion ? "red" : "gray.200"}`}
                  id="codigo"
                  placeholder={"Ej: Filtro de aire, Liquido de freno"}
                  onChange={({ currentTarget }) =>
                    setDescripcion(currentTarget.value)
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <Heading fontSize={"larger"}>Cantidad</Heading>

                <Input
                  background={"gray.100"}
                  borderColor={`${errorCantidad ? "red" : "gray.200"}`}
                  id="codigo"
                  placeholder={"Ej: 1, 5"}
                  onChange={({ currentTarget }) =>
                    setCantidad(currentTarget.value)
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <Heading fontSize={"larger"}>Precio C/U</Heading>

                <Input
                  background={"gray.100"}
                  borderColor={`${errorPrecio ? "red" : "gray.200"}`}
                  id="codigo"
                  placeholder={"Ej: 200, 1500"}
                  onChange={({ currentTarget }) =>
                    setTotalProducto(currentTarget.value)
                  }
                />
              </div>

              <Button
                type="submit"
                colorScheme="blue"
                // width={'full'}
              >
                Agregar Producto
              </Button>
            </div>
          </form>

          {msg && <Alerta alerta={alerta} />}

          <div className="w-full p-3 h-full overflow-y-scroll">
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
                  {productos.map(
                    ({
                      codigoProducto,
                      descripcion,
                      cantidad,
                      precioTotal,
                    }) => {
                      return (
                        <ItemFacturarVenta
                          cantidad={cantidad}
                          descripcion={descripcion}
                          eliminarItemVenta={eliminarItemVenta}
                          precio={precioTotal}
                          id={codigoProducto}
                          key={codigoProducto}
                        />
                      );
                    }
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        </div>

        <div className="w-full flex gap-2">
          <div className="w-full p-3 bg-white shadow-md rounded-md flex gap-8">
            <div className="">
              <Heading fontSize={"large"}>Total:</Heading>
              <Text fontSize={"large"}>{formatoDinero(parseFloat(total))}</Text>
            </div>

            <div className="">
              <Heading fontSize={"large"}>Devuelta:</Heading>
              <Text fontSize={"large"}>
                {pagoCliente > 0
                  ? formatoDinero(parseFloat(devueltaCliente))
                  : "- - - - - - -"}
              </Text>
            </div>

            <div className="flex flex-col gap-2">
              <Heading fontSize={"large"}>Pago Cliente:</Heading>
              <form className="flex flex-col gap-2" onSubmit={generarFactura}>
                <Input
                  placeholder={"Ej: 1200 , 350"}
                  background={"gray.100"}
                  borderColor={`${errorCobrarInput ? "red" : "gray.200"}`}
                  onChange={({ target }) => {
                    let valorActual = target.value;
                    valorActual < total
                      ? setErrorCobrarInput(true)
                      : (setPagoCliente(target.value),
                        setErrorCobrarInput(false));
                  }}
                />

                <Button type="submit" colorScheme="blue" width={"full"}>
                  Generar Factura
                </Button>
              </form>
            </div>
          </div>
          {/* 
          <div className="w-[60%]  bg-white rounded-md shadow-md p-3 flex gap-3 justify-between">
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

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { formatoDinero } from "../helpers/formatoDinero";
import { obtenerFechaYHoraActual } from "../helpers/fechaHoraActual";

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
} from "@chakra-ui/react";

import { MinusIcon, AddIcon } from "@chakra-ui/icons";

import { Alerta } from "../components/Alerta";

export const ModalProdDevoluciones = ({
  modal,
  setModal,
  arrProductosDevoluciones,
  setArrProductosDevoluciones,
}) => {
  if (modal.datos == null) {
    return;
  }

  console.log(modal.datos);

  const {
    nombreProducto,
    costoActualProducto,
    cantidadProducto,
    codigoProducto,
    descuento,
    codigoVenta,
  } = modal.datos;

  const [cantidad, setCantidad] = useState(1);
  const [total, setTotal] = useState(costoActualProducto);
  const [alerta, setAlerta] = useState({});

  const totalDescuento =
    parseFloat(total) - parseFloat(descuento) * parseInt(cantidad);

  // const regexDescuento = /^[0-9]+$/;
  const regexEntero = /^-?\d+$/;

  useEffect(() => {
    setTotal(parseFloat(costoActualProducto));
  }, [costoActualProducto]);

  const cambiarCantidad = ({ target }) => {
    setAlerta({});

    if (parseInt(target.value) < 0) {
      return;
    }

    const cantidadActual = target.value;

    if (cantidadActual > parseInt(cantidadProducto)) {
      setAlerta({
        titulo: "Error",
        msg: "La cantidad es mayor a la que hay en el inventario",
        status: "error",
      });
      return;
    }

    setCantidad(target.value);
    setTotal(cantidadActual * costoActualProducto);
  };

  const restarCantidad = () => {
    setAlerta({});
    if (cantidad == 1) {
      setAlerta({
        titulo: "Error",
        msg: "No puede seleccionar una cantidad menor",
        status: "error",
      });
      return;
    }

    const nuevaCantidad = cantidad - 1;

    if (nuevaCantidad > parseInt(cantidadProducto)) {
      setAlerta({
        titulo: "Error",
        msg: "La cantidad es mayor a la que hay en el inventario",
        status: "error",
      });
      return;
    }

    setCantidad(nuevaCantidad);
    setTotal(nuevaCantidad * costoActualProducto);
  };

  const sumarCantidad = () => {
    setAlerta({});

    if (cantidad >= cantidadProducto) {
      setAlerta({
        titulo: "Error",
        msg: "No puede seleccionar una cantidad menor",
        status: "error",
      });
      return;
    }

    const nuevaCantidad = cantidad + 1;

    if (nuevaCantidad > parseInt(cantidadProducto)) {
      setAlerta({
        titulo: "Error",
        msg: "La cantidad es mayor a la que hay en el inventario",
        status: "error",
      });
      return;
    }

    setCantidad(nuevaCantidad);
    setTotal(nuevaCantidad * costoActualProducto);
  };

  const agregarProducto = () => {
    setAlerta({});
    // console.log(modal.datos);

    const regexCantidadValidation = regexEntero.test(cantidad);
    const detallesProductoDevolucion = {
      nombreProducto,
      codigoProducto,
      cantidad,
      total,
      descuento,
      costoActualProducto,
      codigoVenta,
      fecha: obtenerFechaYHoraActual(),
    };

    console.log(detallesProductoDevolucion);

    const existeProducto = arrProductosDevoluciones.find(
      (e) => e.codigoProducto == detallesProductoDevolucion.codigoProducto
    );

    if (
      cantidad <= 0 ||
      cantidad > parseInt(cantidadProducto) ||
      !regexCantidadValidation
    ) {
      setAlerta({
        titulo: "Error",
        msg: "La cantidad no es valida",
        status: "error",
      });
      return;
    }

    if (existeProducto) {
      setAlerta({
        titulo: "Error",
        msg: "El producto ya fue seleccionado",
        status: "error",
      });
      return;
    }

    // if (descuento.trim().length > 0) {
    //   const regexDescuentoValidation = regexDescuento.test(descuento);

    //   if (
    //     !regexDescuentoValidation ||
    //     descuentoCalculado < parseFloat(precioCompraUnd)
    //   ) {
    //     setAlerta({
    //       titulo: "Error",
    //       msg: "El valor del descuento es invalido",
    //       status: "error",
    //     });
    //     return;
    //   }

    if (descuento) {
      detallesProductoDevolucion.total = totalDescuento;
    }

    console.log(detallesProductoDevolucion);
    setArrProductosDevoluciones([
      ...arrProductosDevoluciones,
      detallesProductoDevolucion,
    ]);

    console.log(detallesProductoDevolucion);
    cerrarModal();
  };

  const cerrarModal = () => {
    setCantidad(1);
    setTotal(parseFloat(costoActualProducto));
    // setDescuento("");
    setAlerta({});
    setModal({ show: false, datos: modal.datos });
  };

  //   const leerDescuento = ({ currentTarget }) => {
  //     const valor = currentTarget.value;
  //     setDescuento(valor);
  //   };

  const { msg } = alerta;

  return (
    <Modal isOpen={modal.show} onClose={cerrarModal}>
      <ModalOverlay />
      <ModalContent maxW={600}>
        <ModalHeader>Detalles del producto</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-around"}
          //   alignItems={"center"}
        >
          <div className="w-full flex justify-between">
            <div className="">
              <Heading fontSize={"large"}>Descripcion del producto</Heading>
              <Text>{nombreProducto}</Text>
            </div>

            <div className="flex flex-col items-center ">
              <Heading
                fontSize={"large"}
                // textAlign={'center'}
              >
                Cantidad
              </Heading>
              <div className=" flex items-center gap-3">
                <MinusIcon cursor={"pointer"} onClick={restarCantidad} />
                <Input
                  width="80px"
                  size="sm"
                  textAlign={"center"}
                  value={cantidad}
                  onChange={cambiarCantidad}
                />
                <AddIcon cursor={"pointer"} onClick={sumarCantidad} />
              </div>
            </div>

            <div className="">
              <Heading fontSize={"large"}>Total</Heading>

              <Text>
                {descuento
                  ? formatoDinero(parseFloat(totalDescuento))
                  : formatoDinero(parseFloat(total))}
              </Text>
            </div>
          </div>
        </ModalBody>

        <ModalFooter display={"flex"} flexDirection={"column"} gap={4}>
          <div className="w-full flex justify-between items-end">
            <div className={""}>
              <Button colorScheme="green" onClick={agregarProducto}>
                Agregar producto
              </Button>
            </div>
          </div>

          {msg && <Alerta alerta={alerta} />}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

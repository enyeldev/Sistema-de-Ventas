/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { formatoDinero } from "../helpers/formatoDinero";

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

export const ModalDataProdVentaCredito = ({
  modal,
  setModal,
  arrProductosVent,
  setArrProductosVent,
}) => {
  if (modal.datos == null) {
    return;
  }

  const {
    nombre,
    precioVentaUnd,
    precioCompraUnd,
    cantidadStock,
    codigoProducto,
  } = modal.datos;

  const [cantidad, setCantidad] = useState(1);
  const [total, setTotal] = useState(precioVentaUnd);
  const [alerta, setAlerta] = useState({});
  const [descuento, setDescuento] = useState("");

  const regexDescuento = /^[0-9]+$/;

  const descuentoCalculado =
    parseFloat(total) / parseInt(cantidad) - parseFloat(descuento);

  useEffect(() => {
    setTotal(parseFloat(precioVentaUnd));
  }, [precioVentaUnd]);

  const cambiarCantidad = ({ target }) => {
    setAlerta({});

    if (parseInt(target.value) < 0) {
      return;
    }

    const cantidadActual = target.value;

    if (cantidadActual > parseInt(cantidadStock)) {
      setAlerta({
        titulo: "Error",
        msg: "La cantidad es mayor a la que hay en el inventario",
        status: "error",
      });
      return;
    }

    setCantidad(target.value);
    setTotal(cantidadActual * precioVentaUnd);
  };

  const restarCantidad = () => {
    setAlerta({});
    if (cantidad == 1) {
      return;
    }

    const nuevaCantidad = cantidad - 1;

    if (nuevaCantidad > parseInt(cantidadStock)) {
      setAlerta({
        titulo: "Error",
        msg: "La cantidad es mayor a la que hay en el inventario",
        status: "error",
      });
      return;
    }

    setCantidad(nuevaCantidad);
    setTotal(nuevaCantidad * precioVentaUnd);
  };

  const sumarCantidad = () => {
    setAlerta({});

    const nuevaCantidad = cantidad + 1;

    if (nuevaCantidad > parseInt(cantidadStock)) {
      setAlerta({
        titulo: "Error",
        msg: "La cantidad es mayor a la que hay en el inventario",
        status: "error",
      });
      return;
    }

    setCantidad(nuevaCantidad);
    setTotal(nuevaCantidad * precioVentaUnd);
  };

  const agregarProducto = () => {
    console.log(modal.datos);

    const detallesProductoVenta = {
      nombre,
      codigoProducto,
      cantidad,
      total,
      descuento,
      precioVentaUnd,
      financiado: true,
    };

    const existeProducto = arrProductosVent.find(
      (e) => e.codigoProducto == detallesProductoVenta.codigoProducto
    );

    if (cantidad <= 0 || cantidad > parseInt(cantidadStock)) {
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

    if (descuento.trim().length > 0) {
      const regexDescuentoValidation = regexDescuento.test(descuento);

      if (
        !regexDescuentoValidation ||
        descuentoCalculado < parseFloat(precioCompraUnd)
      ) {
        setAlerta({
          titulo: "Error",
          msg: "El valor del descuento es invalido",
          status: "error",
        });
        return;
      }

      detallesProductoVenta.total =
        parseFloat(total) - parseFloat(descuento) * parseInt(cantidad);
    }

    setArrProductosVent([...arrProductosVent, detallesProductoVenta]);
    cerrarModal();
  };

  const cerrarModal = () => {
    setCantidad(1);
    setTotal(parseFloat(precioVentaUnd));
    setAlerta({});
    setModal({ show: false, datos: modal.datos });
  };

  const leerDescuento = ({ currentTarget }) => {
    const valor = currentTarget.value;
    setDescuento(valor);
  };

  const { msg } = alerta;

  return (
    <Modal isOpen={modal.show} onClose={cerrarModal}>
      <ModalOverlay />
      <ModalContent maxW={600}>
        <ModalHeader>Detalles del producto</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          display={"flex"}
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          <div className="">
            <Heading fontSize={"large"}>Descripcion del producto</Heading>
            <Text>{nombre}</Text>
          </div>

          <div className="flex flex-col items-center ">
            <Heading fontSize={"large"}>Cantidad</Heading>
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

            <Text>{formatoDinero(total)}</Text>
          </div>
        </ModalBody>

        <ModalFooter display={"flex"} flexDirection={"column"} gap={2}>
          <div className="w-full flex justify-between items-end">
            <div className="">
              <Heading fontSize={"larger"}>Descuento</Heading>
              <Input onChange={leerDescuento} />
            </div>

            <div className="">
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

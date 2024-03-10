import { useEffect, useState } from "react";
import { clienteAxios } from "../config/axios";

import {
  Card,
  CardBody,
  Heading,
  Button,
  Text,
} from "@chakra-ui/react";

export const Inicio = () => {
  const [datosProductos, setDatosProductos] = useState({});

  useEffect(() => {
    const obtenerDatosDeProductos = async () => {
      const respuesta = await clienteAxios.get("/inicio/datosProductos");

      console.log(respuesta.data.datosProductos);
      setDatosProductos(respuesta.data.datosProductos);
    };

    obtenerDatosDeProductos();
  }, []);

  return (
    <div className="w-[90%] min-h-screen h-full bg-gray-100 rounded-md p-2">
      <div className="w-full flex gap-3">
        <Card>
          <CardBody display={"flex"} flexDirection={"column"} gap={"5px"}>
            <Heading fontSize={"x-large"}>Total de productos</Heading>
            <Text fontSize={"x-large"}>{datosProductos.cantidadTotal}</Text>
            <Button colorScheme="blue">Ver mas</Button>
          </CardBody>
        </Card>

        <Card>
          <CardBody display={"flex"} flexDirection={"column"} gap={"5px"}>
            <Heading fontSize={"x-large"}>Productos en baja</Heading>
            <Text fontSize={"x-large"}>
              {datosProductos.cantidadProductosEnBaja}
            </Text>
            <Button colorScheme="blue">Ver mas</Button>
          </CardBody>
        </Card>

        <Card>
          <CardBody display={"flex"} flexDirection={"column"} gap={"5px"}>
            <Heading fontSize={"x-large"}>Productos agotados</Heading>
            <Text fontSize={"x-large"}>
              {datosProductos.cantidadProductosEnBaja}
            </Text>
            <Button colorScheme="blue">Ver mas</Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

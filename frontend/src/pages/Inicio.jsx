import { useEffect, useState } from "react";
import { clienteAxios } from "../config/axios";

import { Card, CardBody, Heading, Button, Text } from "@chakra-ui/react";

import { ModalInicio } from "../components/ModalInicio";

export const Inicio = () => {
  const [datosProductos, setDatosProductos] = useState({});
  const [listaProdcutos, setListaProdcutos] = useState([]);
  const [modal, setModal] = useState({ titulo: "", show: false, filtro: "" });

  useEffect(() => {
    const obtenerDatosDeProductos = async () => {
      const respuesta = await clienteAxios.get("/inicio/datosProductos");

      console.log(respuesta.data.datosProductos);
      setDatosProductos(respuesta.data.datosProductos);
    };

    obtenerDatosDeProductos();
  }, []);

  // Funcion que trae los datos y muestra el modal
  const handleClick = async ({ titulo, url, filtro }) => {
    try {
      const respuesta = await clienteAxios.get(url);
      console.log(respuesta.data.listaProductos);
      setListaProdcutos(respuesta.data.listaProductos);
      setModal({
        show: true,
        titulo,
        filtro,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[85%] max-h-screen  bg-gray-100 rounded-md p-2">
      {modal.show && (
        <ModalInicio
          modal={modal}
          setModal={setModal}
          listaProdcutos={listaProdcutos}
          setListaProdcutos={setListaProdcutos}
        />
      )}
      <div className="w-full flex gap-3">
        <Card>
          <CardBody display={"flex"} flexDirection={"column"} gap={"5px"}>
            <Heading fontSize={"x-large"}>Total de productos</Heading>
            <Text fontSize={"x-large"}>{datosProductos.cantidadTotal}</Text>
            <Button
              colorScheme="blue"
              onClick={async () =>
                await handleClick({
                  titulo: "Todos los productos",
                  url: "/inicio/todosProductos",
                  filtro: "productos",
                })
              }
            >
              Ver mas
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardBody display={"flex"} flexDirection={"column"} gap={"5px"}>
            <Heading fontSize={"x-large"}>Productos en baja</Heading>
            <Text fontSize={"x-large"}>
              {datosProductos.cantidadProductosEnBaja}
            </Text>
            <Button
              colorScheme="blue"
              onClick={() =>
                handleClick({
                  titulo: "Todos los productos en baja",
                  url: "/inicio/productosEnBaja",
                  filtro: "baja",
                })
              }
            >
              Ver mas
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardBody display={"flex"} flexDirection={"column"} gap={"5px"}>
            <Heading fontSize={"x-large"}>Productos agotados</Heading>
            <Text fontSize={"x-large"}>
              {datosProductos.cantidadProductosAgotados}
            </Text>
            <Button
              colorScheme="blue"
              onClick={() =>
                handleClick({
                  titulo: "Todos los productos agotados",
                  url: "/inicio/productosAgotados",
                  filtro: "agotado",
                })
              }
            >
              Ver mas
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

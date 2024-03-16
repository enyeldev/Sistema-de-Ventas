import { useState } from "react";
import { Button, Heading, Input } from "@chakra-ui/react";
import { Alerta } from "../components/Alerta";

export const Devoluciones = () => {
  const [parametroBusqueda, setParametroBusqueda] = useState("");
  const [alerta, setAlerta] = useState({});

  const regexCodigo = /^[0-9]+$/;

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
  };

  const { msg } = alerta;

  return (
    <div className="w-[85%] min-h-screen h-full bg-gray-100 rounded-md p-2">
      <div className="w-full bg-white shadow-md rounded-md p-2 flex flex-col gap-2">
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
              Buscar productos
            </Button>
          </div>
        </form>

        {msg && <Alerta alerta={alerta} />}
      </div>
    </div>
  );
};

import { useState } from "react";
import { generarNuevoRetiro } from "../helpers/retirosFunciones";
import { Heading, Input, Button } from "@chakra-ui/react";
import { Alerta } from "../components/Alerta";

export const Retiro = () => {
  const [errorDescripcion, setErrorDescripcion] = useState(false);
  const [errorInput, setErrorInput] = useState(false);
  const [montoRetiro, setMontoRetiro] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [alerta, setAlerta] = useState({});

  const regexEntero = /^-?\d+$/;

  const realizarRetiro = async (e) => {
    e.preventDefault();

    const regexValidation = regexEntero.test(montoRetiro);

    if (montoRetiro == "" || !regexValidation || parseFloat(montoRetiro) <= 0) {
      setErrorInput(true);
      return;
    }

    if (descripcion == "") {
      setErrorDescripcion(true);
      return;
    }

    const respuesta = await generarNuevoRetiro(montoRetiro, descripcion);

    setAlerta({
      titulo: "Completado",
      msg: respuesta.data.msg,
      status: "success",
    });
  };

  const { msg } = alerta;

  return (
    <div className="w-[85%] max-h-screen bg-gray-100 rounded-md p-2 flex items-center">
      <div className="bg-white mx-auto p-2 rounded-md shadow-lg flex flex-col gap-3">
        <div className="">
          <Heading fontSize={"x-large"}>Detalles del Retiro</Heading>
        </div>

        <form className="flex flex-col gap-2" onSubmit={realizarRetiro}>
          <div className="flex gap-2">
            <div className="flex flex-col gap-2">
              <Heading fontSize={"larger"}>Monto</Heading>

              <Input
                placeholder={"Ej: 1200 , 350"}
                background={"gray.100"}
                borderColor={`${errorInput ? "red" : "gray.200"}`}
                onChange={({ target }) => {
                  setErrorInput(false);
                  setMontoRetiro(target.value);
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Heading fontSize={"larger"}>Descripcion del Retiro</Heading>

              <Input
                placeholder={"Ej: Venta de Productos"}
                background={"gray.100"}
                borderColor={`${errorDescripcion ? "red" : "gray.200"}`}
                onChange={({ target }) => {
                  setErrorDescripcion(false);
                  setDescripcion(target.value);
                }}
              />
            </div>
          </div>

          <Button type="submit" colorScheme="blue" width={"full"}>
            Generar Retiro
          </Button>
        </form>

        {msg && (
          <div className="w-full py-3">
            <Alerta alerta={alerta} />
          </div>
        )}
      </div>
    </div>
  );
};

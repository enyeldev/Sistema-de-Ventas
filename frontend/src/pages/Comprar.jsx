import { useState, useRef } from "react";

import { BtnSubmit } from "../components/BtnSubmit";
import { TailSpin } from "react-loader-spinner";
import { Alerta } from "../components/Alerta";
import { clienteAxios } from "../config/axios";
import { FormularioActualizarProducto } from "../components/FormularioActualizarProducto";
import { FormLabel, Input, Button } from "@chakra-ui/react";

export const Comprar = () => {
  const [cargando, setCargando] = useState(false);
  const [cargandoCodigo, setCargandoCodigo] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [agregarNuevo, setAgregarNuevo] = useState(false);
  const [actualizar, setActualizar] = useState(false);
  const [dataActualizar, setDataActualizar] = useState({});
  const [codigo, setCodigo] = useState("");
  const inputCodigo = useRef(null);
  // const regexCodigo = /^[0-9]+$/;

  const handleBuscarProducto = async (e) => {
    e.preventDefault();

    // const regexCodigoValidation = regexCodigo.test(codigo);

    if (codigo == "") {
      setAlerta({
        titulo: "Error",
        msg: "Ingrese el codigo correctamente",
        status: "error",
      });
      return;
    }

    setCargando(true);
    try {
      const url = `/producto/buscarParaComprar/${codigo}`;

      const respuesta = await clienteAxios.get(url);

      if (respuesta.data.msg == "No existe este producto en la base de datos") {
        setAgregarNuevo(true);
        setCargando(false);
        setAlerta({});
        return;
      }

      const {
        nombre,
        cantidadStock,
        precioCompraUnd,
        ganancia,
        minStock,
        codigoProducto,
      } = respuesta.data;

      setDataActualizar({
        nombre: nombre.toUpperCase(),
        cantidadStock,
        precioCompraUnd,
        ganancia,
        minStock,
      });

      setActualizar(true);

      setCodigo(codigoProducto.toUpperCase());

      console.log(respuesta);
    } catch (error) {
      console.log(error);
      setAlerta({
        titulo: "Error",
        msg: error.response.data.msg,
        status: "error",
      });
    }

    setCargando(false);
  };

  const handleGenerarCodigo = async () => {
    setAlerta({});
    setCargandoCodigo(true);
    try {
      const url = `/producto/generarCodigoProducto`;
      const respuesta = await clienteAxios.get(url);
      inputCodigo.current.value = respuesta.data.codigo;
      setCodigo(respuesta.data.codigo.toUpperCase());
      console.log(respuesta.data.codigo);
    } catch (error) {
      console.log(error);
      setAlerta({ msg: error.response.data.msg, error: true });
    }
    setCargandoCodigo(false);
  };

  const handleNuevoProducto = () => {
    setDataActualizar({});
    setActualizar(false);
    setAgregarNuevo(false);
  };

  const { msg } = alerta;
  return (
    <>
      <div className="w-[85%] max-h-screen bg-gray-100 rounded-md p-2">
        <div className="w-full h-full flex items-center justify-center">
          {agregarNuevo || actualizar ? (
            <FormularioActualizarProducto
              actualizar={actualizar}
              agregarNuevo={agregarNuevo}
              codigo={codigo}
              setCodigo={setCodigo}
              dataActualizar={dataActualizar}
              handleNuevoProducto={handleNuevoProducto}
            />
          ) : (
            <div className="flex w-full gap-4">
              <div className="bg-white rounded-md shadow-md w-1/2 p-5 mx-auto">
                <form
                  action=""
                  className="flex flex-col gap-3 w-full"
                  onSubmit={handleBuscarProducto}
                >
                  {msg && <Alerta alerta={alerta} />}

                  <div className="">
                    <div className={`flex flex-col`}>
                      <FormLabel htmlFor="codigo" fontSize={"large"}>
                        Codigo del producto
                      </FormLabel>
                      <Input
                        ref={inputCodigo}
                        type="text"
                        id="codigo"
                        bg={"gray.100"}
                        placeholder="Ej: 897217091241 , 4478"
                        onChange={({ target }) => {
                          setAlerta({});
                          setCodigo(target.value.toUpperCase());
                        }}
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="w-full flex justify-between">
                    <BtnSubmit
                      text={"Agregar Producto"}
                      cargando={cargando}
                      tipo={"submit"}
                    />

                    <Button
                      type="button"
                      colorScheme="blue"
                      fontSize={"large"}
                      onClick={handleGenerarCodigo}
                    >
                      {cargandoCodigo ? (
                        <TailSpin
                          width={40}
                          height={30}
                          color="#fff"
                          strokeWidth={3}
                          visible={cargandoCodigo}
                        />
                      ) : (
                        "Generar Codigo"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

/* eslint-disable react/prop-types */
import { useState } from "react";
import { clienteAxios } from "../config/axios";
import { Alerta } from "../components/Alerta";
import { BtnSubmit } from "../components/BtnSubmit";
import { Button } from "@chakra-ui/react";

import { InputComprarProducto } from "../components/InputComprarProducto";

export const FormularioActualizarProducto = ({
  codigo,
  agregarNuevo,
  actualizar,
  setCodigo,
  dataActualizar,
  handleNuevoProducto,
}) => {
  const [descripcionProducto, setDescripcionProducto] = useState(
    dataActualizar.nombre || ""
  );
  const [cantidadProducto, setCantidadProducto] = useState(
    dataActualizar.cantidadStock || ""
  );
  const [precioUnidadProducto, setPrecioUnidadProducto] = useState(
    dataActualizar.precioCompraUnd || ""
  );
  const [gananciaUnidadProducto, setGananciaUnidadProducto] = useState(
    dataActualizar.ganancia || ""
  );
  const [minimoInventarioProducto, setMinimoInventarioProducto] = useState(
    dataActualizar.minStock || ""
  );
  const [tramoProducto, setTramoProducto] = useState(
    dataActualizar.tramo || ""
  );

  const [nuevoProducto, setNuevoProducto] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [alerta, setAlerta] = useState({});

  const regexNumero = /^[0-9]+$/;

  const handleActualizarProducto = async (e) => {
    e.preventDefault();

    const regexPrecioCompraValidation = regexNumero.test(precioUnidadProducto);
    const regexGananciaValidation = regexNumero.test(gananciaUnidadProducto);
    const regexMinimoValidation = regexNumero.test(minimoInventarioProducto);
    const regexcCantidadValidation = regexNumero.test(cantidadProducto);

    if (
      descripcionProducto == "" ||
      precioUnidadProducto == "" ||
      gananciaUnidadProducto == "" ||
      minimoInventarioProducto == ""
    ) {
      setAlerta({
        titulo: "Error",
        msg: "Hay campos vacios",
        status: "error",
      });
      return;
    }

    if (!regexcCantidadValidation && cantidadProducto.length > 0) {
      setAlerta({
        titulo: "Error",
        msg: "La cantidad es incorrecta",
        status: "error",
      });
      return;
    }

    if (parseInt(cantidadProducto) < 0) {
      setAlerta({
        titulo: "Error",
        msg: "La cantidad del producto debe ser mayor a cero",
        status: "error",
      });
      return;
    }

    if (!regexPrecioCompraValidation) {
      setAlerta({
        titulo: "Error",
        msg: "El precio de compra es incorrecto",
        status: "error",
      });
      return;
    }

    if (!regexGananciaValidation) {
      setAlerta({
        titulo: "Error",
        msg: "La ganancia es incorrecta",
        status: "error",
      });
      return;
    }

    if (parseFloat(gananciaUnidadProducto) <= 0) {
      setAlerta({
        titulo: "Error",
        msg: "La ganancia debe ser mayos a cero",
        status: "error",
      });
      return;
    }

    if (!regexMinimoValidation) {
      setAlerta({
        titulo: "Error",
        msg: "El minimo es incorrecto",
        status: "error",
      });
      return;
    }

    // if (parseInt(minimoInventarioProducto) >= parseInt(cantidadProducto)) {
    //   setAlerta({
    //     titulo: "Error",
    //     msg: "El minimo debe ser menor a la cantidad",
    //     status: "error",
    //   });
    //   return;
    // }

    try {
      const url = `/producto/actualizar/${codigo}`;

      const data = {
        nombreNuevo: descripcionProducto.toUpperCase(),
        cantidadStockNuevo: parseInt(cantidadProducto),
        minStockNuevo: parseInt(minimoInventarioProducto),
        precioCompraUndNuevo: parseFloat(precioUnidadProducto),
        gananciaNuevo: parseFloat(gananciaUnidadProducto),
        tramoProducto: tramoProducto.toUpperCase(),
      };

      const respuesta = await clienteAxios.put(url, data);

      setNuevoProducto(true);
      setAlerta({
        titulo: "Completado",
        msg: respuesta.data.msg,
        error: "success",
      });
    } catch (error) {
      console.log(error);
      setAlerta({
        titulo: "Error",
        msg: error.response.data.msg,
        status: "error",
      });
    }
  };

  const handleAgregarProducto = async (e) => {
    e.preventDefault();

    const arrDatos = [
      descripcionProducto,
      cantidadProducto,
      precioUnidadProducto,
      gananciaUnidadProducto,
      minimoInventarioProducto,
    ];

    const existeDatoVacio = arrDatos.some((e) => e == "");

    if (existeDatoVacio) {
      setAlerta({
        titulo: "Error",
        msg: "Todos los campos son obligatorios",
        status: "error",
      });
      return;
    }

    const regexPrecioCompraValidation = regexNumero.test(precioUnidadProducto);
    const regexGananciaValidation = regexNumero.test(gananciaUnidadProducto);
    const regexMinimoValidation = regexNumero.test(minimoInventarioProducto);
    const regexcCantidadValidation = regexNumero.test(cantidadProducto);

    if (!regexcCantidadValidation) {
      setAlerta({
        titulo: "Error",
        msg: "La cantidad es incorrecta",
        status: "error",
      });
      return;
    }

    if (parseInt(cantidadProducto) <= 0) {
      setAlerta({
        titulo: "Error",
        msg: "La cantidad del producto debe ser mayor a cero",
        status: "error",
      });
      return;
    }

    if (!regexPrecioCompraValidation) {
      setAlerta({
        titulo: "Error",
        msg: "El precio de compra es incorrecto",
        status: "error",
      });
      return;
    }

    if (!regexGananciaValidation) {
      setAlerta({
        titulo: "Error",
        msg: "La ganancia es incorrecta",
        status: "error",
      });
      return;
    }

    if (parseFloat(gananciaUnidadProducto) <= 0) {
      setAlerta({
        titulo: "Error",
        msg: "La ganancia debe ser mayos a cero",
        status: "error",
      });
      return;
    }

    if (!regexMinimoValidation) {
      setAlerta({
        titulo: "Error",
        msg: "El minimo es incorrecto",
        status: "error",
      });
      return;
    }

    if (parseInt(minimoInventarioProducto) >= parseInt(cantidadProducto)) {
      setAlerta({
        titulo: "Error",
        msg: "El minimo debe ser menor a la cantidad",
        status: "error",
      });
      return;
    }

    if (parseInt(minimoInventarioProducto) <= 0) {
      setAlerta({
        titulo: "Error",
        msg: "El minimo debe ser mayor a cero",
        status: "error",
      });
      return;
    }

    setCargando(true);
    console.log(tramoProducto);
    try {
      const url = `/productos/agregar`;

      const cantidadStock = parseInt(cantidadProducto);
      const minStock = parseInt(minimoInventarioProducto);
      const precioCompraUnd = parseFloat(precioUnidadProducto);
      const ganancia = parseFloat(gananciaUnidadProducto);

      const producto = {
        codigoProducto: codigo.toUpperCase(),
        nombre: descripcionProducto.toUpperCase(),
        cantidadStock,
        minStock,
        precioCompraUnd,
        ganancia,
        tramoProducto: tramoProducto.toUpperCase(),
      };

      const respuesta = await clienteAxios.post(url, producto);

      setNuevoProducto(true);
      setAlerta({
        titulo: "Completado",
        msg: respuesta.data.msg,
        status: "success",
      });
    } catch (error) {
      setAlerta({
        titulo: "Error",
        msg: error.response.data.msg,
        status: "error",
      });
    }

    setCargando(false);
  };

  const { msg } = alerta;

  return (
    <div className="bg-white rounded-md shadow-md w-[80%] p-5 mx-auto">
      <form
        action=""
        className="flex flex-col gap-3"
        onSubmit={actualizar ? handleActualizarProducto : handleAgregarProducto}
      >
        <div
          className={`${
            agregarNuevo || actualizar ? "flex" : "block"
          } flex-wrap gap-2 `}
        >
          <InputComprarProducto
            estado={codigo}
            label={"Codigo del producto"}
            placeHolder={"Ej: 897217091241 , 4478"}
            setAlerta={setAlerta}
            setEstado={setCodigo}
            id={"codigo"}
            soloLeer={true}
          />

          <InputComprarProducto
            estado={descripcionProducto}
            label={"Descripcion del producto"}
            placeHolder={"Ej: Filtro de aire"}
            setAlerta={setAlerta}
            setEstado={setDescripcionProducto}
            id={"nombre"}
            soloLeer={false}
          />

          <InputComprarProducto
            estado={tramoProducto}
            label={"Tramo del producto"}
            placeHolder={"Ej: A1, B3"}
            setAlerta={setAlerta}
            setEstado={setTramoProducto}
            id={"tramo"}
            soloLeer={false}
          />

          <InputComprarProducto
            estado={cantidadProducto}
            label={"Cantidad del producto"}
            placeHolder={"Ej: 20, 30, 5"}
            setAlerta={setAlerta}
            setEstado={setCantidadProducto}
            id={"cantidad"}
            soloLeer={false}
          />

          <InputComprarProducto
            estado={precioUnidadProducto}
            label={"Precio de compra C/U"}
            placeHolder={"Ej: 20, 30, 5"}
            setAlerta={setAlerta}
            setEstado={setPrecioUnidadProducto}
            id={"precioCompra"}
            soloLeer={false}
          />

          <InputComprarProducto
            estado={gananciaUnidadProducto}
            label={"Ganancia por unidad"}
            placeHolder={"Ej: 20, 30, 5"}
            setAlerta={setAlerta}
            setEstado={setGananciaUnidadProducto}
            id={"gananci"}
            soloLeer={false}
          />

          <InputComprarProducto
            estado={minimoInventarioProducto}
            label={"Minimo en el inventario"}
            placeHolder={"Ej: 20, 30, 5"}
            setAlerta={setAlerta}
            setEstado={setMinimoInventarioProducto}
            id={"minimo"}
            soloLeer={false}
          />
        </div>

        {!nuevoProducto && (
          <BtnSubmit
            text={actualizar ? "Actualizar producto" : "Agregar producto"}
            cargando={cargando}
            tipo={"submit"}
          />
        )}

        <Button
          colorScheme="green"
          type="button"
          fontSize={"large"}
          onClick={() => {
            handleNuevoProducto();
          }}
        >
          Nuevo producto
        </Button>

        {msg && <Alerta alerta={alerta} />}
      </form>
    </div>
  );
};

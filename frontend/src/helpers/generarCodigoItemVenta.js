import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("0123456789", 13);

export const generarCodigoVentaItem = () => {
  return nanoid();
};

export const existeCodigoProductoItem = (arr) => {
  let codigoGenerado = generarCodigoVentaItem();

  let existeProductoCodigo = arr.some((e) => {
    return e.codigoProducto == codigoGenerado;
  });

  while (existeProductoCodigo) {
    codigoGenerado = generarCodigoVentaItem();

    existeProductoCodigo = arr.some((e) => {
      return e.codigoProducto == codigoGenerado;
    });
  }

  return codigoGenerado;
};

import { arrRutas } from "../constant/arrRutas";

export const nombreDeRuta = (ruta) => {
  const objRuta = arrRutas.find((e) => {
    return e.ruta == ruta;
  });

  if (!objRuta) {
    return "";
  }

  return objRuta.nombre;
};

import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("0123456789", 13);

export const generarCodigoVentaItem = () => {
  return nanoid();
};

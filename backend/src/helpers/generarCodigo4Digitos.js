// generar Codigo unico con nanoID
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('0123456789', 4);


export const generarCodigo4Digitos = () => {
    return nanoid();
}

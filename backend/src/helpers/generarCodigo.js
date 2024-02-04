// generar Codigo unico con nanoID
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('0123456789', 13);


export const generarID = () => {
    return nanoid();
}

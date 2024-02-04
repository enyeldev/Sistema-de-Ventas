import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('0123456789', 10);


export const generarID = () => {
    return nanoid();
}
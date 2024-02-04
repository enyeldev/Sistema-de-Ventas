import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { clienteAxios } from '../config/axios'
import { Alerta } from '../components/Alerta'
import { BtnSubmit } from '../components/BtnSubmit'
// import {
//     FormControl,
//     FormLabel,
//     FormErrorMessage,
//     FormHelperText,
// } from '@chakra-ui/react'



export const LoginCajero = () => {

    const [nombre, setNombre] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})
    const [cargando, setCargando] = useState(false)
    const { setAuth } = useAuth()

    const navigator = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

        const arrDatos = [nombre, password];


        const someDataEmpty = arrDatos.some(e => e == '');

        if (someDataEmpty) {
            setAlerta({ titulo: 'Error', msg: 'Todos los campos son obligatorios', status: 'error' });
            return
        }

        if (password.length < 4) {
            setAlerta({ titulo: 'Error', msg: 'La contraseña debe tener mas de 4 caracteres', status: 'error' })
            return
        }

        setCargando(true)
        try {
            const url = `/loginCajero/${nombre}/${password}`
            const respuesta = await clienteAxios.get(url);

            // almacenamos token en localstorage
            localStorage.setItem('POS_token', respuesta.data.usuario.token)

            setAuth(respuesta.data.usuario)
            setAlerta({ msg: respuesta.data.msg, error: false })

            // navigator('/caja');
            navigator('/fondo-caja');
        } catch (error) {
            setAlerta({ titulo: 'Error', msg: error.response.data.msg, status: 'error' });
        }

        setCargando(false)

    }

    const { msg } = alerta

    return (
        <div className="w-full h-full flex items-center justify-center px-10">
            <div className="">
                <h1 className="text-6xl font-black"> <span className="text-blue-600">Inicia Sesion para Realizar</span> Compras y Ventas</h1>
            </div>

            <div className="bg-white w-11/12 p-5 rounded-md shadow-lg flex flex-col gap-3">

                {msg && <Alerta alerta={alerta} />}
                <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="w-full flex flex-col gap-1">
                        <label htmlFor="nombre" className="text-xl font-bold">Usuario</label>
                        <input
                            type="text"
                            name="nombre"
                            id="nombre"
                            placeholder="Ej: Usuario1"
                            className="bg-gray-100 p-3 rounded-md outline-none"
                            onChange={({ target }) => setNombre(target.value)}
                        />
                    </div>

                    <div className="w-full flex flex-col gap-1">
                        <label htmlFor="contraseña" className="text-xl font-bold">Contraseña</label>
                        <input
                            type="password"
                            name="contraseña"
                            id="contraseña"
                            placeholder="Ej: 1234"
                            className="bg-gray-100 p-3 rounded-md outline-none"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>

                    <BtnSubmit text={'Iniciar Sesion'} cargando={cargando} tipo={'submit'} />
                </form>

            </div>
        </div>

    )
}

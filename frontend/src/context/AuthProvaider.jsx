/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from 'react'
import { clienteAxios } from '../config/axios'

export const AuthContext = createContext()


export const AuthProvaider = ({ children }) => {

    const [auth, setAuth] = useState({});
    const [cargandoAuth, setCargandoAuth] = useState(true)

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('POS_token')

            if (!token) {
                setCargandoAuth(false)
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const respuesta = await clienteAxios.get('/obtenerPerfilCajero', config)

                setAuth(respuesta.data.usuario)
            } catch (error) {
                console.log(error);
                setAuth({})
            }

            setCargandoAuth(false)

        }

        autenticarUsuario()
    }, [])
    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargandoAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
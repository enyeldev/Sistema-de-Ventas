/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
// import { clienteAxios } from '../config/axios'

export const FondoContext = createContext()


export const FondoProvaider = ({ children }) => {

    const [fondo, setFondo] = useState('');

    const navigator = useNavigate()
    useEffect(() => {
        const verificarFondoCaja = async () => {
            const fondoCaja = localStorage.getItem('FONDO_CAJA')

            if (!fondoCaja) {
                navigator('/')
                return
            }

            setFondo(fondoCaja)

        }

        verificarFondoCaja()
    }, [])
    return (
        <FondoContext.Provider
            value={{
                fondo
            }}
        >
            {children}
        </FondoContext.Provider>
    )
}
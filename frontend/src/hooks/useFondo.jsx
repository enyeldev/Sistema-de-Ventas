import { useContext } from 'react'
import { FondoContext } from '../context/FondoCajaProvaider'

export const useFondo = () => {
    return useContext(FondoContext)
}
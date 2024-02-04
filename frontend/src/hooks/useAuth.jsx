import { useContext } from 'react'
import { AuthContext } from '../context/AuthProvaider'

export const useAuth = () => {
    return useContext(AuthContext)
}

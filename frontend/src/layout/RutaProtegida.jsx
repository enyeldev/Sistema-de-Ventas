import { Outlet } from "react-router-dom"
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { PaginaCarga } from '../components/PaginaCarga'
import { Header } from "../components/Header"


export const RutaProtegida = () => {

    const { auth, cargandoAuth } = useAuth()


    if (cargandoAuth) {
        return <PaginaCarga />
    }

    return (

        <main className="min-w-screen h-max min-h-screen flex gap-3 bg-blue-700 p-2">
            <Header />
            {auth.id ? <Outlet /> : <Navigate to='/' />}
        </main>

    )
}

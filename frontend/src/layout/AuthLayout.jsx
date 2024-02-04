import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
    return (
        <main className='bg-gray-100 w-screen h-screen flex items-center'>
            <div className="container mx-auto">
                <Outlet />
            </div>
        </main>
    )
}

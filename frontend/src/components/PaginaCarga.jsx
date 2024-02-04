/* eslint-disable react/prop-types */
import { ProgressBar } from 'react-loader-spinner'

export const PaginaCarga = ({ cargando }) => {
    return (
        <main className="bg-gray-100 w-screen h-max min-h-screen flex justify-center items-center flex-col">
            <h1 className='text-3xl font-bold uppercase'>Un momento, la pagina esta cargando</h1>
            <ProgressBar
                visible={cargando}
                borderColor='#000'
                barColor='rgb(37, 99, 235)'
                width={150}
                height={150}
            />
        </main>
    )
}

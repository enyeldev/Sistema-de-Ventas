/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'

export const OpcionPrincipal = ({ text, icon, ruta }) => {
    const navigator = useNavigate();

    const handleClick = () => {
        navigator(ruta)
    }


    return (

        <div
            className="bg-white rounded-md shadow-lg flex flex-col items-center justify-center p-4 cursor-pointer group hover:bg-blue-600 transition-colors duration-400"
            onClick={handleClick}
        >
            {icon}
            <h1 className="text-xl font-bold uppercase text-center group-hover:text-white">{text}</h1>
        </div>

    )
}

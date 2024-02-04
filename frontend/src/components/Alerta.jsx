/* eslint-disable react/prop-types */

import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'

export const Alerta = ({ alerta }) => {

    const { msg, titulo, status } = alerta
    return (
        // <div
        //     className={
        //         `w-full rounded-md py-2 
        //         ${error == null ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600'
        //             : error ? 'bg-gradient-to-r from-red-400 via-red-500 to-red-600'
        //                 : 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-800'}
        //         `}
        // >
        //     <p className="text-white text-sm text-center font-bold uppercase ">{msg}</p>
        // </div>

        <Alert status={status}>
            <AlertIcon />
            <AlertTitle>{titulo}</AlertTitle>
            <AlertDescription>{msg}</AlertDescription>
        </Alert>
    )
}

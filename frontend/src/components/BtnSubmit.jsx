/* eslint-disable react/prop-types */
import { TailSpin } from 'react-loader-spinner'
import { Button } from '@chakra-ui/react'


export const BtnSubmit = ({ text, cargando, tipo }) => {
    return (
        <>
            <Button
                type={tipo}
                colorScheme='blue'
                fontSize={'large'}
            >
                {cargando ? (
                    <TailSpin
                        width={40}
                        height={30}
                        color='#fff'
                        strokeWidth={3}
                        visible={cargando}
                    />
                ) : text}
            </Button>
        </>
    )
}

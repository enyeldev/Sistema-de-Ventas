/* eslint-disable react/prop-types */

import { formatoDinero } from '../helpers/formatoDinero'

import { AddIcon } from '@chakra-ui/icons'
import { Tr, Td } from '@chakra-ui/react'


export const ItemProdBusqueda = ({ nombre, precio, agotado, enBaja, cantidad, mostrarModal, id }) => {

    return (
        <Tr
            background={`${agotado ? 'red.200' : enBaja ? 'yellow.200' : ''}`}
            data-id={id}
        >
            <Td>{nombre}</Td>
            <Td textAlign={'center'}>{cantidad}</Td>
            <Td textAlign={'center'}>{formatoDinero(precio)}</Td>
            <Td
            >
                <AddIcon
                    color={'blue'}
                    cursor={'pointer'}
                    fontSize={'large'}
                    display={agotado ? 'none' : 'block'}
                    onClick={mostrarModal}
                />
            </Td>
        </Tr>
    )
}

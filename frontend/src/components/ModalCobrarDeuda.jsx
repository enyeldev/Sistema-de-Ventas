/* eslint-disable react/prop-types */

import { useState } from 'react'
import { formatoDinero } from '../helpers/formatoDinero'
import { clienteAxios } from '../config/axios'
import { obtenerFechaYHoraActual } from '../helpers/fechaHoraActual'
import { generarFacturaDeuda, imprimirFacturaDeuda } from '../helpers/facturasFunciones'
import { buscarCodigoFacturaDeuda } from '../helpers/deudasFunciones'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
    Heading,
    Text,
    Input,
    Button
} from '@chakra-ui/react'

import { TailSpin } from 'react-loader-spinner'

import { Alerta } from '../components/Alerta'

import { generarNuevoIngresoVenta } from '../helpers/ingresosFunciones'



export const ModalCobrarDeuda = ({ modal, setModalDeuda, setShowModalFacturaDeuda, setDatosFacturaDeuda, setCobro, cobro }) => {

    // if (modal.datos == null) {
    //     return
    // }

    const [pagoCliente, setPagoCliente] = useState('')
    const [errorInput, setErrorInput] = useState(false)
    const [alerta, setAlerta] = useState({})
    const [cargandoBusqueda, setCargandoBusqueda] = useState(false)

    const devueltaCliente = parseFloat(pagoCliente) - parseFloat(modal.datos.montoActualDeuda);

    const { codigoDeuda } = modal.datos


    const cerrarModal = () => {
        // setCantidad(1)
        // setTotal(parseFloat(precioVentaUnd))
        setAlerta({})
        setModalDeuda({ show: false, datos: modal.datos })
    }

    const realizarPago = async (e) => {
        e.preventDefault();

        if (pagoCliente == '' || parseFloat(pagoCliente) > parseFloat(modal.datos.montoActualDeuda)) {
            setErrorInput(true)
            return
        }

        const fecha = obtenerFechaYHoraActual()
        setCargandoBusqueda(true)
        try {


            await clienteAxios.put('/deudas/pagarDeudas', { codigoDeuda, montoPago: pagoCliente, fecha })


            await clienteAxios.post('/deudas/historialDePagos', {
                codigoDeuda,
                montoPago: pagoCliente.toString(),
                fecha
            })

            await generarNuevoIngresoVenta(pagoCliente, 3, 'Pago de deuda')

            const codigoFacturaDeuda = await buscarCodigoFacturaDeuda(codigoDeuda)

            console.log(codigoFacturaDeuda);
            const datosFacturaDeuda = await imprimirFacturaDeuda(codigoFacturaDeuda)

            console.log('holaaa');

            console.log(datosFacturaDeuda);
            setDatosFacturaDeuda(datosFacturaDeuda)

            cerrarModal()
            setShowModalFacturaDeuda(true)
        } catch (error) {
            console.log(error);
            setAlerta({ titulo: 'Error', msg: error.response.data.msg, status: 'error' })
        }

        setCargandoBusqueda(false)
        setCobro(!cobro)
    }

    // console.log(modal.datos);

    const { msg } = alerta

    return (
        <Modal isOpen={modal.show} onClose={cerrarModal}>
            <ModalOverlay />
            <ModalContent
                maxW={700}
            >
                <ModalHeader>Cobrar Deuda</ModalHeader>
                <ModalCloseButton />
                <ModalBody
                    display={'flex'}
                    justifyContent={'space-around'}
                    alignItems={'center'}
                >

                    <div className="">
                        <Heading fontSize={'larger'}>
                            Monto Restante:
                        </Heading>

                        <Text>
                            {formatoDinero(parseFloat(modal.datos.montoActualDeuda))}
                        </Text>
                    </div>

                    <div className="">
                        <Heading fontSize={'larger'}>
                            Devuelta Cliente:
                        </Heading>

                        <Text>
                            {pagoCliente > parseFloat(modal.datos.montoActualDeuda) ? formatoDinero(parseFloat(devueltaCliente)) : '- - - - - -'}
                        </Text>
                    </div>


                    <form onSubmit={realizarPago}>
                        <div className="flex flex-col gap-2">

                            <Heading fontSize={'larger'}>
                                Pago Cliente:
                            </Heading>
                            <Input
                                borderColor={`${errorInput ? 'red' : 'gray.200'}`}
                                background={'gray.100'}
                                placeholder={'Ej: 500, 750, 3400'}
                                onChange={({ target }) => {
                                    setErrorInput(false)
                                    setPagoCliente(target.value)
                                }}
                                // value={parametroBusqueda}
                                autoFocus
                            />

                            <Button
                                colorScheme='blue'
                                type='submit'
                            >
                                {
                                    cargandoBusqueda ? (
                                        <TailSpin
                                            width={50}
                                            height={55}
                                            color='#fff'
                                            strokeWidth={3}
                                            visible={cargandoBusqueda}
                                        />
                                    ) : 'Cobrar Deuda'
                                }
                            </Button>
                        </div>
                    </form>

                </ModalBody>

                <ModalFooter display={'flex'} flexDirection={'column'} gap={2}>
                    {msg && <Alerta alerta={alerta} />}
                </ModalFooter>

            </ModalContent>
        </Modal >
    )
}

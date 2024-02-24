import { useState } from 'react'


import { BtnSubmit } from '../components/BtnSubmit'
import { TailSpin } from 'react-loader-spinner'
import { Alerta } from '../components/Alerta'
import { clienteAxios } from '../config/axios'
import { FormularioActualizarProducto } from '../components/FormularioActualizarProducto'
import {
    FormLabel, Input,
    Button
} from '@chakra-ui/react'

import { ModalCodigoDeBarras } from '../components/ModalCodigoDeBarras'




export const Comprar = () => {

    const [cargando, setCargando] = useState(false)
    const [cargandoCodigo, setCargandoCodigo] = useState(false)
    const [alerta, setAlerta] = useState({})
    const [agregarNuevo, setAgregarNuevo] = useState(false)
    const [actualizar, setActualizar] = useState(false)
    // const [dataMostrar, setDataMostrar] = useState({})
    const [dataActualizar, setDataActualizar] = useState({});
    const [modal, setModal] = useState({ show: false, datos: null })
    const [codigo, setCodigo] = useState('')



    const handleBuscarProducto = async (e) => {
        e.preventDefault();

        if (codigo == '') {
            setAlerta({ titulo: 'Error', msg: 'Todos los campos son obligatorios', status: 'error' })
            return
        }


        setCargando(true)
        try {
            const url = `/producto/buscarParaComprar/${codigo}`;

            const respuesta = await clienteAxios.get(url)

            if (respuesta.data.msg == 'No existe este producto en la base de datos') {
                setAgregarNuevo(true)
                setCargando(false)
                setAlerta({})
                return
            }

            const { nombre, cantidadStock, precioCompraUnd, ganancia, minStock, codigoProducto } = respuesta.data

            setDataActualizar({
                nombre: nombre.toUpperCase(),
                cantidadStock,
                precioCompraUnd,
                ganancia,
                minStock
            })


            setActualizar(true)
            // setDataMostrar({
            //     nombre,
            //     cantidadStock,
            //     precioCompraUnd,
            //     ganancia,
            //     minStock,
            //     codigoProducto
            // })

            setCodigo(codigoProducto);

            console.log(respuesta);
        } catch (error) {
            console.log(error);
            setAlerta({ titulo: 'Error', msg: error.response.data.msg, status: 'error' })
        }

        setCargando(false)
    }



    const handleGenerarCodigo = async () => {

        setCargandoCodigo(true)
        try {
            const url = `/producto/generarCodigoProducto`;
            const respuesta = await clienteAxios.get(url);

            // const inPutCodigo = document.querySelector('#codigo');
            // inPutCodigo.value = respuesta.data.codigo
            setCodigo(respuesta.data.codigo)
            setModal({ show: true, datos: respuesta.data.codigo })
            console.log(respuesta.data.codigo);
        } catch (error) {
            console.log(error);
            setAlerta({ msg: error.response.data.msg, error: true })
        }
        setCargandoCodigo(false);
    }

    const { msg } = alerta
    return (

        <>
            <div className="w-[85%] min-h-screen bg-gray-100 rounded-md p-2">

                <ModalCodigoDeBarras modal={modal} setModal={setModal} />


                <div className="w-full h-full flex items-center justify-center">
                    {(agregarNuevo || actualizar) ? (

                        <FormularioActualizarProducto actualizar={actualizar} agregarNuevo={agregarNuevo} codigo={codigo} setCodigo={setCodigo} dataActualizar={dataActualizar} />

                    ) : (
                        <div className="flex w-full gap-4">
                            <div className="bg-white rounded-md shadow-md w-1/2 p-5 mx-auto">
                                <form action="" className='flex flex-col gap-3 w-full' onSubmit={handleBuscarProducto}>
                                    {msg && <Alerta alerta={alerta} />}

                                    <div className="">
                                        <div className={`flex flex-col`}>
                                            <FormLabel
                                                htmlFor="codigo"
                                                fontSize={'large'}
                                            >
                                                Codigo del producto
                                            </FormLabel>
                                            <Input
                                                type="text"
                                                id='codigo'
                                                bg={'gray.100'}
                                                placeholder='Ej: 897217091241 , 4478'
                                                onChange={({ target }) => setCodigo(target.value)}
                                                autoFocus
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full flex justify-between">

                                        <BtnSubmit text={'Agregar Producto'} cargando={cargando} tipo={'submit'} />

                                        <Button
                                            type='button'
                                            colorScheme='blue'
                                            fontSize={'large'}
                                            onClick={handleGenerarCodigo}
                                        >
                                            {cargandoCodigo ? (
                                                <TailSpin
                                                    width={40}
                                                    height={30}
                                                    color='#fff'
                                                    strokeWidth={3}
                                                    visible={cargandoCodigo}
                                                />
                                            ) : 'Generar Codigo'}
                                        </Button>
                                    </div>

                                </form>

                            </div>



                        </div >

                    )}
                </div >
            </div >
        </>


    )
}

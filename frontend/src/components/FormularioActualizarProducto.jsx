/* eslint-disable react/prop-types */
import { useState } from 'react'
import { clienteAxios } from '../config/axios'
import { Alerta } from '../components/Alerta'
import { BtnSubmit } from '../components/BtnSubmit'


export const FormularioActualizarProducto = ({ codigo, agregarNuevo, actualizar, setCodigo, dataActualizar }) => {

    const [descripcionProducto, setDescripcionProducto] = useState(dataActualizar.nombre || '')
    const [cantidadProducto, setCantidadProducto] = useState(dataActualizar.cantidadStock || '')
    const [precioUnidadProducto, setPrecioUnidadProducto] = useState(dataActualizar.precioCompraUnd || '')
    const [gananciaUnidadProducto, setGananciaUnidadProducto] = useState(dataActualizar.ganancia || '')
    const [minimoInventarioProducto, setMinimoInventarioProducto] = useState(dataActualizar.minStock || '')
    const [cargando, setCargando] = useState(false)




    const [alerta, setAlerta] = useState({})

    const handleActualizarProducto = async (e) => {
        e.preventDefault()


        try {
            const url = `/producto/actualizar/${codigo}`;

            const data = {
                nombreNuevo: descripcionProducto.toUpperCase(),
                cantidadStockNuevo: parseInt(cantidadProducto),
                minStockNuevo: parseInt(minimoInventarioProducto),
                precioCompraUndNuevo: parseFloat(precioUnidadProducto),
                gananciaNuevo: parseFloat(gananciaUnidadProducto)
            }

            const respuesta = await clienteAxios.put(url, data)

            setAlerta({ titulo: 'Completado', msg: respuesta.data.msg, error: 'success' })
        } catch (error) {
            console.log(error);
            setAlerta({ titulo: 'Error', msg: error.response.data.msg, status: 'error' })
        }
    }

    const handleAgregarProducto = async (e) => {
        e.preventDefault();

        const arrDatos = [descripcionProducto, cantidadProducto, precioUnidadProducto, gananciaUnidadProducto, minimoInventarioProducto];

        const existeDatoVacio = arrDatos.some(e => e == '');

        if (existeDatoVacio) {
            setAlerta({ titulo: 'Error', msg: 'Todos los campos son obligatorios', status: 'error' })
            return
        }

        setCargando(true)
        try {
            const url = `/productos/agregar`;

            const cantidadStock = parseInt(cantidadProducto)
            const minStock = parseInt(minimoInventarioProducto)
            const precioCompraUnd = parseFloat(precioUnidadProducto)
            const ganancia = parseFloat(gananciaUnidadProducto)


            const producto = {
                codigoProducto: codigo,
                nombre: descripcionProducto.toUpperCase(),
                cantidadStock,
                minStock,
                precioCompraUnd,
                ganancia
            }



            const respuesta = await clienteAxios.post(url, producto)

            setAlerta({ titulo: 'Completado', msg: respuesta.data.msg, status: 'success' })

            
        } catch (error) {
            setAlerta({ titulo: 'Error', msg: error.response.data.msg, status: 'error' })
        }

        setCargando(false)

    }

    const { msg } = alerta


    return (
        <div className="bg-white rounded-md shadow-md w-[80%] p-5 mx-auto">
            <form action="" className='flex flex-col gap-3' onSubmit={actualizar ? handleActualizarProducto : handleAgregarProducto}>


                <div className={`${(agregarNuevo || actualizar) ? 'flex' : 'block'} flex-wrap gap-2 `}>
                    <div className={`flex flex-col gap-2`}>
                        <label htmlFor="codigo" className='font-bold text-xl'>Codigo del producto</label>
                        <input
                            type="text"
                            id='codigo'
                            className='bg-gray-100 p-3 outline-none rounded-md' placeholder='Ej: 897217091241 , 4478'
                            onChange={({ target }) => setCodigo(target.value)}
                            value={codigo}
                            readOnly
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="nombre" className='font-bold text-xl'>Descripcion del producto</label>
                        <input
                            type="text"
                            id='nombre'
                            className='bg-gray-100 p-3 outline-none rounded-md'
                            placeholder='Ej: Filtro de aire'
                            onChange={({ target }) => setDescripcionProducto(target.value)}
                            value={descripcionProducto}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="cantidad" className='font-bold text-xl'>Cantidad del producto </label>
                        <input
                            type="text"
                            id='cantidad'
                            className='bg-gray-100 p-3 outline-none rounded-md'
                            placeholder='Ej: 20, 30, 5'
                            onChange={({ target }) => setCantidadProducto(target.value)}
                            value={cantidadProducto}

                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="precio" className='font-bold text-xl'>Precio de compra por unidad</label>
                        <input
                            type="text"
                            id='precio'
                            className='bg-gray-100 p-3 outline-none rounded-md'
                            placeholder='Ej: 20, 30, 5'
                            onChange={({ target }) => setPrecioUnidadProducto(target.value)}
                            value={precioUnidadProducto}

                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="ganancia" className='font-bold text-xl'>Ganancia por unidad</label>
                        <input
                            type="text"
                            id='ganancia'
                            className='bg-gray-100 p-3 outline-none rounded-md'
                            placeholder='Ej: 20, 30, 5'
                            onChange={({ target }) => setGananciaUnidadProducto(target.value)}
                            value={gananciaUnidadProducto}

                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="minimo" className='font-bold text-xl'>Minimo en el inventario</label>
                        <input
                            type="text"
                            id='minimo'
                            className='bg-gray-100 p-3 outline-none rounded-md'
                            placeholder='Ej: 20, 30, 5'
                            onChange={({ target }) => setMinimoInventarioProducto(target.value)}
                            value={minimoInventarioProducto}

                        />
                    </div>
                </div>

                <BtnSubmit text={'Agregar Producto'} cargando={cargando} tipo={'submit'} />

                {msg && <Alerta alerta={alerta} />}
            </form>
        </div>
    )
}

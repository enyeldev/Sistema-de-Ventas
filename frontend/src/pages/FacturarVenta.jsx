import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Input,
    Heading,
    Text,
    Button,
} from '@chakra-ui/react'



import { DeleteIcon } from '@chakra-ui/icons'

export const FacturarVenta = () => {
    return (
        <div className="w-[85%] max-h-screen  bg-gray-100 rounded-md">
            <div className="w-full h-full flex flex-col gap-2 p-2 ">


                <div className="w-full h-[70%] p-3 bg-white shadow-md rounded-md flex flex-col gap-4">
                    <form action="">
                        <div className="w-full flex items-end gap-2 ">
                            <div className="flex flex-col gap-2 w-1/3">
                                <Heading
                                    fontSize={'larger'}
                                >
                                    Descripcion
                                </Heading>

                                <Input
                                    background={'gray.100'}
                                    // borderColor={`${errorInput ? 'red' : 'gray.200'}`}
                                    id='codigo'
                                    placeholder={'Ej: Filtro de aire, Liquido de freno'}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Heading
                                    fontSize={'larger'}
                                >
                                    Cantidad
                                </Heading>

                                <Input
                                    background={'gray.100'}
                                    // borderColor={`${errorInput ? 'red' : 'gray.200'}`}
                                    id='codigo'
                                    placeholder={'Ej: 1, 5'}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Heading
                                    fontSize={'larger'}
                                >
                                    Precio C/U
                                </Heading>

                                <Input
                                    background={'gray.100'}
                                    // borderColor={`${errorInput ? 'red' : 'gray.200'}`}
                                    id='codigo'
                                    placeholder={'Ej: 200, 1500'}
                                />
                            </div>


                            <Button
                                type='submit'
                                colorScheme='blue'
                            // width={'full'}
                            >
                                Agregar Producto
                            </Button>
                        </div>
                    </form>

                    <div className="w-full p-3 h-full overflow-y-scroll">
                        <TableContainer width={''}>
                            <Table variant='simple'>

                                <Thead>
                                    <Tr>
                                        <Th>Cantidad</Th>
                                        <Th>Descripcion</Th>
                                        <Th>Total</Th>
                                        <Th></Th>
                                    </Tr>
                                </Thead>

                                <Tbody>
                                    {/* {
                                        arrProductosVent.map(({ cantidad, codigoProducto, financiado, nombre, total }) => {
                                            return (
                                                <ItemVenta
                                                    cantidad={cantidad}
                                                    id={codigoProducto}
                                                    financiado={financiado}
                                                    nombre={nombre}
                                                    total={total}
                                                    eliminarItemVenta={eliminarItemVenta}
                                                    key={codigoProducto}
                                                />
                                            )
                                        })
                                    } */}

                                    <Tr>
                                        <Td textAlign={'center'}></Td>
                                        <Td></Td>
                                        <Td></Td>
                                        <Td>
                                            <div className="cursor-pointer">
                                                <DeleteIcon
                                                    color={'red'}
                                                />
                                            </div>
                                        </Td>
                                    </Tr>


                                </Tbody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>


                <div className="w-full flex gap-2">
                    <div className="w-[40%] p-3 bg-white shadow-md rounded-md flex justify-between">
                        <div className="">
                            <Heading fontSize={'large'}>
                                Total:
                            </Heading>
                            <Text
                                fontSize={'large'}
                            >
                                {/* {
                                    formatoDinero(totalVenta)
                                } */}
                            </Text>
                        </div>

                        <div className="">
                            <Heading fontSize={'large'}>
                                Devuelta:
                            </Heading>
                            <Text
                                fontSize={'large'}
                            >
                                {/* {
                                    (pagoCliente > 0) ? formatoDinero(devueltaCliente) : '- - - - - - -'
                                } */}
                            </Text>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Heading fontSize={'large'}>
                                Pago Cliente:
                            </Heading>
                            <form
                                className='flex flex-col gap-2'
                            // onSubmit={cobrarVenta}
                            >
                                <Input
                                    placeholder={'Ej: 1200 , 350'}
                                    background={'gray.100'}
                                // borderColor={`${errorCobrarInput ? 'red' : 'gray.200'}`}
                                // onChange={({ target }) => {
                                //     let valorActual = target.value
                                //     valorActual < totalVenta
                                //         ? setErrorCobrarInput(true)
                                //         : (setPagoCliente(target.value), setErrorCobrarInput(false))
                                // }}
                                />

                                <Button
                                    type='submit'
                                    colorScheme='blue'
                                    width={'full'}
                                >
                                    Cobrar
                                </Button>

                            </form>
                        </div>
                    </div>


                    <div className="w-[60%]  bg-white rounded-md shadow-md p-3 flex gap-3 justify-between">
                        <div className="flex flex-col gap-2">
                            <Heading fontSize={'larger'}>
                                Nombre Cliente:
                            </Heading>
                            <Input
                                background={'gray.100'}
                                placeholder={'Ej: Ramon, Carlos Andres'}
                            // borderColor={`${errorNombreCliente ? 'red' : 'gray.200'}`}
                            // onChange={({ target }) => {
                            //     setNombreCliente(target.value.toUpperCase())
                            // }}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Heading fontSize={'larger'}>
                                Telefono Cliente:
                            </Heading>

                            <Input

                                background={'gray.100'}
                                placeholder={'Ej: 8091234567'}
                            // borderColor={`${errorTelefonoCliente ? 'red' : 'gray.200'}`}
                            // onChange={({ target }) => {
                            //     setTelefonoCliente(target.value)
                            // }}

                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Heading fontSize={'larger'}>
                                Atendido Por:
                            </Heading>

                            <Input

                                background={'gray.100'}
                                placeholder={'Ej: Ramon, Carlos Andres'}
                            // borderColor={`${errorAtendidoPor ? 'red' : 'gray.200'}`}
                            // onChange={({ target }) => {
                            //     setAtendidoPor(target.value.toUpperCase())
                            // }}

                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

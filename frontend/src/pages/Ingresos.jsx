
import { useState } from 'react'
import { generarNuevoIngresoVenta } from '../helpers/ingresosFunciones'
import { Heading, Input, Select, Button } from '@chakra-ui/react'
import { Alerta } from '../components/Alerta'
export const Ingresos = () => {

  const [errorInput, setErrorInput] = useState(false)
  const [errorSelect, setErrorSelect] = useState(false)
  const [errorDescripcion, setErrorDescripcion] = useState(false)

  const [montoIngreso, setMontoIngreso] = useState('')
  const [select, setSelect] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [alerta, setAlerta] = useState({})

  const regexMonto = /^[0-9]+$/


  const generarIngreso = async (e) => {
    e.preventDefault();

    const regexValidation = regexMonto.test(montoIngreso)

    if (montoIngreso == '' || !regexValidation) {
      setErrorInput(true)
      return
    }

    if (select == '') {
      setErrorSelect(true)
      return
    }

    if (descripcion == '') {
      setErrorDescripcion(true)
      return
    }

    const respuesta = await generarNuevoIngresoVenta(montoIngreso, select, descripcion)

    setAlerta({ titulo: 'Completado', msg: respuesta.data.msg, status: 'success' })
  }

  const { msg } = alerta

  return (
    <div className="w-[85%] max-h-screen bg-gray-100 rounded-md p-2 flex items-center">
      <div className="bg-white mx-auto p-2 rounded-md shadow-lg flex flex-col gap-3">
        <div className="">
          <Heading
            fontSize={'x-large'}
          >
            Detalles del Ingreso
          </Heading>
        </div>

        <form className='flex flex-col gap-2' onSubmit={generarIngreso}>
          <div className="flex gap-2">
            <div className="flex flex-col gap-2">
              <Heading
                fontSize={'larger'}
              >
                Monto
              </Heading>

              <Input
                placeholder={'Ej: 1200 , 350'}
                background={'gray.100'}
                borderColor={`${errorInput ? 'red' : 'gray.200'}`}
                onChange={({ target }) => {
                  setErrorInput(false)
                  setMontoIngreso(target.value)
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Heading
                fontSize={'larger'}
              >
                Tipo de Ingreso
              </Heading>

              <Select
                placeholder='Seleccione el tipo de ingreso'
                borderColor={`${errorSelect ? 'red' : 'gray.200'}`}
                background={'gray.100'}
                onChange={({ target }) => {
                  setErrorSelect(false)
                  setSelect(target.value)
                }}
              >
                <option value='1'>Venta</option>
                <option value='2'>Externo</option>
                <option value='3'>Pago de Deuda</option>
              </Select>
            </div>


            <div className="flex flex-col gap-2">
              <Heading
                fontSize={'larger'}
              >
                Descripcion de Ingreso
              </Heading>

              <Input
                placeholder={'Ej: Venta de Productos'}
                background={'gray.100'}
                borderColor={`${errorDescripcion ? 'red' : 'gray.200'}`}
                onChange={({ target }) => {
                  setErrorDescripcion(false)
                  setDescripcion(target.value)
                }}
              />

            </div>
          </div>

          <Button
            type='submit'
            colorScheme='blue'
            width={'full'}
          >
            Generar Ingreso
          </Button>
        </form>

        {msg && (
          <div className="w-full py-3">
            <Alerta alerta={alerta} />
          </div>
        )}

      </div>
    </div>
  )
}

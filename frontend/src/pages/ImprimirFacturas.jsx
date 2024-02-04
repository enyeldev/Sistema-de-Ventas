
import { useState, useEffect } from 'react'
import { clienteAxios } from '../config/axios'
// import { formatoDinero } from '../helpers/formatoDinero'

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  // Td,
  TableContainer,
  Input,
  Heading,
  // Text,
  Button,
} from '@chakra-ui/react'

// import { AddIcon } from '@chakra-ui/icons'
import { Alerta } from '../components/Alerta'
import { TailSpin } from 'react-loader-spinner'
import { ItemDeudaBusqueda } from '../components/ItemDeudaBusqueda'
import { ModalCobrarDeuda } from '../components/ModalCobrarDeuda'
import { ModalFacturaDeuda } from '../components/ModalFacturaDeuda'


export const ImprimirFacturas = () => {


  useEffect(() => {
    const cargarFacturas = async () => {
      await clienteAxios.get('/facturas/mostrarTodasFacturasDeudas')
    }

    cargarFacturas()
  }, [])


  return (
    <div className="w-[85%] max-h-screen bg-gray-100 rounded-md p-2">
      <div className="w-full h-full flex flex-col gap-2">
        {/* {modalDeuda.show && <ModalCobrarDeuda modal={modalDeuda} setModalDeuda={setModalDeuda} setShowModalFacturaDeuda={setShowModalFacturaDeuda} setDatosFacturaDeuda={setDatosFacturaDeuda} />}

                {showModalFacturaDeuda && <ModalFacturaDeuda
                    showModalFacturaDeuda={showModalFacturaDeuda}
                    setShowModalFacturaDeuda={setShowModalFacturaDeuda}
                    datosFacturaDeuda={datosFacturaDeuda} />} */}

        <div className="w-full bg-white rounded-md shadow-md p-2">
          <div className="h-full overflow-y-scroll">
            <TableContainer width={''}>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>Nombre Cliente</Th>
                    <Th>Telefono Cliente</Th>
                    <Th>Monto Inicial</Th>
                    <Th>Monto Actual</Th>
                    <Th>Fecha</Th>
                    <Th>Despachao Por</Th>
                    <Th></Th>
                  </Tr>
                </Thead>

                {/* <Tbody >
                  {

                    arrDeudasBusuqeda.map(({ codigoDeuda, despachadoPor, fecha, montoActualDeuda, montoDeuda, nombreCliente, telefonoCliente }) => {



                      return (
                        <ItemDeudaBusqueda
                          key={codigoDeuda}
                          codigoDeuda={codigoDeuda}
                          despachadoPor={despachadoPor}
                          fecha={fecha}
                          montoActualDeuda={montoActualDeuda}
                          montoDeuda={montoDeuda}
                          nombreCliente={nombreCliente}
                          telefonoCliente={telefonoCliente}
                          mostrarModal={mostrarModal}
                        />
                      )
                    })


                  }
                </Tbody> */}
              </Table>
            </TableContainer>

          </div>
        </div>
      </div>

    </div>

  )
}

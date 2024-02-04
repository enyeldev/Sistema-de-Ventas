/* eslint-disable react/prop-types */

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
import { PDFDownloadLink } from '@react-pdf/renderer'

import { PlantillaCodigoBarra } from '../components/PlantillaCodigoBarra'
import Barcode from 'react-jsbarcode';


export const ModalCodigoDeBarras = ({ modal, setModal }) => {

    if (modal.datos == null) {
        return
    }


    const cerrarModal = () => {
        setModal({ show: false, datos: modal.datos })
    }

    console.log(modal.datos);

    return (
        <Modal isOpen={modal.show} onClose={cerrarModal}>
            <ModalOverlay />
            <ModalContent
                maxW={600}
            >
                <ModalHeader>Codigo De Barras Producto</ModalHeader>
                <ModalCloseButton />
                <ModalBody
                    display={'flex'}
                    justifyContent={'space-around'}
                    alignItems={'center'}

                >
                    <Barcode value={modal.datos} />
                </ModalBody>

                <ModalFooter display={'flex'} flexDirection={'column'} gap={2}>

                    <PDFDownloadLink document={<PlantillaCodigoBarra data={modal.datos} />} fileName={`codigoDeBarra - ${modal.datos}.pdf`}>
                        <Button colorScheme='blue'>
                            Imprimir Codigo
                        </Button>
                    </PDFDownloadLink>

                    {/* {msg && <Alerta alerta={alerta} />} */}
                </ModalFooter>

            </ModalContent>
        </Modal >
    )
}

/* eslint-disable react/prop-types */

import { formatoDinero } from "../helpers/formatoDinero";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { PlantillaFacturaDevolucionContado } from "./PlantillaFacturaDevolucionContado";

export const ModalFacturaDevueltaAlContado = ({
  showModalFacturaDevueltaContado,
  setShowModalFacturaDevueltaContado,
  datosFacturaDevueltaContado,
}) => {
  const cerrarModal = () => {
    setShowModalFacturaDevueltaContado(false);
  };

  const { codigoFactura, productosDevolucion, datosDevolucion } =
    datosFacturaDevueltaContado;

  const { total, fecha } = datosDevolucion;
  return (
    <Modal isOpen={showModalFacturaDevueltaContado} onClose={cerrarModal}>
      <ModalOverlay />
      <ModalContent maxW={1000}>
        <ModalHeader>Factura de la devolucion</ModalHeader>
        <ModalCloseButton />

        <ModalBody display={"flex"} flexDirection={"column"} gap={"10px"}>
          <div className="w-full">
            <div className="w-full">
              <Heading
                textTransform="uppercase"
                fontSize="larger"
                textAlign={"center"}
              >
                NOMBRE LOCAL
              </Heading>
              <Text fontSize={"medium"} textAlign={"center"}>
                Av. 27 de Febrero, Sto. Dgo. Oeste Frente al Colegio Cristiano
                Belen
              </Text>

              <Text fontSize={"medium"} textAlign={"center"}>
                Telefono: 809-560-7032
              </Text>
            </div>

            <div className="w-full">
              <Text>Codigo Factura: {codigoFactura}</Text>
              <Text>Fecha: {fecha}</Text>
            </div>
          </div>

          <div className="w-full bg-white rounded-md max-h-[150px] overflow-y-scroll">
            <TableContainer width={""}>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Codigo</Th>
                    <Th>Descripcion</Th>
                    <Th>Total</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {productosDevolucion.map((e) => {
                    const {
                      codigoProducto,
                      nombreProducto,
                      cantidad,
                      precioCadaUno,
                      total,
                    } = e;

                    return (
                      <Tr key={codigoProducto}>
                        <Td>
                          <Text>{codigoProducto}</Text>
                        </Td>

                        <Td>
                          <Text>
                            {`${nombreProducto} CANT. ${cantidad} PRECIO: ${formatoDinero(
                              parseFloat(precioCadaUno)
                            )}`}
                          </Text>
                        </Td>

                        <Td>
                          <Text>{formatoDinero(parseFloat(total))}</Text>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </div>

          <div className=" w-full flex flex-wrap gap-[8px] mt-[5px]">
            <div>
              <Heading fontSize={"larger"}>Total a devolver:</Heading>
              <Text fontSize={"large"}>{formatoDinero(parseFloat(total))}</Text>
            </div>
          </div>
        </ModalBody>

        <ModalFooter display={"flex"} flexDirection={"column"} gap={2}>
          <PDFDownloadLink
            document={
              <PlantillaFacturaDevolucionContado
                datos={datosFacturaDevueltaContado}
              />
            }
            fileName={`facturaDevolucionContado - ${codigoFactura}.pdf`}
          >
            <Button colorScheme="blue">Imprimir Factura</Button>
          </PDFDownloadLink>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

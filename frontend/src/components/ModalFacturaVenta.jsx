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
// import { PdfFacturaVenta } from '../components/PdfFacturaVenta'
import { PlantillaFacturaVenta } from "./PlantillaFacturaVenta";

export const ModalFacturaVenta = ({
  showModalFacturaVenta,
  setShowModalFacturaVenta,
  datosFacturaVenta,
}) => {
  const cerrarModal = () => {
    setShowModalFacturaVenta(false);
  };

  const { codigoFactura, datosVenta, productosVendidos } = datosFacturaVenta;

  return (
    <Modal isOpen={showModalFacturaVenta} onClose={cerrarModal}>
      <ModalOverlay />
      <ModalContent maxW={1000}>
        <ModalHeader>Factura de la venta</ModalHeader>
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
              <Text>Fecha: {datosVenta.fecha}</Text>
            </div>

            {/* <div className="w-full">
              <Text>Cliente: {datosVenta.nombreCleinte}</Text>

              <Text>Telefono Cliente: {datosVenta.telefonoCliente}</Text>

              <Text>Despachado Por: {datosVenta.despachadoPor}</Text>
            </div> */}
          </div>

          <div className="w-full bg-white rounded-md max-h-[150px] overflow-y-scroll">
            <TableContainer width={""}>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Codigo</Th>
                    <Th>Descripcion</Th>
                    <Th>Descuento</Th>
                    <Th>Total</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {productosVendidos.map((e) => {
                    const {
                      codigoProducto,
                      nombre,
                      cantidadProducto,
                      costoVentaItem,
                      totalVentaItem,
                      descuento,
                    } = e;

                    return (
                      <Tr key={codigoProducto}>
                        <Td>
                          <Text>{codigoProducto}</Text>
                        </Td>

                        <Td>
                          <Text>
                            {`${nombre} CANT. ${cantidadProducto} PRECIO: ${formatoDinero(
                              costoVentaItem
                            )}`}
                          </Text>
                        </Td>

                        <Td>
                          <Text>
                            {descuento
                              ? formatoDinero(descuento)
                              : formatoDinero(0)}
                          </Text>
                        </Td>

                        <Td>
                          <Text>{formatoDinero(totalVentaItem)}</Text>
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
              <Heading fontSize={"larger"}>Total:</Heading>
              <Text fontSize={"large"}>
                {formatoDinero(datosVenta.costoTotal)}
              </Text>
            </div>

            <div>
              <Heading fontSize={"larger"}>Cambio:</Heading>
              <Text fontSize={"large"}>
                {formatoDinero(datosVenta.devueltaCliente)}
              </Text>
            </div>

            <div>
              <Heading fontSize={"larger"}>Pago Cliente:</Heading>
              <Text fontSize={"large"}>
                {formatoDinero(datosVenta.pagoCliente)}
              </Text>
            </div>
          </div>
        </ModalBody>

        <ModalFooter display={"flex"} flexDirection={"column"} gap={2}>
          <PDFDownloadLink
            document={<PlantillaFacturaVenta datos={datosFacturaVenta} />}
            fileName={`facturaContado - ${codigoFactura}.pdf`}
          >
            <Button colorScheme="blue">Imprimir Factura</Button>
          </PDFDownloadLink>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

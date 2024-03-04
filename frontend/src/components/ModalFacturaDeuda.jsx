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
import { PlantillaFacturaDeuda } from "../components/PlantillaFacturaDeuda";

export const ModalFacturaDeuda = ({
  showModalFacturaDeuda,
  setShowModalFacturaDeuda,
  datosFacturaDeuda,
}) => {
  const cerrarModal = () => {
    setShowModalFacturaDeuda(false);
  };

  const { codigoFacturaDeuda, datosDeuda, productosDeuda, historialPagos } =
    datosFacturaDeuda;

  const { fecha, fechaUltimoPago, montoInicial, montoActual, estado } =
    datosDeuda;
  console.log(datosFacturaDeuda);

  return (
    <Modal isOpen={showModalFacturaDeuda} onClose={cerrarModal}>
      <ModalOverlay />
      <ModalContent maxW={1000}>
        <ModalHeader>Factura de la deuda</ModalHeader>
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

            <Heading fontSize={"larger"} textAlign={"center"}>
              VENTA A CREDITO
            </Heading>

            <div className="w-full">
              <Text>Codigo Factura: {codigoFacturaDeuda}</Text>
              <Text>Estado: {estado ? "Pendiente" : "Saldado"}</Text>
              <Text>Fecha: {fecha}</Text>
              <Text>Fecha Ultimo Pago: {fechaUltimoPago}</Text>
            </div>
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
                  {productosDeuda.map((e) => {
                    const {
                      codigoProducto,
                      nombreProducto,
                      cantidadProducto,
                      costoProducto,
                      monto,
                      descuento,
                    } = e;

                    return (
                      <Tr key={codigoProducto}>
                        <Td>
                          <Text>{codigoProducto}</Text>
                        </Td>

                        <Td>
                          <Text>
                            {`${nombreProducto} CANT. ${cantidadProducto} PRECIO: ${formatoDinero(
                              parseFloat(costoProducto)
                            )}`}
                          </Text>
                        </Td>

                        <Td>
                          <Text>
                            {descuento
                              ? formatoDinero(parseFloat(descuento))
                              : formatoDinero(0)}
                          </Text>
                        </Td>

                        <Td>
                          <Text>{formatoDinero(parseFloat(monto))}</Text>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </div>

          <div className="w-full mt-[5px] flex flex-col">
            <Heading
              fontSize={"larger"}
              textAlign={"center"}
              marginBottom={"10px"}
            >
              Historial De Pagos
            </Heading>

            {historialPagos.length == 0 ? (
              <Text fontSize={"large"} textAlign={"center"}>
                No hay pagos realizados
              </Text>
            ) : (
              historialPagos.map((e) => {
                return (
                  <div className="flex gap-3" key={e.id}>
                    <div className="flex gap-2">
                      <Heading fontSize={"larger"}>Fecha:</Heading>
                      <Text fontSize={"large"}>{e.fecha}</Text>
                    </div>

                    <div className="flex gap-2">
                      <Heading fontSize={"larger"}>Monto:</Heading>
                      <Text fontSize={"large"}>
                        {formatoDinero(e.motoPago)}
                      </Text>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className=" w-full flex flex-wrap gap-[8px] mt-[5px]">
            <div>
              <Heading fontSize={"larger"}>Monto Inicial:</Heading>
              <Text fontSize={"large"}>
                {formatoDinero(parseFloat(montoInicial))}
              </Text>
            </div>

            <div>
              <Heading fontSize={"larger"}>Monto Actual:</Heading>
              <Text fontSize={"large"}>
                {formatoDinero(parseFloat(montoActual))}
              </Text>
            </div>
          </div>
        </ModalBody>

        <ModalFooter display={"flex"} flexDirection={"column"} gap={2}>
          <PDFDownloadLink
            document={<PlantillaFacturaDeuda datos={datosFacturaDeuda} />}
            fileName={`facturaCredito - ${codigoFacturaDeuda}.pdf`}
          >
            <Button colorScheme="blue">Imprimir Factura</Button>
          </PDFDownloadLink>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

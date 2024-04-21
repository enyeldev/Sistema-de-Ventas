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
  Button,
} from "@chakra-ui/react";

export const ModalCerrarCaja = ({ show, setShowModal }) => {
  const cerrarModal = () => {
    setShowModal(false);
  };

  return (
    <Modal isOpen={show} onClose={cerrarModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cerrar caja</ModalHeader>
        <ModalCloseButton />
        <ModalBody display={"flex"} flexDirection={"column"} gap={2}>
          <div className="w-full flex flex-col items-center gap-5">
            <Heading fontSize={"x-large"}>Quiere cerrar caja?</Heading>
            <div className="flex gap-4">
              <Button colorScheme="blue" paddingInline={"2em"}>
                Si
              </Button>
              <Button
                colorScheme="red"
                paddingInline={"2em"}
                onClick={cerrarModal}
              >
                No
              </Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

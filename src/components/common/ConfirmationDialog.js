import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";

const ConfirmationDialog = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Czy na pewno?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Tej operacji nie można cofnąć.</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={onConfirm}>
            Kontynuuj
          </Button>
          <Button colorScheme="red" onClick={onClose}>
            Anuluj
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationDialog;

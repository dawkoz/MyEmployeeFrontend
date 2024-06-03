import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from '@chakra-ui/react';

const PostModal = ({ isOpen, onClose, addEmployee }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const toast = useToast();

  const handleAddEmployee = async () => {
    const newEmployee = {
      firstName,
      lastName,
      email,
      age: parseInt(age),
    };

    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch('http://localhost:8080/api/employees', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Replace with your actual token
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEmployee)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      addEmployee(newEmployee); // Update the UI with the new employee
      onClose();
      setFirstName('');
      setLastName('');
      setEmail('');
      setAge('');
      toast({
        title: "Employee added.",
        description: "New employee has been successfully added.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to add employee.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Dodaj nowego pracownika</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl mt={4}>
            <FormLabel>Imię</FormLabel>
            <Input
              placeholder="Enter first name..."
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Nazwisko</FormLabel>
            <Input
              placeholder="Enter last name..."
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Adres email</FormLabel>
            <Input
              placeholder="Enter email..."
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Wiek</FormLabel>
            <Input
              placeholder="Enter age..."
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAddEmployee}>
            Dodaj pracownika
          </Button>
          <Button onClick={onClose}>Anuluj</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PostModal;

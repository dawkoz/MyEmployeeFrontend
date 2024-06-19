import React, { useState } from "react";
import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import ConfirmationDialog from "../common/ConfirmationDialog";
import { API_BASE_URL } from "../../config";

const EmployeeItem = ({ employee, onDelete }) => {
  const toast = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(
        `${API_BASE_URL}/api/employees/${employee.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      onDelete(employee.id);
      toast({
        title: "Employee deleted.",
        description: "Employee has been successfully deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to delete employee.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsDialogOpen(false);
    }
  };

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" bg="gray.100">
      <Flex justify="space-between">
        <Text fontWeight="bold">
          {employee.firstName} {employee.lastName}
        </Text>
        <Button colorScheme="red" onClick={openDialog}>
          Usuń
        </Button>
      </Flex>
      <Box bg="white" p={4} borderRadius="md" mt={2}>
        <Text>
          <strong>Email:</strong> {employee.email}
        </Text>
        <Text>
          <strong>Wiek:</strong> {employee.age}
        </Text>
      </Box>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default EmployeeItem;

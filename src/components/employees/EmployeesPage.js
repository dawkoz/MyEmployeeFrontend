import React, { useState, useEffect } from "react";
import { Button, Input, VStack, Grid, Flex, Center } from "@chakra-ui/react";
import PostModal from "./PostModal";
import EmployeeItem from "./EmployeeItem";
import { API_BASE_URL } from "../../config";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("jwtToken"); // Retrieve the token from localStorage
      const response = await fetch(`${API_BASE_URL}/api/employees`, {
        method: "GET",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`, // Include the token in the authorization header
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Fetching employees failed:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = () => {
    fetchEmployees().then(() => {
      if (searchQuery) {
        // Filter employees that include the search string in the first name or last name
        const filteredEmployees = employees.filter(
          (employee) =>
            employee.firstName
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            employee.lastName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setEmployees(filteredEmployees);
      }
    });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const addEmployee = (newEmployee) => {
    fetchEmployees();
  };

  const deleteEmployee = (id) => {
    fetchEmployees();
  };

  return (
    <Center>
      <VStack spacing={4} align="stretch" w="50%">
        <Flex>
          <Input
            placeholder="Szukaj..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button colorScheme="teal" ml={2} onClick={handleSearch}>
            Szukaj
          </Button>
        </Flex>

        <Button width="100%" onClick={handleOpenModal}>
          Dodaj pracownika
        </Button>

        <Grid templateColumns="1fr" gap={4} w="100%">
          {employees.map((employee) => (
            <EmployeeItem
              key={employee.id}
              employee={employee}
              onDelete={deleteEmployee}
            />
          ))}
        </Grid>
      </VStack>

      <PostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        addEmployee={addEmployee}
      />
    </Center>
  );
};

export default EmployeesPage;

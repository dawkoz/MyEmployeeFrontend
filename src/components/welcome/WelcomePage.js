import React from "react";
import { Box, Button, Center, Text } from "@chakra-ui/react";

const WelcomePage = ({ onViewChange }) => {
  return (
    <Center>
      <Box p={4} mb={4} bg="white" w="50%">
        
        <Text align="center" fontSize="xl" mb={4}>
          Witamy w MyEmployee, z nami możesz sprawnie zarządzać pracownikami
          w swojej firmie.
        </Text>

        <Button
          w="100%"
          colorScheme="teal"
          mb={2}
          onClick={() => onViewChange("employees")}
        >
          Lista pracowników
        </Button>

      </Box>
    </Center>
  );
};

export default WelcomePage;

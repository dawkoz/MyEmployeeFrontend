import React from "react";
import { Flex, Button, Center, Spacer } from "@chakra-ui/react";

const NavigationBar = ({ currentView, onViewChange, onLogout }) => {
  return (
    <Center>
      <Flex p={4} mb={4} align="center" bg="teal.500" color="white" w="50%">
        {/* Welcome Button */}
        <Button
          flex="0.25"
          onClick={() => onViewChange("welcome")}
          mr={2}
          bg={currentView === "welcome" ? "yellow.400" : "teal.500"}
        >
          Start
        </Button>

        {/* Offers Button */}
        <Button
          flex="0.25"
          onClick={() => onViewChange("employees")}
          mr={2}
          bg={currentView === "employees" ? "yellow.400" : "teal.500"}
        >
          Pracownicy
        </Button>

        <Spacer />
        {/* Right side with "Log Out" button */}
        <Button colorScheme="red" onClick={() => onLogout()}>Wyloguj</Button>
      </Flex>
    </Center>
  );
};

export default NavigationBar;

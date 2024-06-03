import React, { useState } from 'react';
import { Box, Flex, Center, Button, Input, Heading, Text, useToast } from '@chakra-ui/react';

const LoginPage = ({ onLogin, onViewChange }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // new state for processing
  const toast = useToast();

  const handleLogin = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('jwtToken', data.jwtToken);

        onViewChange('welcome');
        onLogin(data.jwtToken);
      } else {
        setErrorMessage("Proszę sprawdzić czy hasło i login są poprawne.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while trying to log in.");
    }
    setIsProcessing(false);
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Hasła nie są zgodne.");
      return;
    }

    setIsProcessing(true); // set processing state

    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify({ username, password, organizationName }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Rejestracja zakończona sukcesem.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsRegistering(false);
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setOrganizationName('');
        setErrorMessage('');
      } else {
        setErrorMessage(data.statusMsg || "Rejestracja nie powiodła się.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while trying to register.");
    }

    setIsProcessing(false); // reset processing state
  };

  return (
    <Center h="100vh">
      <Box p={8} borderWidth="1px" borderRadius="md" width="25%">
        <Flex justify="center">
          <Heading mb={4}>Witamy w MyEmployee</Heading>
        </Flex>
        <Input
          placeholder="Username"
          mb={4}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {isRegistering && (
          <>
            <Input
              placeholder="Organization Name"
              mb={4}
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
            />
          </>
        )}
        <Input
          type="password"
          placeholder="Password"
          mb={4}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isRegistering && (
          <>
            <Input
              type="password"
              placeholder="Confirm Password"
              mb={4}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </>
        )}
        {errorMessage && (
          <Text color="red" mb={4}>
            {errorMessage}
          </Text>
        )}
        <Flex justify="center">
          {isRegistering ? (
            <Button colorScheme="orange" onClick={handleRegister} isDisabled={isProcessing}>
              Zarejestruj
            </Button>
          ) : (
            <Button colorScheme="teal" onClick={handleLogin} isDisabled={isProcessing}>
              Login
            </Button>
          )}
        </Flex>
        <Flex justify="center" mt={4}>
          <Text
            color="gray.500"
            cursor="pointer"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setErrorMessage('');
            }}
          >
            {isRegistering ? 'Back to Login' : 'Sign up'}
          </Text>
        </Flex>
      </Box>
    </Center>
  );
};

export default LoginPage;

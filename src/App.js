import React, { useState} from "react";
import NavigationBar from "./components/common/NavigationBar";
import WelcomePage from "./components/welcome/WelcomePage";
import EmployeesPage from "./components/employees/EmployeesPage";
import LoginPage from './components/common/LoginPage';
import "./styles.css";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
  const [view, setView] = useState("welcome");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("")

  const handleLogin = (chosenRole) => {
    setIsLoggedIn(true);
    setRole(chosenRole);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setRole('');
    setIsLoggedIn(false);
  };

  return (
    <ChakraProvider>
      <div>
    {isLoggedIn ? (
          <>
            <NavigationBar onViewChange={setView} currentView={view} onLogout={handleLogout} currentRole={role} />
            {view === "welcome" ? <WelcomePage onViewChange={setView} /> : null}
            {view === "employees" ? <EmployeesPage /> : null}
          </>
        ) : (
          <LoginPage onLogin={handleLogin} onViewChange={setView} />
        )}
    </div>
    </ChakraProvider>
  );
};

export default App;

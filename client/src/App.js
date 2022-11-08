import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Container, Text } from "@chakra-ui/react";
import "@fontsource/ubuntu/300.css";
import "@fontsource/ubuntu/500.css";
import theme from "./theme";

import Local from './helpers/Local';
import Api from './helpers/Api';

import Navbar from './components/Navbar';


import Overview from "./components/Overview";
import WelcomePage from "./components/WelcomePage";
import PrivateRoute from './components/PrivateRoute';
import CurrentDay from "./components/CurrentDay";

import LoginView from './views/LoginView';
import ProfileView from './views/ProfileView';
import Error404View from "./views/Error404View";

function App() {
  
  const [user, setUser] = useState(Local.getUser());
  const [loginErrorMsg, setLoginErrorMsg] = useState('');
  const navigate = useNavigate();

    async function doLogin(username, password) {
        let myresponse = await Api.loginUser(username, password);
        if (myresponse.ok) {
            Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
            setUser(myresponse.data.user);
            setLoginErrorMsg('');
            navigate('/');
        } else {
            setLoginErrorMsg('Login failed');
        }
    }

    function doLogout() {
        Local.removeUserInfo();
        setUser(null);
        // (NavBar will send user to home page)
    }


  return (
    <ChakraProvider theme={theme}>
      <div className="App">
      <Navbar user={user} logoutCb={doLogout} /> 

      <div className="container">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/focus/:userId" element={
            <PrivateRoute>
                <Overview />
            </PrivateRoute>
          } />
          <Route path="/current/:id" element={
            <PrivateRoute>
              <CurrentDay />
            </PrivateRoute>
          } />
          <Route path="/login" element={
              <LoginView 
                  loginCb={(u, p) => doLogin(u, p)} 
                  loginError={loginErrorMsg} 
              />
          } />
          <Route path="/profile/:userId" element={
            <PrivateRoute>
              <ProfileView />
            </PrivateRoute>
          } />
          <Route path="/*" element={<Error404View />} />
        </Routes>
        </div>
        <Container>
          <Text color="#FFECEF">Made with ❤️ by Lea Pipo</Text>
        </Container>
      </div>
    </ChakraProvider>
  );
}

export default App;

import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { AppStyled, GlobalStyled } from "./styles/style";

import useStorage from "./hooks/useStorage";

import darkTheme from "./styles/themes/dark.theme";
import lightTheme from "./styles/themes/light.theme";

import DiaryScreen from "./screens/Diary/Diary";
import OrdersScreen from "./screens/Orders/Orders";
import ServicesScreen from "./screens/Services/Services";
import SchedulingScreen from "./screens/Scheduling/Scheduling";
import { apiDomain, request } from "./contexts/globalContext";
import LoginScreen from "./screens/Login/Login";
import SignupScreen from "./screens/Signup/Signup";

function Loading(props: { theme: string }) {
  return (
    <ThemeProvider theme={props.theme == "light" ? lightTheme : darkTheme}>
      <AppStyled>
        <GlobalStyled />
        
        <div style={{ height: "100%" }} className="spinner">
          <div></div>
        </div>
      </AppStyled>
    </ThemeProvider>
  );
};

function Unauthenticated(props: { theme: string }) {
  return (
    <ThemeProvider theme={props.theme == "light" ? lightTheme : darkTheme}>
      <AppStyled>
        <GlobalStyled />
        
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to={"/login"} />} />

            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </BrowserRouter>
      </AppStyled>
    </ThemeProvider>
  );
};

function Admin(props: { theme: string }) {
  return (
    <ThemeProvider theme={props.theme == "light" ? lightTheme : darkTheme}>
      <AppStyled>
        <GlobalStyled />
        
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<OrdersScreen />} />
            <Route path="/diary" element={<DiaryScreen />} />
            <Route path="/services" element={<ServicesScreen />} />
            <Route path="/scheduling" element={<SchedulingScreen />} />
            
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </BrowserRouter>
      </AppStyled>
    </ThemeProvider>
  );
};

function Custumer(props: { theme: string }) {
  return (
    <ThemeProvider theme={props.theme == "light" ? lightTheme : darkTheme}>
      <AppStyled>
        <GlobalStyled />
        
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to={"/schedule"} />} />
            <Route path="/schedule" element={<SchedulingScreen />} />
            
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </BrowserRouter>
      </AppStyled>
    </ThemeProvider>
  );
};

export default function App( ) {
  const [token] = useStorage("token", "");
  const [theme] = useStorage("theme", "light");

  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(( ) => {
    if(!token) {
      setLoading(false);
      setAuthenticated(false);

      return;
    };

    request({
      url: `${apiDomain}/api/custumer/auth`,
      method: "POST",
      headers: { token: token, uncrypted: true },
    }).then(({ error, custumer }) => {
      setLoading(false);
      
      if(error) {
        setAuthenticated(false);
        
        return;
      };

      window.localStorage.setItem("username", custumer.name);
      window.localStorage.setItem("phone", custumer.private.phone);

      setAuthenticated(true);
      setAdmin(custumer.isAdmin);
    });
  }, [ ]);

  return loading
    ? <Loading theme={theme} />
    : (!authenticated)
    ? <Unauthenticated theme={theme} />
    : admin
    ? <Admin theme={theme} />
    : <Custumer theme={theme} />
};

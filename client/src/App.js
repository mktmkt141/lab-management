import './App.css';
import React from 'react';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import AuthLayout from './components/layout/AuthLayout.jsx';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Entry from './pages/Entry';
import Logs from './pages/Logs';
import Admin from './pages/Admin';
import { createTheme,ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from '@mui/material';
import { blue } from '@mui/material/colors';
import AppLayout from './components/layout/AppLayout.jsx';
import Home from './pages/Home.jsx';
function App() {

  const theme=createTheme({
    palette:{primary: blue},
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="admin" element={<Admin/>}/>
          //auth関係のルーティング設定

          </Route>
          <Route path="/" element={<AppLayout/>}>   
            <Route path="logs" element={<Logs/>}/>
            <Route index element={<Home/>}/>
           
          </Route>

        </Routes>
          
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

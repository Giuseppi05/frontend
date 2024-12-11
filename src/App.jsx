import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'; 
import ResponsiveDrawer from "./Components/Drawer.jsx";
import LogScreen from './pages/LogScreen.jsx';
import RegisterScreen from './pages/RegisterScreen.jsx';
import ProtectedRoute from "./Components/ProtectedRoute.jsx"; 
import {Toaster} from "react-hot-toast"

import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function App() {
    const [isLoading, setIsLoading] = useState(false);  

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LogScreen setIsLoading={setIsLoading}/>} />
                <Route path="/register" element={<RegisterScreen setIsLoading={setIsLoading}/>} />
                <Route
                    path="/*" 
                    element={
                        <ProtectedRoute setIsLoading={setIsLoading}> 
                            <ResponsiveDrawer setIsLoading={setIsLoading} />
                        </ProtectedRoute>
                    }
                />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
            

            {isLoading && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: 4,
                        zIndex: 99999
                    }}
                >
                    <CircularProgress sx={{ color: '#ff5b0a' }} />
                </Box>
            )}

            <Toaster /> 
        </BrowserRouter>
    );
}

export default App;

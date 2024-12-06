import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import {checkSession} from "../api/api.js"; 

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const check = async () => {
            try {
                await checkSession();
                setIsAuthenticated(true);
            } catch {
                setIsAuthenticated(false);
            }
        };

        check();
    }, []);

    if (isAuthenticated === null) {
        return <div>Cargando...</div>; 
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

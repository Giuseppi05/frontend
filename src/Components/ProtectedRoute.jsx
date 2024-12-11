import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { checkSession } from "../api/api.js";

const ProtectedRoute = ({ children, setIsLoading }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const verifySession = async () => {
            
            try {
                setIsLoading(true)
                const response = await checkSession();
                setIsAuthenticated(true); 
            } catch (err) {
                setIsAuthenticated(false);
                
                setError(err.response?.data?.message || "Error al verificar la sesión");
            } finally {
                setIsLoading(false)
            }
        };

        verifySession();
    }, []);

    if (isAuthenticated === null) {
        return null; // No renderiza mientras se verifica la sesión
    }

    if (!isAuthenticated) {
        return (
            <>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <Navigate to="/login" replace />
            </>
        );
    }

    return children; 
};

export default ProtectedRoute;
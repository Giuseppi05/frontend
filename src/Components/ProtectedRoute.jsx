import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { checkSession } from "../api/api.js";

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const verifySession = async () => {
            try {
                const response = await checkSession();
                setIsAuthenticated(true); 
            } catch (err) {
                setIsAuthenticated(false);
                
                setError(err.response?.data?.message || "Error al verificar la sesión");
            }
        };

        verifySession();
    }, []);

    if (isAuthenticated === null) {
        return <div>Cargando...</div>; // Estado de carga
    }

    if (!isAuthenticated) {
        return (
            <>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <Navigate to="/login" replace />
            </>
        );
    }

    return children; // Renderiza el contenido protegido
};

export default ProtectedRoute;
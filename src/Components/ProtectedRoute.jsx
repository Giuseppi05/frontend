import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { checkSession } from "../api/api.js"; 

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const check = async () => {
            try {
                const response = await checkSession();
                console.log('Session check successful:', response);
                setIsAuthenticated(true);
            } catch (err) {
                console.error('Session check failed:', err);
                
                // Distinguir entre diferentes tipos de errores
                if (err.response) {
                    // El servidor respondió con un error
                    console.error('Server response error:', err.response.data);
                    setError(err.response.data.message);
                } else if (err.request) {
                    // La solicitud se hizo pero no se recibió respuesta
                    console.error('No response received');
                    setError('No se pudo conectar con el servidor');
                } else {
                    // Algo sucedió al configurar la solicitud
                    console.error('Error setting up request', err.message);
                    setError('Error inesperado');
                }
                
                setIsAuthenticated(false);
            }
        };

        check();
    }, []);

    // Estado de carga
    if (isAuthenticated === null) {
        return <div>Cargando...</div>; 
    }

    // Si no está autenticado, muestra un mensaje de error opcional
    if (!isAuthenticated) {
        console.log('Redirecting due to authentication failure');
        return (
            <>
                {error && <div className="error-message">{error}</div>}
                <Navigate to="/login" replace />
            </>
        );
    }

    // Si está autenticado, renderiza los children
    return children;
};

export default ProtectedRoute;
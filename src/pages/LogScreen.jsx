import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LoginForm from "../Components/LoginForm";
import "../assets/css/Login.css";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {useEffect} from "react"

function LogScreen({ setIsLoading }) {
    const navigate = useNavigate()

    useEffect(() => {
        function verifiedLog() {
            const token = Cookies.get("token"); 
            if (token) {
                navigate("/dashboard")
            }
        }
        verifiedLog()
    }, []);
    
    return (
        <Box
            className="container"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                bgcolor: "#f5f5f5",
                gap: 4,
                width: "100%",
                boxSizing: "border-box"
        }}>
        <Box
            sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            alignItems: "center",
            maxWidth: 500,
            textAlign: "center",
            p: 4,
            mr: 5
            }}
        >
            <Box
            sx={{
                position: "relative",
                mb: 4,
                width: "100%",
                height: "auto",
                borderRadius: 4,
                overflow: "hidden",
            }}
            >
            
            <Typography
            variant="h3"
            sx={{
                fontWeight: "bold",
                color: "#ff5b0a",
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
            }}
            >
            <RestaurantIcon fontSize="large" />
            FoodMatch
            </Typography>

            <Typography
            variant="h5"
            sx={{
                color: "#333",
                mb: 2
            }}
            >
            ¡Encuentra tu próximo restaurante favorito!
            </Typography>

            <img
                src="/food.png"
                alt="Deliciosa comida"
                className="imagen"
            />

            </Box>
        </Box>
        <LoginForm setIsLoading={setIsLoading}/>
    </Box>
);
}

export default LogScreen;
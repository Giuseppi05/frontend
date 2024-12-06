import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";

import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import toast from "react-hot-toast"
import {useForm} from 'react-hook-form'
import { loginApi } from "../api/api";

export default function LoginForm ({setIsLoading }){
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate()

    const {register, handleSubmit} = useForm();

    const onSubmit = handleSubmit(async (values) => {
        setIsLoading(true);
        try {
            const response = await loginApi(values);

            if (response.status === 200) {
                toast.success("Inicio de sesión exitoso, Bienvenido", {
                    position: "bottom-center",
                    duration: 4000,
                    style: {
                        fontFamily: "Segoe UI",
                        background: "#101010",
                        color: "#fff"
                    }
                })
                navigate("/dashboard")
            }
            
        } catch (error) {
            console.error("Login error:", error);

            if (error.response?.status === 400 && error.response.data.errors) {
                const validationErrors = error.response?.data.errors?.[0]?.message
                setError(`${validationErrors}`);
            } else {
                setError(error.response?.data.message || "Error al iniciar sesión");
            }
            
        } finally{
            setIsLoading(false);
        }
    })

    return (
        <Box
            component="form"
            onSubmit={onSubmit}
            sx={{
                maxWidth: 400,
                p: 4,
                borderRadius: 4,
                backgroundColor: "#fff",
                boxShadow: "0 4px 20px 5px rgba(0, 0, 0, 0.2)",
                textAlign: "center",
            }}
        >
            <Typography
                variant="h4"
                sx={{ color: "#333", fontWeight: "bold", mb: 1 }}
            >
                ¡Bienvenido!
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
                Inicia sesión para acceder a tu cuenta
            </Typography>
    
            <Collapse in={!!error}>
                <Alert
                    severity="error"
                    onClose={() => setError("")}
                    sx={{ mb: 2}}
                >
                    {error}
                </Alert>
            </Collapse>
    
            <TextField
                fullWidth
                label="Correo electrónico"
                variant="outlined"
                margin="normal"
                type="email"
                required
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <EmailIcon color="action" />
                        </InputAdornment>
                    ),
                }}
            {...register('email', {required: true})}
            />
    
            <TextField
                fullWidth
                label="Contraseña"
                variant="outlined"
                margin="normal"
                required
                type={showPassword ? "text" : "password"}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <LockIcon color="action" />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                >
                                {showPassword ? (
                                    <VisibilityOffIcon />
                                ) : (
                                    <VisibilityIcon />
                                )}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            {...register('password', {required: true})}
            />
    
            <Button
                variant="contained"
                type="submit"
                sx={{
                    mt: 2,
                    mb: 2,
                    p: 1.5,
                    width: "70%",
                    backgroundColor: "#ff5b0a",
                    "&:hover": { backgroundColor: "#cc2b02" },
                }}
            >
                Iniciar Sesión
            </Button>
    
            <Typography variant="body2" sx={{ mt: 2 }}>
                ¿No tienes una cuenta?{" "}
                <Link href="/register" underline="hover" sx={{ color: "#ff5b0a" }}>
                    Regístrate aquí
                </Link>
            </Typography>
            
        </Box>
    );
    
}
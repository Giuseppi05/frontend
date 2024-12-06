import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";

const RestaurantFormModal = ({ open, handleClose, onSubmit, initialData }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getInitialState = () => ({
    name: "",
    type: "",
    district: "",
    address: "",
    qualification: 0,
    averagePrice: 0,
    mainCourse: "",
    description: "",
  });

  const [formData, setFormData] = useState(getInitialState());

  useEffect(() => {
    if (open) {
      setFormData(initialData ? { ...initialData } : getInitialState());
    }
  }, [open, initialData]);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "95%" : "80%",
    maxWidth: "600px",
    maxHeight: "95vh",
    overflow: "auto",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        name === "qualification" || name === "averagePrice"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const handleModalClose = () => {
    handleClose();
    setFormData(getInitialState());
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          ...modalStyle,
          borderRadius: 3,
          p: { xs: 2, sm: 4 },
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          textAlign="center"
          color="error"
          sx={{ mb: 3 }}
        >
          {initialData ? "Editar Restaurante" : "Registrar Restaurante"}
        </Typography>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box display="flex" flexWrap="wrap" gap={2}>
            <Box flex={1}>
              <TextField
                fullWidth
                label="Nombre"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
              />
            </Box>

            <Box flex={1}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="type-label">Tipo de Cocina</InputLabel>
                <Select
                  labelId="type-label"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  label="Tipo de Cocina"
                >
                    <MenuItem value="Cocina Fusión">Cocina Fusión</MenuItem>
                    <MenuItem value="Comida Criolla">Comida Criolla</MenuItem>
                    <MenuItem value="Comida Rápida">Comida Rápida</MenuItem>
                    <MenuItem value="Cocina Nikkei">Cocina Nikkei</MenuItem>
                    <MenuItem value="Cevichería">Cevichería</MenuItem>
                    <MenuItem value="Pizzas y Parrillas">Pizzas y Parrillas</MenuItem>
                    <MenuItem value="Cocina Vegana">Cocina Vegana</MenuItem>
                    <MenuItem value="Cafetería">Cafetería</MenuItem>
                    <MenuItem value="Postres y Repostería">Postres y Repostería</MenuItem>
                    <MenuItem value="Cocina Italiana">Cocina Italiana</MenuItem>
                    <MenuItem value="Cocina Japonesa">Cocina Japonesa</MenuItem>
                    <MenuItem value="Cocina Mexicana">Cocina Mexicana</MenuItem>
                    <MenuItem value="Cocina China">Cocina China</MenuItem>
                    <MenuItem value="Cocina Americana">Cocina Americana</MenuItem>
                    <MenuItem value="Cocina Peruana">Cocina Peruana</MenuItem>
                    <MenuItem value="Cocina Española">Cocina Española</MenuItem>
                    <MenuItem value="Cocina Árabe">Cocina Árabe</MenuItem>
                    <MenuItem value="Cocina Vegetariana">Cocina Vegetariana</MenuItem>
                    <MenuItem value="Mariscos">Mariscos</MenuItem>
                    <MenuItem value="Restaurante de Parrilla">Restaurante de Parrilla</MenuItem>
                    <MenuItem value="Restaurante de Sushi">Restaurante de Sushi</MenuItem>
                    <MenuItem value="Comida Saludable">Comida Saludable</MenuItem>
                    <MenuItem value="Cocina Gourmet">Cocina Gourmet</MenuItem>
                    <MenuItem value="Cocina Orgánica">Cocina Orgánica</MenuItem>
                    <MenuItem value="Otros">Otros</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box display="flex" flexWrap="wrap" gap={2}>
            <Box flex={1}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="district-label">Distrito</InputLabel>
                <Select
                  labelId="district-label"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  label="Distrito"
                >
                    <MenuItem value="Ancón">Ancón</MenuItem>
                    <MenuItem value="Ate">Ate</MenuItem>
                    <MenuItem value="Barranco">Barranco</MenuItem>
                    <MenuItem value="Breña">Breña</MenuItem>
                    <MenuItem value="Carabayllo">Carabayllo</MenuItem>
                    <MenuItem value="Chaclacayo">Chaclacayo</MenuItem>
                    <MenuItem value="Chorrillos">Chorrillos</MenuItem>
                    <MenuItem value="Cieneguilla">Cieneguilla</MenuItem>
                    <MenuItem value="Comas">Comas</MenuItem>
                    <MenuItem value="El Agustino">El Agustino</MenuItem>
                    <MenuItem value="Independencia">Independencia</MenuItem>
                    <MenuItem value="Jesús María">Jesús María</MenuItem>
                    <MenuItem value="La Molina">La Molina</MenuItem>
                    <MenuItem value="La Victoria">La Victoria</MenuItem>
                    <MenuItem value="Lince">Lince</MenuItem>
                    <MenuItem value="Los Olivos">Los Olivos</MenuItem>
                    <MenuItem value="Lurigancho">Lurigancho</MenuItem>
                    <MenuItem value="Lurín">Lurín</MenuItem>
                    <MenuItem value="Magdalena del Mar">Magdalena del Mar</MenuItem>
                    <MenuItem value="Miraflores">Miraflores</MenuItem>
                    <MenuItem value="Pachacámac">Pachacámac</MenuItem>
                    <MenuItem value="Pucusana">Pucusana</MenuItem>
                    <MenuItem value="Pueblo Libre">Pueblo Libre</MenuItem>
                    <MenuItem value="Puente Piedra">Puente Piedra</MenuItem>
                    <MenuItem value="Punta Hermosa">Punta Hermosa</MenuItem>
                    <MenuItem value="Punta Negra">Punta Negra</MenuItem>
                    <MenuItem value="Rímac">Rímac</MenuItem>
                    <MenuItem value="San Bartolo">San Bartolo</MenuItem>
                    <MenuItem value="San Borja">San Borja</MenuItem>
                    <MenuItem value="San Isidro">San Isidro</MenuItem>
                    <MenuItem value="San Juan de Lurigancho">San Juan de Lurigancho</MenuItem>
                    <MenuItem value="San Juan de Miraflores">San Juan de Miraflores</MenuItem>
                    <MenuItem value="San Luis">San Luis</MenuItem>
                    <MenuItem value="San Martín de Porres">San Martín de Porres</MenuItem>
                    <MenuItem value="San Miguel">San Miguel</MenuItem>
                    <MenuItem value="Santa Anita">Santa Anita</MenuItem>
                    <MenuItem value="Santa María del Mar">Santa María del Mar</MenuItem>
                    <MenuItem value="Santa Rosa">Santa Rosa</MenuItem>
                    <MenuItem value="Santiago de Surco">Santiago de Surco</MenuItem>
                    <MenuItem value="Surquillo">Surquillo</MenuItem>
                    <MenuItem value="Villa El Salvador">Villa El Salvador</MenuItem>
                    <MenuItem value="Villa María del Triunfo">Villa María del Triunfo</MenuItem>    
                </Select>
              </FormControl>
            </Box>

            <Box flex={1}>
              <TextField
                fullWidth
                label="Calificación"
                name="qualification"
                type="number"
                value={formData.qualification}
                onChange={handleChange}
                variant="outlined"
                inputProps={{
                  step: 0.1,
                  min: 0,
                  max: 5,
                }}
              />
            </Box>
          </Box>

          <Box display="flex" flexWrap="wrap" gap={2}>
            <Box flex={1}>
              <TextField
                fullWidth
                label="Precio Promedio"
                name="averagePrice"
                type="number"
                value={formData.averagePrice}
                onChange={handleChange}
                variant="outlined"
                inputProps={{
                  step: 0.1,
                  min: 0,
                }}
              />
            </Box>

            <Box flex={1}>
              <TextField
                fullWidth
                label="Plato Principal"
                name="mainCourse"
                value={formData.mainCourse}
                onChange={handleChange}
                variant="outlined"
              />
            </Box>
          </Box>

          <Box>
            <TextField
              fullWidth
              label="Dirección"
              name="address"
              multiline
              value={formData.address}
              onChange={handleChange}
              variant="outlined"
            />
          </Box>

          <Box>
            <TextField
              fullWidth
              label="Descripción"
              name="description"
              multiline
              rows={3}
              value={formData.description}
              onChange={handleChange}
              variant="outlined"
            />
          </Box>

          <Button
            variant="contained"
            color="error"
            onClick={handleSubmit}
            fullWidth
            sx={{
              mt: 1,
              py: 1.5,
              backgroundColor: deepOrange[600],
              "&:hover": {
                backgroundColor: deepOrange[700],
              },
            }}
          >
            Guardar
          </Button>

          <Button
            variant="outlined"
            color="error"
            onClick={handleModalClose}
            fullWidth
            sx={{
              mt: 1,
              py: 1.5,
              backgroundColor: deepOrange[50],
              color: deepOrange[900],
            }}
          >
            Cancelar
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default RestaurantFormModal;
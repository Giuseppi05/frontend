import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  useMediaQuery,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { readAllRestaurants } from "../api/api";
import { toast } from "react-hot-toast";

const OfferFormModal = ({ open, handleClose, onSubmit, initialData }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [restaurants, setRestaurants] = useState([]);

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) return '';
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  const loadRestaurants = async () => {
    try {
      const res = await readAllRestaurants();
      setRestaurants(res.data);
    } catch (error) {
      console.error("Error al cargar restaurantes:", error);
      toast.error("No se pudieron cargar los restaurantes.", {
        position: "bottom-center",
        duration: 4000,
        style: {
          fontFamily: "Segoe UI",
          background: "#101010",
          color: "#fff",
        },
      });
    }
  };

  const getInitialState = () => ({
    title: "",
    description: "",
    discount: "",
    restaurant: { id: "" },
    startDate: "",
    endDate: "",
  });

  const [formData, setFormData] = useState(getInitialState());

  useEffect(() => {
    if (open) {
      const dataToSet = initialData 
        ? { 
            ...initialData,
            startDate: formatDateForInput(initialData.startDate),
            endDate: formatDateForInput(initialData.endDate)
          }
        : getInitialState();
      
      setFormData(dataToSet);
      loadRestaurants();
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
    if (name.startsWith("restaurant.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        restaurant: {
          ...prev.restaurant,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    const dataToSubmit = {
      ...formData,
      startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
      endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
    };

    onSubmit(dataToSubmit);
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
          {initialData ? "Editar Oferta" : "Registrar Oferta"}
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
                    label="Título"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    variant="outlined"
                />
            </Box>

            <Box flex={1}>
                <TextField
                    fullWidth
                    label="Descuento (%)"
                    name="discount"
                    type="number"
                    inputProps={{
                        min: 0,
                        max: 100,
                    }}
                    value={formData.discount}
                    onChange={handleChange}
                    variant="outlined"
                />
            </Box>
        </Box>

        <Box display="flex">
            <FormControl fullWidth variant="outlined">
                <InputLabel id="type-label">Restaurante</InputLabel>
                <Select
                  labelId="type-label"
                  name="restaurant.id"
                  value={formData.restaurant.id}
                  onChange={handleChange}
                  label="Restaurante"
                > 
                  {
                    restaurants.map((restaurant) => {
                      return <MenuItem key={restaurant._id} value={restaurant._id}>{restaurant.name}</MenuItem>;
                    })
                  }
                </Select>
            </FormControl>
        </Box>

        <Box display="flex" flexWrap="wrap" gap={2}>
            <Box flex={1}>
                <TextField
                    fullWidth
                    label="Fecha de Inicio"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                />
            </Box>

            <Box flex={1}>
                <TextField
                    fullWidth
                    label="Fecha de Fin"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                />
            </Box>
        </Box> 

        <Box display="flex">
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

export default OfferFormModal;
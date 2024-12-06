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
import { toast } from "react-hot-toast";

const IncidentFormModal = ({ open, handleClose, onSubmit, initialData }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) return '';
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  const getInitialState = () => ({
    title: "",
    date: "",
    description: ""
  });

  const [formData, setFormData] = useState(getInitialState());

  useEffect(() => {
    if (open) {
      const dataToSet = initialData 
        ? { 
            ...initialData,
            date: formatDateForInput(initialData.date)
          }
        : getInitialState();
      
      setFormData(dataToSet);
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
    setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
  };

  const handleSubmit = () => {
    const dataToSubmit = {
      ...formData,
      date: formData.date ? new Date(formData.date).toISOString() : null,
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
          {initialData ? "Editar Incidencia" : "Registrar Incidencia"}
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
                    label="Fecha de incidencia"
                    name="date"
                    type="date"
                    value={formData.date}
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

export default IncidentFormModal;
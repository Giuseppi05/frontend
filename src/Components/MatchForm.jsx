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
  MenuItem,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { readAllRestaurants, readAllUsers } from "../api/api";
import { toast } from "react-hot-toast";

const MatchFormModal = ({ open, handleClose, onSubmit, initialData }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [restaurants, setRestaurants] = useState([]);
  const [users, setUsers] = useState([]);

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

  const loadUsers = async () => {
    try {
      const res = await readAllUsers();
      setUsers(res.data);
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
    user: { id: "" },
    restaurant: { id: "" },
  });

  const [formData, setFormData] = useState(getInitialState());

  useEffect(() => {
    if (open) {
      setFormData(initialData ? { ...initialData } : getInitialState());

      loadRestaurants();
      loadUsers();
    }
  }, [open]);

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
    } else if (name.startsWith("user.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        user: {
          ...prev.user,
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
          {initialData ? "Editar Match" : "Registrar Match"}
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
                {restaurants.map((restaurant) => {
                  return (
                    <MenuItem key={restaurant._id} value={restaurant._id}>
                      {restaurant.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>

          <Box display="flex">
            <FormControl fullWidth variant="outlined">
              <InputLabel id="type-label">Usuario</InputLabel>
              <Select
                labelId="type-label"
                name="user.id"
                value={formData.user.id}
                onChange={handleChange}
                label="Usuario"
              >
                {users.map((user) => {
                  return (
                    <MenuItem key={user._id} value={user._id}>
                      {user.name + " " + user.lastname}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
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

export default MatchFormModal;

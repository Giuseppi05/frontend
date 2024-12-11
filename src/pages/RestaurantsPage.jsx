import React from "react";
import { Box, Typography, Divider, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  readAllRestaurants,
  deleteRestaurant,
  createRestaurant,
  updateRestaurant,
} from "../api/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import RestaurantFormModal from "../Components/RestaurantForm";

const RestaurantsPage = ({setIsLoading}) => {
  const [restaurants, setRestaurants] = useState([]);
  const paginationModel = { page: 0, pageSize: 5 };
  const [openModal, setOpenModal] = useState(false);
  const [editingData, setEditingData] = useState(null);

  const toastOptions = {
    position: "bottom-center",
    duration: 4000,
    style: {
      fontFamily: "Segoe UI",
      background: "#101010",
      color: "#fff",
    },
  };

  //COLUMNAS PARA LA TABLA 
  const columns = [
    {
      field: "name",
      headerName: "Nombre",
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: "type",
      headerName: "Tipo de Cocina",
      width: 150,
      disableColumnMenu: true,
    },
    {
      field: "district",
      headerName: "Distrito",
      width: 130,
      disableColumnMenu: true,
    },
    {
      field: "address",
      headerName: "Dirección",
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: "qualification",
      headerName: "Calificación",
      type: "number",
      width: 120,
      disableColumnMenu: true,
    },
    {
      field: "averagePrice",
      headerName: "Precio Promedio",
      type: "number",
      width: 140,
      disableColumnMenu: true,
    },
    {
      field: "mainCourse",
      headerName: "Plato Principal",
      width: 150,
      disableColumnMenu: true,
    },
    {
      field: "description",
      headerName: "Descripción",
      width: 300,
      disableColumnMenu: true,
    },
    {
      field: "actions",
      headerName: "Acciones",
      type: "actions",
      width: 100,
      disableColumnMenu: true,
      renderCell: (params) => (
        <>
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Editar"
            onClick={() => handleEditClick(params.row)}
          />
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Eliminar"
            onClick={() => handleDelete(params.row._id)}
          />
        </>
      ),
    },
  ];

  //OPCIONES DEL MODAL
  const handleOpen = () => {
    setOpenModal(true)
  };

  const handleEditClick = (rowData) => {
    setEditingData(rowData);
    handleOpen();
  };
  
  const handleClose = () => {
    setOpenModal(false);
    setEditingData(null);
  };

  const handleSubmit = async (data) => {
    setIsLoading(true);
    try {

      if (editingData) await updateRestaurant(data._id, data);
      else  await createRestaurant(data);
      
      loadRestaurants()
      handleClose()
      toast.success("Acción completada correctamente", toastOptions);

    } catch (error) {
      const errorMessage = error.response?.data.errors?.[0]?.message 
        || error.response?.data.message 
        || "Error al realizar la acción";
  
      toast.error(errorMessage, toastOptions);
    } finally {
      setIsLoading(false);
    }
  };

  //CARGAR LA TABLA
  const loadRestaurants = async () => {
    setIsLoading(true)
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
    } finally{
      setIsLoading(false)
    }
  };


  useEffect(() => {
    loadRestaurants();
  }, []);

  //ELIMINAR FILA
  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      if (!window.confirm("¿Está seguro de eliminar este restaurante?")) return;

      const response = await deleteRestaurant(id);

      if (response.status === 204) {
        toast.success("Restaurante eliminado correctamente", toastOptions);

        await loadRestaurants();
      }
    } catch (error) {
      console.error("Error al eliminar restaurante:", error);
      toast.error("Ocurrió un error al eliminar el restaurante", toastOptions);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%", textAlign: "center", mt: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography
            variant="h5"
            sx={{
              marginBottom: "20px",
              color: "#333",
              textAlign: "start",
              fontWeight: "bold",
            }}
          >
            Restaurantes
          </Typography>

          <Typography
            sx={{
              marginBottom: "20px",
              color: "#333",
              textAlign: "start",
            }}
          >
            Dashboard / Páginas / Restaurantes
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            height: "30%",
            m: 2,
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="error"
            size="medium"
            onClick={handleOpen}
          >
            <AddIcon sx={{ mr: 1 }} />
            Restaurante
          </Button>
        </Box>
      </Box>
      <Divider sx={{ mb: 2 }} />

      <Box
        sx={{ maxWidth: "100vw", backgroundColor: "white", overflowX: "auto" }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              sx={{
                color: "#333",
                textAlign: "start",
                fontWeight: "390",
              }}
            >
              Restaurantes
            </Typography>
          </Box>
        </Box>

        <Paper sx={{ width: "100%", textAlign: "center" }}>
          <DataGrid
            rows={restaurants}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            getRowId={(row) => row._id}
            sx={{
              border: 0,
              "& .MuiTablePagination-selectLabel": {
                display: "block !important",
              },
              "& .MuiTablePagination-input": {
                display: "inline-flex !important",
              },
            }}
          />
        </Paper>
      </Box>

      <RestaurantFormModal
        open={openModal}
        handleClose={handleClose}
        onSubmit={handleSubmit}
        initialData={editingData}
      />
    </Box>
  );
};

export default RestaurantsPage;
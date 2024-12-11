import React from "react";
import { Box, Typography, Divider, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  readAllIncidents,
  deleteIncident,
  createIncident,
  updateIncident,
} from "../api/api";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import IncidentFormModal from "../Components/IncidentForm";

const IncidentsPage = ({setIsLoading}) => {
  const [incidents, setIncidents] = useState([]);
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
      field: "title",
      headerName: "Titulo",
      width: 250,
      disableColumnMenu: true,
    },
    {
      field: "date",
      headerName: "Fecha de Incidencia",
      width: 200,
      disableColumnMenu: true,
      valueFormatter: (params) => {
        if (!params) return '';
        
        const date = new Date(params);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        
        return `${day}/${month}/${year}`;
      }
    },
    {
      field: "description",
      headerName: "Descripción",
      width: 400,
      disableColumnMenu: true,
    },
    {
      field: "actions",
      headerName: "Acciones",
      type: "actions",
      width: 150,
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

      if (editingData) await updateIncident(data._id, data);
      else  await createIncident(data);
      
      loadIncidents()
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
  const loadIncidents = async () => {
    setIsLoading(true)
    try {
      const res = await readAllIncidents();
      setIncidents(res.data);
    } catch (error) {
      console.error("Error al cargar incidentes:", error);
      toast.error("No se pudieron cargar los incidentes.", {
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
    loadIncidents();
  }, []);

  //ELIMINAR FILA
  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      if (!window.confirm("¿Está seguro de eliminar este incidente?")) return;

      const response = await deleteIncident(id);

      if (response.status === 204) {
        toast.success("Incidente eliminado correctamente", toastOptions);

        await loadIncidents();
      }
    } catch (error) {
      console.error("Error al eliminar incidente:", error);
      toast.error("Ocurrió un error al eliminar el incidente", toastOptions);
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
            Incidentes
          </Typography>

          <Typography
            sx={{
              marginBottom: "20px",
              color: "#333",
              textAlign: "start",
            }}
          >
            Dashboard / Páginas / Incidentes
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
            Incidente
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
              Incidentes
            </Typography>
          </Box>

        </Box>

        <Paper sx={{ width: "100%", textAlign: "center" }}>
          <DataGrid
            rows={incidents}
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

      <IncidentFormModal
        open={openModal}
        handleClose={handleClose}
        onSubmit={handleSubmit}
        initialData={editingData}
      />
    </Box>
  );
};

export default IncidentsPage;
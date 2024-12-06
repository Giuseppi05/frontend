import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import { Typography, Divider, Popover, List, ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, Button} from '@mui/material';
import logo from "/logo.png";
import { logoutApi } from '../api/api';
import {useNavigate} from 'react-router-dom';
import {toast} from "react-hot-toast"

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar({ handleDrawerToggle, setIsLoading }) {
  const [anchorPerfil, setAnchorPerfil] = React.useState(null);

  const isPerfilOpen = Boolean(anchorPerfil);

  const navigate = useNavigate()

  const handleLogout = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        const response = await logoutApi()

        if (response.status === 200) {
          toast.success("Cierre de sesión exitoso", {
            position: "bottom-center",
            duration: 4000,
            style: {
                fontFamily: "Segoe UI",
                background: "#101010",
                color: "#fff"
            }
        })
            navigate("/login") 
        }
    } catch (error) {
        console.error("Logout error:", error);
    } finally{
        setIsLoading(false);
    }
  };

  const handlePerfilClick = (event) => {
    setAnchorPerfil(event.currentTarget);
  };

  const handlePerfilClose = () => {
    setAnchorPerfil(null);
  };

  const perfil = (
    <Popover
        anchorEl={anchorPerfil}
        open={isPerfilOpen}
        onClose={handlePerfilClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        style={{textAlign:"center"}}
      >
        <List>
            <ListItemButton onClick={handleLogout}>
                <ListItemAvatar>
                    <Avatar >
                        <LogoutIcon  />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Cerrar sesión" />
            </ListItemButton>
        </List>
      </Popover>
  );

  return (
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: {md: 'flex' } }}>

            <Tooltip title="Foodmatch">
            <IconButton
              size="large"
              edge="end"
              aria-haspopup="true"
              color="inherit"
              onClick={handlePerfilClick}
            >
              <Avatar src={logo} alt="Foodmatch" />
            </IconButton>
            
            </Tooltip>
          </Box>
          {isPerfilOpen && perfil}
        </Toolbar>
  );
}

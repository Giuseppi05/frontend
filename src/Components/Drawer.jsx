//Componentes nativos
import PropTypes from 'prop-types';
import {  Routes, Route, Link, Navigate } from 'react-router-dom';

//Componentes de material
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

//Componentes de la página
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import Dashboard from '@mui/icons-material/Dashboard';
import PrimarySearchAppBar from './PrimarySearchAppBar';
import FoodMatchDashboard from "../pages/FoodMatchDashboard";
import RestaurantsPage from "../pages/RestaurantsPage";  
import UsuariosPage from "../pages/UsuariosPage";          
import OffersPage from "../pages/OffersPage";          
import Footer from "./Footer";          
import IncidentsPage from '../pages/IncidentsPage';
import MatchPage from '../pages/MatchPage'

//Iconos - Imágenes
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import GroupIcon from '@mui/icons-material/Group';
import logo from "/logo-v2.png";
import "../assets/css/Drawer.css";
import { DiscountSharp} from '@mui/icons-material';
import DescriptionIcon from '@mui/icons-material/Description';
import FavoriteIcon from '@mui/icons-material/Favorite'

import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import { checkSession } from "../api/api.js";
 
function ResponsiveDrawer({ setIsLoading }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const drawerWidth = 240;
  const navigate = useNavigate()

  useEffect(() => {
    const verifiedLog = async () => {
        try {
            await checkSession();
        } catch (error) {
            console.log("No hay sesión activa");
            navigate("/login");
        }
    };
    verifiedLog()
  }, [navigate]);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div className="customMenu">
      <Toolbar 
        sx={{my:2}} 
        className="logo" 
        component={Link} to="/dashboard" 
        onClick={handleDrawerClose}>
        <img src={logo} alt="Logo" style={{ width: '100%' }} />
      </Toolbar>

      <Typography variant="subtitle2" className="sub">
        Páginas
      </Typography>

      <List>
        <ListItem key={"Dashboard"} disablePadding onClick={handleDrawerClose}>
          <ListItemButton component={Link} to="/dashboard">
            <ListItemIcon><Dashboard /></ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItemButton>
        </ListItem>

        <ListItem key={"Restaurantes"} disablePadding onClick={handleDrawerClose}>
          <ListItemButton component={Link} to="/restaurants">
            <ListItemIcon><RestaurantMenuIcon /></ListItemIcon>
            <ListItemText primary={"Restaurantes"} />
          </ListItemButton>
        </ListItem>

        <ListItem key={"Usuarios"} disablePadding onClick={handleDrawerClose}>
          <ListItemButton component={Link} to="/users">
            <ListItemIcon><GroupIcon /></ListItemIcon>
            <ListItemText primary={"Usuarios"} />
          </ListItemButton>
        </ListItem>

        <ListItem key={"Ofertas"} disablePadding onClick={handleDrawerClose}>
          <ListItemButton component={Link} to="/offers">
            <ListItemIcon><DiscountSharp /></ListItemIcon>
            <ListItemText primary={"Ofertas"} />
          </ListItemButton>
        </ListItem>

        <ListItem key={"Matchs"} disablePadding onClick={handleDrawerClose}>
            <ListItemButton component={Link} to="/match">
              <ListItemIcon><FavoriteIcon /></ListItemIcon>
              <ListItemText primary={"Matchs"} />
            </ListItemButton>
          </ListItem>
        </List>

        <ListItem key={"Incidencias"} disablePadding onClick={handleDrawerClose}>
          <ListItemButton component={Link} to="/incidents">
            <ListItemIcon><DescriptionIcon /></ListItemIcon>
            <ListItemText primary={"Incidencias"} />
          </ListItemButton>
        </ListItem>
    </div>
  );

  return (
      <Box sx={{ display: 'flex', width: "100%", boxSizing: "border-box" }}>
          <CssBaseline />
          <AppBar
              position="fixed"
              className="customAppBar"
              sx={{
                  width: { sm: `calc(100% - ${drawerWidth}px)` },
                  ml: { sm: `${drawerWidth}px` },
              }}
          >
              <PrimarySearchAppBar setIsLoading={setIsLoading} handleDrawerToggle={handleDrawerToggle} />
          </AppBar>

          <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              aria-label="mailbox folders"
          >
              <Drawer
                  variant="temporary"
                  open={mobileOpen}
                  onTransitionEnd={handleDrawerTransitionEnd}
                  onClose={handleDrawerClose}
                  ModalProps={{
                      keepMounted: true,
                  }}
                  sx={{
                      display: { xs: 'block', sm: 'none' },
                      '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                  }}
              >
                  {drawer}
              </Drawer>
              <Drawer
                  variant="permanent"
                  sx={{
                      display: { xs: 'none', sm: 'block' },
                      '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                  }}
                  open
              >
                  {drawer}
              </Drawer>
          </Box>

          <Box
              component="main"
              sx={{ pt: 8, px: {xs:2, md:5}, width: { xs:"100vw", sm: `calc(100% - ${drawerWidth}px)` }, boxSizing: "border-box" }}
          >
              <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<FoodMatchDashboard setIsLoading={setIsLoading}/>} />
                  <Route path="/restaurants" element={<RestaurantsPage setIsLoading={setIsLoading}/>} />
                  <Route path="/users" element={<UsuariosPage setIsLoading={setIsLoading}/>} />
                  <Route path="/offers" element={<OffersPage setIsLoading={setIsLoading}/>} />
                  <Route path="/incidents" element={<IncidentsPage setIsLoading={setIsLoading}/>} />
                  <Route path="/match" element={<MatchPage setIsLoading={setIsLoading}/>} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
              <Footer />
          </Box>
      </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
import React from 'react';
import { Box, List, ListItemButton, ListItemText, Typography } from '@mui/material';

function Footer() {
  return (
    <Box component="footer" sx={{ p: 0, bgcolor: 'background.paper' }}>
      <Box  sx={{display: "flex", flexDirection: {xs: "column", md: "row"}, justifyContent: {xs: "center", md: "space-between"}, flexWrap:"wrap"}}  >
        
        <Box>
          <List sx={{ 
            display: "flex", 
            color: "gray", 
            flexDirection: {xs: "column", md: "row"},
            textAlign: "center"
            }}>

            <ListItemButton component="a" href="#" sx={{textAlign: "center"}}>
              <ListItemText primary="Soporte" />
            </ListItemButton>
            <ListItemButton component="a" href="#" sx={{textAlign: "center"}}>
              <ListItemText primary="Centro de Ayuda" />
            </ListItemButton>
            <ListItemButton component="a" href="#" sx={{textAlign: "center"}}>
              <ListItemText primary="Privacidad" />
            </ListItemButton>
            <ListItemButton component="a" href="#" sx={{textAlign: "center"}}>
              <ListItemText primary="Terminos de Servicio" />
            </ListItemButton>
          </List>
        </Box>
        
        <Box>
          <List sx={{ color: "gray"}}>
            <ListItemButton>
              <ListItemText
                primary={<Typography variant="body1" sx={{textAlign: "center"}}>© 2024 - Foodmatch</Typography>}
              />
            </ListItemButton>
          </List>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;

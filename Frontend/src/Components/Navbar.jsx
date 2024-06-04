import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles'; // Import styled function


const StyledDrawer = styled(Drawer)({
    maxWidth:"fit-content",  flexShrink: 0,
});

const StyledList = styled(List)({
  maxWidth:"10%",
});

const Navbar = () => {
  return (
    <StyledDrawer variant="permanent" anchor="left">
      <StyledList>
        <ListItem >
          <ListItemText primary="1" />
        </ListItem>
        <ListItem >
          <ListItemText primary="2" />
        </ListItem>
       
       
      </StyledList>
    </StyledDrawer>
  );
};

export default Navbar;

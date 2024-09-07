import React, { useState } from 'react';
import {
  Fab,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
  Box,
  Button,
  Typography,
} from '@mui/material';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import CloseIcon from '@mui/icons-material/Close';
import AddtoContacts from './AddToContacts';
import { Navigate, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const FloatingContactList = ({ contacts, onSelectContact,open,onClick}) => {
  const [isOpen, setIsOpen] = useState(false);
  const bigScreen=window.innerWidth>=750;
  const toggleDrawer = (open) => () => {
    setIsOpen(open);
  };

  const handleContactClick = (index) => {
    onSelectContact(index);
    setIsOpen(false);
  };

  return (
    <div>
    <ListItem button sx={{ padding:bigScreen?'0 16px':'0' }} aria-label="contacts"
        onClick={toggleDrawer('open')}>
                        <ListItemIcon sx={{ minWidth: 'auto' }}>
                            <AccountCircleIcon fontSize="medium" />
                        </ListItemIcon>
                        {open && <ListItemText primary="Contacts" sx={{ paddingLeft: 2 }} />}
                    </ListItem>
      <Typography
        
      >
       
      </Typography>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            display: 'flex',
            flexDirection: 'column',
          
          }}
          role="presentation"
        >
          <IconButton onClick={toggleDrawer(false)} style={{ alignSelf: 'flex-end' }}>
            <CloseIcon />
          </IconButton>
          <List>
          
            {contacts.map((contact, index) => (
              <ListItem button key={index} onClick={() => handleContactClick(index)}>
                <ListItemIcon>
                  <Avatar src={contact.avatar} />
                </ListItemIcon>
                <ListItemText primary={contact.name} />
              </ListItem>
            ))}
          </List>
        </Box>
        {/* <Button sx={{bottom: "-30rem"}} onClick={}>Add to Contacts</Button> */}
        <AddtoContacts/>
      </Drawer>
    </div>
  );
};

export default FloatingContactList;

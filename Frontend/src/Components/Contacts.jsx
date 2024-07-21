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
} from '@mui/material';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import CloseIcon from '@mui/icons-material/Close';

const FloatingContactList = ({ contacts, onSelectContact }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsOpen(open);
  };

  const handleContactClick = (index) => {
    onSelectContact(index);
    setIsOpen(false);
  };

  return (
    <div>
      <Fab
        color="primary"
        aria-label="contacts"
        onClick={toggleDrawer(true)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '1rem'
        }}
      >
        <ContactPhoneIcon />
      </Fab>
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
        <Button sx={{bottom: "-30rem"}}>Add to Contacts</Button>
      </Drawer>
    </div>
  );
};

export default FloatingContactList;

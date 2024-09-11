import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  CircularProgress,
  Skeleton,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

const ContactList = ({ contacts, onSelectContact,loading }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleContactClick = (index) => {
    onSelectContact(index);
    handleMenuClose();
  };

  return (
    <div>
      <IconButton onClick={handleMenuOpen} aria-label="contacts" >
        <DriveFileRenameOutlineIcon fontSize="medium" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
           
            width: 500, // Set width
            right:'100%',
            '& .MuiMenu-paper': {
              width: '100%', // Custom width for the Menu
              paddingX:"2rem",
              paddingY:'1rem',
              borderRadius:'2%'
            },
          }}
          anchorOrigin={{
            vertical: 'bottom', // Position relative to the anchor
            horizontal: 'left', // Align left side with anchor's left side
          }}
          transformOrigin={{
            vertical: 'top', // Positioning of the Menu's origin
            horizontal: 'left', // Align Menu's top-left corner with anchor's bottom-left corner
          }}
      >
        <Typography sx={{fontWeight:'bold',fontSize:'large',marginBlockEnd:"3%"
        }}>New Chat</Typography>
        {loading?
        <><Skeleton variant="rectangular" width={'100%'} height={20} sx={{paddingBlockEnd:'2%'}} /><Skeleton variant="rectangular" width={'100%'} height={20} /><Skeleton variant="rectangular" width={'100%'} height={20} /><Skeleton variant="rectangular" width={'100%'} height={20} /><Skeleton variant="rectangular" width={'100%'} height={20} /></>
        :contacts.map((contact, index) => (
          <MenuItem key={index} onClick={() => handleContactClick(index)}>
            <ListItemIcon sx={{marginInlineEnd:"4%"}}>
              <Avatar src={contact.avatar} />
            </ListItemIcon>
            <ListItemText primary={contact.name} />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ContactList;

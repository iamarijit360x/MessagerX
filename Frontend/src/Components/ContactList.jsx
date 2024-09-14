import React, { useEffect, useState } from 'react';
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
  LinearProgress,
  Box,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddtoContacts from './AddToContacts';
const ContactList = ({ contactsList, onSelectContact,loading,onContactsChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [contacts,setContacts]=useState(contactsList)
  useEffect(()=>console.log(contacts),[contacts])
  useEffect(() => {
    // Update contacts when contactsList changes
    setContacts(contactsList);
  }, [contactsList]); 
 
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

      <Box sx={{display:'flex',justifyContent:"space-between",marginBlockEnd:"2%"}}>
          <Typography sx={{fontWeight:'bold',fontSize:'large',alignContent:'center'}}>
              New Chat
          </Typography>
        
          <Box sx={{display:'flex',alignItems:'center'}}>
         
 
              <AddtoContacts contacts={contacts} onAddContact={(data)=>{setContacts(data);onContactsChange(data);}}/>
             
             
        
          </Box>
        </Box>
              

       
        {loading ?
        <>
          <LinearProgress sx={{marginBlockEnd:'2%'}}/>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width={'100%'}
              height={30}
              sx={{ marginBlockEnd: '2%' }}
            />
          ))}
        </>
        :contacts.map((contact, index) => (
          <MenuItem key={index} onClick={() => handleContactClick(index)} sx={{borderRadius:'9px'}}>
            <ListItemIcon sx={{marginInlineEnd:"4%"}}>
              <Avatar src={contact.avatar} />
            </ListItemIcon>
            <ListItemText primary={contact.name} secondary={contact.username}/>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ContactList;

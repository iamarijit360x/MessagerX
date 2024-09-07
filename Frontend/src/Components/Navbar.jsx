import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FloatingContactList from './Contacts';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu'; // Menu icon to toggle the drawer
import { useNavigate } from 'react-router-dom';

const drawerWidthOpen = 240;  // Width when drawer is open
const drawerWidthClosed = 60;  // Width when drawer is closed

const VerticalNavbar = ({ contacts, handleSelectContacts }) => {
    const [open, setOpen] = useState(false);
    const navigate=useNavigate()
    // Function to toggle drawer open/close
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
           

            <Drawer
                variant="permanent"
                anchor="left"
                open={open}
                sx={{position: 'absolute',  // Position it absolutely so it doesn't interfere
                    zIndex: 1200,  // Ensure it's on top of other elements
                    
                    width: open ? drawerWidthOpen : drawerWidthClosed,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: open ? drawerWidthOpen : drawerWidthClosed,
                        transition: 'width 0.3s',
                        boxSizing: 'border-box',
                        display: 'flex',
                        alignItems: open ? 'flex-start' : 'center',
                        justifyContent: 'center',
                        padding: 0,
                    },
                }}
            >
                 <IconButton
                onClick={toggleDrawer}
                sx={{
                    
                }}
            >
                <MenuIcon />
            </IconButton>
                <List
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        alignItems: open ? 'flex-start' : 'center',
                        flexGrow: 1,
                        paddingBlock: '3rem',
                    }}
                >
                    <ListItem button sx={{ padding: '0 16px' }}>
                        <ListItemIcon sx={{ minWidth: 'auto' }}>
                            <HomeIcon fontSize="medium" />
                        </ListItemIcon>
                        {open && <ListItemText primary="Home" sx={{ paddingLeft: 2 }} />}
                    </ListItem>

                    <ListItem button sx={{ padding: '0 16px' }}>
                        <ListItemIcon sx={{ minWidth: 'auto' }}>
                            <SearchIcon fontSize="medium" />
                        </ListItemIcon>
                        {open && <ListItemText primary="Search" sx={{ paddingLeft: 2 }} />}
                    </ListItem>

                    <ListItem button sx={{ padding: '0 16px' }}>
                        <ListItemIcon sx={{ minWidth: 'auto' }}>
                            <NotificationsIcon fontSize="medium" />
                        </ListItemIcon>
                        {open && <ListItemText primary="Notifications" sx={{ paddingLeft: 2 }} />}
                    </ListItem>

                    <ListItem button sx={{ padding: '0 16px' }}>
                        <ListItemIcon sx={{ minWidth: 'auto' }}>
                            <MailIcon fontSize="medium" />
                        </ListItemIcon>
                        {open && <ListItemText primary="Messages" sx={{ paddingLeft: 2 }} />}
                    </ListItem>


                    <ListItem button sx={{padding:0}}>
                        <ListItemIcon sx={{ minWidth: 'auto' }}>
                             
                        <FloatingContactList  open={open} contacts={contacts} onSelectContact={handleSelectContacts}/>
                           
                        </ListItemIcon>
                       
                    </ListItem>


                    <ListItem button sx={{ padding: '0 16px' }}  onClick={()=>{localStorage.clear();naviagte('/signin')}}>
                        <ListItemIcon sx={{ minWidth: 'auto' }}>
                            <LogoutIcon fontSize="medium" />
                        </ListItemIcon>
                        {open && <ListItemText primary="Logout" sx={{ paddingLeft: 2 }} />}
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
};

export default VerticalNavbar;

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
import { useAuth } from '../Middleware/AuthContex';


const VerticalNavbar = ({ contacts, handleSelectContacts,bigScreen }) => {
    const drawerWidthOpen = bigScreen ?240:130;  // Width when drawer is open
    const drawerWidthClosed = bigScreen?60:30;  // Width when drawer is closed

    const [open, setOpen] = useState(false);
    // Function to toggle drawer open/close
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const {logout}=useAuth()

    return (
        <>
           

           { bigScreen ?<Drawer
                variant="permanent"
                anchor="left"
                open={open}
                sx={{position: 'absolute',  // Position it absolutely so it doesn't interfere
                    zIndex: 1200,  // Ensure it's on top of other elements
                    overflow:'hidden',
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
                        <ListItemIcon sx={{ minWidth: 'auto' ,overflow: 'hidden' }}>
                            <SearchIcon fontSize="medium" />
                        </ListItemIcon>
                        {open && <ListItemText primary="Search" sx={{ paddingLeft: 2 }} />}
                    </ListItem>

                    <ListItem button sx={{ padding: '0 16px' }}>
                        <ListItemIcon sx={{ minWidth: 'auto' ,overflow: 'hidden' }}>
                            <NotificationsIcon fontSize="medium" />
                        </ListItemIcon>
                        {open && <ListItemText primary="Notifications" sx={{ paddingLeft: 2 }} />}
                    </ListItem>

                    <ListItem button sx={{ padding: '0 16px' }}>
                        <ListItemIcon sx={{ minWidth: 'auto' ,overflow: 'hidden' }}>
                            <MailIcon fontSize="medium" />
                        </ListItemIcon>
                        {open && <ListItemText primary="Messages" sx={{ paddingLeft: 2 }} />}
                    </ListItem>


                    <ListItem button sx={{padding:'0'}}>
                        <ListItemIcon sx={{ minWidth: 'auto' ,overflow: 'hidden' }}>
                             
                        <FloatingContactList  open={open} contacts={contacts} onSelectContact={handleSelectContacts}/>
                           
                        </ListItemIcon>
                       
                    </ListItem>


                    <ListItem button sx={{ padding: '0 16px' }}  onClick={logout}>
                        <ListItemIcon sx={{ minWidth: 'auto' }}>
                            <LogoutIcon fontSize="medium" />
                        </ListItemIcon>
                        {open && <ListItemText primary="Logout" sx={{ paddingLeft: 2 }} />}
                    </ListItem>
                </List>
            </Drawer>
        :    
        <Drawer
                variant="permanent"
                anchor="left"
                open={open}
                sx={{position: 'absolute',  // Position it absolutely so it doesn't interfere
                    zIndex: 1200,  // Ensure it's on top of other elements
                    
                    width: open ? drawerWidthOpen : drawerWidthClosed,
                    overflow:'hidden',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: open ? drawerWidthOpen : drawerWidthClosed,
                        transition: 'width 0.2s',
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
                    padding:0
                }}
                >
                    <MenuIcon fontSize='small'/>
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
                   

                    <ListItem button sx={{ padding: '0' }}>
                        <ListItemIcon sx={{ minWidth: 'auto' }}>
                            <SearchIcon fontSize="small" />
                        </ListItemIcon>
                        {open && <ListItemText primary="Search" sx={{ paddingLeft: 2 }} />}
                    </ListItem>

                    <ListItem button sx={{ padding: '0' }}>
                        <ListItemIcon sx={{ minWidth: 'auto' }}>
                            <NotificationsIcon fontSize="small" />
                        </ListItemIcon>
                        {open && <ListItemText primary="Notifications" sx={{ paddingLeft: 2 }} />}
                    </ListItem>

                    <ListItem button sx={{ padding: '0' }}>
                        <ListItemIcon sx={{ minWidth: 'auto' }}>
                            <MailIcon fontSize="small" />
                        </ListItemIcon>
                        {open && <ListItemText primary="Messages" sx={{ paddingLeft: 2 }} />}
                    </ListItem>


                    <ListItem button sx={{padding:'0'}}>
                        <ListItemIcon sx={{ minWidth: 'auto' }}>
                             
                        <FloatingContactList  open={open} contacts={contacts} onSelectContact={handleSelectContacts}/>
                           
                        </ListItemIcon>
                       
                    </ListItem>


                    <ListItem button sx={{ padding: '0' }}  onClick={()=>{localStorage.clear();naviagte('/signin')}}>
                        <ListItemIcon sx={{ minWidth: 'auto' }}>
                            <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        {open && <ListItemText primary="Logout" sx={{ paddingLeft: 2 }} />}
                    </ListItem>
                </List>
            </Drawer>
        }
        </>
    );
};

export default VerticalNavbar;

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

import {
    Container,
    TextField,
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
    Paper,
    Box,
    InputBase,
    Fab,
} from '@mui/material';
import FloatingContactList from '../Components/Contacts';

const socket = io(import.meta.env.VITE_BACKEND_URL, {
    auth: {
        token: localStorage.getItem('token') // Assuming the token is stored in localStorage
    }
});

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [messagesObj, setMessagesObj] = useState({});
    const [contacts,setContacts]=useState([])
    const [loading,setLoading]=useState(false)
    const [selectedContact,setSelectedContact]=useState(null)
    const [selectedContactUsername,setSelectedContactUsername]=useState("")
    const [username,setUsername]=useState('')
    const [chatBox,setOpenChatBox]=useState(false)
    const [bigScreen,setBigScreen]=useState(window.innerWidth>=750);
    
  useEffect(() => {
    // Function to update isSmallScreen state

    function handleResize() {
        setBigScreen(window.innerWidth >= 750);
    }

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Call handleResize initially to set initial state
    handleResize();
    
    // Clean up by removing event listener when component unmounts
    return () => {
        window.removeEventListener('resize', handleResize);
        
    };
}, [bigScreen]);
 

    useEffect(()=>{
        
    },[])
    useEffect(()=>{
        setLoading(true)
        axios.get(import.meta.env.VITE_BACKEND_URL+'/getcontacts',{headers:{'Authorization':localStorage.getItem("token")}})
        .then((response)=>{setContacts(response.data);setUsername(localStorage.getItem("username"));})
        .then(()=>{setLoading(false);console.log(contacts);})
        

      },[])



    useEffect(() => {
        socket.on('sendMessage', (msg) => {
            setMessagesObj(prevMessagesObj => {
                const newMessagesObj = { ...prevMessagesObj };


                if (!newMessagesObj.hasOwnProperty(msg.user)) {
                  newMessagesObj[msg.user] = [];
                }
          
                // Add the new message to the user's message array
                newMessagesObj[msg.user].push(msg);
                return newMessagesObj;
              });
            setMessages((prevMessages) => [...prevMessages, {...msg}]);
        });
        console.log(messagesObj)

       
        return () => {
            socket.off('sendMessage');
        };
    }, []);

    const handleSendMessage = () => {
        let recipientId=selectedContactUsername
        if (message.trim() && recipientId.trim()) {
            const msg = { content: message, timestamp: new Date(), user:localStorage.getItem("username") };
            socket.emit('sendMessage', recipientId, msg);
            setMessagesObj(prevMessagesObj => {
                const newMessagesObj = { ...prevMessagesObj };

                if (!newMessagesObj.hasOwnProperty(recipientId)) {
                  newMessagesObj[recipientId] = [];
                }
          
                // Add the new message to the user's message array
                newMessagesObj[recipientId].push(msg);
                return newMessagesObj;
              });
            setMessages((prevMessages) => [...prevMessages, {...msg }]);
            setMessage('');
            localStorage.setItem('messageObj',messagesObj)

            console.log(messagesObj)
        }
    };

    const  handleSelectContacts=(index)=>{
        setSelectedContact(index)
        setOpenChatBox(true)
        setSelectedContactUsername(contacts[index].username)
    }

    const  handleSelectContactsByUsername=(item)=>{
        setOpenChatBox(true)
        setSelectedContactUsername(item)
    }





    return (
        <Container maxWidth="100vw" sx={{display:"flex",justifyContent:"center"}}>
          
           {(!chatBox|| bigScreen) && 
           
           <Paper elevation={3} sx={{ padding:"2rem",minWidth:"90%",height: "88vh",
           ...(bigScreen && {
            minWidth:"30%"})}}>
                <Box display="flex" flexDirection="column" gap={1} >
                    {!loading && Object.keys(messagesObj).map((item,index)=>(
                        
                        <Paper onClick={()=> handleSelectContactsByUsername(item)} key={index} sx={{minHeight:"3rem",cursor:"pointer",alignContent: "center",paddingX:"6%",minWidth:"94%","&:hover": {
                            backgroundColor:"Highlight", 
                        },}}>
                            <Typography variant="body2" fontWeight="bold">{item}</Typography>
                        </Paper>

                    ))}

                </Box>
            </Paper>}
           
            {(chatBox)? 
            <><Paper elevation={3} sx={{ padding:"2rem",height: "88vh", maxWidth: "90%", minWidth: "90%", display: "flex", flexDirection: "column", gap: "2%", ...(bigScreen && {
                minWidth:"60%"
            })}}>
                    {!bigScreen && chatBox && <Button onClick={()=>{setOpenChatBox(!chatBox)}}>{"<--"}</Button> }
                    <Typography sx={{ borderBottom: "1px solid black" }}>{}</Typography>
                    <Box sx={{
                        overflow: 'auto', flexGrow: 1, display: "flex", flexDirection: "column", '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            backgroundColor: '#f1f1f1',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#888',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            backgroundColor: '#555',
                        },
                    }}>
                        {(messagesObj[selectedContactUsername] || []).map((msg, index) => (
                            <Paper
                                key={index}
                                sx={{
                                    display: "flex",
                                    maxWidth: "70%",
                                    padding: "1%",
                                    backgroundColor: msg.user === username ? "lightgreen" : "lightblue", // Adjusted background color conditionally
                                    alignSelf: msg.user === username ? "start" : "end", // Adjusted textAlign,
                                    marginY: "1%"
                                }}
                            >
                                <Typography sx={{overflowWrap:"anywhere" }}>{msg.content}</Typography>
                            </Paper>
                        ))}
                    </Box>
                   
                    <Box sx={{ minWidth: '90%', border: '1px solid black', borderRadius: '10px', boxShadow: 2, position: 'relative' }}>
                        <InputBase placeholder='Send a Message' sx={{ minWidth: "96%", overflow: "hidden", maxHeight: "4rem", paddingX: "1rem" }} value={message} onChange={(event) => setMessage(event.target.value)} />
                        <Button sx={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }} onClick={handleSendMessage}>Send</Button>
                    </Box>
                </Paper>
               </>:bigScreen && 
               <Paper elevation={3} sx={{ padding:"2rem",minWidth:"60%",minHeight:"80vh"}}>
                <Box display="flex" flexDirection="column" gap={1} >
                   Welcome

               </Box>
           </Paper>
           
        
        }
             <FloatingContactList contacts={contacts} onSelectContact={handleSelectContacts} />

        </Container>
    );
};

export default Chat;

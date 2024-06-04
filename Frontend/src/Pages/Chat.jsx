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
} from '@mui/material';

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
    const [selectedContact,setSelectedContact]=useState()
    const [selectedContactUsername,setSelectedContactUsername]=useState("")
    const [username,setUsername]=useState('')
    const [chatBox,setOpenChatBox]=useState(false)

    useEffect(()=>{
        
    },[])
    useEffect(()=>{
        setLoading(true)
        axios.get(import.meta.env.VITE_BACKEND_URL+'/getcontacts',{headers:{'Authorization':localStorage.getItem("token")}})
        .then((response)=>{setContacts(response.data);setUsername(localStorage.getItem("username"))})
        .then(setLoading(false))
        

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
        return () => {
            socket.off('sendMessage');
        };
    }, []);

    const handleSendMessage = () => {
        let recipientId=contacts[selectedContact].username
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
                console.log(newMessagesObj)
                return newMessagesObj;
              });
            setMessages((prevMessages) => [...prevMessages, {...msg }]);
            setMessage('');
        }
    };

    const  handleSelectContacts=(index)=>{
        setSelectedContact(index)
        setOpenChatBox(true)
        setSelectedContactUsername(contacts[index].username)
        console.log(messagesObj)
    }



    return (
        <Container maxWidth="80vw" sx={{display:"flex",justifyContent:"center",gap:"2%",marginLeft:"10%"}}>
          
           {!chatBox&& <Paper elevation={3} sx={{ padding:"2rem",minWidth:"20%",minHeight:"80vh",marginLeft:"2%"}}>
                <Box display="flex" flexDirection="column" gap={2}>
                    {!loading && contacts.map((item,index)=>(
                        <ListItem onClick={()=>handleSelectContacts(index)} key={index} sx={{border:"1px solid",backgroundColor:index===selectedContact?"red":"yellow"}}>{item.name}{item.username}</ListItem>
                    ))}

                </Box>
            </Paper>}
           
            {chatBox && 
            <Paper elevation={3} sx={{ minHeight:"85vh", maxHeight:"88vh", padding:"2%", maxWidth:"90%", minWidth:"90%", display:"flex", flexDirection:"column",gap:"2%" }}>
            <Typography sx={{ borderBottom:"1px solid black" }}>{contacts[selectedContact].name}</Typography>
            <Box sx={{ overflow: 'auto', flexGrow: 1,display:"flex",flexDirection:"column" }}> 
                {(messagesObj[selectedContactUsername] || []).map((msg, index) => (
                    <Paper
                        key={index}
                        sx={{
                            display:"flex",
                            maxWidth:"70%",
                            padding:"1%",
                            backgroundColor: msg.user === username ? "lightgreen" : "lightblue", // Adjusted background color conditionally
                            alignSelf: msg.user === username ? "start" : "end", // Adjusted textAlign,
                            marginY:"1%"
                        }}
                    >
                        <Typography sx={{textWrap:"pretty"}}>{msg.content}</Typography>
                        {/**<Typography variant='overline'>{new Date(msg.timestamp).toLocaleString()}</Typography>**/}
                    </Paper>
                ))}
            </Box>
            <Box sx={{ minWidth: '90%', border: '1px solid black', borderRadius: '10px', boxShadow: 2, position: 'relative' }}>
                <InputBase placeholder='Send a Message' sx={{minWidth:"96%",overflow:"hidden",maxHeight:"4rem", paddingX:"1rem" }} value={message} onChange={(event) => setMessage(event.target.value)} />
                <Button sx={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }} onClick={handleSendMessage}>Send</Button>
            </Box>
        </Paper>
        
        
        
        }
        </Container>
    );
};

export default Chat;

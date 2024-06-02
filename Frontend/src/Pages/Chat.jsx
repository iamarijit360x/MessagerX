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
        setSelectedContactUsername(contacts[index].username)
        console.log(messagesObj)
    }



    return (
        <Container maxWidth="" sx={{display:"flex",justifyContent:"center",gap:"2rem"}}>
          
            <Paper elevation={3} sx={{ padding: 2,minWidth:"40%" }}>
                <Box display="flex" flexDirection="column" gap={2}>
                    {!loading && contacts.map((item,index)=>(
                        <ListItem onClick={()=>handleSelectContacts(index)} key={index} sx={{border:"1px solid",backgroundColor:index===selectedContact?"red":"yellow"}}>{item.name}{item.username}</ListItem>
                    ))}

                </Box>
            </Paper>
           
            <Paper elevation={3} sx={{ padding: 2,minWidth:"50%" }}>
                Messages
                <List >
                    {(messagesObj[selectedContactUsername] || []).map((msg, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={`${msg.user}: ${msg.content}`}
                                secondary={new Date(msg.timestamp).toLocaleString()}
                                sx={{textAlign:username===msg.user?"start":"end"}}
                                 />
                        </ListItem>
                    ))}
                    <InputBase value={message} onChange={(event)=>setMessage(event.target.value)}></InputBase>
                    <Button onClick={()=>handleSendMessage()}>Send</Button>
                </List>
            </Paper>
        </Container>
    );
};

export default Chat;

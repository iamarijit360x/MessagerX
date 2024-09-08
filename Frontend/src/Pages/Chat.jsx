import React, { useState, useEffect,useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
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
import axiosInstance from '../Middleware/axiosConfig';
import AddtoContacts from '../Components/AddToContacts';
import VerticalNavbar from '../Components/Navbar';

const token=localStorage.getItem('token')
let socket;
if(token)
{ 
    socket = io(import.meta.env.VITE_BACKEND_URL, {
    auth: {
        token: token  // Assuming the token is stored in localStorage
    }});
    // console.log(socket)
}
const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [messagesObj, setMessagesObj] = useState({});
    const [contacts,setContacts]=useState([])
    const [loading,setLoading]=useState(false)
    const [selectedContactName,setSelectedContactName]=useState(null)
    const [selectedContactUsername,setSelectedContactUsername]=useState("")
    const [username,setUsername]=useState('')
    const [chatBox,setOpenChatBox]=useState(false)
    const [bigScreen,setBigScreen]=useState(window.innerWidth>=750);
    const [unknown,setUnknown]=useState(false)
    const [shownavbar,setShowNavbar]=useState(true)
    useEffect(() => {
        const reloadCount = sessionStorage.getItem('reloadCount');
        if(reloadCount < 1) {
          sessionStorage.setItem('reloadCount', String(reloadCount + 1));
          window.location.reload();
        } else {
          sessionStorage.removeItem('reloadCount');
        }
    }, []); // Empty dependency array means this runs once on mount
   

    function getMessagesFromLocalStorage(){
        const storedMessages = localStorage.getItem('messages');
    
        // Check if there are stored messages
        if (storedMessages) {
            try {
                // Parse the stored messages string back into an object
                const parsedMessages = JSON.parse(storedMessages);
                // console.log(parsedMessages)
                // Set the parsed messages object into state (assuming messages is your state variable)
                setMessagesObj(parsedMessages);
            } catch (error) {
                // Handle parsing errors if any
                console.error('Error parsing stored messages:', error);
            }
        }
    }
useEffect  (()=>{
    const sortDataByLastObjectTimestamp = (obj) => {
        const sortedEntries = Object.entries(obj).sort(([, arrA], [, arrB]) => {
            const lastA = arrA[arrA.length - 1]?.timestamp;
            const lastB = arrB[arrB.length - 1]?.timestamp;
            return new Date(lastB) - new Date(lastA); // Sort in descending order
        });
    
        return Object.fromEntries(sortedEntries);
    };
    
    // Sort the data
    const sortedData = sortDataByLastObjectTimestamp(messagesObj);
    
    // Log the sorted data
    console.log(sortedData);
    // Log the sorted data
   setMessages(sortedData);
   if(Object.keys(messagesObj).length)
    { 
         const serializedMessages = JSON.stringify(sortedData);
         // console.log(serializedMessages)
         localStorage.setItem('messages', serializedMessages);
    }},[messagesObj])


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
 


    useEffect(() => {
        setLoading(true)
        axiosInstance.get(import.meta.env.VITE_BACKEND_URL+'/getcontacts')
        .then((response)=>{setContacts(response.data);setUsername(localStorage.getItem("username"));})
        .then(()=>{getMessagesFromLocalStorage();setLoading(false);})
       
    }, []);
   
    useEffect(()=>{
        // console.log(contacts)
    },[contacts])

    useEffect(() => {
        if(socket)
       { socket.on('sendMessage', (msg) => {
            setMessagesObj(prevMessagesObj => {
                const newMessagesObj = { ...prevMessagesObj };


                if (!newMessagesObj.hasOwnProperty(msg.user)) {
                  newMessagesObj[msg.user] = [];
                }
          
                // Add the new message to the user's message array
                newMessagesObj[msg.user].push(msg);
                return newMessagesObj;
              });
        });
        console.log(messagesObj)

       
        return () => {
            socket.off('sendMessage');
        };}
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
            setMessage('');
            localStorage.setItem('messageObj',messagesObj)

            // console.log(messagesObj)
        }
    };

    // useEffect(()=>{
    //     if(!selectedContactUsername) return
    //     let n=messages[selectedContactUsername].length-1
    //     console.log(messages[selectedContactUsername][messages[selectedContactUsername].length-1].content)
    // },[selectedContactUsername])

    const [selectedContactIndex,setSelectedContactIndex]=useState('')
    const  handleSelectContacts=(index)=>{
        
        setOpenChatBox(true)
        setSelectedContactUsername(contacts[index].username)
        setSelectedContactName(contacts[index].name)
        setSelectedContactIndex(index)
    }

    const  handleSelectContactsByUsername=(username)=>{
        setOpenChatBox(true)
        setSelectedContactUsername(username)
        const contact=contacts.find(obj=>obj.username===username)
        if(!contact){
            setUnknown(true)
            setSelectedContactName(username)
        }
        else
            setSelectedContactName(contact.name)
      

    }

    const boxRef = useRef(null);

    useEffect(() => {
        if (boxRef.current) 
            boxRef.current.scrollTop = boxRef.current.scrollHeight;}
)

const formatDate = (utcDateString,onlyTime=false) => {
    // Convert the UTC date string to a Date object
    const date = new Date(utcDateString);
    
    // Convert dates to IST (UTC+5:30)
    const istDate = new Date(date.getTime());
    const istNow = new Date(Date.now() );
    
    // Extract year, month, day for formatting
    const day = String(istDate.getDate()).padStart(2, '0');
    const month = String(istDate.getMonth() + 1).padStart(2, '0');
    const year = istDate.getFullYear();
    
    // Format date in dd/mm/yyyy
    const formattedDate = `${day}/${month}/${year}`;
    
    // Format time in 12-hour AM/PM format
    let hours = istDate.getHours();
    const minutes = String(istDate.getMinutes()).padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 24-hour time to 12-hour time
    const timeString = `${String(hours).padStart(2, '0')}:${minutes} ${period}`;

    // Check if the date is today
    if (istDate.toDateString() === istNow.toDateString() || onlyTime) {
        return timeString;
    }
    
    // Check if the date is yesterday
    const yesterday = new Date(istNow);
    yesterday.setDate(yesterday.getDate() - 1);
    if (istDate.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    }
    
    // Return date in dd/mm/yyyy format
    return formattedDate;
};

// Example usage

// Example usage


// Example usage




    return (
        <Container 
        maxWidth="100vw"  
        disableGutters 
        sx={{
            display:"flex",
            justifyContent:"center",
            height:"98vh",
            paddingTop:bigScreen?"1rem":'0REM',
             ...(!bigScreen && 
             {
                minHeight:"100vh",
                minWidth:"100%,",
            })}}>
            <VerticalNavbar contacts={contacts} handleSelectContacts={handleSelectContacts} bigScreen={bigScreen}/>
           {(!chatBox|| bigScreen) && 
           
           <Paper elevation={3} 
           sx={{ 
            minWidth: bigScreen ? "30%" : "83%",  // Adjust minWidth based on screen size
            marginInlineStart: bigScreen ? '3.2rem' : '2rem',  // Adjust margin for big and small screens
            width:'98%'
            }}>
                 <Box sx={{boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)", 
                            padding: "0.5rem 2rem 0.5rem",
                            marginBottom: "0.5rem"
                          }}> 
                        <Typography >Chats</Typography>
                 </Box>
               
                <Box display="flex" flexDirection="column" gap={1}  
                sx={{height:"88vh" , minWidth: "100%", display: "flex", flexDirection: "column", gap: "2%",   overflow: 'auto', flexGrow: 1, display: "flex", flexDirection: "column", '&::-webkit-scrollbar': {
                width: '2px',
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
            }, ...(bigScreen && {
                minWidth:"60%"
            })}}>
                    {!loading && Object.keys(messages).map((item,index)=>(
                        
                        <Paper
                         onClick={()=> handleSelectContactsByUsername(item)} 
                         key={index} 
                          sx={{
                            minHeight:"3rem",
                            cursor:"pointer",
                            alignContent: "center",
                            paddingX:"6%",
                            backgroundColor:selectedContactUsername===item?'rgba(0, 0, 0, 0.1)':'',
                            display:'flex',
                            justifyContent:"space-between",
                            "&:hover": {
                            backgroundColor:selectedContactUsername!==item &&"rgba(0, 0, 0, 0.05)"
                            }
                            


                        }}>
                            <Box>
                                <Typography variant="body1" fontWeight="bold">{contacts.find(obj=>obj.username===item)?.name??item}</Typography>
                                <Typography variant='caption' >{item?messages[item][messages[item].length-1].content:''}</Typography>

                            </Box>
                          
                            <Typography sx={{alignContent:'center'}} variant="caption">{formatDate(messages[item][messages[item].length-1].timestamp)}</Typography>

                        </Paper>

                    ))}

                </Box>
            </Paper>}
           
            {(chatBox)? 
            <><Paper elevation={3} sx={{ 
                paddingBottom:"2rem", 
                width: "100%", 
                minWidth: "100%", 
                display: "flex", 
                flexDirection: "column", 
                gap: "2%",   
                overflow: 'auto', 
                flexGrow: 1, 
                display: "flex",
                flexDirection: "column", 
                marginInlineStart:!bigScreen?"2rem":'0rem',
                '&::-webkit-scrollbar': {
                width: '4px',
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
            }, ...(bigScreen && {
                minWidth:"60%",
                
            })}}>
                    {!bigScreen && chatBox && <Button onClick={()=>{setOpenChatBox(!chatBox)}}><ArrowBackIcon/></Button> }
                    <Box sx={{boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)",padding:"0.5rem 2rem 0.5rem" }}>
                        <Typography >{selectedContactName}</Typography>
                    </Box>
 
                   {unknown && <Button><AddtoContacts username={selectedContactName}/></Button>}
                    <Box ref={boxRef} sx={{
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
                        {(messages[selectedContactUsername] || []).map((msg, index) => (
                            <Paper
                                key={index}
                                sx={{
                                    margin:"0 1.5rem 0 1.5rem",
                                    display: "flex",
                                    maxWidth: "70%",
                                    padding: '0.5% 1% 0.5% 1%',
                                    backgroundColor: msg.user === username ? "#f8dbec" : "lightblue", // Adjusted background color conditionally
                                    alignSelf: msg.user === username ? "start" : "end", // Adjusted textAlign,
                                    marginY: "1%"
                                }}
                            >
                                <Typography sx={{overflowWrap:"anywhere",paddingInlineEnd:'1rem' }}>{msg.content}</Typography>
                                <Typography sx={{overflowWrap:"anywhere",fontWeight:'light',fontSize:"0.7rem",alignSelf:'center',color:'#696464' }}>{formatDate(msg.timestamp,true)}</Typography>
                            </Paper>
                        ))}
                    </Box>
                   
                    <Box sx={{ minWidth: '90%', border: '1px solid black', borderRadius: '10px', boxShadow: 2, position: 'relative',mx:"1rem"}}>
                        <InputBase placeholder='Send a Message' sx={{ minWidth: "96%", overflow: "hidden", minHeight: "3rem", paddingX: "1rem" }} value={message} onChange={(event) => setMessage(event.target.value)} />
                        <Button sx={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }} onClick={handleSendMessage}><SendIcon/></Button>
                    </Box>
                </Paper>
               </>:bigScreen && 
               <Paper elevation={3} 
               sx={{ 
                    padding:"2rem",
                    minHeight:"80vh",
                    alignContent:'center',
                    width:'inherit'
                    }} 
                >
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    >
                    <Typography variant="h6" align="center">
                        Hello, Welcome to MessengerX
                    </Typography>
                </Box>
  
              </Paper>
           
        
        }

        </Container>
    );
};

export default Chat;

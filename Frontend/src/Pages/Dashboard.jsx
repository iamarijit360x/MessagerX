import React, { useEffect, useState } from 'react';

import axios from 'axios';
const Dashboard = () => {


  useEffect(()=>{
    axios.get(import.meta.env.VITE_BACKEND_URL+'/getcontacts',{headers:{'Authorization':localStorage.getItem("token")}})
    .then((response)=>console.log(response.data))
  },[])

  return (
    <Container component="main" maxWidth="xs">
      <Box>
        
      </Box>
    </Container>
  );
};

export default Dashboard;

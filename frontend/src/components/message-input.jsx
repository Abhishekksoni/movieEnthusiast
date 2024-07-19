import { Avatar, Box, Button, CircularProgress, Divider, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import Input from '@mui/joy/Input';
import useSendMessage from '../hooks/useSendMessage';
import { useAuthContext } from '../context/AuthContext';

const MessageInput = () => {
  const [message, setMessage] = useState('')
  const {loading, sendMessage} = useSendMessage();
  const { authUser } = useAuthContext();
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!message) return;
    await sendMessage(message);
    setMessage("")
  }

  return (
    <>
     <Box sx={{  width: '67vw', zIndex: 10000 , background:'#14171C', height:'70px'}}>

        <Box 
        onSubmit = {handleSubmit}
        component="form"
        >

<Divider sx={{ marginLeft: '0px', width:'67vw', borderColor:'#435665' }}/>
  <Box sx={{mt:'14px'}}>
 
  <Box sx={{display:'flex', gap:2, mt:'15px', justifyContent:'flex-start', alignItems:'center', ml:'24px'}}>
  <img  src={authUser.profilePic} style={{width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', marginLeft:'24px'}}/>
 <Input
  placeholder="Type here..."
  sx={{
    '--Input-focusedInset': 'var(--any, )',
    '--Input-focusedThickness': '0.25rem',
    '--Input-focusedHighlight': 'rgba(13,110,253,.25)',
    '&::before': {
      transition: 'box-shadow .15s ease-in-out',
    },
    '&:focus-within': {
      borderColor: '#86b7fe',
    },
    width:'60vw',
  
  }}
  type='text'
  value={message}
  onChange={(e) => setMessage(e.target.value)}
/>

          <Button type='submit'>
         {loading ? <CircularProgress color="secondary" /> :<SendIcon/>}  
         </Button>
        
        </Box>
  </Box>

</Box>
</Box>
    </>
  )
}

export default MessageInput
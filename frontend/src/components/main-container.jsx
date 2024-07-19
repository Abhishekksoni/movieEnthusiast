import { Avatar, Box, Divider, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import MessageInput from './message-input'
import Messages from './messages'
import useConversation from '../zustand/useConversation'
import { useAuthContext } from '../context/AuthContext'

const MainContainer = () => {
  const {selectedConversation, setSelectedConversation} = useConversation()


  useEffect(() => {
    //clear function (unmounts)
    return () => setSelectedConversation(null)
  },[setSelectedConversation])
  return (
    <>
    <Box sx={{position:'relative', width:'67vw', }} >
      {
        !selectedConversation ? (
          <NoChatSelected/>
        ) :(
      <>
        <Box sx={{display:'flex', gap:2,height:'70px', alignItems:'center', zIndex:1000, background:'#14171C', }}>

        <img  src={selectedConversation.profilePic} style={{width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', marginLeft:'24px'}}/>
          <Box sx={{mt:'14px'}}>
            <Typography variant="subtitle1" sx={{color:'white'}}>{selectedConversation.fullName}</Typography>
            <Typography variant="body2" color="textSecondary">online</Typography>
            <Divider sx={{ marginLeft: '-80px', width:'67vw', mt:'9px', borderColor:'#435665' }}/>
        
          </Box>

        </Box>
<Messages/>

<MessageInput/>
</>
)}
</Box>

    </>
  )
}

export default MainContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <>
      <Box sx={{display:'flex',flexDirection:'column', justifyContent:'center', gap:2,height:'90vh', width:'67vw', alignItems:'center',  position:'fixed', zIndex:1000, background:'black'}}>
        <Typography variant="h6" sx={{color:'white'}}>Welcome {authUser.username} 👋🏻</Typography>
        <Typography variant="h5" sx={{textAlign: 'center', color:'white'}}>Select a chat to start messaging 💬</Typography>
      </Box>
    </>
  )
}

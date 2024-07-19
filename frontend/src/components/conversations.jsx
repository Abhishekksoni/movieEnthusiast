import React from 'react'
import Conversation from './coversation'
import useGetConversations from '../hooks/useGetConversations'
import { Box, CircularProgress } from '@mui/material'

const Conversations = () => {

    const {loading , conversations} = useGetConversations()
    console.log(conversations);

  return (
    <div>
        {conversations.map((conversation, idx) => (
            <Conversation
            key={conversation._id}
            conversation = {conversation}
            lastIdx = {idx === conversations.length - 1}
            />
        ))}
        <Box sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
         {loading ? <CircularProgress color="secondary" /> :null}  
         </Box>

    </div>
  )
}

export default Conversations
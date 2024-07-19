import React, { useEffect, useRef } from 'react'
import Message from './message'
import { Box, Typography } from '@mui/material'
import useGetMessages from '../hooks/useGetMessages'
import Loading from './skeleton/loading'

const Messages = () => {

  const { messages, loading} = useGetMessages();
  const lastMessageRef = useRef();
 
    useEffect(() => {
      setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({ behavior : "smooth" });
      }, 100)
    }, [messages])

  return (
    <Box sx={{height:'calc(100% - 140px)', overflow:'scroll'}}>
        <Box sx={{p:2}}>
      {!loading && messages.length > 0 && messages.map((message) => (
       <div key={message._id} ref={lastMessageRef} >
         <Message  message={message}/>
       </div>
      ))}

        {loading &&[...Array(3)].map((_, idx) => <Loading key={idx}/>)}

        {loading && messages.length === 0 && (
          <Typography sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>Start the conversation</Typography>
        )}

</Box>
    </Box>
  )
}

export default Messages
import { Box, Typography } from '@mui/material';
import React from 'react';

import useConversation from '../zustand/useConversation'
const Conversation = ({conversation, lastIdx}) => {

    const { selectedConversation, setSelectedConversation } = useConversation();

    const isSelected = selectedConversation?._id === conversation._id;

    

  return (
    <Box>
      
        <Box  sx={{ display: 'flex', alignItems: 'center',width:'90%' ,gap: 2, mb: 1, p: 1, cursor: 'pointer', mt: 2,ml:1, 
        bgcolor: isSelected ? '#435665' : '#14171C', borderRadius: '8px',
        '&:hover':
         {
            bgcolor: '#435665',
            borderRadius: '8px',

         }}
         }
         onClick = {() => setSelectedConversation(conversation)}
         >
          <img  src={conversation.profilePic} style={{width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover'}}/>
          <Box>
            <Typography variant="subtitle1" sx={{color:'white'}}>{conversation.fullName}</Typography>
            <Typography variant="body2" color="textSecondary">{lastIdx}</Typography>
          </Box>
        </Box>
    
    </Box>
  );
};

export default Conversation;

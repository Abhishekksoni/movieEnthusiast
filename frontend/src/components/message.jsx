import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import useConversation from '../zustand/useConversation';
import { useAuthContext } from '../context/AuthContext';
import { extractTime } from '../utils/extractTime';

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = message.senderId === authUser._id;
    const Time = extractTime(message.createdAt)
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const bubbleColor = fromMe ? 'blue' : 'lightgreen'
    return (
        <Box sx={{  zIndex:0, p:2 }}>
            <Box sx={{ display: 'flex', justifyContent: fromMe ? 'flex-end' : 'flex-start', marginBottom: '0px', gap:1}}>
                
            {!fromMe && ( // If the message is not from the current user
                    <Box>
                        <img src={profilePic} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', marginTop: '10px' }} />
                    </Box>
                )}
                <Box sx={{  borderRadius: '10px', background: bubbleColor, p: 2 }}>
                    <Typography sx={{color:'white'}}>{message.message}</Typography>
                </Box>
                {fromMe && ( // If the message is from the current user
                    <Box>
                        <img src={profilePic} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', marginTop: '10px' }} />
                    </Box>
                )}
            </Box>
            
            <Typography variant="body2" color="textSecondary" textAlign={fromMe ? 'right' : 'left'}>{Time}</Typography>
        </Box>
    );
}

export default Message;

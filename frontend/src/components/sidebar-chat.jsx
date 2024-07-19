import AccountCircle from '@mui/icons-material/AccountCircle'
import { Box, IconButton, List } from '@mui/material'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import React, { useState } from 'react'
import Search from './search-input';


import Conversations from './conversations';


const SidebarChat = () => {


  return (
    <Box sx={{width:'26vw'}}>
    <List sx={{ borderRight: '1px solid #435665', height:'88.6vh', mt:'-8px', overflowY: 'auto',scrollbarWidth: 'none', }}>
    <div style={{ marginTop:'30px'}} >
   
        <div className="search" style={{display:'flex', alignItems:'center', gap:6}}>
        <Search/>
        <IconButton>
            <GroupAddIcon/>

            </IconButton>
        </div>
        <div className="conversations">
           
        <Conversations/>
       

  
        </div>

    </div>
    </List>
    </Box>
  )
}

export default SidebarChat
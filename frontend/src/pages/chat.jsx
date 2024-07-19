import { Box, Grid, List, Paper, Stack } from '@mui/material'
import React from 'react'
import SideBar from './side-bar'
import NavDash from '../components/navbar-dashboard'

import Search from '../components/search-input'
import SidebarChat from '../components/sidebar-chat'
import MainContainer from '../components/main-container'


const Chat = () => {



  return (
    <Box sx={{fontFamily:'zap', background:'#14171C'}}>
    <NavDash/>
    <Stack direction='row' justifyContent='flex-start' spacing={2}>
    <SideBar />

    </Stack>

<div style={{marginLeft:'7vw', marginTop:'10vh'}}>
        <Box sx={{ height:'90vh', width:'94vw', display:'flex'}}>
        <SidebarChat/>
        <MainContainer/>
   </Box>
</div>
    </Box>
  )
}

export default Chat


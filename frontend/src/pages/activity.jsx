import React from 'react'
import SideBar from './side-bar'
import NavDash from '../components/navbar-dashboard'
import { Box, Stack } from '@mui/material'

const Activity = () => {
  return (
    <Box>
    <NavDash/>
    <Stack direction='row' justifyContent='flex-start' spacing={2}>
    <SideBar />

    </Stack>

    <Box flex={20} p={20} sx={{background:'black', height:'100vh'}}>
        Feed
    </Box>
    </Box>
  )
}

export default Activity
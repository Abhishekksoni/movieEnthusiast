import React, { useState } from 'react'

import Feed from './Home/feed'
import { Box, Stack } from '@mui/material'
import NavbarHome from '../components/navbar-home'
import SideBar from './side-bar'
import NavDash from '../components/navbar-dashboard'

const Dashboard = () => {


  return (
    <Box >
        <NavDash />
        <Stack direction='row' justifyContent='flex-start' spacing={2}>
        <SideBar />

        </Stack>
    </Box>
  )
}

export default Dashboard
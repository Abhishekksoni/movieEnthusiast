import React from 'react'
import { Box, Typography } from '@mui/material';
import soonVideo from "../../assets/video/soon.mp4"
import NavDash from '../../components/navbar-dashboard';
import SideBar from '../side-bar';
const PostLists = () => {
  return (
    <Box sx={{ fontFamily: 'zap', background: '#14171C', minHeight: '100vh', position: 'absolute', width: '100vw' }}>
    <NavDash />
    
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar />
      <Box className="main"  sx={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden', background:'black' }}>
        {/* Video and Text */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h1"  sx={{ zIndex: 4, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize:'35px', letterSpacing:20}}>
            COMING SOON
          </Typography>
          <Typography variant="h1"  sx={{ zIndex: 4, position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize:'20px',letterSpacing:5}}>
            Page Under Construction
          </Typography>
          <video  src={soonVideo} autoPlay muted loop style={{ width: '100%', height: '100%' }}></video>
        </Box>
      </Box>
      </Box>
      </Box>
  )
}

export default PostLists
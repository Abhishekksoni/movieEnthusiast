import { Box, Typography } from '@mui/material';
import React from 'react'
import { NavLink } from 'react-router-dom';

const SubNav = () => {
  return (

    <Box sx={{ width: 'calc(100vw - 34vw)', height:'4vh', display:'flex', justifyContent:'center', gap:12, ml:'20vw', mt:'1vh',
    border:'1px solid #435665', borderRadius:'10px', background:'black',
    p:1, 
    }}>

    
    <NavLink to="/dashboard/profile" isactive={location.pathname === '/dashboard/profile' ? 1 : 0} style={{textDecoration:'none'}}>
            <Typography sx={{color:'white'}}>TV Shows</Typography>
    </NavLink>
    <NavLink to="/dashboard/profile/films" isactive={location.pathname === '/profile/films' ? 1 : 0} style={{textDecoration:'none'}}>
            <Typography sx={{color:'white'}}>Films</Typography>
    </NavLink>
    <NavLink to="/dashboard/profile/posts" isactive={location.pathname === '/profile/post' ? 1 : 0} style={{textDecoration:'none'}}>
            <Typography sx={{color:'white'}}>Posts</Typography>
    </NavLink>
    <NavLink to="/dashboard/profile/lists" isactive={location.pathname === '/profile/lists' ? 1 : 0} style={{textDecoration:'none'}}>
            <Typography sx={{color:'white'}}>Lists</Typography>
    </NavLink>
    <NavLink to="/dashboard/profile/watchlist" isactive={location.pathname === '/profile/watchlist' ? 1 : 0} style={{textDecoration:'none'}}>
            <Typography sx={{color:'white'}}>WatchList</Typography>
    </NavLink>
          
      
    </Box>

  )
}

export default SubNav;
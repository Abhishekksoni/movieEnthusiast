import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';


const StyledToolbar = styled(Toolbar)({
  backgroundColor: 'transparent',
  margin: 0,
  padding: 0,
});

const StyledAppBar = styled(AppBar)({
  backgroundColor: 'transparent',
  boxShadow: 'none',
});

const StyledButton = styled(Button)({ 
    '&:hover': {
        backgroundColor:'grey', 
    }
});

const NavLink = styled(Link)(({ isactive }) => ({
  color: 'white',
  textDecoration: 'none',
  textTransform: 'none',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: isactive ? '2px' : 0,
    backgroundColor: 'yellow',
    transition: 'height 0.3s',
  },
  '&:hover::after': {
    height: '2px',
    
  },
  fontSize: '15px',
 fontFamily: 'Poppins',
  marginLeft: 20

}));

export default function NavbarHome() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Navigate to the /signin page when the Login button is clicked
    navigate('/signin')};


  return (
    <div style={{ flexGrow: 1, position: 'fixed', zIndex: 1000, width: '100vw' }}>
      <StyledAppBar position="static">
        <StyledToolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white', fontFamily: 'zap', fontSize: '50px' }}>
            ME
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%',gap:8 }}>
            <NavLink to="/" isactive={location.pathname === '/' ? 1 : 0} >
              <Typography> Home</Typography>
            </NavLink>
            <NavLink to="/about" isactive={location.pathname === '/about' ? 1 : 0} >
            <Typography > About </Typography>
            </NavLink>
          </Box>
          <StyledButton sx={{ color: 'white',  }}  onClick={handleLoginClick}>
           <Typography textTransform={'none'}>SignIn</Typography> 
            </StyledButton>
        </StyledToolbar>
      </StyledAppBar>
    </div>
  );
}

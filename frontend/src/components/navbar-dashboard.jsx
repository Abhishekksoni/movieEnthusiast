import React from 'react';
import { styled } from '@mui/material/styles';
import {
  AppBar, Box, Toolbar, IconButton, Typography, InputBase, MenuItem, Menu, Divider,
} from '@mui/material';
import { Search as SearchIcon, AccountCircle, MoreVert as MoreIcon } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import { useAuthContext } from '../context/AuthContext';
import '../../public/font.css';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#1D252C',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'black',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'white',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const StyledNavLink = styled(Link)(({ isactive }) => ({
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
  marginLeft: 20,
}));

export default function NavDash() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { loading, logout } = useLogout();
  const { authUser } = useAuthContext();
  const location = useLocation();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to={`/dashboard/profile/${authUser._id}`} style={{ textDecoration: 'none', color: 'black' }}>
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </Link>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={logout}>Sign out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const getPageTitle = (path) => {
    // console.log('Current Path:', path); // Debugging log
  
    switch (true) {
      case path === '/':
        return 'Home';
      case path.startsWith('/dashboard/profile/favourites'):
        return 'Favourite Films';
      case path.startsWith('/dashboard/profile'):
        return 'Profile';
      case path.startsWith('/dashboard/movies'):
        return 'Movies';
      case path.startsWith('/dashboard/chat'):
        return 'Messages';
      case path.startsWith('/dashboard/activity'):
        return 'Activity';
      case path.startsWith('/dashboard/films'):
        return 'Films';
      default:
        return 'Home';
    }
  };

  const pageTitle = getPageTitle(location.pathname);

  return (
    <Box sx={{ position: 'fixed', top: '0px', left: '0', width: '100%', zIndex: 9000, background: 'black' }}>
      <Box sx={{ flexGrow: 1, height: '10px' }}>
        <AppBar position="static" sx={{ backgroundColor: '#14171C', boxShadow: 'none' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                flexGrow: 1,
                color: 'white',
                fontFamily: 'tap',
                fontSize: '25px',
                marginLeft: '80px',
              }}
            >
              {pageTitle}
            </Typography>
            <Box sx={{ width: 'calc(100vw - 54vw)', height:'3vh', display:'flex', justifyContent:'center', gap:12, 
    borderRadius:'10px', background:'black', marginLeft:'5vh',
    p:1, 
    }} >

    
 
    <StyledNavLink to="/dashboard/films" isactive={location.pathname === '/dashboard/films' ? 1 : 0} style={{textDecoration:'none'}} >
            <Typography sx={{color:'white',}}>Films</Typography>
    </StyledNavLink>
    <StyledNavLink to="/dashboard/profile/posts" isactive={location.pathname === '/profile/post' ? 1 : 0} style={{textDecoration:'none'}} >
            <Typography sx={{color:'white'}}>Posts</Typography>
    </StyledNavLink>
    <StyledNavLink to="/dashboard/profile/lists" isactive={location.pathname === '/profile/lists' ? 1 : 0} style={{textDecoration:'none'}} >
            <Typography sx={{color:'white'}}>Lists</Typography>
    </StyledNavLink>
    <StyledNavLink to="/dashboard/profile/watchlist" isactive={location.pathname === '/profile/watchlist' ? 1 : 0} >
            <Typography sx={{color:'white'}}></Typography>
    </StyledNavLink>
          
      
    </Box>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                sx={{ width: '180px' }}
              />
            </Search>
            <Box sx={{ flexGrow: 0 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <img
                  src={authUser.profilePic}
                  alt="profile"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Divider sx={{ marginLeft: '60px', marginTop: '0px', borderColor: '#435665' }} />
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </Box>
  );
}

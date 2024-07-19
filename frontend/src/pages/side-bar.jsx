import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeIcon from '@mui/icons-material/Home';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tooltip from '@mui/material/Tooltip';
import { Divider, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Chat from './chat';
import Feed from './Home/feed';
import { Icon } from '@iconify/react';

export default function SideBar() {
  const [selectedIcon, setSelectedIcon] = React.useState('home');

  
 

  const handleIconClick = (icon) => {
    if (selectedIcon !== icon) {
      
      setSelectedIcon(icon);
      
      // Perform any other actions on icon click
    }
  };

  const renderIcon = (icon, label, path) => {
    const isSelected = location.pathname === path;
    return (
        <>
        <Tooltip title={label} placement="right"  key={icon}  >
        <Link to={path} style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemIcon
        onClick={() => handleIconClick(icon)}
        sx={{
          display: 'flex',
          // justifyContent: 'center',
          // ml:'6px',
          alignItems: 'center',
          width: '10%',
          color: isSelected ? 'white' : 'white',
          '&:hover': {
            borderRadius: '12px',
          }
        }}
      >
        
        {icon === 'home' ? (isSelected ? <Icon icon="fluent:home-16-filled" style={{ fontSize: '30px' }} /> :  <Icon icon="fluent:home-16-regular" color='white' style={{ fontSize: '30px' }} />) : null}
        {icon === 'chat' ? (isSelected ? <Icon icon="heroicons:chat-bubble-bottom-center-text-solid" style={{ fontSize: '30px' }} /> :  <Icon icon="heroicons:chat-bubble-bottom-center-text" color='white' style={{ fontSize: '30px' }} />) : null}
        {icon === 'notifications' ? (isSelected ? <NotificationsIcon sx={{ fontSize: '30px' }} /> : <NotificationsOutlinedIcon sx={{ fontSize: '30px' }} />) : null}
        {icon === 'add' ? <AddCircleOutlineOutlinedIcon sx={{ fontSize: '30px' }} /> : null}

        
      </ListItemIcon>
      </Link>
      </Tooltip>
         
          </>
    );
  };

  return (
    <Box sx={{zIndex:10000}}>
  
    <Box sx={{ width: '100%', maxWidth: 60, bgcolor: 'background.paper', marginTop: '0px', position:'fixed', top:'0px', left:'0', background:'#14171C' }}>
    
      <nav aria-label="main mailbox folders">
        <List sx={{ borderRight: '1px solid #435665', height:'100vh', width:'100%' }}>
        <Typography variant="h5" component="div" sx={{  color: 'white', fontFamily: 'zap', fontSize: '30px', letterSpacing:'-6px', marginLeft:'12px' }}>
            ME
          </Typography>
          <ListItem disablePadding>

            <ListItemButton sx={{ marginTop: '130px' }}>
              {renderIcon('home', 'Home', '/dashboard/home')} 
            </ListItemButton>

          </ListItem>
     
          <ListItem disablePadding>
      
            <ListItemButton sx={{ marginTop: '40px' }}>
              {renderIcon('chat', 'Chat', '/dashboard/chat')} 
            </ListItemButton>
        
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{ marginTop: '40px' }}>
              {renderIcon('notifications', 'Activity', '/dashboard/activity')}
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{ marginTop: '40px' }}>
              {renderIcon('add', 'Post')}
            </ListItemButton>
          </ListItem>
       
        </List>
    
      </nav>
    </Box>
    
    </Box>
  );
}

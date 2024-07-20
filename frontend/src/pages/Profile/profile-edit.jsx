import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Fade, IconButton, TextField,  } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';




import SideBar from '../side-bar';
import { useAuthContext } from '../../context/AuthContext';
import '../../../public/font.css';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    input: {
      color: 'white',
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white',
        },
        '&:hover fieldset': {
          borderColor: 'lightgray',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'white',
        },
      },
      '& .MuiInputLabel-root': {
        color: 'white',
      },
      '& .MuiInputBase-input': {
        color: 'white',
      },
    },
  }));

const ProfileEdit = () => {
    const classes = useStyles();
const {authUser, setAuthUser} = useAuthContext();
const [fullName, setFullName] = useState('');
const [username, setUserName] = useState('');
const navigate = useNavigate();


useEffect(() => {
    if(authUser) {
        setFullName(authUser.fullName);
        setUserName(authUser.username);
    }
},[authUser])

const handleProfileUpdate = async() => {
    try {
        const response = await axios.put(`https://movieenthusiast-backend.onrender.com/users/profile-edit/${authUser._id}`, {
            fullName,
            username
        }, {
            headers: {
              Authorization: `Bearer ${authUser.token}`,
            },
          })
        setAuthUser(response.data.user);
        alert('Profile Updated successfully')
    } catch (error) {
        console.error('Error updating profile', error)
    }
}


  return (
    <Box sx={{ fontFamily: 'zap', background: '#14171C', minHeight: '100vh', position: 'relative', width: '100vw' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '2vh',
            marginLeft: '5.5vw',
            border: '1px solid #435665',
            borderRadius: '15px',
            padding: '1rem',
            width: '95%',
            height: '92vh',
            overflowY: 'auto',
          }}
        >
            <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate(-1)}
            style={{
              position: 'absolute',
              top: '2rem',
              left: '7rem',
              color: 'white',
              background: 'gray',
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h4">Edit Profile</Typography>
      <Box component="form" onSubmit={handleProfileUpdate} noValidate sx={{ mt: 1 }}>
      <TextField
                margin="normal"
                required
                fullWidth
                id="fullname"
                label="name"
                name="fullname"
                autoComplete="fullname"
                autoFocus
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={classes.input}
                InputLabelProps={{ className: classes.input }}
                InputProps={{ className: classes.input }}
 
              />

<TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className={classes.input}
            InputLabelProps={{ className: classes.input }}
            InputProps={{ className: classes.input }}
              />
      <Button variant="contained" color="primary" onClick={handleProfileUpdate} >
        Update Profile
      </Button>
    </Box>
         
            </Box>
            
     
    </Box>
          
          </Box>



  );
};

export default ProfileEdit;

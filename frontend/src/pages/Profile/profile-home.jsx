import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import NavDash from '../../components/navbar-dashboard';
import SideBar from '../side-bar';
import { useAuthContext } from '../../context/AuthContext';
import { styled } from '@mui/material/styles';
import { fetchFavoriteMovies, removeFavoriteMovie, fetchUserProfile } from '../../services/movieService';
import { followUser, unfollowUser } from '../../services/movieService';
import PageLoad from '../../components/skeleton/page-load';
import { getLists } from '../../services/listService';

// const NavLink = styled(Link)(({ isactive }) => ({
//   color: 'white',
//   textDecoration: 'none',
//   textTransform: 'none',
//   position: 'relative',
//   '&::after': {
//     content: '""',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     width: '100%',
//     height: isactive ? '2px' : 0,
//     backgroundColor: 'yellow',
//     transition: 'height 0.3s',
//   },
//   '&:hover::after': {
//     height: '2px',
//   },
//   fontSize: '15px',
//   fontFamily: 'Poppins',
//   marginLeft: 20,
// }));

const ProfileHome = () => {
  const location = useLocation();
  const { userId } = useParams();
  const { authUser } = useAuthContext();
  const [profileUser, setProfileUser] = useState(null);
  const [userLists, setUserLists] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false); // State for triggering refresh

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userProfile = await fetchUserProfile(userId || authUser._id);
        setProfileUser(userProfile);
        const response = await fetchFavoriteMovies(userProfile._id);
        setFavoriteMovies(response);
        const listsResponse = await getLists(userProfile._id);
        setUserLists(listsResponse);
        console.log(listsResponse);
        setIsFollowing(userProfile.followers.includes(authUser.username));
      } catch (error) {
        console.error('Failed to fetch profile data', error);
      }
    };

    fetchProfileData();
  }, [userId, authUser, refreshFlag]); // Include refreshFlag in dependencies

  const remainingBlankBoxes = Math.max(5 - favoriteMovies.length, 0);
  const remainingBlankBoxess = Math.max(2 - userLists.length, 0);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRemoveMovie = async (movieId) => {
    try {
      await removeFavoriteMovie(authUser._id, movieId);
      setFavoriteMovies((movies) => movies.filter((movie) => movie._id !== movieId));
      handleMenuClose();
    } catch (error) {
      console.error('Failed to remove the movie', error);
    }
  };

  const handleFollowUser = async () => {
    try {
      await followUser(profileUser.username);
      setIsFollowing(true);
      setRefreshFlag((prev) => !prev); // Toggle refresh flag to trigger refresh
    } catch (error) {
      console.error('Failed to follow user:', error);
    }
  };

  const handleUnfollowUser = async () => {
    try {
      await unfollowUser(profileUser.username);
      setIsFollowing(false);
      setRefreshFlag((prev) => !prev); // Toggle refresh flag to trigger refresh
    } catch (error) {
      console.error('Failed to unfollow user:', error);
    }
  };

  if (!profileUser) return <PageLoad />;

  return (
    <Box sx={{ fontFamily: 'zap', background: '#14171C', minHeight: '110vh' ,position: 'absolute',width: '100vw' }}>
      <NavDash />
      <Stack direction="row" justifyContent="flex-start" spacing={2}>
        <SideBar />
      </Stack>
      <Box
        sx={{
          background: '#14171C',
          marginTop: '18vh',
          display: 'flex',
          justifyContent: 'center',
          gap: 0,
          ml: '8vw',
        }}
      >
        <Box
          sx={{
            background: '#14171C',
            display: 'flex',
            width: '30%',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
          }}
        >
          <img
            src={profileUser.profilePic}
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <Box>
            <Typography variant="h5" sx={{ color: 'white', textAlign: 'center' }}>
              {profileUser.fullName}
              {authUser._id === profileUser._id ? (
                
                <Button
                  variant="contained"
                  sx={{
                    background: '#566576',
                    marginLeft: '15px',
                    '&:hover': { background: '#657687' },
                  }}
                  onClick={handleMenuClick}
                >
                  •••
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    background: isFollowing ? '#566576' : '#657687',
                    marginLeft: '15px',
                    '&:hover': { background: isFollowing ? '#657687' : '#566576' },
                  }}
                  onClick={isFollowing ? handleUnfollowUser : handleFollowUser}
                >
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </Button>
              )}
            </Typography>
            <Typography sx={{ color: '#657687', fontSize: '0.9rem', }}>
              @{profileUser.username}
            </Typography>
          </Box>
        </Box>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <Link to={`/dashboard/profile-edit/${authUser._id}`}>
          <MenuItem onClick={() => { handleMenuClose();  }}>Edit Profile</MenuItem>
          </Link>
          <MenuItem onClick={handleMenuClose}>Blank</MenuItem>
        </Menu>

        <Box
          sx={{
            background: '#14171C',
            display: 'flex',
            gap: 3,
            width: '30%',
            alignItems: 'center',
            justifyContent: 'flex-start',
            ml: '60px',
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ color: 'white', textAlign: 'center' }}>
              {favoriteMovies.length}
            </Typography>
            <Typography sx={{ color: 'white', textAlign: 'center' }}>Films</Typography>
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            style={{
              borderColor: '#435665',
              height: '55px',
              marginTop: '30px',
            }}
          />
          <Box>
            <Typography variant="h5" sx={{ color: 'white', textAlign: 'center' }}>
              {profileUser.followers.length}
            </Typography>
            <Typography sx={{ color: 'white', textAlign: 'center' }}>Followers</Typography>
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            style={{
              borderColor: '#435665',
              height: '55px',
              marginTop: '30px',
            }}
          />
          <Box>
            <Typography variant="h5" sx={{ color: 'white', textAlign: 'center' }}>
              {profileUser.following.length}
            </Typography>
            <Typography sx={{ color: 'white', textAlign: 'center' }}>Following</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ marginLeft: '25vw', mt: '8vh', display: 'flex', gap: '37vw' }}>
        <Typography variant="h5" sx={{ color: 'white' }}>
          Favorite Films
        </Typography>
        <Link
          to={`/dashboard/profile/favourites/${profileUser._id}`}
          style={{
            textDecoration: 'none',
            textTransform: 'none',
          }}
        >
          <Typography variant="body2" sx={{ color: 'white' }}>
            See All
          </Typography>
        </Link>
      </Box>

      <Box sx={{ marginLeft: '24.5vw', mt: '6vh', display: 'flex', gap: 1 }}>
        
        {favoriteMovies.slice(0, 5).map((movie) => (
          <NavLink key={movie.original_id} to={`/dashboard/films/movie/${movie.original_id} `} style={{ textDecoration: 'none' }}>
          <Box
            key={movie._id}
            sx={{
              background: 'blue',
              height: '28vh',
              width: '10vw',
              border: '1px solid gray',
              borderRadius: '10px',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              '&:hover':{
                border:'1px solid white'
              },
            }}
            // onClick={() => {
            //   // Navigate to movie details page
            //   window.location.href = `/dashboard/films/movie/${movie.original_id}`;
            // }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
              alt={movie.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
              onError={(e) => {
                e.target.src = 'path_to_placeholder_image'; // Replace with your placeholder image path
              }}
            />
          </Box>
          </NavLink>
        ))}
        {[...Array(remainingBlankBoxes)].map((_, index) => (
          <Box
            key={index}
            sx={{
              background: '#14171C',
              height: '28vh',
              width: '10vw',
              border: '1px solid gray',
              borderRadius: '10px',
              position: 'relative',
              overflow: 'hidden',
            }}
          />
        ))}
      </Box>

 <Box sx={{ marginLeft: '25vw', mt: '8vh', display: 'flex', gap: '37vw' }}>
        <Typography variant="h5" sx={{ color: 'white' }}>
          Your Lists
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', marginLeft: '24.5vw',gridTemplateColumns: 'repeat(2, minmax(10px, 1fr))', mt: '6vh', display: 'flex', gap: 1 }}>
        {userLists.map((list) => (
          <NavLink key={list._id} to={`/dashboard/profile/list/${list._id}`} style={{ textDecoration: 'none' }}>
            <Box
              key={list._id}
              sx={{
                background: 'green',
                height: '28vh',
                width: '10vw',
                border: '1px solid gray',
                borderRadius: '10px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                '&:hover': {
                  border: '1px solid white',
                },
              }}
            >
              <Typography
                sx={{
                  color: 'white',
                  textAlign: 'center',
                  marginTop: '10px',
                  fontSize: '1.2rem',
                }}
              >
                {list.name}
              </Typography>
            </Box>
          </NavLink>
        ))}
        {/* Add blank boxes for lists */}
        {[...Array(remainingBlankBoxess)].map((_, index) => (
          <Box
            key={index}
            sx={{
              background: '#14171C',
              height: '28vh',
              width: '10vw',
              border: '1px solid gray',
              borderRadius: '10px',
              position: 'relative',
              overflow: 'hidden',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ProfileHome;

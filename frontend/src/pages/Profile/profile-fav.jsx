// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
// import NavDash from '../../components/navbar-dashboard';
// import SideBar from '../side-bar';
// import { fetchFavoriteMovies, removeFavoriteMovie } from '../../services/movieService';
// import { useAuthContext } from '../../context/AuthContext';
// import PageLoad from '../../components/skeleton/page-load';

// const ProfileFav = () => {
//   const { userId } = useParams();
//   const { authUser } = useAuthContext();
//   const [favoriteMovies, setFavoriteMovies] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserFavoriteMovies = async () => {
//       try {
//         const favoriteMoviesData = await fetchFavoriteMovies(userId || authUser._id);
//         setFavoriteMovies(favoriteMoviesData);
//         setLoading(false);
//       } catch (error) {
//         console.error('Failed to fetch favorite movies:', error);
//         setLoading(false);
//       }
//     };
//     fetchUserFavoriteMovies();
//   }, [userId, authUser]);

//   const handleClickOpen = (movie) => {
//     setSelectedMovie(movie);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedMovie(null);
//   };

//   const handleRemoveMovie = async (movieId) => {
//     try {
//       await removeFavoriteMovie(authUser._id, movieId);
//       setFavoriteMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== movieId));
//       handleClose();
//     } catch (error) {
//       console.error('Failed to remove movie:', error);
//     }
//   };

//   const renderFavoriteMovies = () => (
//     <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(160px, 1fr))', gap: 2, margin: '0 auto', maxWidth: '1200px' }}>
//       {favoriteMovies.map((movie) => (
//         <Box
//           key={movie._id}
//           sx={{
//             background: 'black',
//             height: '260px',
//             border: '1px solid gray',
//             borderRadius: '10px',
//             overflow: 'hidden',
//             cursor: 'pointer',
//             position: 'relative',
//           }}
//           onClick={() => handleClickOpen(movie)}
//         >
//           <img
//             src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
//             alt={movie.title}
//             style={{
//               width: '100%',
//               height: '100%',
//               objectFit: 'cover',
//               position: 'absolute',
//               top: 0,
//               left: 0,
//             }}
//             onError={(e) => {
//               e.target.src = '/path_to_placeholder_image';
//             }}
//           />
//         </Box>
//       ))}
//     </Box>
//   );

//   if (loading) {
//     return <PageLoad/>;
//   }

//   return (
//     <Box sx={{ fontFamily: 'zap', background: '#14171C', minHeight: '110vh', position: 'absolute', width: '100vw' }}>
//       <NavDash />
//       <Box sx={{ display: 'flex', flexDirection: 'row' }}>
//         <SideBar />
//         <Box sx={{ mt: '12vh', ml: '20vw' }}>
//           {favoriteMovies.length > 0 ? renderFavoriteMovies() : (
//             <Typography variant="h6" sx={{ color: 'white', textAlign: 'center', ml: '24vw', mt: '32vh' }}>
//               No favorite movies yet.
//             </Typography>
//           )}
//           {selectedMovie && (
//             <Dialog open={open} onClose={handleClose}>
//               <DialogTitle>{selectedMovie.title}</DialogTitle>
//               <DialogContent>
//                 <img
//                   src={`https://image.tmdb.org/t/p/w500${selectedMovie.posterPath}`}
//                   alt={selectedMovie.title}
//                   style={{
//                     width: '50%',
//                     borderRadius: '10px',
//                     marginTop: '1.5rem',
//                     marginBottom: '2.5rem',
//                     display: 'block',
//                     margin: 'auto',
//                   }}
//                 />
//                 <DialogContentText>{selectedMovie.overview}</DialogContentText>
//                 <Typography variant="body2">Release Date: {new Date(selectedMovie.release_date).toDateString()}</Typography>
//                 <Typography variant="body2">Rating: {selectedMovie.vote_average}</Typography>
//               </DialogContent>
//               <DialogActions>
//                 {authUser._id === userId && (
//                   <Button onClick={() => handleRemoveMovie(selectedMovie._id)} color="error">Remove</Button>
//                 )}
//                 <Button onClick={handleClose}>Close</Button>
//               </DialogActions>
//             </Dialog>
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default ProfileFav;
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams, NavLink } from 'react-router-dom';
import NavDash from '../../components/navbar-dashboard';
import SideBar from '../side-bar';
import { fetchFavoriteMovies } from '../../services/movieService';
import { useAuthContext } from '../../context/AuthContext';
import PageLoad from '../../components/skeleton/page-load';

const ProfileFav = () => {
  const { userId } = useParams();
  const { authUser } = useAuthContext();
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserFavoriteMovies = async () => {
      try {
        const favoriteMoviesData = await fetchFavoriteMovies(userId || authUser._id);
        setFavoriteMovies(favoriteMoviesData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch favorite movies:', error);
        setLoading(false);
      }
    };
    fetchUserFavoriteMovies();
  }, [userId, authUser]);

  if (loading) {
    return <PageLoad />;
  }

  return (
    <Box sx={{ fontFamily: 'zap', background: '#14171C', minHeight: '100vh', position: 'relative', width: '100vw' }}>
      <NavDash />
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar />
        <Box sx={{ mt: '12vh', ml: '20vw' }}>
          {favoriteMovies.length > 0 ? (
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(160px, 1fr))', gap: 2, margin: '0 auto', maxWidth: '1200px' }}>
              {favoriteMovies.map((movie) => (
                <NavLink key={movie.original_id} to={`/dashboard/films/movie/${movie.original_id}`} style={{ textDecoration: 'none' }}>
                  <Box
                    sx={{
                      background: 'black',
                      height: '260px',
                      border: '1px solid gray',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      position: 'relative',
                      '&:hover':{
                        border:'1px solid white'
                      },
                    }}
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
                        e.target.src = '/path_to_placeholder_image';
                      }}
                    />
                  </Box>
                </NavLink>
              ))}
            </Box>
          ) : (
            <Typography variant="h6" sx={{ color: 'white', textAlign: 'center', ml: '24vw', mt: '32vh' }}>
              No favorite movies yet.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileFav;

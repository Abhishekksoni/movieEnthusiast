import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Button, Fade, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { addMovieToFavorites, fetchMovieDetails, fetchFavoriteMovies, removeFavoriteMovie } from '../../services/movieService';
import SideBar from '../side-bar';
import { useAuthContext } from '../../context/AuthContext';
import '../../../public/font.css';
import PageLoad from '../../components/skeleton/page-load';
import MovieList from './movie-list';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteMovieId, setFavoriteMovieId] = useState(null);
  const { authUser } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await fetchMovieDetails(id);
        setMovie(movieData);
      } catch (error) {
        console.error('Error fetching movie details', error);
      }
    };

    const checkIfFavorite = async () => {
      try {
        if (authUser) {
          const favoriteMovies = await fetchFavoriteMovies(authUser._id);
          const favoriteMovie = favoriteMovies.find((favMovie) => favMovie.original_id === parseInt(id));
          if (favoriteMovie) {
            setIsFavorite(true);
            setFavoriteMovieId(favoriteMovie._id);  // Save the object ID of the favorite movie
          } else {
            setIsFavorite(false);
            setFavoriteMovieId(null);
          }
        }
      } catch (error) {
        console.error('Error fetching favorite movies', error);
      }
    };

    fetchMovie();
    checkIfFavorite();
  }, [id, authUser]);

  const handleBackClick = () => {
    if (location.state?.from) {
      const genre = location.state.genre; 
      const currentPage = location.state.currentPage || 1; 
      navigate(`/dashboard/films?genre=${genre}&page=${currentPage}`); 
    } else {
      navigate(-1); 
    }
  };


  const handleToggleFavorite = async () => {
    try {
      if (!movie || !movie.id) {
        console.error('Movie or movie ID is null or undefined', movie);
        return;
      }
      if (!authUser || !authUser._id) {
        console.error('User ID is null or undefined');
        return;
      }

      if (isFavorite) {
        console.log('Removing from favorites:', favoriteMovieId);
        await removeFavoriteMovie(authUser._id, favoriteMovieId);
        setIsFavorite(false);
        setFavoriteMovieId(null);
      } else {
        const addedFavoriteMovie = await addMovieToFavorites(movie, authUser._id);
        setIsFavorite(true);
        setFavoriteMovieId(addedFavoriteMovie._id);  // Save the object ID of the newly added favorite movie
      }
     
    } catch (error) {
      console.error('Failed to toggle movie in favorites', error);
    }
  };

  if (!movie) {
    return <PageLoad/>;
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
            width: '100vw',
            height: '95vh',
            overflowY: 'auto',
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleBackClick}
            style={{
              position: 'absolute',
              top: '2rem',
              left: '7rem',
              color: 'white',
              background: 'gray',
              zIndex:3
            }}
          >
            <CloseIcon />
          </IconButton>

          <Fade in={true} timeout={1000}>
            <Box
              sx={{
                position: 'relative',
                width: '80vw',
                height: '45vw',
                borderRadius: '10px',
                overflow: 'hidden',
                // marginBottom: '2rem',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 1,
                  backgroundImage: `linear-gradient(
                    90deg,
                    #14181d 0,
                    rgba(20, 24, 29, 0.98556487) 0.97%,
                    rgba(20, 24, 29, 0.9451312) 2.07833333%,
                    rgba(20, 24, 29, 0.88300656) 3.29666667%,
                    rgba(20, 24, 29, 0.80349854) 4.60166667%,
                    rgba(20, 24, 29, 0.71091472) 5.96666667%,
                    rgba(20, 24, 29, 0.60956268) 7.365%,
                    rgba(20, 24, 29, 0.50375) 8.77166667%,
                    rgba(20, 24, 29, 0.39778426) 10.16%,
                    rgba(20, 24, 29, 0.29597303) 11.505%,
                    rgba(20, 24, 29, 0.20262391) 12.78%,
                    rgba(20, 24, 29, 0.12204446) 13.95833333%,
                    rgba(20, 24, 29, 0.05854227) 15.01666667%,
                    rgba(20, 24, 29, 0.01642493) 15.92833333%,
                    rgba(20, 24, 29, 0) 16.66666667%,
                    rgba(20, 24, 29, 0) 83.33333333%,
                    rgba(20, 24, 29, 0.01642493) 84.07166667%,
                    rgba(20, 24, 29, 0.05854227) 84.98333333%,
                    rgba(20, 24, 29, 0.12204446) 86.04166667%,
                    rgba(20, 24, 29, 0.20262391) 87.22%,
                    rgba(20, 24, 29, 0.29597303) 88.495%,
                    rgba(20, 24, 29, 0.39778426) 89.84%,
                    rgba(20, 24, 29, 0.50375) 91.22833333%,
                    rgba(20, 24, 29, 0.60956268) 92.635%,
                    rgba(20, 24, 29, 0.71091472) 94.03333333%,
                    rgba(20, 24, 29, 0.80349854) 95.39833333%,
                    rgba(20, 24, 29, 0.88300656) 96.70333333%,
                    rgba(20, 24, 29, 0.9451312) 97.92166667%,
                    rgba(20, 24, 29, 0.98556487) 99.03%,
                    #14181d
                  ),
                  linear-gradient(
                    0deg,
                    #14181d 0,
                    #14181d 21.48148148%,
                    rgba(20, 24, 29, 0.98556487) 23.63703704%,
                    rgba(20, 24, 29, 0.9451312) 26.1%,
                    rgba(20, 24, 29, 0.88300656) 28.80740741%,
                    rgba(20, 24, 29, 0.80349854) 31.70740741%,
                    rgba(20, 24, 29, 0.71091472) 34.74074074%,
                    rgba(20, 24, 29, 0.60956268) 37.84814815%,
                    rgba(20, 24, 29, 0.50375) 40.97407407%,
                    rgba(20, 24, 29, 0.39778426) 44.05925926%,
                    rgba(20, 24, 29, 0.29597303) 47.04814815%,
                    rgba(20, 24, 29, 0.20262391) 49.88148148%,
                    rgba(20, 24, 29, 0.12204446) 52.5%,
                    rgba(20, 24, 29, 0.05854227) 54.85185185%,
                    rgba(20, 24, 29, 0.01642493) 56.87777778%,
                    rgba(20, 24, 29, 0) 58.51851852%
                  )`
                }
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.title}
                style={{
                  width: '100%',
                  height: '80%',
                  // objectFit: 'cover',
                  borderRadius: '10px',
                  position: 'relative',
                  zIndex: 0,
                }}
              />
            </Box>
          </Fade>
          
          <Box sx={{ 
              display: 'flex', 
              flexDirection: 'row',
              alignItems: 'flex-start', 
              width: '75vw',
              // height:'90vh',
              marginTop: '-11rem',
              zIndex: 2,
              position: 'relative' ,
              // background:'red'
            }}>
            <Box
              sx={{
                width: '18%',
                // height:'100%',
                height:'100%',
                borderRadius: '10px',
                objectFit:'cover',
                marginRight: '1rem',
                gap:0,
                // background:'blue'
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '10px',
                  // objectFit:'cover'
                }}
              />
            </Box>
           
              <Box sx={{ width: '70%' , marginLeft:'20px' }}>
                <Typography variant="h4" sx={{ fontFamily:'zap',color: '#FFFFFF', marginBottom: '1rem' }}>{movie.title}</Typography>
                <Typography variant="body1" sx={{ color: '#FFFFFF', marginBottom: '1rem' }}>{movie.overview}</Typography>
                <Typography variant="body1" sx={{ color: '#FFFFFF', marginBottom: '1rem' }}>Release Date: {new Date(movie.release_date).toDateString()}</Typography>
                <Typography variant="body1" sx={{ color: '#FFFFFF', marginBottom: '1rem' }}>Rating: {movie.vote_average}</Typography>
              </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems:'center', height:'60%', gap:0 }}>
              <Button variant="contained" onClick={handleToggleFavorite} disabled={!movie}  sx={{background:'none', padding:0, '&:hover':{ background:'none' }}}>
                {isFavorite ? <FavoriteIcon style={{fontSize:'30px'}}/> : <FavoriteBorderIcon style={{fontSize:'30px'}}/>}
              </Button>
              <Button variant="contained" sx={{background:'none', padding:0}}>
                <WatchLaterIcon style={{fontSize:'30px'}}/>
              </Button>

              <MovieList movie={movie} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieDetails;

import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import NavDash from '../../components/navbar-dashboard';
import SideBar from '../side-bar';
import { fetchMovies } from '../../services/movieService';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import PageLoad from '../../components/skeleton/page-load'
const Feed = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const { authUser } = useAuthContext();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const moviesData = await fetchMovies('movie/upcoming'); // Fetching upcoming movies
        setMovies(moviesData.results.slice(0, 5) || []);  // Limiting to 5 movies per row
      } catch (error) {
        setError('Failed to fetch movies');
        console.error('Error fetching movies', error);
      }
    };

    getMovies();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }
  if(!setMovies) {
    return <PageLoad />
  }

  return (
    <Box sx={{ fontFamily: 'zap', background: '#14171C', minHeight: '100vh', position: 'absolute', width: '100vw' }}>
      <NavDash />
      
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar />
        
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',  // Five columns
            gap: 1,  // Space between each box
            marginLeft: '20.2vw',
            marginTop: '15vh', // Adjusted marginTop to position the grid below the navbar
          }}
        >
          {movies.map(movie => (
            <NavLink key={movie.id} to={`/dashboard/films/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
              <Box
                sx={{
                  background: 'black',
                  height: '36vh',
                  width: '12vw',
                  border: '2px solid gray',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  '&:hover':{
                    border:'2px solid white'
                  },
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  style={{
                    objectFit: 'cover',
                    height: '100%',
                    width: '100%',
                    borderRadius: '10px',
                    display: 'block',
                    margin: 'auto',
                  }}
                />
              </Box>
            </NavLink>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Feed;

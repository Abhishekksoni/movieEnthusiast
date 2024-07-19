import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../../services/movieService';
import { Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, colors } from '@mui/material';

const ProfileFilm = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const moviesData = await fetchMovies('tv/popular');
        console.log(moviesData);  // This should log the movie data to the console
        setMovies(moviesData.results || []);  // Adjust based on the API response structure
      } catch (error) {
        setError('Failed to fetch movies');
        console.error('Error fetching movies', error);
      }
    };

    getMovies();
  }, []);

  const handleClickOpen = (movie) => {
    setSelectedMovie(movie);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMovie(null);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
   
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',  // Three columns
          gap: 2,  // Space between each box
          marginLeft: '8.2vw',
          mt: '6vh'
        }}
      >
        
        {movies.map(movie => (
          <Box
            key={movie.id}
            sx={{
              background: 'black',
              height: '36vh',
              width: '14vw',
              border: '1px solid gray',
              borderRadius: '10px',
              overflow: 'hidden',
              cursor: 'pointer',
              '&:hover':{
                border:'1px solid white'
              },
            }}
            onClick={() => handleClickOpen(movie)}
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
                margin: 'auto'
              }}
            />
           
          </Box>
        ))}
      </Box>
      
      {selectedMovie && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{selectedMovie.title}</DialogTitle>
          <DialogContent>
            <img
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
              style={{
                width: '50%',
                borderRadius: '10px',
                marginTop:'1.5rem',
                marginBottom: '2.5rem',
                display: 'block',
                margin: 'auto'
              }}
            />
            <DialogContentText>
              {selectedMovie.overview}
            </DialogContentText>
            <p>Release Date: {new Date(selectedMovie.release_date).toDateString()}</p>
            <p>Rating: {selectedMovie.vote_average}</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default ProfileFilm;

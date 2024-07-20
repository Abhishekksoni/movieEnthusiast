import React, { useEffect, useState } from 'react';
import { Box, Button, MenuItem, Select, Typography } from '@mui/material';
import { fetchMovies } from '../../services/movieService';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import NavDash from '../../components/navbar-dashboard';
import SideBar from '../side-bar';

const Films = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
const genreId = queryParams.get('genre');


  useEffect(() => {
    const getGenres = async () => {
      try {
        const genreData = await fetchMovies('genre/movie/list');
        setGenres(genreData.genres);
      } catch (error) {
        setError('Failed to fetch genres');
        console.error('Error in fetching genres', error);
      }
    };
    getGenres();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const genreId = params.get('genre');
    const page = params.get('page') || 1; // Get page from URL or default to 1
    if (genreId) {
      setSelectedGenre(genreId);
    }
    setCurrentPage(Number(page)); // Set the current page
  }, [location.search]);

  // const getMovies = async (page = 1, query = '') => {
  //   try {
  //     const endpoint = query
  //       ? `search/movie?query=${query}&page=${page}`
  //       : selectedGenre
  //       ? `discover/movie?with_genres=${selectedGenre}&page=${page}`
  //       : `movie/top_rated?page=${page}`;

  //     const movieData = await fetchMovies(endpoint);
  //     setMovies(movieData.results);
  //     setTotalPages(movieData.total_pages);
  //   } catch (error) {
  //     setError('Failed to fetch movies');
  //     console.error('Error in fetching movies', error);
  //   }
  // };


const getMovies = async (page = 1, query = '') => {
  try {
    const endpoint = query
      ? `search/movie?query=${query}&page=${page}`
      : selectedGenre
      ? `discover/movie?with_genres=${selectedGenre}&page=${page}`
      : `movie/top_rated?page=${page}`;

    const movieData = await fetchMovies(endpoint);
    setMovies(movieData.results);
    setTotalPages(movieData.total_pages);
  } catch (error) {
    setError('Failed to fetch movies');
    console.error('Error in fetching movies', error);
  }
};

  useEffect(() => {
    getMovies(currentPage, searchQuery);
  }, [selectedGenre, currentPage, searchQuery]);

  const handleGenreChange = (event) => {
    const selectedGenreId = event.target.value;
    setSelectedGenre(selectedGenreId);
    setCurrentPage(1);
    navigate(`/dashboard/films?genre=${selectedGenreId}`); // Update the URL with genre
};

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box sx={{ fontFamily: 'zap', background: '#14171C', minHeight: '110vh', position: 'absolute', width: '100vw' }}>
      <NavDash />
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar />
        <Box sx={{ mt: '15vh', ml: '18vw' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Button onClick={handlePrevPage} disabled={currentPage === 1} sx={{ color: 'white' }}>Previous</Button>
              <Typography sx={{ color: 'white', mx: 2 }}>
                Page {currentPage} of {totalPages}
              </Typography>
              <Button onClick={handleNextPage} disabled={currentPage === totalPages} sx={{ color: 'white' }}>Next</Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ml: '18vw' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a movie..."
                style={{
                  padding: '12px',
                  borderRadius: '5px',
                  border: '1px solid white',
                  background: '#14171C',
                  color: 'white',
                  width: 140,
                }}
              />
            </Box>
            <Select
              value={selectedGenre}
              onChange={handleGenreChange}
              displayEmpty
              sx={{
                background: '#14171C',
                color: 'white',
                minWidth: 160,
                height: '6vh',
                border: '1px solid white',
                textAlign: 'center',
                '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                '.MuiSvgIcon-root': { color: 'white' },
                '.MuiSelect-select': {
                  color: 'white',
                  background: '#14171C',
                },
              }}
            >
              <MenuItem value="" >
                Top Rated
              </MenuItem>
              {genres.map((genre) => (
                <MenuItem
                  key={genre.id}
                  value={genre.id}
                  sx={{
                    color: 'white',
                    background: '#14171C',
                    '&:hover': {
                      background: 'white',
                      color: 'black'
                    },
                  }}
                >
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(10px, 1fr))', gap: 2, marginTop: '5vh' }}>
            {movies.data > 0 ? (
             movies.map((movie) => (
              <NavLink key={movie.id} to={`/dashboard/films/movie/${movie.id}`}   state={{ from: location.pathname, genre: selectedGenre, currentPage }}  style={{ textDecoration: 'none' }}>
                <Box
                  sx={{
                    background: 'black',
                    height: '260px',
                    width: '170px',
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
                      color: 'white',
                      textAlign: 'center',
                      justifyItems: 'center'
                    }}
                  />
                </Box>
              </NavLink>
            )) ) : (
              <p>No data available</p>
            )}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, mb: 5, alignItems: 'center' }}>
            <Button onClick={handlePrevPage} disabled={currentPage === 1} sx={{ color: 'white', border: '1px solid white' }}>Previous</Button>
            <Typography sx={{ color: 'white', mx: 2 }}>
              Page {currentPage} of {totalPages}
            </Typography>
            <Button onClick={handleNextPage} disabled={currentPage === totalPages} sx={{ color: 'white', border: '1px solid white' }}>
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Films;

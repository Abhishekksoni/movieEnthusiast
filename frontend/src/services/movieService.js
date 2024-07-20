import axios from 'axios';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = "5d4f1b49ba848fc92a31a81aa8722c7b";

const getAuthToken = () => {
  // Assuming you store the token in localStorage after login
  return localStorage.getItem('authToken');
};


export const fetchMovies = async (endpoint = 'popular') => {
  const endpointUrl = `${API_BASE_URL}/${endpoint}`;
  
  try {
    const response = await axios.get(endpointUrl, {
      params: {
        api_key: API_KEY
      }
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint} movies`, error);
    throw error;
  }
};

export const addMovieToFavorites = async (movie, userId) => {
  const { id, title, overview, poster_path, backdrop_path } = movie;

  const movieDetails = {
    movieId: id,
    title,
    overview,
    posterPath: poster_path,
    backgroundPath: backdrop_path
  };

  try {
    const response = await axios.post(`https://movieenthusiast-backend.onrender.com/api/users/${userId}/favorite-movies`, movieDetails, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Movie added to favorites:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding movie to favorites:', error);
    throw error;
  }
};
export const fetchFavoriteMovies = async (userId) => {
  try {
    const response = await axios.get(`https://movieenthusiast-backend.onrender.com/api/users/${userId}/favorite-movies`);
    return response.data.favoriteMovies; // Assuming the API returns an object with a key 'favoriteMovies' containing the list
  } catch (error) {
    console.error('Error fetching favorite movies:', error);
    throw error;
  }
};

export const removeFavoriteMovie = async (userId, movieId) => {
  const { id } = movieId;
  const movieDetails = {
    movieId: id
  }
  try {
    
    const response = await axios.delete(`https://movieenthusiast-backend.onrender.com/api/users/${userId}/favorite-movies/${movieId}`, movieDetails);
    console.log('Movie removed from favorites:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error removing movie from favorites:', error);
    throw error;
  }
};

export const fetchUserProfile = async (userId) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`https://movieenthusiast-backend.onrender.com/api/users/${userId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }); 
    return response.data; 
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const followUser = async (username) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`https://movieenthusiast-backend.onrender.com/api/users/follow/${username}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const unfollowUser = async (username) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`https://movieenthusiast-backend.onrender.com/api/users/unfollow/${username}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
      params: {
        api_key: API_KEY, // Replace with your actual API key
        language: 'en-US', // Adjust language as needed
      },
    });

    // Extract relevant data from response
    const movieData = response.data;
    return {
      id: movieData.id,
      title: movieData.title,
      overview: movieData.overview,
      poster_path: movieData.poster_path,
      backdrop_path: movieData.backdrop_path,
      release_date: movieData.release_date,
      vote_average: movieData.vote_average,
      // Add more fields as needed
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error; // Propagate the error so it can be handled elsewhere
  }
};
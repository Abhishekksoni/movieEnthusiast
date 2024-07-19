import User from "../models/user.model.js";
import mongoose from 'mongoose';
import Movie from "../models/movie.model.js";
import axios from "axios";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// export const addMovieToFavorites = async (req, res) => {
//     const { userId } = req.params;
//     const { movie } = req.body;
//     console.log('Request params:', req.params);
//     console.log('Request body:', req.body);

    

//     if (!movie) {
//         console.log('movieId is not provided in the request body');
//         return res.status(400).json({ error: 'movieId is required' });
//     }

//     try {
//         const user = await User.findById(userId);
//         if (!user) {
//             console.log(`User ${userId} not found`);
//             return res.status(404).json({ message: "User not found" });
//         }

//         const movieObjectId = new mongoose.Types.ObjectId(movie);
//         console.log(movieObjectId);
//         if (user.favoriteMovies.includes(movieObjectId)) {
//             console.log(`Movie ${movie} already in favorites`);
//             return res.status(400).json({ message: "Movie already in favorites" });
//         }

//         user.favoriteMovies.push(movieObjectId);
//         await user.save();
//         console.log(`Movie ${movie} added to user ${userId} favorites successfully`);
//         res.status(200).json({ message: "Movie added to favorites successfully", user });

//     } catch (error) {
//         console.log('Failed to add movie to favourites', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };
export const addMovieToFavorites = async (req, res) => {
    const { userId } = req.params;
    const { movieId, title, overview, posterPath, releaseDate, genre } = req.body;
  
    console.log('Request params:', req.params);
    console.log('Request body:', req.body);
  
    if (!movieId || !title || !overview || !posterPath) {
      console.log('All movie details are not provided in the request body');
      return res.status(400).json({ error: 'movieId, title, overview, and posterPath are required' });
    }
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        console.log(`User ${userId} not found`);
        return res.status(404).json({ message: "User not found" });
      }
  
      let movie = await Movie.findOne({ original_id: movieId });
      if (!movie) {
        movie = new Movie({
          original_id: movieId,
          title,
          overview,
          posterPath,
          releaseDate,
          genre
        });
        await movie.save();
      }
  
      if (user.favoriteMovies.includes(movie._id)) {
        console.log(`Movie ${movieId} already in favorites`);
        return res.status(400).json({ message: "Movie already in favorites" });
      }
  
      user.favoriteMovies.push(movie._id);
      await user.save();
      console.log(`Movie ${movieId} added to user ${userId} favorites successfully`);
      res.status(200).json({ message: "Movie added to favorites successfully", user });
  
    } catch (error) {
      console.log('Failed to add movie to favorites', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

export const getFavoriteMovies = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('favoriteMovies').select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // console.log(`Fetched favorite movies for user ${userId}:`, user.favoriteMovies);
        res.status(200).json({ favoriteMovies: user.favoriteMovies });
    } catch (error) {
        console.error('Error in getFavoriteMovies', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const removeFavoriteMovie = async (req, res) => {
  const { userId, movieId } = req.params;
  
  try {
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const movieIndex = user.favoriteMovies.findIndex(movie => movie._id.toString() === movieId);
    if (movieIndex === -1) {
      return res.status(404).json({ message: 'Movie not found in favorites' });
    }

    user.favoriteMovies.splice(movieIndex, 1);
    await user.save();



    await Movie.deleteOne({ _id: movieId });

    res.json({ message: 'Movie removed from favorites and collection', favoriteMovies: user.favoriteMovies });
  } catch (error) {
    console.error('Error removing movie from favorites:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



export const getUserProfile = async (req, res) => {
  
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user profile', details: error.message });
  }
};

export const followUser = async(req,res) => {
  try {
    const usernameone = req.user.username;
    const usernametwo = req.params.username;

    console.log('usernameone:', usernameone);
console.log('usernametwo:', usernametwo);

    const userTwoData = await User.findOne({username:usernametwo});

    if(!userTwoData){
      return res.status(404).json({message: "User does not exist"})
    }
    if(!userTwoData.followers.includes(usernameone)){
        await User.findOneAndUpdate({username: usernametwo}, 
          {$push : {followers: usernameone}})
        await User.findOneAndUpdate({username: usernameone}, 
          {$push : {following: usernametwo}})
    }
    else{
      return res.status(404).json({message: "Already followed"})
    }
    res.status(200).json({message:'Followed Successfully'})
  } catch (error) {
    res.status(500).json({error :error.message });
  }
  console.log('typeof usernameone:', typeof usernameone);
console.log('typeof usernametwo:', typeof usernametwo);
}

export const UnfollowUser = async(req,res) => {
  try {
    const usernameone = req.user.username;
    const usernametwo = req.params.username;

    const userTwoData = await User.findOne({username:usernametwo});

    if(!userTwoData){
      return res.status(404).json({message: "User does not exist"})
    }
    if(userTwoData.followers.includes(usernameone)){
        await User.findOneAndUpdate({username: usernametwo}, 
          {$pull : {followers: usernameone}})
        await User.findOneAndUpdate({username: usernameone}, 
          {$pull : {following: usernametwo}})
    }
    else{
      return res.status(404).json({message: "You have not followed this account"})
    }
    res.status(200).json({message:'Unfollowed Successfully'})
  } catch (error) {
    res.status(500).json({error :error.message });
  }
}

export const updateProfile = async(req,res) => {
  const { userId } = req.params;
  const { fullName, username }  = req.body;
  try {
    const user = await User.findById(userId);
    if(!user){
      res.status(404).json({message: 'User not found'})
    }
    
    user.fullName = fullName || user.fullName;
    user.username = username || user.username;

    await user.save();
    res.json({ message: 'Profile updated successfully', user });

  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({error: error.message})
  }
}
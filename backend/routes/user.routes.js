import express from 'express'
import protectRoute from '../middleware/protectRoute.js'
import { UnfollowUser, addMovieToFavorites, followUser, getFavoriteMovies, getUserProfile, getUsersForSidebar, removeFavoriteMovie, updateProfile } from "../controllers/user.controller.js"
import User from '../models/user.model.js'
const router = express.Router()



     router.get("/",protectRoute, getUsersForSidebar)
     router.post("/:userId/favorite-movies", addMovieToFavorites);
     router.get('/:userId/favorite-movies', getFavoriteMovies);
     router.delete('/:userId/favorite-movies/:movieId', removeFavoriteMovie);
     router.post('/follow/:username',protectRoute, followUser)
     router.post('/unfollow/:username',protectRoute, UnfollowUser)
     router.get('/:userId', getUserProfile);
     router.put('/profile-edit/:userId',  updateProfile)

export default router


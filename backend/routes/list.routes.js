import express from 'express'

import protectRoute from '../middleware/protectRoute.js'
import { addMovieToList, createList, getLists } from '../controllers/list.controller.js';


const router = express.Router();

router.post('/lists', protectRoute, createList)
router.get('/lists', protectRoute, getLists)
router.post('/lists/:listId/movies', protectRoute, addMovieToList)



export default router;

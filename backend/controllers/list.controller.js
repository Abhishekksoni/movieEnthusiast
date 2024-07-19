import List from "../models/list.model.js"
import Movie from "../models/movie.model.js";


export const createList = async (req, res) => {
    try {
        const { name } = req.body;  // Destructure name from req.body
        const userId = req.user._id; // Use req.user._id directly if it's properly attached
        console.log('Creating list with name:', name);
        console.log('Request body:', req.body);
        console.log('User ID:', userId);

        const list = new List({ name, userId }); // Create new List with name and userId
        await list.save();
        return res.status(201).json(list);
    } catch (error) {
        console.error('Error creating list:', error);
        return res.status(500).json({ message: 'Failed to create list', error });
    }
};

export const getLists = async (req, res) => {
    try {
        const lists = await List.find({ userId: req.user._id });
        res.status(200).json(lists);  // Change status to 200 for successful response
    } catch (error) {
        console.error('Failed to fetch lists:', error);
        res.status(500).json({ message: 'Failed to fetch lists', error });
    }
};

export const addMovieToList = async(req, res) => {
    try {
        const { listId } = req.params;
        const movieData = req.body.movie;

        let movie = await Movie.findOne({id: movieData.original_id});
        if(!movie){
            movie = new Movie(movieData);
            await movie.save();
        }

        const list = await List.findById(listId);
        if(!list){
            return res.status(404).json({message: 'list not found'})
        }

        list.movies.push(movie.id);
    } catch (error) {
        res.status(500).json({message:'failed to add movie'})
    }
}
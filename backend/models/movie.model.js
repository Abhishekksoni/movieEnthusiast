// import mongoose from 'mongoose';

// const movieSchema = new mongoose.Schema({
//   _id: mongoose.Schema.Types.ObjectId, // Use ObjectId for the primary key
//   original_id: {
//     type: Number,
//     unique: true,
//     required: true
//   },
//   title: String,
//   overview: String,
//   poster_path: {
//     type: String,
//     required: true
// },
//   // add other fields as needed
// });

// const Movie = mongoose.model('Movie', movieSchema);

// export default Movie;
import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    original_id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    releaseDate: { type: String },
    genre: { type: [String] },
    overview: { type: String },
    posterPath: { type: String },
    backdropPath: {type: String}
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;

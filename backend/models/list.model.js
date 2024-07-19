import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movies: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }

})
const List = mongoose.model('List', listSchema);
export default List;
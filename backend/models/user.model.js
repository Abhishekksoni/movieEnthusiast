import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},

		profilePic: {
			type: String,
			default: "",
		},
		lists: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'List'
		  }],
		followers: [{type:String}],
		following:[{type:String}],
		favoriteMovies: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie' // Assuming you have a Movie model defined
        }],

		// createdAt, updatedAt => Member since <createdAt>
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
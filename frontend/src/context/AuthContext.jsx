import axios from 'axios';
import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);  
}

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("ME-user")) || null);

    const updateAuthUser = (newUser) => {
        setAuthUser(newUser);
        localStorage.setItem("ME-user", JSON.stringify(newUser));
    }

    const addMovieToFavourites = async (userId, movieId) => {
        try {
            const response = await axios.post(
                `http://localhost:3000/api/users/${userId}/favorite-movies`,
                { movie: movieId },
                {
                    headers: {
                        Authorization: `Bearer ${authUser.token}`,
                    }
                }
            );

            console.log('Response data:', response.data);

            // Update user's favorite movies with the response data
            updateAuthUser({
                ...authUser,
                favouriteMovies: response.data.favouriteMovies,
            });
        } catch (error) {
            console.error('Failed to add movie to favourites', error);
        }
    }

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser: updateAuthUser, addMovieToFavourites }}>
            {children}
        </AuthContext.Provider>
    );
}

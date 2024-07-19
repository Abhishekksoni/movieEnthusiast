import axios from "axios";
const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

export const createList = async (name) => {
    try {
        const token = getAuthToken();
        const response = await axios.post('/api/lists', { name }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error in creating list', error);
        throw error;
    }
}

export const getLists = async () => {
    try {
        const token = getAuthToken();
        const response = await axios.get('/api/lists', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error in fetching lists', error);
        throw error;
    }
}

export const addMovietoList = async (listId, movieId) => {
    try {
        const token = getAuthToken();
        const response = await axios.post(`/api/lists/${listId}/movies`, { movieId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error in adding movie to list', error);
        throw error;
    }
}

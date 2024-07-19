// import React, { useEffect, useState } from 'react'
// import { addMovietoList, getLists } from '../../services/listService';
// import { Box, Button, Typography } from '@mui/material';
// import CreateList from './create-list';


// const MovieList = ({movie}) => {
//     const [lists, setLists] = useState([]);

//     useEffect(() => {
//         const loadLists = async() => {
//             const userLists = await getLists();
//             setLists(userLists);
//         };
//         loadLists();
//     }, []);

//     const handelAddMovie = async(listId) => {
//         try {
//             await addMovietoList(listId, movie)
//         } catch (error) {
//             console.error('Failed to add movie')
//         }
//     }

//     const handleCreateList = (newList) => {
//         setLists((prevLists) => [...prevLists, newList]);
//     }

//   return (
//     <Box>
//         <CreateList onCreate={handleCreateList} />
//         <Typography variant='h6' sx={{color:'white'}}>Your Lists</Typography>
//         {lists.map((list) => (
//             <Box key={list._id}>
//                 <Typography sx={{color:'white'}}>{list.name}</Typography>
//                 <Button onClick={() => handelAddMovie(list._id)}>Add Movie</Button>
//             </Box>
//         ))}
//     </Box>
//   )
// }

// export default MovieList

import React, { useEffect, useState } from 'react';
import {  addMovietoList, getLists } from '../../services/listService';
import { Box, Button, Typography, Modal } from '@mui/material';
import CreateList from './create-list';

const MovieList = ({ movieId }) => {
  const [lists, setLists] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const loadLists = async () => {
      const userLists = await getLists();
      setLists(userLists);
    };
    loadLists();
  }, []);

  const handleAddMovie = async (listId) => {
    try {
      await addMovietoList(listId, movieId);
      handleCloseModal();
    } catch (error) {
      console.error('Failed to add movieee', error);
    }
  };

  const handleCreateList = (newList) => {
    setLists((prevLists) => [...prevLists, newList]);
    handleCloseModal();
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box>
      <Button onClick={handleOpenModal} variant="contained" color="primary">
        Add to List
      </Button>
      {/* <Typography variant="h6" sx={{ color: 'white' }}>Your Lists</Typography>
      {lists.map((list) => (
        <Box key={list._id}>
          <Typography sx={{ color: 'white' }}>{list.name}</Typography>
          <Button onClick={() => handleAddMovie(list._id)}>Add Movie</Button>
        </Box>
      ))} */}

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 8,
          }}
        >
          <CreateList onCreate={handleCreateList} />
          <Typography variant="h6" sx={{ color: 'black' }}>Your Lists</Typography>
          {lists.map((list) => (
            <Box key={list._id} sx={{display:'flex'}}>
              <Typography sx={{ color: 'black' }}>{list.name}</Typography>
              <Button onClick={() => handleAddMovie(list._id)}>Add Movie</Button>
            </Box>
          ))}
        </Box>
      </Modal>
    </Box>
  );
};

export default MovieList;

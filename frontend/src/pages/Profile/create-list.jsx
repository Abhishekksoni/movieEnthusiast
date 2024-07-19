import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { createList } from '../../services/listService';

const CreateList = ({ onCreate }) => {
    const [name, setName] = useState('');

    const handleCreateList = async () => {
        try {
            const newList = await createList(name);
            onCreate(newList);
            setName(name);
        } catch (error) {
            console.error('Failed to create list', error);
        }
    }

    return (
        <Box>
            <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='List Name'
                style={{color:'white', background:'white'}}
            />
            <Button onClick={handleCreateList}>Create List</Button>
        </Box>
    )
}

export default CreateList;

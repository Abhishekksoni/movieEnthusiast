import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const PageLoad = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'black',
      }}
    >
      <CircularProgress sx={{ color: 'white' }} />
    </Box>
  );
};

export default PageLoad;

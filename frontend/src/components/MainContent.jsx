// MainContent.jsx
import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ChatInterface from './ChatInterface';

const MainContent = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
      <Toolbar />
      <ChatInterface />
    </Box>
  );
};

export default MainContent;

// Chatbot.jsx
import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBarHeader from './AppBarHeader';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const drawerWidth = 310;

export default function Chatbot() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <AppBarHeader drawerWidth={drawerWidth} />
      <Sidebar drawerWidth={drawerWidth} />
      <MainContent />
    </Box>
  );
}

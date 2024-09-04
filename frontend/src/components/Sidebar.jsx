// Sidebar.jsx
import React from 'react';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import TeamHeader from './TeamHeader';
import ButtonList from './ButtonList';

const Sidebar = ({ drawerWidth }) => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundImage: 'linear-gradient(to bottom, #282B35, #2C2E36)',
        }, '& button': { m: 1 }
      }}
      variant="permanent"
      anchor="left"
    >
      <TeamHeader />
      <Divider />
     
      <Divider />
      <ButtonList />
      <Divider />
    </Drawer>
  );
};

export default Sidebar;

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const AppBarHeader = ({ drawerWidth }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (language) => {
    console.log(`Selected language: ${language}`);
    handleMenuClose();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        background: 'linear-gradient(to right, #282B39, #2C2E36)', // background gradient
      }}
    >
      <Toolbar>
        <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1 }}>
          TicketMuse
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          aria-controls="language-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
        >
          <Typography variant="body1" sx={{ mr: 1 }}>
            EN
          </Typography>
          <ArrowDropDownIcon />
        </IconButton>
        <Menu
          id="language-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleLanguageChange('EN')}>English</MenuItem>
          <MenuItem onClick={() => handleLanguageChange('FR')}>French</MenuItem>
          <MenuItem onClick={() => handleLanguageChange('ES')}>Spanish</MenuItem>
          <MenuItem onClick={() => handleLanguageChange('DE')}>German</MenuItem>
          <MenuItem onClick={() => handleLanguageChange('HI')}>Hindi</MenuItem>
          <MenuItem onClick={() => handleLanguageChange('BN')}>Bengali</MenuItem>
          <MenuItem onClick={() => handleLanguageChange('MR')}>Marathi</MenuItem>
          <MenuItem onClick={() => handleLanguageChange('TE')}>Telugu</MenuItem>
          <MenuItem onClick={() => handleLanguageChange('TA')}>Tamil</MenuItem>
          <MenuItem onClick={() => handleLanguageChange('KN')}>Kannada</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarHeader;

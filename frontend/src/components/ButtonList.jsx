// ChatList.jsx
import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import './buttonList.css'

const ChatList = () => {
  const chats = ['Home', 'Booked Tickets', 'View Exhibits', 'Events','Support'];

  return (
    <List className='menu'>
      {chats.map((text, index) => (
        <ListItem className={index % 2 === 0 ?'light_bg':'dark_bg'} key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ChatList;

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { TextField, Button, Paper, Box } from '@mui/material';
import axios from 'axios';
import ExhibitionCard from './ExhibitionCard'; // Import the ExhibitionCard component
import './chat.css'; // Import the CSS file

export default function ChatInterface() {
  // Initial message for the chat interface
  const [messages, setMessages] = useState([
    { text: 'Hello, Welcome to the Exhibition Booking System. How can I assist you today?', isNew: false, isBot: true },
  ]);

  const[isChatON,setChatOn]=useState(false);

  

  // Hook to store exhibition cards data
  const [exhibitionCards, setExhibitionCards] = useState([]);

  // Hook to store user input value
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to handle sending a message
  const sendMessage = useCallback(async () => {
    setChatOn(true);
    if (inputValue.trim()) {
      const newMessage = { text: inputValue, isNew: true, isBot: false };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setExhibitionCards([]); // Clear previous cards when a new message is sent

      try {
        // Send a request to the backend with the user's input
        const response = await axios.post(
          'http://127.0.0.1:5000/',
          { user_prompt: inputValue },
          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*', // Add any other headers you need
            },
          }
        );

        try {
          console.log("Response Data:", response.data.response);
          const responseData = JSON.parse(response.data.response);
          console.log("Parsed Data:", responseData);
      
          const exhibitionIds = Object.keys(responseData['Exhibition ID']);
          
          if (exhibitionIds.length > 0) {
              const cardComponents = [];
              exhibitionIds.forEach((exhibitionId) => {
                  const exhibitionName = responseData['Exhibition Name'][exhibitionId] || 'Unknown';
                  const exhibitionLocation = responseData['Location'][exhibitionId] || 'Unknown';
                  const exhibitionType = responseData['Type'][exhibitionId] || 'Unknown';
                  const exhibitionStartTime = responseData['Start Time'][exhibitionId] || 'Unknown';
                  const exhibitionEndTime = responseData['End Time'][exhibitionId] || 'Unknown';
                  const exhibitionDate = responseData['Date'][exhibitionId] || 'Unknown';
                  const displayImage = "src/assets/exh_pic.png"; // Assuming displayImage field is there
      
                  const cardComponent = (
                      <ExhibitionCard
                          key={exhibitionId}
                          name={exhibitionName}
                          location={exhibitionLocation}
                          type={exhibitionType}
                          startTime={exhibitionStartTime}
                          endTime={exhibitionEndTime}
                          date={exhibitionDate}
                          displayImage={displayImage}
                      />
                  );
                  cardComponents.push(cardComponent);
              });
              setExhibitionCards(cardComponents);
          } else {
              throw new Error("No exhibition IDs found");
          }
      } catch (error) {
          console.error("Error occurred:", error);
          console.log("if  exhibitions cards not present ,treat it as message")
          const botResponse = { text: response.data.response, isNew: false, isBot: true };
          setMessages((prevMessages) => [...prevMessages, botResponse]);
      }
      } catch (error) {
        // Handle error if the API call fails
        console.error('Error sending message:', error);
        const errorMessage = { text: 'Error: Unable to get response from the server.', isNew: false, isBot: true };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }

      setInputValue(''); // Clear the input field after sending the message
    }
  }, [inputValue]);

  // Scroll to the bottom of the chat when a new message or card is added
  useEffect(() => {
    scrollToBottom();
  }, [messages, exhibitionCards]);

  return (
    <Paper elevation={3}  className={`chat-interface ${isChatON ? 'chat-active' : ''}`}>
      <Box
        className="messages"
        sx={{
          '& .MuiPaper-root': {
            bgcolor: 'transparent',
          },
          '& .MuiTypography-root': {
            fontWeight: 'bolder',
          },
        }}
      >
        {/* Display the messages */}
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.isBot ? 'bot-message' : 'user-message'}`}>
            {msg.text}
          </div>
        ))}

        {/* Display the exhibition cards */}
        <div className="exhibition-cards">{exhibitionCards}</div>

        {/* Ref for scrolling to the bottom */}
        <div ref={messagesEndRef} />
      </Box>
      
      {/* Input box and send button */}
      <Box className="input-container">
        <TextField
          value={inputValue}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              // Handle the Enter key press
              sendMessage();
            }
          }}
          onChange={(e) => setInputValue(e.target.value)}
          label="Type your message..."
          variant="outlined"
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={sendMessage} style={{ marginLeft: '10px' }}>
          Send
        </Button>
      </Box>
    </Paper>
  );
}

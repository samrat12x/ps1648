import React, { useState, useRef, useCallback, useEffect } from 'react';
import { TextField, Button, Paper, Box, Dialog, DialogContent, DialogTitle, Stepper, Step, StepLabel, CircularProgress } from '@mui/material';
import axios from 'axios';
import ExhibitionCard from './ExhibitionCard';
import { useNavigate } from 'react-router-dom'; 
import './chat.css';

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    { text: 'Hello, Welcome to the Exhibition Booking System. How can I assist you today?', isNew: false, isBot: true },
  ]);
  
  const [isChatON, setChatOn] = useState(false);
  const [exhibitionCards, setExhibitionCards] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [tickets, setTickets] = useState({ adults: 0, children: 0 });
  const [email, setEmail] = useState('');
  const [selectedExhibition, setSelectedExhibition] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state
  const messagesEndRef = useRef(null);

  const navigate = useNavigate();

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCardClick = (exhibitionId) => {
    setSelectedExhibition(exhibitionId);
    setOpenBookingModal(true);
  };

  const sendMessage = useCallback(async () => {
    setChatOn(true);
    if (inputValue.trim()) {
      const newMessage = { text: inputValue, isNew: true, isBot: false };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setExhibitionCards([]);

      try {
        const response = await axios.post('http://127.0.0.1:5000/', { user_prompt: inputValue });
console.log(response)
if(response.data.response.text){
//{
//   "response": {
//     "text": "JSON (JavaScript Object Notation) is a lightweight data interchange format that is easy for humans to read and write and easy for machines to parse and generate. Would you like to know more about how museums use JSON in their operations?"
// }
// }
setMessages((prevMessages) => [
  ...prevMessages,
  { text: response.data.response.text, isNew: false, isBot: true }
]);


  console.log(response.data.response.text)
}else{
//   {
//     "response": "{\"Exhibition ID\":{\"13\":\"EXH014\",\"12\":\"EXH013\",\"17\":\"EXH018\",\"9\":\"EXH010\",\"8\":\"EXH009\"},\"Exhibition Name\":{\"13\":\"Space Explorers\",\"12\":\"Gurgaon Contemporary Art\",\"17\":\"Ahmedabad Textile Heritage\",\"9\":\"World of Robots\",\"8\":\"Impressionist Masters\"},\"Type\":{\"13\":\"Science\",\"12\":\"Art\",\"17\":\"History\",\"9\":\"Science\",\"8\":\"Art\"},\"Location\":{\"13\":\"Gurgaon\",\"12\":\"Gurgaon\",\"17\":\"Ahmedabad\",\"9\":\"Mumbai\",\"8\":\"Mumbai\"},\"Start Time\":{\"13\":\"9:30 AM\",\"12\":\"10:30 AM\",\"17\":\"10:00 AM\",\"9\":\"10:00 AM\",\"8\":\"9:00 AM\"},\"End Time\":{\"13\":\"6:30 PM\",\"12\":\"6:00 PM\",\"17\":\"5:30 PM\",\"9\":\"6:00 PM\",\"8\":\"5:00 PM\"},\"Date\":{\"13\":\"2024-09-25\",\"12\":\"2024-09-18\",\"17\":\"2024-09-15\",\"9\":\"2024-09-12\",\"8\":\"2024-09-14\"}}"
// }
//  
 const responseData = JSON.parse(response.data.response);
  const exhibitionIds = Object.keys(responseData['Exhibition ID']);
 
        
        
        const cardComponents = exhibitionIds.map((exhibitionId) => {
          const exhibitionName = responseData['Exhibition Name'][exhibitionId] || 'Unknown';
          const exhibitionLocation = responseData['Location'][exhibitionId] || 'Unknown';
          const exhibitionType = responseData['Type'][exhibitionId] || 'Unknown';
          const exhibitionStartTime = responseData['Start Time'][exhibitionId] || 'Unknown';
          const exhibitionEndTime = responseData['End Time'][exhibitionId] || 'Unknown';
          const exhibitionDate = responseData['Date'][exhibitionId] || 'Unknown';
          const displayImage = 'src/assets/exh_pic.png'; 

          return (
            <ExhibitionCard
              key={exhibitionId}
              name={exhibitionName}
              location={exhibitionLocation}
              type={exhibitionType}
              startTime={exhibitionStartTime}
              endTime={exhibitionEndTime}
              date={exhibitionDate}
              displayImage={displayImage}
              onClick={() => handleCardClick(exhibitionId)} 
            />
          );
        });

        setExhibitionCards(cardComponents);

 
}       console.log("parsing mein error aya?")
  //       try{
  //         
  //         // raises exception if its plain text(parsing fails)
  //       }catch(error){
  //         console.log("inner catch ran")
  
  //       }
        

        

 

      
      } catch (error) {
        console.log("outter catch ran")
        setMessages((prevMessages) => [...prevMessages, { text: 'Error: Unable to get response from the server.', isNew: false, isBot: true }]);
      }

      setInputValue('');
    }
  }, [inputValue]);

  const handleFormSubmit = async () => {
    setLoading(true); // Start loading
    try {
      await axios.post('http://127.0.0.1:5000/sendEmailConfirmation', {
        exhibitionId: selectedExhibition,
        tickets,
        email,
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Booking successfully completed!', isNew: false, isBot: true },
      ]);

      // Clear all the states before navigating
      setOpenBookingModal(false);
      setActiveStep(0);
      setTickets({ adults: 0, children: 0 });
      setEmail('');
      setSelectedExhibition(null);
      setMessages([
        { text: 'Hello, Welcome to the Exhibition Booking System. How can I assist you today?', isNew: false, isBot: true },
      ]);
      setExhibitionCards([]);
      setInputValue('');
      setChatOn(false);

      navigate('/success');
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Error: Unable to complete booking.', isNew: false, isBot: true },
      ]);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, exhibitionCards]);

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              label="Adult Tickets"
              type="number"
              value={tickets.adults}
              onChange={(e) => setTickets({ ...tickets, adults: e.target.value })}
              fullWidth
              inputProps={{ min: 0, max: 10 }}
            />
            <TextField
              label="Child Tickets"
              type="number"
              value={tickets.children}
              onChange={(e) => setTickets({ ...tickets, children: e.target.value })}
              fullWidth
              inputProps={{ min: 0, max: 10 }}
            />
          </>
        );
      case 1:
        return (
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
        );
      default:
        return null;
    }
  };

  return (
    <Paper elevation={3} className={`chat-interface ${isChatON ? 'chat-active' : ''}`}>
      <Box className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.isBot ? 'bot-message' : 'user-message'}`}>
            {msg.text}
          </div>
        ))}

        <div className="exhibition-cards">
          {exhibitionCards}
        </div>

        <div ref={messagesEndRef} />
      </Box>

      <Box className="input-container">
        <TextField
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          label="Type your message..."
          variant="outlined"
          fullWidth
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              sendMessage();
            }
          }}
        />
        <Button variant="contained" color="primary" onClick={sendMessage} style={{ marginLeft: '10px' }}>
          Send
        </Button>
      </Box>

      {/* Modal for booking tickets */}
      <Dialog open={openBookingModal} onClose={() => setOpenBookingModal(false)} fullWidth>
        <DialogTitle>Book Tickets</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} alternativeLabel>
            <Step>
              <StepLabel>Select Tickets</StepLabel>
            </Step>
            <Step>
              <StepLabel>Enter Email</StepLabel>
            </Step>
          </Stepper>

          {renderStepContent(activeStep)}

          <Box mt={2}>
            <Button
              disabled={activeStep === 0}
              onClick={() => setActiveStep(activeStep - 1)}
            >
              Back
            </Button>
            <Button
              onClick={() => {
                if (activeStep === 1) {
                  handleFormSubmit();
                } else {
                  setActiveStep(activeStep + 1);
                }
              }}
              disabled={loading} // Disable button while loading
            >
              {loading ? <CircularProgress size={24} /> : (activeStep === 1 ? 'Submit' : 'Next')} {/* Show spinner while loading */}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Paper>
  );
}

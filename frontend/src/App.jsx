import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Chatbot from './components/Chatbot'
import SuccessTick from './components/SuccessTick';
function App() {
 

  return (
    <>
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    <Router>
        <Routes>
          
          <Route path="/" element={<Chatbot />} />
     <Route path="/success" element={<SuccessTick />} /> 
          {/* <Route path="/bookingsuccess" element={<BookingSuccess />} /> */}
        </Routes>
      </Router>
      </>


    
       
  )
}

export default App

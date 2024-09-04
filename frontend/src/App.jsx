import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Chatbot from './components/Chatbot'

function App() {
 

  return (
    <>
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    <Router>
        <Routes>
          
          <Route path="/" element={<Chatbot />} />
          {/* <Route path="/calendar" element={<Calendar />} /> */}
          {/* <Route path="/bookingsuccess" element={<BookingSuccess />} /> */}
        </Routes>
      </Router>
      </>


    
       
  )
}

export default App

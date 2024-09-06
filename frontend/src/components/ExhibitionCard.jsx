import React from 'react';

function ExhibitionCard({ name, location, type, date, startTime, endTime, displayImage, onClick }) {
  return (
    <div className="exhibition-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <img src={displayImage} alt={name} className="exhibition-image" />
      <h3>{name}</h3>
      <p><strong>Location:</strong> {location}</p>
      <p><strong>Type:</strong> {type}</p>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Start Time:</strong> {startTime}</p>
      <p><strong>End Time:</strong> {endTime}</p>
    </div>
  );
}

export default ExhibitionCard;

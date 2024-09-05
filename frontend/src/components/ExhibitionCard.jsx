import React from 'react';

function ExhibitionCard({ name, location, details, bookingURL, displayImage }) {
  return (
    <div className="exhibition-card">
      <img src={displayImage} alt={name} className="exhibition-image" />
      <h3>{name}</h3>
      <p><strong>Location:</strong> {location}</p>
      <p>{details}</p>
      <a href={bookingURL} target="_blank" rel="noopener noreferrer">
        Book Now
      </a>
    </div>
  );
}

export default ExhibitionCard;

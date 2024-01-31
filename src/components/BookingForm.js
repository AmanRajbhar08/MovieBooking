// BookingForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    // Add more relevant user details
  });

  const [showDetails, setShowDetails] = useState(null);

  useEffect(() => {
    // Fetch detailed data for the specific show
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then(response => response.json())
      .then(data => setShowDetails(data));
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUserDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleBookingSubmit = event => {
    event.preventDefault();

    // Basic validation
    if (!userDetails.name.trim() || !userDetails.email.trim()) {
      alert('Please enter both name and email.');
      return;
    }

    // Implement logic to book a ticket and store user details
    // You can use local storage for storing user details
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    // Implement further logic for booking, e.g., sending data to a server
    console.log('Booking Successful:', showDetails, userDetails);
    alert(`Congratulations ${userDetails.name.toUpperCase()} successfully booked the show ${showDetails.name}!`);
  };

  const handleCancel = () => {
    // Navigate back to ShowDetails page
    navigate(`/`);
  };

  return (
    <div className="container mt-5">
      <h2>Booking Form</h2>
      <p>Show: {showDetails && showDetails.name}</p>
      {/* Form with movie details and user details */}
      <form onSubmit={handleBookingSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={userDetails.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
          />
        </div>
        {/* Add more form fields for relevant user details */}
        <div className="mb-3">
          <button type="submit" className="btn btn-primary btn-lg">
            Book Ticket
          </button>
          <button type="button" className="btn btn-outline-secondary¸ btn-lg" onClick={handleCancel}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;

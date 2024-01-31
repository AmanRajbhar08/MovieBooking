// ShowDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, Link ,useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch detailed data for the specific show
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then(response => response.json())
      .then(data => setShow(data));
  }, [id]);

  // Clean up HTML tags from show summary
  const sanitizedSummary = show && DOMPurify.sanitize(show.summary);

  const handleCancel = () => {
    // Navigate back to ShowDetails page
    navigate(`/`);
  };
  return (
    <div className="container mt-5">
      {show && (
        <div>
          <h1>{show.name}</h1>
          {show.image && show.image.original && (
            <img
              src={show.image.original}
              alt={show.name}
              className="img-fluid mb-3"
              style={{ maxWidth: '100%' }}
            />
          )}
          <p dangerouslySetInnerHTML={{ __html: sanitizedSummary }} />
          {/* Link to the BookingForm with show details */}
          <Link to={`/book/${id}`} className="btn btn-primary btn-lg">
            Book Ticket
          </Link>
          <button type="button" className="btn btn-outline-secondary btn-lg" onClick={handleCancel}>
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowDetails;

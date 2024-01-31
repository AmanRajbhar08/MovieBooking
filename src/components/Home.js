// Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

const Home = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    // Fetch the list of shows
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then(response => response.json())
      .then(data => setShows(data));
  }, []);

  // Function to sanitize HTML content using DOMPurify
  const sanitizeHTML = html => ({ __html: DOMPurify.sanitize(html) });

  return (
    <div className="container mt-5">
      <h1>Featured Shows</h1>
      <div className="row">
        {shows.map(show => (
          <div key={show.show.id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={show.show.image ? show.show.image.medium : 'placeholder.jpg'}
                alt={show.show.name}
                className="card-img-top"
              />
              <div className="card-body">
                <h4 className="card-title">{show.show.name}</h4>
                <p className="card-text" dangerouslySetInnerHTML={sanitizeHTML(show.show.summary)} />
                {/* Link to ShowDetails with show id */}
                <Link to={`/show/${show.show.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

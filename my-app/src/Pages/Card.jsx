import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

export default function Card() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Use navigate for redirection

  useEffect(() => {
    axios.get('http://localhost:8080/requests/allrequests')
      .then(response => {
        setRequests(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching the requests!', error);
        setLoading(false);
      });
  }, []);

  const handleSchedule = (reqid) => {
    const user = localStorage.getItem('user'); // You may store user info in localStorage after login
    if (!user) {
      // If the user is not logged in, redirect to the login page
      navigate('/login');
    } else {
      // Call the API to check if the user is a volunteer or needs registration
      const email = JSON.parse(user).email; // Assuming you store user data in localStorage
      axios.get(`http://localhost:8080/login?email=${email}`)
        .then(response => {
          // If user is a volunteer, schedule the request
          axios.put(`http://localhost:8080/requests/${reqid}/schedule?volunteerName=JohnDoe`)
            .then(() => {
              setRequests(prevRequests => prevRequests.map(req =>
                req.reqid === reqid ? { ...req, status: 'SCHEDULED' } : req
              ));
            })
            .catch(error => console.error("Error scheduling request", error));
        })
        .catch(error => {
          console.error("User not found, redirecting to register page", error);
          navigate('/register'); // If user isn't a volunteer, navigate to the registration page
        });
    }
  };

  const handleComplete = (reqid) => {
    axios.post(`http://localhost:8080/requests/${reqid}/complete`)
      .then(() => {
        setRequests(prevRequests => prevRequests.map(req =>
          req.reqid === reqid ? { ...req, status: 'COMPLETED' } : req
        ));
      })
      .catch(error => console.error("Error completing request", error));
  };

  const sortedRequests = [...requests].sort((a, b) => {
    const statusOrder = { "SCHEDULED": 1, "AVAILABLE": 2, "COMPLETED": 3 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  return (
    <div className="requests-container">
      <h2 className="header">Every meal counts. Every donation matters.</h2>

      {loading ? (
        <div className="loading">Loading requests...</div>
      ) : (
        sortedRequests.length > 0 ? (
          <div className="cards">
            {sortedRequests.map(request => {
  const uniqueNumber = localStorage.getItem(`req-${request.reqid}`);
  const lastThreeDigits = uniqueNumber ? uniqueNumber.slice(-3) : null;
  const user = localStorage.getItem('user');

  return (
    <div key={request.reqid} className="card">
      <div className="card-content">
        <h3 className="food-name">{request.foodname}</h3>
        <h4 className="food-type">{request.foodtype}</h4>
        <p><strong>Donor:</strong> {request.donorname || "No donor name"}</p>
        <p><strong>Donor Address:</strong> {request.donoradd || "No address available"}</p>
        <p><strong>Quantity:</strong> {request.quantity} packets</p>
        <p className={`status ${request.status.toLowerCase()}`}>
          <strong>Status:</strong> {request.status}
        </p>

        {/* Show last 3 digits of the number only if user is logged in */}
        {user && lastThreeDigits && (
          <p><strong>Ref Code:</strong> ***{lastThreeDigits}</p>
        )}

        <div className="action-buttons">
          {request.status === "AVAILABLE" && (
            <button className="schedule-btn" onClick={() => handleSchedule(request.reqid)}>
              Schedule
            </button>
          )}
          {request.status === "SCHEDULED" && (
            <button className="complete-btn" onClick={() => handleComplete(request.reqid)}>
              Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
})}

          </div>
        ) : (
          <div className="no-requests">No requests found</div>
        )
      )}
    </div>
  );
}

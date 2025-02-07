import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Card() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

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
    axios.put(`http://localhost:8080/requests/${reqid}/schedule?volunteerName=JohnDoe`)
      .then(() => {
        setRequests(prevRequests => prevRequests.map(req =>
          req.reqid === reqid ? { ...req, status: 'SCHEDULED' } : req
        ));
      })
      .catch(error => console.error("Error scheduling request", error));
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

  // Sorting: SCHEDULED > AVAILABLE > COMPLETED
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
            {sortedRequests.map(request => (
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
                  <div className="action-buttons">
                    {request.status === "AVAILABLE" && (
                      <button
                        className="schedule-btn"
                        onClick={() => handleSchedule(request.reqid)}
                      >
                        Schedule
                      </button>
                    )}
                    {request.status === "SCHEDULED" && (
                      <button
                        className="complete-btn"
                        onClick={() => handleComplete(request.reqid)}
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-requests">No requests found</div>
        )
      )}
    </div>
  );
}

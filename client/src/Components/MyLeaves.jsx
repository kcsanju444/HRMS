import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MyLeaves = () => {
  const { id } = useParams();
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/leave/leaves/employee/${id}`)
      .then(res => setLeaves(res.data.result))
      .catch(() => alert('Failed to fetch leaves'));
  }, [id]);

  return (
    <div className="container mt-4">
      <h3>My Leave Requests</h3>
      <ul className="list-group">
        {leaves.map((leave) => (
          <li key={leave.id} className="list-group-item">
            {leave.leave_type} | {leave.start_date} → {leave.end_date} | Status: {leave.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyLeaves;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageLeaves = () => {
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = () => {
    axios.get('http://localhost:3000/leave/leaves')
      .then(res => setLeaves(res.data.result))
      .catch(() => alert('Failed to load leave data'));
  };

  const updateStatus = (id, status) => {
    axios.put(`http://localhost:3000/leave/update_leave/${id}`, { status })
      .then(fetchLeaves)
      .catch(() => alert('Error updating status'));
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Manage Leave Requests</h3>
      {leaves.map((leave) => (
        <div key={leave.id} className="border p-2 mb-2">
          <p><strong>{leave.employee_name}</strong> - {leave.leave_type}</p>
          <p>{leave.start_date} to {leave.end_date}</p>
          <p>Status: {leave.status}</p>
          <button className="btn btn-success me-2" onClick={() => updateStatus(leave.id, 'approved')}>Approve</button>
          <button className="btn btn-danger" onClick={() => updateStatus(leave.id, 'rejected')}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default ManageLeaves;

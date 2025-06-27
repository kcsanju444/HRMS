import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ApplyLeave = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    leave_type: '',
    start_date: '',
    end_date: '',
    reason: '',
  });
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/leave/add_leave', {
        ...form,
        employee_id: id,
      });
      setMsg('Leave requested successfully');
    } catch (err) {
      setMsg(err.response?.data?.error || 'Error');
    }
  };

  return (
    <div className="container mt-4">
      <h3>Apply for Leave</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="leave_type" placeholder="Leave Type" onChange={handleChange} required />
        <input className="form-control mb-2" type="date" name="start_date" onChange={handleChange} required />
        <input className="form-control mb-2" type="date" name="end_date" onChange={handleChange} required />
        <textarea className="form-control mb-2" name="reason" placeholder="Reason" onChange={handleChange} required></textarea>
        <button className="btn btn-primary">Submit</button>
      </form>
      {msg && <p className="mt-2 text-success">{msg}</p>}
    </div>
  );
};

export default ApplyLeave;


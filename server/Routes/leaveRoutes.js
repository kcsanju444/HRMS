// routes/leaveRoutes.js
import express from 'express';
import db from '../utils/db.js'; // Adjust the path if needed

const router = express.Router();

// Apply for Leave (Employee)
router.post('/add_leave', (req, res) => {
  const { employee_id, leave_type, start_date, end_date, reason } = req.body;

  if (!employee_id || !leave_type || !start_date || !end_date || !reason) {
    return res.status(400).json({ status: false, error: 'All fields are required' });
  }

  db.query(
    'INSERT INTO leaves (employee_id, leave_type, start_date, end_date, reason) VALUES (?, ?, ?, ?, ?)',
    [employee_id, leave_type, start_date, end_date, reason],
    (err, result) => {
      if (err) return res.status(500).json({ status: false, error: err.message });
      res.status(201).json({ status: true, message: 'Leave requested' });
    }
  );
});

// Get All Leaves (Admin)
router.get('/leaves', (req, res) => {
  db.query(
    'SELECT l.*, e.name AS employee_name FROM leaves l JOIN employee e ON l.employee_id = e.id',
    (err, results) => {
      if (err) return res.status(500).json({ status: false, error: err.message });
      res.json({ status: true, result: results });
    }
  );
});

// Update Leave Status (Admin)
router.put('/update_leave/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.query(
    'UPDATE leaves SET status = ? WHERE id = ?',
    [status, id],
    (err, result) => {
      if (err) return res.status(500).json({ status: false, error: err.message });
      res.json({ status: true, message: 'Leave status updated' });
    }
  );
});

// Get Leaves by Employee (Employee)
router.get('/leaves/employee/:employee_id', (req, res) => {
  const { employee_id } = req.params;

  db.query(
    'SELECT * FROM leaves WHERE employee_id = ?',
    [employee_id],
    (err, results) => {
      if (err) return res.status(500).json({ status: false, error: err.message });
      res.json({ status: true, result: results });
    }
  );
});

export const leaverouter = router;

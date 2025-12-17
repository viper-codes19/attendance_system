const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

const STUDENTS = 'students.json';
const ATTENDANCE = 'attendance.json';

// Ensure attendance file exists
if (!fs.existsSync(ATTENDANCE)) {
  fs.writeFileSync(ATTENDANCE, JSON.stringify([]));
}

// Root test route
app.get('/api', (req, res) => {
  res.send('Attendance backend is working');
});

// Get student by ID
app.get('/student/:id', (req, res) => {
  const students = JSON.parse(fs.readFileSync(STUDENTS));
  const student = students.find(s => s.id === req.params.id);
  res.json(student || {});
});

// Record attendance
app.post('/attendance', (req, res) => {
  const data = JSON.parse(fs.readFileSync(ATTENDANCE));

  data.push({
    course: req.body.course,
    id: req.body.id,
    name: req.body.name,
    session: req.body.session,
    time: new Date().toLocaleString()
  });

  fs.writeFileSync(ATTENDANCE, JSON.stringify(data, null, 2));
  res.json({ success: true });
});

// Admin login
const ADMIN = { username: 'admin', password: 'admin123' };

app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN.username && password === ADMIN.password) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

// Admin fetch attendance
app.get('/admin/attendance', (req, res) => {
  const data = JSON.parse(fs.readFileSync(ATTENDANCE));
  res.json(data);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

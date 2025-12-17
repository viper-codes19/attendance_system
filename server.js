const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Files
const STUDENTS = path.join(__dirname, 'students.json');
const ATTENDANCE = path.join(__dirname, 'attendance.json');

// Ensure attendance file exists
if (!fs.existsSync(ATTENDANCE)) {
  fs.writeFileSync(ATTENDANCE, JSON.stringify([]));
}

/* ---------------- STUDENT LOOKUP ---------------- */
app.get('/student/:id', (req, res) => {
  const students = JSON.parse(fs.readFileSync(STUDENTS));
  const student = students.find(s => s.id === req.params.id);
  res.json(student || {});
});

/* ---------------- RECORD ATTENDANCE ---------------- */
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

/* ---------------- ADMIN LOGIN ---------------- */
const ADMIN = { username: 'admin', password: 'admin123' };

app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN.username && password === ADMIN.password) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

/* ---------------- ADMIN VIEW ATTENDANCE ---------------- */
app.get('/admin/attendance', (req, res) => {
  const data = JSON.parse(fs.readFileSync(ATTENDANCE));
  res.json(data);
});

/* ---------------- FRONTEND ROUTES ---------------- */

// Student page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Admin page
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

/* ---------------- START SERVER ---------------- */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

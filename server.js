const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const STUDENTS = 'students.json';
const ATTENDANCE = 'attendance.json';

if (!fs.existsSync(ATTENDANCE)) {
  fs.writeFileSync(ATTENDANCE, JSON.stringify([]));
}

// ===== ADMIN LOGIN =====
const ADMIN = {
  username: 'admin',
  password: 'admin123'
};

app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN.username && password === ADMIN.password) {
    res.json({ success: true });
  } 
    res.status(401).json({ success: false });
});

// ===== GET STUDENT BY ID =====
app.get('/student/:id', (req, res) => {
  const students = JSON.parse(fs.readFileSync(STUDENTS));
  const student = students.find(s => s.id === req.params.id);
  res.json(student || {});
});

// ===== SAVE ATTENDANCE =====
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

// ===== ADMIN VIEW =====
app.get('/admin/attendance', (req, res) => {
  const data = JSON.parse(fs.readFileSync(ATTENDANCE));
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const path = require('path');

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// Root route → student attendance page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Admin page route (IMPORTANT)
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});


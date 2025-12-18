const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const DATA_FILE = path.join(__dirname, 'attendance.json');

/* Ensure attendance.json exists */
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

/* ===== SAVE ATTENDANCE ===== */
app.post('/attendance', (req, res) => {
  const { course, studentId, name, session } = req.body;

  if (!course || !studentId || !session) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  data.push({
    course,
    studentId,
    name: name || 'Unknown',
    session,
    time: new Date().toLocaleString()
  });

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  res.json({ message: 'Attendance recorded successfully' });
});

/* ===== ADMIN: VIEW ATTENDANCE ===== */
app.get('/admin/attendance', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load attendance' });
  }
});

/* ===== START SERVER ===== */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

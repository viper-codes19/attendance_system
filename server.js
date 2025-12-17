const express = require('express');
const fs = require('fs');
const cors = require('cors');


const app = express();


// IMPORTANT FOR RENDER
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(express.static('public'));


const STUDENTS_FILE = 'students.json';
const ATTENDANCE_FILE = 'attendance.json';


// Ensure attendance file exists
if (!fs.existsSync(ATTENDANCE_FILE)) {
fs.writeFileSync(ATTENDANCE_FILE, JSON.stringify([]));
}


// ================= ADMIN LOGIN =================
const ADMIN = {
username: 'admin',
password: 'admin123'
};


app.post('/admin/login', (req, res) => {
const { username, password } = req.body;


if (username === ADMIN.username && password === ADMIN.password) {
return res.json({ success: true });
}


res.status(401).json({ success: false });
});


// ================= GET ALL ATTENDANCE =================
app.get('/admin/attendance', (req, res) => {
const data = JSON.parse(fs.readFileSync(ATTENDANCE_FILE));
res.json(data);
});


// ================= GET STUDENT BY ID =================
app.get('/student/:id', (req, res) => {
const students = JSON.parse(fs.readFileSync(STUDENTS_FILE));
const student = students.find(s => s.id === req.params.id);


if (!student) return res.json({});
res.json(student);
});


// ================= SAVE ATTENDANCE =================
app.post('/attendance', (req, res) => {
const data = JSON.parse(fs.readFileSync(ATTENDANCE_FILE));


data.push({
course: req.body.course,
id: req.body.id,
name: req.body.name,
session: req.body.session,
time: new Date().toLocaleString()
});


fs.writeFileSync(ATTENDANCE_FILE, JSON.stringify(data, null, 2));
res.json({ message: 'Attendance recorded' });
});


// ================= START SERVER =================
app.listen(PORT, () => {
console.log(`✅ Server running on port ${PORT}`);
});

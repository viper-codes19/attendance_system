function submitAttendance(event) {
if (event.key !== 'Enter') return;


const course = document.getElementById('course').value;
const session = document.getElementById('session').value;
const id = document.getElementById('studentId').value;


const nameBox = document.getElementById('studentName');
const msg = document.getElementById('msg');


if (!course || !session || !id) {
msg.innerText = 'Please fill all fields';
return;
}


fetch('/student/' + id)
.then(res => res.json())
.then(student => {
if (!student.name) {
msg.innerText = 'Student not found';
return;
}


nameBox.innerText = '✔ ' + student.name;


fetch('/attendance', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
course,
id,
name: student.name,
session
})
})
.then(() => {
msg.innerText = '✅ Attendance recorded successfully';
document.getElementById('studentId').value = '';
});
});
}

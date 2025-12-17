document.getElementById('studentId').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') submitAttendance();
});

function submitAttendance() {
  const course = document.getElementById('course').value;
  const id = document.getElementById('studentId').value;
  const session = document.getElementById('session').value;
  const nameBox = document.getElementById('studentName');
  const msg = document.getElementById('msg');

  if (!course || !id || !session) {
    msg.innerText = 'Please fill all fields';
    return;
  }

  fetch('/student/' + id)
    .then(res => res.json())
    .then(student => {
      if (!student.name) {
        nameBox.innerText = 'Student not found';
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
      });

      msg.innerText = '✅ Attendance submitted';
      document.getElementById('studentId').value = '';
    });
}

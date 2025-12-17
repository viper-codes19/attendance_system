document.getElementById('studentId').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') submitAttendance();
});

function submitAttendance() {
  const course = document.getElementById('course').value;
  const id = document.getElementById('studentId').value;
  const session = document.getElementById('session').value;
  const nameBox = document.getElementById('studentName');
  const msg = document.getElementById('msg');

  if (!course || !id || !session) {
    msg.innerText = '❌ Fill all fields';
    msg.className = 'error';
    return;
  }

  fetch('/student/' + id)
    .then(res => res.json())
    .then(student => {
      if (!student.name) {
        msg.innerText = '❌ Student not found';
        msg.className = 'error';
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
        msg.innerText = '✅ Attendance submitted successfully';
        msg.className = 'success';

        document.getElementById('studentId').value = '';
      });
    });
}

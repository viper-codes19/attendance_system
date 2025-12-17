function handleEnter(event) {
  if (event.key !== 'Enter') return;

  var course = document.getElementById('course').value;
  var id = document.getElementById('studentId').value;
  var session = document.getElementById('session').value;
  var nameBox = document.getElementById('studentName');
  var msg = document.getElementById('msg');

  if (course === '' || id === '' || session === '') {
    showMessage('Please fill all fields', 'error');
    return;
  }

  // Fetch student info
  fetch('http://localhost:3000/student/' + id)
    .then(res => res.json())
    .then(student => {
      if (!student.name) {
        nameBox.innerText = 'Student not found';
        showMessage('Invalid ID', 'error');
        return;
      }

      nameBox.innerText = '✔ ' + student.name;

      // Save attendance
      fetch('http://localhost:3000/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          course: course,
          id: id,
          name: student.name,
          session: session
        })
      });

      showMessage('Attendance recorded successfully', 'success');

      // Clear ID field for next student
      document.getElementById('studentId').value = '';
    });
}

function showMessage(text, type) {
  var msg = document.getElementById('msg');
  msg.innerText = text;
  msg.className = type;

  setTimeout(() => {
    msg.className = '';
  }, 3000);
}

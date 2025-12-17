fetch('/admin/attendance')
  .then(res => res.json())
  .then(data => {
    const tbody = document.querySelector('#attendanceTable tbody');
    tbody.innerHTML = '';

    data.forEach(record => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${record.course}</td>
        <td>${record.studentId}</td>
        <td>${record.name}</td>
        <td>${record.session}</td>
        <td>${new Date(record.time).toLocaleString()}</td>
      `;

      tbody.appendChild(row);
    });
  })
  .catch(err => {
    console.error(err);
    alert('Failed to load attendance records');
  });

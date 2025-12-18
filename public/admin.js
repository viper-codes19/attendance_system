fetch('/admin/attendance')
  .then(res => {
    if (!res.ok) throw new Error('Request failed');
    return res.json();
  })
  .then(data => {
    const tbody = document.querySelector('#attendanceTable tbody');
    tbody.innerHTML = '';

    if (data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5">No records yet</td></tr>';
      return;
    }

    data.forEach(item => {
      const row = `
        <tr>
          <td>${item.course}</td>
          <td>${item.studentId}</td>
          <td>${item.name}</td>
          <td>${item.session}</td>
          <td>${item.time}</td>
        </tr>
      `;
      tbody.innerHTML += row;
    });
  })
  .catch(err => {
    alert('Failed to load attendance records');
    console.error(err);
  });

function handleEnter(event) {
  if (event.key === "Enter") {
    submitAttendance();
  }
}

function submitAttendance() {
  const course = document.getElementById("course").value;
  const id = document.getElementById("studentId").value;
  const session = document.getElementById("session").value;

  const nameBox = document.getElementById("studentName");
  const msg = document.getElementById("msg");

  if (!course || !id || !session) {
    msg.innerText = "⚠️ Please fill all fields";
    msg.className = "error";
    return;
  }

  // Fetch student name
  fetch(`/student/${id}`)
    .then(res => res.json())
    .then(student => {
      if (!student.name) {
        nameBox.innerText = "❌ Student not found";
        msg.innerText = "";
        return;
      }

      nameBox.innerText = `✔ ${student.name}`;

      // Submit attendance
      fetch("/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          course,
          id,
          name: student.name,
          session
        })
      })
      .then(() => {
        msg.innerText = "✅ Attendance submitted successfully";
        msg.className = "success";

        // Clear ID field for next student
        document.getElementById("studentId").value = "";
      });
    });
}

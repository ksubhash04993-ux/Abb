const BACKEND = "https://beta-5hut.onrender.com";

function getResult() {
  const regNo = document.getElementById("regNo").value;
  const sem = document.getElementById("semester").value;
  const session = document.getElementById("session").value;

  if (!regNo || !sem || !session) {
    alert("All fields required");
    return;
  }

  // BEU exam held logic
  const examHeld =
    sem % 2 === 0
      ? `July/${parseInt(session) + 1}`
      : `Jan/${parseInt(session) + 1}`;

  // EXACT format jo BEU use karta hai
  const link =
    `/result-two/B.Tech.%20${sem}th%20Semester%20Examination,%20${session}` +
    `?semester=${sem}&session=${session}&exam_held=${encodeURIComponent(examHeld)}`;

  fetch(BACKEND + "/api/result", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      reg_no: regNo,
      link: link
    })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("output").innerText =
      JSON.stringify(data, null, 2);
  })
  .catch(err => {
    document.getElementById("output").innerText = "Error: " + err;
  });
}

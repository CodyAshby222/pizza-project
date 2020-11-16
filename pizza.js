// pizza object

// thank you section
const thankYouId = document.getElementById("thank-you-message");
let today = new Date();
let hours = today.getHours();
let minutes = today.getMinutes() + 30;
let am = "AM";
let time = `${hours}:${minutes} ${am}`;

function displayThankYou() {
  if (minutes > 59) {
    updateTime();
  }
  if (hours > 11) {
    updateMilitaryTime();
  }
  if (hours > 12) {
    updateMilitaryTimePt2();
  }
  thankYouId.innerHTML = `Your order will be available for pick up at: <br>
      ${time}`;
}

function updateTime() {
  minutes = minutes - 60;
  hours = hours + 1;
  time = `${hours}:${minutes} ${am}`;
}

function updateMilitaryTime() {
  am = "PM";
  time = `${hours}:${minutes} ${am}`;
}

function updateMilitaryTimePt2() {
  hours = hours - 12;
  time = `${hours}:${minutes} ${am}`;
}

displayThankYou();

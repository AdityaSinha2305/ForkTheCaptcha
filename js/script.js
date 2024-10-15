const changeTextBtn = document.querySelector(".changeText");
const readTextBtn = document.querySelector(".readText");
const code = document.querySelector("#code");
const captchaCanvas = document.querySelector("#captchaCanvas");
const ctx = captchaCanvas.getContext("2d");
const input = document.querySelector(".userInput input");
const submitbtn = document.querySelector(".btn");

let currentCaptcha = "";

// For generating captcha based on user selection
function generateCaptcha() {
  let selectedCaptcha = document.querySelector(
    'input[name="captchaType"]:checked'
  ).value;

  if (selectedCaptcha === "text") {
    captchaCanvas.style.display = "none";
    code.style.display = "block";
    code.textContent = createTextCaptcha(); // Generate text captcha
  } else {
    code.style.display = "none";
    captchaCanvas.style.display = "block";
    createImageCaptcha(); // Generate image captcha using canvas
  }
}

// For generating text captcha
function createTextCaptcha() {
  let letters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += letters[Math.floor(Math.random() * letters.length)];
  }
  currentCaptcha = captcha;
  return captcha;
}

// For generating image captcha using canvas
function createImageCaptcha() {
  let letters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += letters[Math.floor(Math.random() * letters.length)];
  }
  currentCaptcha = captcha;

  // Clear canvas before drawing new captcha
  ctx.clearRect(0, 0, captchaCanvas.width, captchaCanvas.height);

  // Set random background color
  ctx.fillStyle = getRandomColor();
  ctx.fillRect(0, 0, captchaCanvas.width, captchaCanvas.height);

  // Set text color and font
  ctx.font = "30px Arial";
  ctx.fillStyle = getRandomColor();

  // Add some distortion or random lines for more security
  for (let i = 0; i < 10; i++) {
    ctx.strokeStyle = getRandomColor();
    ctx.beginPath();
    ctx.moveTo(
      Math.random() * captchaCanvas.width,
      Math.random() * captchaCanvas.height
    );
    ctx.lineTo(
      Math.random() * captchaCanvas.width,
      Math.random() * captchaCanvas.height
    );
    ctx.stroke();
  }

  // Draw captcha text
  ctx.fillText(captcha, 50, 50);
}

// Helper function to generate random color
function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to reload captcha
function reloadCaptcha() {
  generateCaptcha(); // Generate captcha based on user selection
  input.value = ""; // Clear the input field when reloading
}

// For speaking the captcha
function speakCaptcha() {
  let text = "";
  for (let i = 0; i <= currentCaptcha.length; i++) {
    text += currentCaptcha.charAt(i) + " ";
  }
  return text;
}

// For validating the captcha
function validcaptcha() {
  responsiveVoice.setDefaultVoice("US English Female");
  responsiveVoice.setDefaultRate(0.75);
  let val = input.value;
  if (val == "") {
    responsiveVoice.speak("Please Enter the Captcha");
  } else if (val === currentCaptcha) {
    responsiveVoice.speak("Valid Captcha");
    confirm("Captcha is correct! Do you want to proceed?");
    reloadCaptcha();
  } else {
    responsiveVoice.speak("Invalid Captcha");
    confirm("Captcha is incorrect, please try again.");
    reloadCaptcha();
  }
}

// TEXT TO SPEECH RECOGNITION
submitbtn.addEventListener("click", () => {
  validcaptcha();
});

// For keydown===enter case
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    validcaptcha();
  }
});

// Trigger initial captcha generation on page load
window.addEventListener("load", () => {
  reloadCaptcha();
  setInterval(reloadCaptcha, 25000); // Automatically reload captcha every 25 seconds
});

readTextBtn.addEventListener("click", () => {
  let tex = speakCaptcha();
  responsiveVoice.setDefaultVoice("US English Female");
  responsiveVoice.setDefaultRate(0.75);
  responsiveVoice.speak(tex);
  responsiveVoice.speak("Please repeat the captcha");
});

// Refresh captcha when "change" button is clicked
changeTextBtn.addEventListener("click", () => {
  reloadCaptcha();
});

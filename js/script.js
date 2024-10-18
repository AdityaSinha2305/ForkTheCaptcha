const changeTextBtn = document.querySelector(".changeText");
const readTextBtn = document.querySelector(".readText");
const input = document.querySelector(".userInput input");
const submitbtn = document.querySelector(".btn");

let captchaTimeout;  // Declare a variable to hold the timeout ID
let generatedCaptcha = '';  // Store the generated CAPTCHA text here

const canvas = document.getElementById('captchaCanvas');
const ctx = canvas.getContext('2d');
const captchaImage = document.getElementById('captcha-image');

// Function to reload captcha
function reloadCaptcha() {
  generatedCaptcha = createCaptcha();  // Generate CAPTCHA text and store it
  drawCaptchaOnCanvas(generatedCaptcha);  // Draw it on the canvas
  input.value = "";  // Clear the input field when reloading
}

function drawCaptchaOnCanvas(captchaText) {
  // Clear canvas before drawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background (optional: you can add noise here)
  ctx.fillStyle = '#f2f2f2';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Set font and style for CAPTCHA text
  ctx.font = 'bold 40px Arial';
  ctx.fillStyle = '#333';
  ctx.textBaseline = 'middle';

  // Add random rotation to make it harder for bots
  let x = 20;
  for (let i = 0; i < captchaText.length; i++) {
    const char = captchaText.charAt(i);
    const rotation = Math.random() * 0.3 - 0.15;  // Random rotation between -0.15 and 0.15 radians
    ctx.save();
    ctx.translate(x, 30);  // Translate to center point
    ctx.rotate(rotation);  // Apply rotation
    ctx.fillText(char, 0, 0);  // Draw the character
    ctx.restore();
    x += 30;  // Move to the next position
  }

  // Convert canvas to image and display it
  captchaImage.src = canvas.toDataURL('image/png');
}

// Function to start the timeout for refreshing the CAPTCHA after 25 seconds
function startCaptchaTimeout() {
  clearTimeout(captchaTimeout);  // Clear any existing timeout
  captchaTimeout = setTimeout(() => {
    reloadCaptcha();
    startCaptchaTimeout();  // Restart the timeout to keep the loop going
  }, 25000);  // 25 seconds
}

// Set timeout when the page loads
window.addEventListener("load", () => {
  reloadCaptcha();  // Initial CAPTCHA load
  startCaptchaTimeout();  // Start the first 25-second timeout
});

// Modify the 'changeTextBtn' event listener to handle manual refresh
changeTextBtn.addEventListener("click", () => {
  reloadCaptcha();  // Manually refresh the CAPTCHA
  startCaptchaTimeout();  // Restart the timeout after the manual refresh
});

// For captcha generation
function createCaptcha() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return code;
}

// For speaking the captcha
function speakCaptcha() {
  let text = "";
  for (let i = 0; i < generatedCaptcha.length; i++) {
    text += generatedCaptcha.charAt(i) + " ";
  }
  return text;
}

// to check whether entered captcha is valid
function validcaptcha() {
  responsiveVoice.setDefaultVoice("US English Female");
  responsiveVoice.setDefaultRate(0.75);
  let val = input.value;
  if (val == "") {
    swal({
      title: "CAPTCHA NOT FOUND!",
      text: "Please enter the Text!",
      icon: "error",
      button: "Retry",
    });
    responsiveVoice.speak("Please Enter the Captcha");
  } else if (val === generatedCaptcha) {  // Use generatedCaptcha for validation
    swal({
      title: "VALID CAPTCHA!",
      text: "The captcha entered is valid!",
      icon: "success",
      button: "Proceed",
    });
    responsiveVoice.speak("Valid Captcha");
    reloadCaptcha();
    startCaptchaTimeout();  // Restart the timeout after successful validation
  } else {
    swal({
      title: "CAPTCHA INVALID!",
      text: "Please enter correct text!",
      icon: "error",
      button: "Retry",
    });
    responsiveVoice.speak("Invalid Captcha");
    reloadCaptcha();
    startCaptchaTimeout();  // Restart the timeout after failed validation
  }
}

// TEXT TO SPEECH RECOGNITION
submitbtn.addEventListener("click", () => {
  validcaptcha();
});

// for keydown===enter case
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    validcaptcha();
  }
});

readTextBtn.addEventListener("click", () => {
  let tex = speakCaptcha();
  responsiveVoice.setDefaultVoice("US English Female");
  responsiveVoice.setDefaultRate(0.75);
  responsiveVoice.speak(tex);
});

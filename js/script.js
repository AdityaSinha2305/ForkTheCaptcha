const changeTextBtn = document.querySelector(".changeText");
const readTextBtn = document.querySelector(".readText");
const input = document.querySelector(".userInput input");
const submitbtn = document.querySelector(".btn");

let captchaTimeout;  // Declare a variable to hold the timeout ID
let generatedCaptcha = '';  // Store the generated CAPTCHA text here

const canvas = document.getElementById('captchaCanvas');
const ctx = canvas.getContext('2d');
const captchaImage = document.getElementById('captcha-image');
canvas.width = 300; 
canvas.height = 100;

// Function to reload captcha
function reloadCaptcha() {
  generatedCaptcha = createCaptcha();  // Generate CAPTCHA text and store it
  drawCaptchaOnCanvas(generatedCaptcha);  // Draw it on the canvas
  input.value = "";  // Clear the input field when reloading
}

function drawCaptchaOnCanvas(captchaText) {
  // Clear the canvas before drawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background Image (add your image path here)
  const backgroundImage = new Image();
  backgroundImage.src = 'assets/img2.jpg';  // Update the path to your desired background image
  
  // Draw the background image on the canvas (fill the entire canvas)
  backgroundImage.onload = () => {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // This will stretch the image to cover the entire canvas

    // Set the font and style for CAPTCHA text
    ctx.font = 'bold 40px Arial'; // Set the font style
    ctx.fillStyle = '#fff'; // Set text color to white
    ctx.textBaseline = 'middle'; // Vertically center the text

    // Calculate the total width of the CAPTCHA text to center it
    const textWidth = ctx.measureText(captchaText).width;
    const x = (canvas.width - textWidth) / 2;  // Horizontally center the text
    const y = canvas.height / 2;  // Vertically center the text

    // Add random rotation to make it harder for bots
    let xOffset = x;  // Starting position for the first character
    for (let i = 0; i < captchaText.length; i++) {
      const char = captchaText.charAt(i);
      const rotation = Math.random() * 0.3 - 0.15;  // Random rotation between -0.15 and 0.15 radians
      ctx.save();
      ctx.translate(xOffset, y);  // Translate to center point
      ctx.rotate(rotation);  // Apply random rotation
      ctx.fillText(char, 0, 0);  // Draw the character
      ctx.restore();
      xOffset += 25;  // Space between characters
    }

    // Convert canvas to image and display it
    captchaImage.src = canvas.toDataURL('image/png');
  };
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
submitTextBtn.addEventListener("click", () => {
    validcaptcha();
});

// for keydown===enter case
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    validcaptcha();
  }
});

readTextBtn.addEventListener("click", () => {
  let text = speakCaptcha();
  responsiveVoice.setDefaultVoice("US English Female");
  responsiveVoice.setDefaultRate(0.75);
  responsiveVoice.speak(text);
  responsiveVoice.speak("Please repeat the captcha");
});


// For Math captcha
function createMathCaptcha() {
  let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let operators = ["+" , "-", "*"];

  let num1 = numbers[Math.floor(Math.random() * numbers.length)];
  let num2 = numbers[Math.floor(Math.random() * numbers.length)];
  let op = operators[Math.floor(Math.random() * operators.length)];

  let code = '';
  code = `${num1} ${op} ${num2}`;

  return code;
}

// to check whether entered math captcha is valid
function validMathCaptcha() {
  responsiveVoice.setDefaultVoice("US English Female");
  responsiveVoice.setDefaultRate(0.75);
  let val = mathInput.value;
  let correctAnswer = eval(mathCode.textContent);
  if (val == "") {
    swal({
      title: "CAPTCHA NOT FOUND!",
      text: "Please enter the value!",
      icon: "error",
      button: "Retry",
    });
    responsiveVoice.speak("Please Enter the value");
  } else if (val == correctAnswer) {
    swal({
      title: "VALID CAPTCHA!",
      text: "The value entered is correct!",
      icon: "success",
      button: "Proceed",
    });
    responsiveVoice.speak("Valid Captcha");
    reloadCaptcha();
    startCaptchaTimeout();  // Restart the timeout after successful validation
  } else {
    swal({
      title: "CAPTCHA INVALID!",
      text: "Please enter correct value!",
      icon: "error",
      button: "Retry",
    });
    responsiveVoice.speak("Invalid Captcha");
    reloadCaptcha();
    startCaptchaTimeout();  // Restart the timeout after failed validation
  }
}

submitMathBtn.addEventListener("click", () => {
  validMathCaptcha();
});

mathInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    validMathCaptcha();
  }
});

function speakMathCaptcha() {
  let text = "";
  for (let i = 0; i <= mathCode.textContent.length; i++) {
    text += mathCode.textContent.charAt(i) + " ";
  }
  return text;
}

readMathBtn.addEventListener("click", () => {
  let tex = speakMathCaptcha();
  responsiveVoice.setDefaultVoice("US English Female");
  responsiveVoice.setDefaultRate(0.75);
  responsiveVoice.speak(tex);
});

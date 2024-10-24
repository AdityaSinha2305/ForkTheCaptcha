const changeTextBtn = document.querySelector("#changeTextBtn");
const readTextBtn = document.querySelector("#readText");
const code = document.querySelector("#code");

const input = document.querySelector("#textbox");
const submitTextBtn = document.querySelector("#submitTextBtn");

const mathCode = document.querySelector("#mathCode");
const mathInput = document.querySelector("#mathInput");
const readMathBtn = document.querySelector("#readMath");
const submitMathBtn = document.querySelector("#submitMathBtn");
const changeMathBtn = document.querySelector("#changeMathBtn");


let captchaType = "text";

let captchaTimeout;  // Declare a variable to hold the timeout ID

let timerInterval;

// Function to reload captcha
function reloadCaptcha() {
  if (captchaType == "text") {
    code.textContent = createCaptcha();
    input.value = "";  // Clear the input field when reloading
  }
  else {
    mathCode.textContent = createMathCaptcha();
    mathInput.value = "";  // Clear the input field when reloading
  }
}


// Function to start and handle CAPTCHA timeout along with the countdown timer
function startCaptchaTimeout() {
  clearInterval(timerInterval);  // Clear any existing interval

  let seconds = 25;
  const ele = document.querySelector(`.countDownTimer.${captchaType}`);
  const timerText = document.querySelector(`.timerText.${captchaType}`);

  // Function to check if the input is empty when time is up
  function checkForResponse() {
    let userResponse;
    if (captchaType === "text") {
      userResponse = input.value;  // Check the text CAPTCHA input
    } else {
      userResponse = mathInput.value;  // Check the math CAPTCHA input
    }

    if (!userResponse) {
      // If no response is provided
      clearInterval(timerInterval);

      responsiveVoice.setDefaultVoice("US English Female");
      responsiveVoice.setDefaultRate(0.75);
      responsiveVoice.speak("Time is up. You did not enter the CAPTCHA in time. Please try again.");

      swal({
        title: "TIME'S UP!",
        text: "You did not enter the CAPTCHA in time. Please try again!",
        icon: "warning",
        button: "Retry",
      }).then(() => {
        // After the user closes the alert, reload CAPTCHA and restart the timer
        reloadCaptcha();
        startCaptchaTimeout();
      });
    }
  }

  // Start countdown
  timerInterval = setInterval(function () {
    seconds = seconds < 10 ? "0" + seconds : seconds;
    ele.innerHTML = `00 : ${seconds}s`;
    ele.style.color = seconds <= 10 ? "red" : "rgb(21, 204, 61)";
    timerText.style.color = seconds <= 10 ? "red" : "rgb(21, 204, 61)";

    if (seconds == 0) {
      clearInterval(timerInterval);  // Stop the timer
      checkForResponse();  // Check if there was any input when time is up
    }

    seconds--;
  }, 1000);
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

// Modify the 'changeMathBtn' event listener to handle manual refresh
changeMathBtn.addEventListener("click", () => {
  reloadCaptcha();  // Manually refresh the CAPTCHA
  startCaptchaTimeout();  // Restart the timeout after the manual refresh
});

// For captcha
function createCaptcha() {
  let letters = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
  ];

  let code = '';
  for (let i = 0; i < 6; i++) {
    let temp = letters[Math.floor(Math.random() * letters.length)];
    if (temp != undefined)
      code = code + temp;
  }
  return code;
}

// For speaking the captcha
function speakCaptcha() {
  let text = "";
  for (let i = 0; i <= code.textContent.length; i++) {
    text += code.textContent.charAt(i) + " ";
  }
  return text;
}

// to check whether entered captcha is valid
function validcaptcha() {

  responsiveVoice.setDefaultVoice("US English Female");
  responsiveVoice.setDefaultRate(0.75);
  let val = input.value;

  if (val == "") {

    responsiveVoice.speak("Please enter the CAPTCHA");
    swal({
      title: "CAPTCHA NOT FOUND!",
      text: "Please enter the Text!",
      icon: "error",
      button: "Retry",
    });
  } else if (val == code.textContent) {

    clearInterval(timerInterval);
    responsiveVoice.speak("Valid CAPTCHA");
    swal({
      title: "VALID CAPTCHA!",
      text: "The captcha entered is valid!",
      icon: "success",
      button: "Proceed",
    }).then(() => {
      const userResponse = confirm("Captcha is correct! Do you want to proceed?");
      if (userResponse === true) {
        window.location.href = "login.html";
      } else {
        reloadCaptcha();  // Reload the CAPTCHA
        startCaptchaTimeout();  // Resume the timer after the alert
      }
    });
  } else {

    clearInterval(timerInterval);  // Pause the timer during validation

    responsiveVoice.speak("Invalid CAPTCHA");
    swal({
      title: "CAPTCHA INVALID!",
      text: "Please enter correct text!",
      icon: "error",
      button: "Retry",
    }).then(() => {
      confirm("Captcha is incorrect, please try again.");
      reloadCaptcha();  // Reload CAPTCHA on failure
      startCaptchaTimeout();  // Resume the timer after the alert is dismissed
    });
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
  let operators = ["+", "-", "*"];

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
    responsiveVoice.speak("Please enter the value");
    swal({
      title: "CAPTCHA NOT FOUND!",
      text: "Please enter the value!",
      icon: "error",
      button: "Retry",
    });
  } else if (val == correctAnswer) {
    clearInterval(timerInterval);
    responsiveVoice.speak("Valid CAPTCHA");
    swal({
      title: "VALID CAPTCHA!",
      text: "The value entered is correct!",
      icon: "success",
      button: "Proceed",
    }).then(() => {
      const userResponse = confirm("Captcha is correct! Do you want to proceed?");
      if (userResponse === true) {
        window.location.href = "login.html";  // Redirect on successful validation
      } else {
        reloadCaptcha();  // Reload the CAPTCHA
        startCaptchaTimeout();  // Resume the timer after the alert is dismissed
      }
    });
  } else {

    clearInterval(timerInterval);

    responsiveVoice.speak("Invalid CAPTCHA");
    swal({
      title: "CAPTCHA INVALID!",
      text: "Please enter correct value!",
      icon: "error",
      button: "Retry",
    }).then(() => {
      confirm("Captcha is incorrect, please try again.");
      reloadCaptcha();  // Reload the CAPTCHA on failure
      startCaptchaTimeout();  // Resume the timer after the alert is dismissed
    });
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
  responsiveVoice.speak("Please enter the result of the math problem!");
});



// Toggle Captcha - Math and Text

const textCaptchaBtn = document.querySelector('#textCaptchaBtn');
const mathCaptchaBtn = document.querySelector('#mathCaptchaBtn');

const textCaptchaDiv = document.querySelector('#textCaptcha');
const mathCaptchaDiv = document.querySelector('#mathCaptcha');


textCaptchaDiv.style.display = "block";
mathCaptchaDiv.style.display = "none";

textCaptchaBtn.addEventListener("click", () => {
  captchaType = "text";
  textCaptchaDiv.style.display = "block";
  mathCaptchaDiv.style.display = "none";
  reloadCaptcha();
  startCaptchaTimeout();
});

mathCaptchaBtn.addEventListener("click", () => {
  captchaType = "math";
  textCaptchaDiv.style.display = "none";
  mathCaptchaDiv.style.display = "block";
  reloadCaptcha();
  startCaptchaTimeout();
});


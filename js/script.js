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

// Function to reload captcha
function reloadCaptcha() {
  if(captchaType == "text") {
    code.textContent = createCaptcha();
    input.value = "";  // Clear the input field when reloading
  }
  else {
    mathCode.textContent = createMathCaptcha(); 
    mathInput.value = "";  // Clear the input field when reloading
  }
}

// Function to start the timeout for refreshing the CAPTCHA after 25 seconds
function startCaptchaTimeout() {
  
  clearTimeout(captchaTimeout);  // Clear any existing timeout
  captchaTimeout = setTimeout(() => {
   
    startCaptchaTimeout(); 
    reloadCaptcha(); // Restart the timeout to keep the loop going
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
    swal({
      title: "CAPTCHA NOT FOUND!",
      text: "Please enter the Text!",
      icon: "error",
      button: "Retry",
    });
    responsiveVoice.speak("Please Enter the Captcha");
  } else if (val == code.textContent) {
    // swal({
    //   title: "VALID CAPTCHA!",
    //   text: "The captcha entered is valid!",
    //   icon: "success",
    //   button: "Proceed",
    // });
    swal({
      title: "VALID CAPTCHA!",
      text: "The captcha entered is valid! Do you want to proceed?",
      icon: "success",
      buttons: true,
    })
    .then((willProceed) => {
      if (willProceed) {
         window.location.href = "login.html";
      }
    });
    
    responsiveVoice.speak("Valid Captcha");
    // const userResponse = confirm("Captcha is correct! Do you want to proceed?");
    // if (userResponse === true) {

    //   window.location.href = "login.html"
    // }
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
    confirm("Captcha is incorrect, please try again.");
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
  responsiveVoice.speak("Please enter the result of the math problem!");
});



// Toggle Captcha - Math and Text

const textCaptchaBtn = document.querySelector('#textCaptchaBtn');
const mathCaptchaBtn = document.querySelector('#mathCaptchaBtn');

const textCaptchaDiv = document.querySelector('#textCaptcha');
const mathCaptchaDiv = document.querySelector('#mathCaptcha');


textCaptchaDiv.style.display = "block";
mathCaptchaDiv.style.display = "none";

textCaptchaBtn.addEventListener("click" , () => {
  captchaType = "text";
  textCaptchaDiv.style.display = "block";
  mathCaptchaDiv.style.display = "none";
  reloadCaptcha();
  startCaptchaTimeout();
});

mathCaptchaBtn.addEventListener("click" , () => {
  captchaType = "math";
  textCaptchaDiv.style.display = "none";
  mathCaptchaDiv.style.display = "block";
  reloadCaptcha();
  startCaptchaTimeout();
});
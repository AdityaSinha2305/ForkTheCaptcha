const code = document.querySelector('#code');
const input = document.querySelector('#textbox');
const captchaImage = document.querySelector('#captchaImage');

function refreshCaptcha() {
    // Generate a random number between 1 and 10,000
    const randomNumber = Math.floor(Math.random() * 10000) + 1;
    // Create the new captcha image path using the random number
    const newCaptcha = `assets/${randomNumber}.png?${Math.random()}`;
    // Update the captcha image source
    captchaImage.src = newCaptcha;
    // Update the code text (optional, can be updated to reflect the actual captcha if needed)
    code.textContent = "Avi6479"; // Replace this with the actual captcha value if applicable
}

function validateCaptcha() {
    const val = input.value;
    if (val === '') {
        alert("Please Enter the Captcha"); // Use alert for simplicity
    } else if (val === code.textContent) {
        alert("Valid Captcha");
    } else {
        alert("Invalid Captcha");
    }
}

// Simulate loading an image-based captcha on page load
window.addEventListener('load', refreshCaptcha);

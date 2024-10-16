
// window.addEventListener('createCaptcha', () => {
//     console.log('called');
// });

// // Dispatch the custom event
// const createCaptchaEvent = new Event('createCaptcha');
// console.log(window.dispatchEvent(createCaptchaEvent));
document.addEventListener("DOMContentLoaded", () => {
    styleCaptcha();
    console.log('called');
});
function createCaptchaa() {
    setTimeout(() => {
        styleCaptcha();
        console.log('createCaptcha called after delay');
    }, 50);
}
window.addEventListener('createCaptcha', createCaptchaa);

// Dispatch the custom event
const createCaptchaEvent = new Event('createCaptcha');
console.log(window.dispatchEvent(createCaptchaEvent));

const span = document.querySelector('.changeText i');
span.addEventListener('click', () => {
    // createCaptchaa();
    const createCaptchaEvent = new Event('createCaptcha');
    console.log(window.dispatchEvent(createCaptchaEvent));
    console.log('createCaptcha called');
});


function styleCaptcha() {
    const fonts = ['Arial', 'Verdana', 'Helvetica', 'Georgia', 'Times New Roman', 'Courier New'];
    const colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6'];
    const codeText = code.textContent.split('');
    code.textContent = '';
    codeText.forEach(letter => {
      const span = document.createElement('span');
      span.textContent = letter;
      span.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
      span.style.color = colors[Math.floor(Math.random() * colors.length)];
      code.appendChild(span);
    });
}
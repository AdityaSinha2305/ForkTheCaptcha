const changeTextBtn = document.querySelector('.changeText');
const readTextBtn = document.querySelector('.readText');
const code = document.querySelector('#code');
const input = document.querySelector('.userInput input');
const submitbtn = document.querySelector('.btn');
const progress = 0;
const profress_bar = document.getElementById('progress');



changeTextBtn.addEventListener('click', () => {
    code.textContent = createCaptcha();
    styleCaptcha();
});
window.addEventListener('load', () => {
    code.textContent = createCaptcha();
    styleCaptcha();
});


// For captcha
function createCaptcha()
{
    let letters = ['A','B','C','D','E','F','G','H','I','J','K','L',,'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9']

    let a = b = c = d = e = f = undefined;
    while (d === undefined) d = letters[Math.floor(Math.random() * letters.length)];
    while (a === undefined) a = letters[Math.floor(Math.random() * letters.length)];
    while (b === undefined) b = letters[Math.floor(Math.random() * letters.length)];
    while (c === undefined) c = letters[Math.floor(Math.random() * letters.length)];
    while (e === undefined) e = letters[Math.floor(Math.random() * letters.length)];
    while (f === undefined) f = letters[Math.floor(Math.random() * letters.length)];
    let code = a + b + c + d + e + f;
    return code; 
}

// For speaking the captcha
function speakCaptcha()
{ 
  let text ='';
  for(let i=0 ;i <=code.textContent.length; i++ )
  {    
    text+= code.textContent.charAt(i) +' ';
  }
  return text;
}


//TEXT TO SPEECH RECOGNITION
submitbtn.addEventListener('click' , () => {
    responsiveVoice.setDefaultVoice("US English Female");
    responsiveVoice.setDefaultRate(0.75);
    let val = input.value ;
    if(val =='')
    {
      //  alert('Please Enter the Text.');
        responsiveVoice.speak("Please Enter the Captcha");
    }
    else if(val==code.textContent){
      //  alert('Valid Code');
        responsiveVoice.speak("Valid Captcha");    
        code.textContent = createCaptcha();
        styleCaptcha();
        progress++;
    }
    else{
      //  alert('Invalid Code');
        responsiveVoice.speak("Invalid Captcha");
    }
})

readTextBtn.addEventListener('click',() => {
    let tex = speakCaptcha();
    responsiveVoice.setDefaultVoice("US English Female");
    responsiveVoice.setDefaultRate(0.75);
    responsiveVoice.speak(tex);
    // responsiveVoice.speak("Please repeat the captcha");
    
})


function styleCaptcha() {
  const fonts = ['Arial', 'Verdana', 'Helvetica', 'Georgia', 'Times New Roman', 'Courier New', 'Brush Script MT','Comic Sans MS', 'Papyrus', 'Impact', 'Chiller', 'Jokerman', 'Curlz MT', 'Harrington'];
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
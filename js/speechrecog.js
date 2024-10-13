var speechRecognition = window.webkitSpeechRecognition;

var recogniton = new speechRecognition();

var textbox = $("#textbox");

var instructions = $("#instructions");

var content = '';

recogniton.continuous = true;

// recognition is started
recogniton.onstart = function () {
    instructions.text("Voice recognition is on");
    // responsiveVoice.speak("Voice recognition is on");
}

recogniton.onspeechend = function () {
    instructions.text("No activity");
}

recogniton.onerror = function () {
    instructions.text("Try Again");
}

recogniton.onresult = function (event) {
    var current = event.resultIndex;

    var transcript = event.results[current][0].transcript;
    content += transcript;

    // Process each character and specify if it's uppercase or lowercase
    var processedContent = '';
    for (var i = 0; i < transcript.length; i++) {
        var char = transcript[i];
        
        // Check if the character is an alphabet letter
        if (char.match(/[a-zA-Z]/)) {
            if (char === char.toUpperCase()) {
                processedContent += `Capital ${char} `;
            } else {
                processedContent += `Small ${char} `;
            }
        } else {
            // If it's not a letter, just append it
            processedContent += char;
        }
    }

    // Update the content to be displayed in the textbox
    textbox.val(processedContent);
}

$("#start-btn").click(function (event) {
    if (content.length) {
        content += '';
    }
    recogniton.start();
});

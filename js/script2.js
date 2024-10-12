// For voice recognition
var speechRecognition = window.webkitSpeechRecognition

var  recogniton =  new speechRecognition();

var textbox =$("#textbox")   

var instructions = $("#instructions")

var content =''

recogniton.continuous =  true

// recognition is started

recogniton.onstart = function()
 {
    instructions.text("Voice recognition is on")
    //responsiveVoice.speak("Voice recognition is on");
}

recogniton.onspeechend = function()
{
    instructions.text("No activity")
}
recogniton.onerror = function()
    {
        instructions.text("Try Again")
    }
    recogniton.onresult = function(event){
        var current = event.resultIndex;

        var transcript = event.results[current][0].transcript

        content += transcript

        content =  content.toLowerCase();

        textbox.val(content)

        
    }



$("#start-btn").click(function(event)
{
    if(content.length)
    {
        content +=  ''
    }
    recogniton.start()
}) 

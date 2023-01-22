
let amplitudeMapped = 1;
let soundFile;
let interviewAudio;
let amplitude;
let isPlaying = false;
let bgSong;

var interview1text = [
    "So, my parents were born in Colombia...",
    "In a town called Santuario, in eastern Antioquia.",
    "My dad came from a very humble family...",
    "They lived near a rural community called Cruces.",
    "My dad went to primary school in Cruces...",
    "When his teacher realized how smart he was...",
    "She asked the town's priest to help him continue studying...",
    "Since in Cruces they only had a primary school.",
    "My dad? He was happy...",
    "Studying was very important for him.",
    "He was the only one in his family that finished high-school...",
    "With a lot of hardships, though...",
    "He'd iron his classmates' clothes...",
    "To be able to pay for his studies.",
    "My mom comes from a family from Santuario, as well...",
    "A family that was prosperous at the time...",
    "They had a tableware business.",
    "My mom grew up in a very big family...",
    "They were sixteen children.",
    "My grandma was very strict...",
    "And that influenced my mom's personality...",
    "I think her mom was simply too rigid and strict.",
    "So when my mom fell in love with my dad...",
    "Her mom and her brothers didn't accept him...",
    "Because he had darker skin.",
    "My mom's family had light skin...",
    "Blue eyes, green eyes...",
    "And also because he came from a poor family.",
    "So, in the beginning he'd visit her...",
    "But my grandma would sit in the window next to them...",
    "While they talked, she'd sit next to them.",
    "Eventually, they prohibited my dad from visiting...",
    "So he started sending her letters."
    ];    


$(document).ready(function(){

    bgSong = document.createElement('audio');
    bgSong.setAttribute('src', 'audio/song1.mp3');

    interviewAudio = $("#interviewAudio")[0];
    
    // Initialize p5
    new p5(amplitudeAudio);
    $("#mute").click(function(){
        soundFile.volume = soundFile.volume ? 0 : 1;
        bgSong.volume = soundFile.volume ? 0 : 1;
    });

    $("#ui").click(function(){
        if (isPlaying) {

            soundFile.pause();
            isPlaying = false;
        } else {

            soundFile.play();
            isPlaying = true;
        }
    });

    //temporary hover and clicks

    $("#startButton").click(function() {
        $("#intro").css("display", "none");
        $("#data-div").addClass("main-div");
        $("#legend").addClass("show-legend");
        $("#viz-div").addClass("main-div");

        bgSong.play();

        setTimeout(function(){
            soundFile.play();
            interviewAudio.play();
            interviewAudio.onplaying = function() {
                interviewAudio.muted = true;
              }        
            }, 4000);

        isPlaying = true;

        // subtitles(4000);
    });

    setInterval(function(){
        $(".amplitudeChange").css({
            "opacity": amplitudeMapped
        });
        console.log(amplitudeMapped)

    }, 100);

    //2
    breathe("sqBreathe");

    //3
    setTimeout(function(){
        breathe("sqBreathe");
        breathe("sqBreathe1");
    }, 4000);

    setInterval(function(){
        //1
        breathe("sqBreathe1");
        //2
        setTimeout(function(){
            breathe("sqBreathe");
        }, 4000);
        setTimeout(function(){
            //3
            breathe("sqBreathe");
            breathe("sqBreathe1");
        }, 8000);

    }, 12000);
});

function breathe(breatheNumber) {
    $("#centralSq").toggleClass(breatheNumber);
    $("#sq1").toggleClass(breatheNumber);
    $("#sq2").toggleClass(breatheNumber);
    $("#sq3").toggleClass(breatheNumber);
    $("#sq4").toggleClass(breatheNumber);
}


function amplitudeAudio(p) {
    p.preload = function(){
        soundFile = p.loadSound("audio/interview1.mp3");
        // soundFile = p.createVideo("audio/interview1.mp3", "captions/interview1.vtt", () => {
            // soundFile.loop();
            // soundFile.volume(1);
            // soundFile.showControls();
        // });
    };
    p.setup = function(){
        var canvas = p.createCanvas(400, 400);
        canvas.parent("canvas-container");
        amplitude = new p5.Amplitude();
        amplitude.setInput(soundFile);
        $("#viz-div").append(soundFile.elt);
    };

    p.draw = function() {
        // p.background(255,0,0);
        const level = amplitude.getLevel();
        amplitudeMapped = p.map(level, 0, 0.1, 0.2, 1);
        // p.fill(255);
        // p.textSize(18);
        // p.text("Amplitude level: " + amplitudeMapped, 10, 20);
        
        // const y = p.map(level, 0, 1, p.height, 0);
        // for (let x = 0; x < p.width; x++) {
        //     const noiseVal = p.noise(x * 0.01, p.frameCount * 0.01);
        //     const yoffset = p.map(noiseVal, 0, 1, -y/2, y/2);
        //     p.stroke(0);
        //     p.point(x, y + yoffset);
        // }
    }
}


function subtitles(seconds) {
    showCaption("subtitlesDiv", seconds-600);
    showCaption("subtitlesDiv2", (seconds*2)-600);
    hideCaption("subtitlesDiv", seconds*2-100);
    changeCaption("subtitlesDiv", (seconds*2)+900, "My dad came from a very humble family...");

    showCaption("subtitlesDiv", (seconds*3)+300);
    hideCaption("subtitlesDiv2", seconds*3+800);
    changeCaption("subtitlesDiv2", (seconds*3)+2000, "They lived near to a rural community called Cruces.");

    showCaption("subtitlesDiv2", (seconds*4)+700);
    hideCaption("subtitlesDiv", seconds*4+1200);
    changeCaption("subtitlesDiv", (seconds*4)+2200, "My dad went to primary school in Cruces...");
    
    showCaption("subtitlesDiv", (seconds*5)+1000);
    hideCaption("subtitlesDiv2", seconds*5+1500);
    changeCaption("subtitlesDiv2", (seconds*5)+2500, "When his teacher realized how smart he was...");

    showCaption("subtitlesDiv2", (seconds*6)+1200);
    hideCaption("subtitlesDiv", seconds*6+1700);
    changeCaption("subtitlesDiv", (seconds*6)+2700, "She asked the town's priest to help him continue studying...");

    showCaption("subtitlesDiv", (seconds*7)+1000);
    hideCaption("subtitlesDiv2", seconds*7+1500);
    changeCaption("subtitlesDiv2", (seconds*7)+2500, "Since in Cruces they only had a primary school.");
    
    //counter for the index of interview1text from [0 to 44]
    //counter for the seconds of the audio
    //if statements with each second in the video
}


function showCaption(divID, time) {
    setTimeout(function(){
        $("#"+divID).removeClass("subtitles-hide");
    }, time);
}

function hideCaption(divID, time) {
    setTimeout(function(){
        $("#"+divID).addClass("subtitles-hide");
    }, time);
}

function changeCaption(divID, time, newText) {
    setTimeout(function(){
        $("#"+divID).text(newText);
    }, time);
}

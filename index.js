var buttonColours = ["green","red","yellow","blue"];
var userParttern = []; // create this for userParttern.push when player click on the button
var gameParttern = []; // create this for gameParttern.push when we get random ColorChosen from random funtion
var gameLevel = 0;
var started = false;


function playSound(key){
    var audio = new Audio("sounds/"+ key +".mp3");
    audio.play();
}
$(".btn").click(function(){
    var key = $(this).attr("id"); // this link detect id value when the button got click
    playSound(key);
    userParttern.push(key);
    animatePress(key);
    checkAnswer(userParttern.length-1);
})


$(document).keypress(function(event){
    if(!started){
        $("#level-title").text("Level " + gameLevel);
        nextSequen();
        started = true;
    }
})

function nextSequen(){
 userParttern = [];
 gameLevel++;
 $("#level-title").text("Level " + gameLevel);
 var randomNumber = Math.floor(Math.random() * 4);
 var randomChosenColour = buttonColours[randomNumber];
 gameParttern.push(randomChosenColour);
 $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // for gameParttern animtion display for user to play
 playSound(randomChosenColour);
}

function checkAnswer(currentvalue){
    if(gameParttern[currentvalue] === userParttern[currentvalue]){
        if(gameParttern.length === userParttern.length){
            setTimeout(function(){
                nextSequen();
                },1000);
            }
        }else{
            playSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);
            gameOver();
        }
}

function gameOver(){
    gameParttern = [];
    gameLevel = 0;
    started = false;
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}
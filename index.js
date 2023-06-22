buttonColours = ["red", "blue", "green", "yellow"]
gamePattern = []
userClickedPattern = []

var level = 0
var gameStarted = false

function nextSequence() {
    level++
    $("#level-title").text("Level " + level);

    userClickedPattern = []

    var randomNumber = Math.floor(Math.random() * 4)

    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
}

$(".btn").on("click", function () {
    var userChosenColour = this.id
    userClickedPattern.push(userChosenColour) 
    playSound(userChosenColour)  
    animatePress("#" + userChosenColour)
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $(currentColor).addClass("pressed")
    setTimeout(function() {
        $(currentColor).removeClass("pressed")
      }, 100);  
}

$(document).on("keydown", function () {
    if (!gameStarted) {
        $("#level-title").text("Level " + level)
        nextSequence()
        gameStarted = true
    }
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success")
        if (gamePattern.length == userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    } else {
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200)
        $("#level-title").text("Game Over, Press Any Key to Restart")
        gameStarted = false
        startOver()
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
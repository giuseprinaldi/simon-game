let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let gameState = false;
let level = 0;

// Starting the Game

$(document).keydown(function() {
    if (gameState == false) {
        gameState = true;
        gameStart();
    } 
});




// User Click Inputs and Game Logic

$("div.btn").click(function(){
    let userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    makeSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});


// Game Start Function

function gameStart() {
    nextSequence();
}



// Check Answer Function

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence(); 
            }, 1000);  
        }
    } else {
        gameOver(); 
    } 
}  

// Game Over

function gameOver() {
    let wrong = new Audio('sounds/wrong.mp3');
    wrong.play();
    

    $("body").addClass("game-over");
    
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);

    $("h1").html("Game Over. <br> Press Any Key To Restart.");

    startOver();

}

// Start Over Function

function startOver() {
    level = 0;
    gamePattern.length = 0;
    gameState = false;
}



// Next Sequence Creator

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColor);

    level++;

    $("h1").text("Level " + level);

    userClickedPattern.length = 0;
}


// Animate Press

function animatePress(currentColor) {
    let pressedButton = ("." + currentColor);
    $(pressedButton).addClass("pressed");

    setTimeout(function(){
        $(pressedButton).removeClass("pressed");
    }, 100);
}



// Audio for each color

function makeSound(color) {
    switch (color) {
        case "red":
            let audioRed = new Audio("sounds/red.mp3");
            audioRed.play();
            break;
    
        case "blue":
            let audioBlue = new Audio('sounds/blue.mp3');
            audioBlue.play();
            break;

        case "green":
            let audioGreen = new Audio('sounds/green.mp3');
            audioGreen.play();
            break;

        case "yellow":
            let audioYellow = new Audio('sounds/yellow.mp3');
            audioYellow.play();
            break;

        default:
            let audioWrong= new Audio('sounds/wrong.mp3');
            audioWrong.play();
            break;
    }
}






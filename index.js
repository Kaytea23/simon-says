//Creates empty array for storing colors
let buttonColors = ["red", "blue", "green", "yellow"];
let simonPattern = [];
let userClickedPattern = [];
let gameStart = false;
let level = 1;
let speed = 400;

//select random number
function newSequence() {
  let randomNumber = Math.floor(Math.random() * 4);

  let randomChosenColor = buttonColors[randomNumber];
  simonPattern.push(randomChosenColor);
  animatePress(randomChosenColor);
  playSound(randomChosenColor);
}

$(".btn").on("click", function (e) {
  let userChosenColor = e.target.id;
  animatePress(userChosenColor);
  playSound(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
  checkLength();
});

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

$(document).keydown(function () {
  if (gameStart === false) {
    newSequence();
    gameStart = true;
    $("h1").text("Level " + level);
  }
});

//change the H1 to Follow Simon by clicking
//check if userclick = simon click
function checkAnswer(index) {
  if (simonPattern[index] === userClickedPattern[index]) {
    return true;
  } else {
    alert("game over. Your score " + level +". Try again");
    window.reloadPage();
  }
}

function checkLength() {
  if (simonPattern.length === userClickedPattern.length) {
    setTimeout(() => {
      simon();
      userClickedPattern = [];
    }, 1000);
  }
}

function simon() {
  level++;
  $("h1").text("Level " + level);

  simonPattern.forEach(function (value, i) {
    setTimeout(() => {
      animatePress(value);
      playSound(value);
    }, speed * i);
  });

  setTimeout(function () {
    newSequence();
  }, speed * simonPattern.length);
}

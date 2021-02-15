var gamePattern=[];

var buttonColours=["red", "blue", "green", "yellow"];

var userClickedPattern=[];

var level=0;

var first_key_press=true;

$(document).keydown(function(){
  if (first_key_press){
      first_key_press=false;
      $("h1").text("Level "+level);
      nextSequence();
  }
});

$(".btn").on("click", function(){
  var userChosenColour=$(this).attr("id");
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  var index=userClickedPattern.length-1;
  checkAnswer(index);
});

function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel]==gamePattern[currentLevel]){
    console.log("Success");
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    console.log("Wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level=0;
  gamePattern=[]
  first_key_press=true;
}

function nextSequence(){

  userClickedPattern=[];
  level++;
  $("h1").text("Level "+level);

  var randomNumber=Math.floor(Math.random()*4);

  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);


}

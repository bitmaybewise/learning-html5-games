var pingpong = {
  pressedKeys: [],
  scoreA: 0,
  scoreB: 0,
  ball: {
    speed: 5,
    x: 150,
    y: 100,
    directionX: 1,
    directionY: 1
  }
};

var KEY = {
  UP: 38,
  DOWN: 40,
  W: 87,
  S: 83
};

function moveRackets() {
  if(pingpong.pressedKeys[KEY.UP]) {
    var top = parseInt($('#racketB').css('top'));
    $('#racketB').css('top', top-5);
  }
  if(pingpong.pressedKeys[KEY.DOWN]) {
    var top = parseInt($('#racketB').css('top'));
    $('#racketB').css('top', top+5);
  }
  if(pingpong.pressedKeys[KEY.W]) {
    var top = parseInt($('#racketA').css('top'));
    $('#racketA').css('top', top-5);
  }
  if(pingpong.pressedKeys[KEY.S]) {
    var top = parseInt($('#racketA').css('top'));
    $('#racketA').css('top', top+5);
  }
}
function moveBall() {
  var playgroundHeight = parseInt($('#playground').height());
  var playgroundWidth  = parseInt($('#playground').width());
  var ball = pingpong.ball;

  if(ball.y + ball.speed * ball.directionY > playgroundHeight) {
    ball.directionY = -1;
  }
  if(ball.y + ball.speed * ball.directionY < 0) {
    ball.directionY = 1;
  }
  if(ball.x + ball.speed * ball.directionX > playgroundWidth) {
    ball.directionX = -1;
  }
  if(ball.x + ball.speed * ball.directionX < 0) {
    ball.directionX = 1;
  }
  
  ball.x += ball.speed * ball.directionX;
  ball.y += ball.speed * ball.directionY;

  var racketAX = parseInt($('#racketA').css('left')) + parseInt($('#racketA').css('width'));
  var racketAYTop = parseInt($('#racketA').css('top'));
  var racketAYBottom = racketAYTop + parseInt($('#racketA').css('height'));

  if(ball.x + ball.speed * ball.directionX < racketAX) {
    if(ball.y + ball.speed * ball.directionY <= racketAYBottom && 
       ball.y + ball.speed * ball.directionY >= racketAYTop) {
      ball.directionX = 1;
    }
  }

  var racketBX = parseInt($('#racketB').css('left'));
  var racketBYTop = parseInt($('#racketB').css('top'));
  var racketBYBottom = racketBYTop + parseInt($('#racketB').css('height'));

  if(ball.x + ball.speed * ball.directionX >= racketBX) {
    if(ball.y + ball.speed * ball.directionY <= racketBYBottom &&
       ball.y + ball.speed * ball.directionY >= racketBYTop) {
      ball.directionX = -1;
    }
  }

  if(ball.x + ball.speed * ball.directionX > playgroundWidth) {
    ball.x = 250;
    ball.y = 100;
    $('#ball').css({ 'left': ball.x, 'top': ball.y });
    ball.directionX = -1;
    pingpong.scoreA++;
    $('#scoreA').html(pingpong.scoreA);
  }
  if(ball.x + ball.speed * ball.directionX < 0) {
    ball.x = 150;
    ball.y = 100;
    $('#ball').css({ 'left': ball.x, 'top': ball.y })
    ball.directionX = 1;
    pingpong.scoreB++;
    $('#scoreB').html(pingpong.scoreB);
  }

  $('#ball').css({ 'left': ball.x, 'top': ball.y });
}

function gameloop() {
  moveBall();
  moveRackets();
}


$(function(){
  pingpong.timer = setInterval(gameloop, 30);

  $(document).keydown(function(e){
    pingpong.pressedKeys[e.which] = true;
  });
  $(document).keyup(function(e){
    pingpong.pressedKeys[e.which] = false;
  });
});

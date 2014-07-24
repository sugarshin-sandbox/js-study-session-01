(function() {

  var interval;
  var ballList = [];

  var BALL_FRICTION = 0.12;// 摩擦係数
  var BALL_SPRING = 0.005;// バネ係数

  var init = function() {

    var stage = document.getElementById('stage');

    var balls;
    var htmlStr = '';


    // ボール感覚
    var ballDist = 100;

    var stageW = stage.offsetWidth;
    var stageH = stage.offsetHeight;

    var ballXLen = Math.floor(stageW / ballDist);
    var ballYLen = Math.floor(stageH / ballDist);

    var x, y, i, l;

    var ballX;
    var ballY;

    for (x = 0; x < ballXLen; x++) {
      for (y = 0; y < ballYLen; y++) {
        htmlStr += '<div class="ball"></div>';
      }
    }

    stage.innerHTML = htmlStr;

    balls = document.querySelectorAll('.ball');

    ballX = -ballDist * 0.5;
    ballY = -ballDist * 0.5;

    for (i = 0, l = balls.length; i < l; i++) {

      if (i % ballYLen === 0) {
        ballX += ballDist;
        ballY = ballDist * 0.5;
      } else {
        ballY += ballDist;
      }

      ballList[i] = createBall(balls[i], ballX, ballY, BALL_FRICTION, BALL_SPRING);
    }

    startAnime();

    (function(){
      //各ボールに力を加える    
      var ball;
      var ballLen = ballList.length;
      while (ballLen > 0) {
        ballLen -= 1;
        ball = ballList[ballLen];
        ball.forced((Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 20);
      }
    })();
  };


  var startAnime = function() {
    interval = setInterval(onTimer ,15);
  };

  var stopAnime = function() {
    clearInterval(interval);
  };

  var onTimer = function() {
    var ball;
    var ballLen = ballList.length;

    while (ballLen > 0) {
      ballLen -= 1;
      ball = ballList[ballLen];
      ball.update();
    }
  };

  var createBall = function(elm, x, y, friction, spring) {
    var defaultX = x;
    var defaultY = y;

    var fx = 0;
    var fy = 0;

    var target = elm;

    var transform = function(x, y) {
      var value = 'translate3d(' +
                  x +
                  'px, ' +
                  y +
                  'px, 0)';
      return value;
    };

    var props = {
      x: x,
      y: y,
      vx: 0,
      vy: 0,
      ax: 0,
      ay: 0,
      forced: function(_fx, _fy) {
        fx = _fx;
        fy = _fy;
      },

      update: function() {
        // props.x += 1;

        // フックの法則（復元力は変化量に比例）
        var springFx = - (props.x - defaultX) * spring;
        var springFy = - (props.y - defaultY) * spring;

        // 力の合計（復元力 - 摩擦力）のぶんだけボールを加速
        props.ax = springFx - props.vx * friction + fx;
        props.ay = springFy - props.vy * friction + fy;

        props.vx += props.ax;
        props.vy += props.ay;

        props.x += props.vx;
        props.y += props.vy;

        target.style['-webkit-transform'] = transform(props.x, props.y);

        fx = 0;
        fy = 0;
      }
    };



    var init = function() {
      target.style['-webkit-transform'] = transform(x, y);
    };
 
    init();

    return props;
  };

  init();

})();

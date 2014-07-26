(function() {

  var ballList = [];

  var CreateBall = function(elm, x, y) {
    this.elm = elm;

    this.defaultX = x; this.defaultY = y;

    this.vx = 0; this.vy = 0;

    this.ax = 0; this.ay = 0;

    this.fx = 0; this.fy = 0;

    this.x = x; this.y = y;
  };



  var ballRender = function() {
    var stage = document.getElementById('stage');

    var fragment = document.createDocumentFragment();
    var div;

    var balls;

    // ボール感覚
    var ballDist = 100;

    var stageW = stage.offsetWidth;
    var stageH = stage.offsetHeight;

    var ballXLen = Math.floor(stageW / ballDist);
    var ballYLen = Math.floor(stageH / ballDist);

    var ballX, ballY;

    var x, y, i, l;

    for (x = 0; x < ballXLen; x++) {
      for (y = 0; y < ballYLen; y++) {
        div = document.createElement('div');
        div.className = 'ball';
        fragment.appendChild(div);
      }
    }

    stage.appendChild(fragment);

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

      ballList[i] = new CreateBall(balls[i], ballX, ballY);

      ballList[i].elm.style['-webkit-transform'] = ballList[i].transform(ballX, ballY);

    }
  };



  var reRender = (function() {
    var timer = false;

    return function() {
      if (timer !== false) {
        clearTimeout(timer);
      }
      timer = setTimeout(function() {
        ballRender();
      }, 100);
    };

  })();



  var animation = (function() {
    var interval;

    return {
      startAnime: function() {
        interval = setInterval(animation.onTimer ,15);
      },

      stopAnime: function() {
        clearInterval(interval);
      },

      onTimer: function() {
        var ball;
        var ballLen = ballList.length;

        while (ballLen > 0) {
          ballLen -= 1;
          ball = ballList[ballLen];
          ball.update();
        }

      }

    };

  })();



  CreateBall.prototype = (function() {

    var BALL_FRICTION = 0.12;// 摩擦係数
    var BALL_SPRING = 0.005;// バネ係数

    return {
      transform: function(x, y) {
        var value = 'translate3d(' +
                    x +
                    'px, ' +
                    y +
                    'px, 0)';
        return value;
      },

      forced: function(_fx, _fy) {
        this.fx = _fx;
        this.fy = _fy;
      },

      update: function() {

        // フックの法則（復元力は変化量に比例）
        var springFx = - (this.x - this.defaultX) * BALL_SPRING;
        var springFy = - (this.y - this.defaultY) * BALL_SPRING;

        // 力の合計（復元力 - 摩擦力）のぶんだけボールを加速
        this.ax = springFx - this.vx * BALL_FRICTION + this.fx;
        this.ay = springFy - this.vy * BALL_FRICTION + this.fy;

        this.vx += this.ax;
        this.vy += this.ay;

        this.x += this.vx;
        this.y += this.vy;

        this.elm.style['-webkit-transform'] = this.transform(this.x, this.y);

        this.fx = 0;
        this.fy = 0;
      }
    };

  })();



  ballRender();

  window.addEventListener('resize', reRender);

  // animation.startAnime();

  // (function(){
  //   //各ボールに力を加える    
  //   var ball;
  //   var ballLen = ballList.length;
  //   while (ballLen > 0) {
  //     ballLen -= 1;
  //     ball = ballList[ballLen];
  //     ball.forced((Math.random() - 0.5) * 20,
  //                 (Math.random() - 0.5) * 20);
  //   }

  // })();

})();

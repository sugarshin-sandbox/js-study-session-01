(function() {

  var stage = document.getElementById('stage');

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

    var fragment = document.createDocumentFragment();
    var div;

    var balls;

    // ボール感覚
    var ballDist = 50;

    var stageW = window.innerWidth;
    var stageH = window.innerHeight;

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

      ballList[i].elm.style['transform'] = ballList[i].transform(ballX, ballY);

    }
  };



  var reRender = (function() {
    var timer = false;

    return function() {
      if (timer !== false) {
        clearTimeout(timer);
      }
      timer = setTimeout(function() {

        while (stage.firstChild) {
          stage.removeChild(stage.firstChild);
        }
        ballRender();
      }, 100);
    };

  })();



  var animation = (function() {
    var interval;

    var mouseX = 0,
        mouseY = 0;

    var isMouseOn = false;

    return {
      startAnime: function() {
        animation.onTimer();
        interval = setTimeout(animation.startAnime, 15);
      },

      stopAnime: function() {
        clearTimeout(interval);
      },

      onTimer: function() {
        var ball;
        var ballLen = ballList.length;

        var distX, distY, dist;
        var rad;

        while (ballLen > 0) {
          ballLen -= 1;
          ball = ballList[ballLen];

          if (isMouseOn) {
            distX = ball.x - mouseX;
            distY = ball.y - mouseY;

            // ピタゴラスの定理
            dist = Math.sqrt((distX * distX) + (distY * distY));

            // マウス座標からボールへの角度
            rad = Math.atan2(distY, distX);

            ball.forced(
              (100 / dist) * Math.cos(rad),
              (100 / dist) * Math.sin(rad)
            );
          }

          ball.update();
        }

      },

      updateMousePosition: function(_this, e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
      },

      mouseOnFlagToggle: function() {
        isMouseOn = !isMouseOn;
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

        this.elm.style['transform'] = this.transform(this.x, this.y);

        this.fx = 0;
        this.fy = 0;
      }
    };

  })();



  ballRender();

  window.addEventListener('resize', reRender);

  animation.startAnime();

  stage.addEventListener(
    'mousemove',
    function(event) {
      animation.updateMousePosition(this, event);
    }
  );

  stage.addEventListener(
    'mouseover',
    function(event) {
      animation.mouseOnFlagToggle(this, event);
    }
  );

  stage.addEventListener(
    'mouseout',
    function(event) {
      animation.mouseOnFlagToggle(this, event);
    }
  );

})();

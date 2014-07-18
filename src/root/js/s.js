(function() {

  var init = function() {

    var stage = document.getElementById('stage');
    var balls;
    var ballList = [];
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

    ballX = -ballDist * .5;
    ballY = -ballDist * .5;

    for (i = 0, l = balls.length; i < l; i++) {

      if (i % ballYLen === 0) {
        ballX += ballDist;
        ballY = ballDist * .5;
      } else {
        ballY += ballDist;
      }

      ballList[i] = createBall(balls[i], ballX, ballY);
    }

  };

  var createBall = function(elm, x, y) {
    var props = {
      x: x,
      y: y
    };

    var init = function() {

      var target = elm;
      var transform = 'translate3d(' +
                      x +
                      'px, ' +
                      y +
                      'px, 0)';

      // if (!target.css) {
      //   target = $(elm);
      // }

      target.style['-webkit-transform'] = transform;
    };

    init();

    return props;
  };

  init();

})();

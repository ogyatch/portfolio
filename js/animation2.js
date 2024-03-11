window.setupAnimation = function(p, containerId) {
  let canvasWidth = 310;
  let canvasHeight = 232.5;
  let bgColor = '#f1e8e6';
  let textColor = '#361d32';
  let newBgColor = '#361d32';
  let newTextColor = '#f1e8e6';
  let waveSize = 0;
  let maxWaveSize;
  let changing = false;
  let waveCenterX, waveCenterY;
  let startFrame;

  p.setup = function() {
    let canvas = p.createCanvas(canvasWidth, canvasHeight);
    canvas.parent(containerId);
    p.textAlign(p.CENTER, p.CENTER);
    p.textFont('Poppins');
    p.textSize(21);
    maxWaveSize = p.dist(0, 0, p.width, p.height);
  };

  p.draw = function() {
    if (changing) {
      p.background(bgColor);
      p.fill(newBgColor);
      p.noStroke();

      let progress = (p.frameCount - startFrame) / 60; // 60 frames = 1 second
      progress = easeInOutCubic(progress); // Apply easing function
      let currentWaveSize = progress * maxWaveSize;

      p.ellipse(waveCenterX, waveCenterY, currentWaveSize * 2, currentWaveSize * 2);

      p.fill(textColor);
      p.text('Click', p.width / 2, p.height / 2);

      if (currentWaveSize >= maxWaveSize) {
        changing = false;
        [bgColor, newBgColor, textColor, newTextColor] = [newBgColor, bgColor, newTextColor, textColor]; // Swap colors
      }
    } else {
      p.background(bgColor);
      p.fill(textColor);
      p.text('Click', p.width / 2, p.height / 2);
    }
  };

  p.mouseClicked = function() {
    if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
      changing = true;
      waveCenterX = p.mouseX;
      waveCenterY = p.mouseY;
      startFrame = p.frameCount;
    }
  };

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - p.pow(-2 * t + 2, 3) / 2;
  }
};

// HTMLファイルでこのスクリプトを呼び出す場合は以下のようにします：
// new p5((p) => setupAnimation(p, 'containerId'));

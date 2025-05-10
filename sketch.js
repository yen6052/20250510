let circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 40; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      size: random(30, 50),
      color: color(random(100, 200), 0, 0), // 暗紅色
      speedX: random(-1, 1), // 水平移動速度
      speedY: random(-1, 1), // 垂直移動速度
      isScaling: false, // 是否正在縮放
      scaleFrame: 0, // 縮放的持續幀數
      originalSize: 0 // 記錄原始大小
    });
  }
}

function draw() {
  background('#FFECEC'); // 背景顏色改為 #FFECEC

  let sizeOffset = map(mouseX, 0, width, 20, 80); // 根據滑鼠位置調整大小範圍為 20 到 80

  for (let circle of circles) {
    // 更新位置
    circle.x += circle.speedX;
    circle.y += circle.speedY;

    // 邊界檢查，讓米奇圖案在畫布內反彈
    if (circle.x - circle.size / 2 < 0 || circle.x + circle.size / 2 > width) {
      circle.speedX *= -1; // 水平速度反向
    }
    if (circle.y - circle.size / 2 < 0 || circle.y + circle.size / 2 > height) {
      circle.speedY *= -1; // 垂直速度反向
    }

    // 檢測滑鼠與米奇的距離
    let distance = dist(mouseX, mouseY, circle.x, circle.y);
    if (distance < circle.size) {
      // 如果滑鼠靠近米奇，讓米奇向外彈開
      let angle = atan2(circle.y - mouseY, circle.x - mouseX);
      circle.speedX = cos(angle) * 3; // 彈開速度
      circle.speedY = sin(angle) * 3;
    }

    // 處理縮放動畫
    if (circle.isScaling) {
      circle.scaleFrame++;
      if (circle.scaleFrame <= 10) {
        circle.size += 2; // 放大
      } else if (circle.scaleFrame <= 20) {
        circle.size -= 2; // 縮小
      } else {
        circle.isScaling = false; // 停止縮放
        circle.scaleFrame = 0;
        circle.size = circle.originalSize; // 恢復原始大小
      }
    }

    let mainSize = circle.size + sizeOffset; // 主圓的大小隨滑鼠位置變化
    let earSize = mainSize * 0.5; // 耳朵的大小為主圓的一半

    fill(circle.color);
    noStroke();

    // 畫左耳
    ellipse(circle.x - mainSize * 0.5, circle.y - mainSize * 0.5, earSize);
    // 畫右耳
    ellipse(circle.x + mainSize * 0.5, circle.y - mainSize * 0.5, earSize);
    // 畫主圓
    ellipse(circle.x, circle.y, mainSize);
  }
}

function mousePressed() {
  for (let circle of circles) {
    let distance = dist(mouseX, mouseY, circle.x, circle.y);
    if (distance < circle.size) {
      // 如果點擊到米奇，觸發縮放動畫
      circle.isScaling = true;
      circle.scaleFrame = 0;
      circle.originalSize = circle.size; // 記錄原始大小
    }
  }
}
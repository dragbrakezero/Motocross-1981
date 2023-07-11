class Bird {
    constructor(ctx, x, y) {
      this.ctx = ctx;
      this.x = x;
      this.y = y;
      this.w = 60;
      this.h = 40;
      this.vx = 4;
      this.vy = 3;
      this.initialY = y;
  
      this.sprite = new Image();
      this.sprite.src = "/assets/img/bird.png";
      this.sprite.verticalFrames = 1;
      this.sprite.verticalFrameIndex = 0;
      this.sprite.horizontalFrames = 5;
      this.sprite.horizontalFrameIndex = 0;
  
      this.sprite.onload = () => {
        this.sprite.isReady = true;
        this.sprite.frameWidth = Math.floor(
          this.sprite.width / this.sprite.horizontalFrames
        );
        this.sprite.frameHeight = Math.floor(
          this.sprite.height / this.sprite.verticalFrames
        );
      };
  
      this.animationTick = 0;
    }
  
    move() {
      this.x -= this.vx;  
    }
  
    draw() {
      if (this.sprite.isReady) {
        let xPos = this.x;
        while (xPos < this.ctx.canvas.width) {
          this.ctx.drawImage(
            this.sprite,
            this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
            this.sprite.verticalFrameIndex * this.sprite.frameHeight,
            this.sprite.frameWidth,
            this.sprite.frameHeight,
            xPos,
            this.y,
            this.w,
            this.h
          );
          xPos += this.sprite.frameWidth + 1000;
        }
        this.animate();
      }
    }
  
    animate() {
      this.animationTick++;
  
      if (this.animationTick > MOTO_RUN_TICK) {
        this.animationTick = 0;
        this.sprite.horizontalFrameIndex++;
  
        if (
          this.sprite.horizontalFrameIndex >= this.sprite.horizontalFrames ||
          this.sprite.horizontalFrameIndex < 0
        ) {
          this.sprite.horizontalFrameIndex = 0;
        }
      }
    }

    collideWith(element) {
        if (
          this.x < element.x + element.w &&
          this.x + this.w > element.x &&
          this.y < element.y + element.h &&
          this.y + this.h > element.y
        ) {
          return true; 
        }
        return false; 
        }


  }
class Moto {
  constructor(ctx, x, y) {
    this.ctx = ctx;

    this.y0 = y;

    this.x = x;
    this.y = y;
    this.w = 100;
    this.h = 100;
    this.h0 = this.h;

    this.vx = 0;
    this.vy = 0;
    this.ay = MOTO_AY;

    this.score = 0;

    this.jumpSound = new Audio("/assets/audio/jump.mp3");

    this.sprite = new Image();
    this.sprite.src = "/assets/img/moto.png";
    this.sprite.verticalFrames = 2;
    this.sprite.verticalFrameIndex = 1;
    this.sprite.horizontalFrames = 3;
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

  onKeyDown(event) {
    switch (event.keyCode) {
      case KEY_SPACE:
        this.jump();
        break;
        case KEY_LEFT:
          this.vx = -MOTO_SPEED;
          break;
        case KEY_RIGHT:
          this.vx = MOTO_SPEED;
          break;
    }
  }

  onKeyUp(event) {
    switch (event.keyCode) {
      case KEY_SPACE:
        this.h = this.h0;
        break;
      case KEY_LEFT:
      case KEY_RIGHT:
        this.vx = 0;
        break;
    }
  }

  jump() {
    if (!this.isJumping()) {
      this.score += 10;
      this.vy = -MOTO_JUMP;
      this.jumpSound.play();
    }
  }

  isJumping() {
    return this.y < this.y0;
  }

  move() {
    this.vy += this.ay;
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + this.w > this.ctx.canvas.width) {
      this.x = this.ctx.canvas.width - this.w;
    }

    if (this.y > this.y0) {
      this.y = this.y0;
      this.vy = 0;
    }
  }

  draw() {
    if (this.sprite.isReady) {
      this.ctx.drawImage(
        this.sprite,
        this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
        this.sprite.verticalFrameIndex * this.sprite.frameHeight,
        this.sprite.frameWidth,
        this.sprite.frameHeight,
        this.x,
        this.y,
        this.w,
        this.h
      );

      this.animate();
    }

  }

  animate() {
    this.animationTick++;
  
    if (this.isJumping()) {
      this.sprite.verticalFrameIndex = 0;
      this.sprite.horizontalFrameIndex = 0; 
  
    } else if (this.animationTick > MOTO_RUN_TICK) {
      this.animationTick = 0;
      this.sprite.verticalFrameIndex = 1;
  
        this.sprite.horizontalFrameIndex++;
      if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
        this.sprite.horizontalFrameIndex = 0;
      }
    }
  }




  collideWith(element) {
    if (
      this.x + this.w > element.x &&
      this.x < element.x + element.w &&
      this.y + this.h > element.y &&
      this.y < element.y + element.h
    ) {
      return true;
    }
    return false;
  }

}

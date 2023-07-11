class Trunk {
    constructor(ctx, x, y) {
      this.ctx = ctx;
      this.x = x;
      this.y = y;
      this.w = 60;
      this.h = 40;
      this.vx = 2;
      this.vy = 3;
      this.initialY = y;

      this.sprite = new Image();
      this.sprite.src = "/assets/img/tronco.png";
      this.sprite.verticalFrames = 1;
      this.sprite.verticalFrameIndex = 0;
      this.sprite.horizontalFrames = 1;
      this.sprite.horizontalFrameIndex = 0;
      this.sprite.onload = () => {
        this.sprite.isReady = true;
      };
    }
  
    move() {
      this.x -= this.vx;  
      this.y = this.initialY + Math.sin(Date.now() / 500) * 2;
    }
  
    draw() {
      if (this.sprite.isReady) {
        let xPos = this.x;
        while (xPos < this.ctx.canvas.width) {
          this.ctx.drawImage(this.sprite, xPos, this.y, this.w, this.h);
          this.ctx.drawImage(this.sprite, xPos + 520, this.y +10, this.w, this.h);
          xPos += 830;
        }
      }
      
    }

    colideWith(element) {
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
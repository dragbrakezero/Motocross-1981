class Stone {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = 50; 
        this.h = 30;
        this.vx = 3;
        this.active = true;


        this.sprite = new Image();
        this.sprite.src = "/assets/img/stone.png";
        this.sprite.verticalFrames = 1;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrames = 1;
        this.sprite.horizontalFrameIndex = 0;

        this.sprite.onload = () => {
            this.sprite.isReady = true;
        }
    }

    move() {
        this.x -= this.vx;
    }

    draw() {       
        if (this.sprite.isReady) {
            let xPos = this.x; 
        
            while (xPos < this.ctx.canvas.width) {
              this.ctx.drawImage(this.sprite, xPos, this.y, this.w, this.h);
              xPos += 900; 
            }
          }
    }

    

}


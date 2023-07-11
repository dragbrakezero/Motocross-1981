class Tree {
    constructor(ctx) {
        this.ctx = ctx;

        this.x = 0;
        this.y = 80;

        this.w = 300;
        this.h = 300;

        this.vx = 2;

        this.sprite = new Image();
        this.sprite.src = "/assets/img/tree.png";
        this.sprite.onload = () => {
          this.sprite.isReady = true;
        };

        this.randomizePosition();
    }
    move() {
        this.x -= this.vx;

        if (this.x < -this.w) {
        this.randomizePosition();
        }
    }

    draw() {
        if (this.sprite.isReady) {
            this.ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
        }
    }

    randomizePosition() {
        const randomNum = Math.random();
        const numTrees = randomNum < 0.5 ? 1 : 2; 
    
        if (numTrees === 1) {
          this.x = this.ctx.canvas.width + Math.random() * 100; 
        } else if (numTrees === 2) {
          this.x = this.ctx.canvas.width + Math.random() * 500; 
        }
      }

}

class Game {
    constructor(ctx) {
      this.ctx = ctx;
      this.intervalId = undefined;
      this.tick = 60
  
      this.bg = new Background(ctx);
      this.moto = new Moto(ctx, 100, 300);
      this.obstacles = [];
      this.score = 0;
      this.trunk = new Trunk(ctx, 200, 410);
      this.bird = new Bird(ctx, 10, 200);
      this.tree = new Tree(ctx);
  
      this.gameSound = new Audio("/assets/audio/game.mp3");
      this.collisionSound = new Audio("/assets/audio/collision.mp3");

      this.drawTick = 10;

    }      
  
  
  
    start() {
      if(!this.intervalId) {
        this.intervalId = setInterval(() => {
          this.clear();
          this.move();
          this.draw();
          this.checkCollisions();
          this.addObstacles();
        }, 1000 / this.tick)
      }
      this.gameSound.play();
    }
    
    stop() {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  
  
    clear() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }
  
    draw() {
      this.drawTick++;

      this.bg.draw();
      this.tree.draw(); 
      this.moto.draw(); 
      this.trunk.draw(); 
      this.bird.draw();
      this.obstacles.forEach((obstacle) => obstacle.draw());

      this.ctx.font = '20px Arial';
      this.ctx.fillStyle = 'red';
      this.ctx.fillText('Score: ' + this.score, 10, 30);
    }

    addObstacles() {
      const randomValue = Math.random();
      
      if (randomValue < 0.01 && this.drawTick > 200) { 
        const stoneY = this.ctx.canvas.height - 122;
        const obstacle = new Stone(this.ctx, this.ctx.canvas.width, stoneY);
        this.obstacles.push(obstacle);  
      }
      
      const updateObstacles = [];
      
      for (let i = 0; i < this.obstacles.length; i++) {
        const obstacle = this.obstacles[i];
        if (obstacle.active) {
          obstacle.x -= 1;
      
          if (obstacle.x >= 0) {
            updateObstacles.push(obstacle);
          }
        }
      
        if (obstacle.x < 0) {
          this.score += 10;
          obstacle.active = false;
        }
      }
      this.obstacles = updateObstacles;
    }

    getRandomValue() {
      return Math.floor(Math.random() * 50) + 800;
    }

    move() {
      this.bg.move();
      this.moto.move();
      this.trunk.move();
      this.bird.move(); 
      this.tree.move();
      this.obstacles.forEach((obstacle) => obstacle.move());
    }
  
    checkCollisions() {
      const collideWithObstacle = this.obstacles.some((obstacle) =>
        this.moto.collideWith(obstacle)
      );
    
      const collideWithBird = this.moto.collideWith(this.bird);
    
      if (collideWithObstacle || collideWithBird) {
        this.collisionSound.play();
        this.gameOver();
      }
    }
  
    onKeyDown(event) {
      this.moto.onKeyDown(event);
    }
  
    onKeyUp(event) {
      this.moto.onKeyUp(event);
    }
  
    gameOver() {
      clearInterval(this.intervalId)
  
      this.ctx.font = "80px Arial";
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        "GAME OVER",
        this.ctx.canvas.width / 2,
        this.ctx.canvas.height / 2
      );

      this.ctx.font = "40px Arial";
      this.ctx.fillText(
        "Score :" + this.score,
        this.ctx.canvas.width / 2,
        this.ctx.canvas.height / 2 + 50
      );

      setTimeout(() => {
        window.location.href = "../../index.html";
      }, 4000);
    }
    
  }
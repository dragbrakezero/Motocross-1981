const ctx = document.getElementById('canvas').getContext('2d')

const game = new Game(ctx)

game.start()

window.addEventListener('keydown', event => {
  game.onKeyDown(event)
})

window.addEventListener('keyup', event => {
  game.onKeyUp(event)
})







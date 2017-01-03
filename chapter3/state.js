var maxHealth = 10
var maxFood = 10
var handSize = 5

function getWorldRatio () {
  return 1 / 1920 * window.innerWidth
}

var state = {
  turn: 1,
  currentPlayerId: 1,
  players: {
    1: {
      food: 10,
      health: 10,
      skipTurn: false,
      hand: [],
    },
    2: {
      food: 10,
      health: 10,
      skipTurn: false,
      hand: [],
    },
  },
  get currentPlayer () {
    return state.players[state.currentPlayerId]
  },
  get currentHand () {
    return state.currentPlayer.hand.map(id => cards[id])
  },
  worldRatio: getWorldRatio(),
  pool,
  get poolCount () {
    let result = 0
    for (let k in state.pool) {
      result += state.pool[k]
    }
    return result
  }
}

window.addEventListener('resize', () => {
  state.worldRatio = getWorldRatio()
})

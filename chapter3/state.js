var maxHealth = 10
var maxFood = 10
var handSize = 5

function getWorldRatio () {
  return 1 / 1920 * window.innerWidth
}

var state = {
  turn: 1,
  players: {
    1: {
      food: 10,
      health: 10,
      skipTurn: false,
      hand: [],
      lastPlayedCardId: null,
    },
    2: {
      food: 10,
      health: 10,
      skipTurn: false,
      hand: [],
      lastPlayedCardId: null,
    },
  },
  currentPlayerId: 1,
  get currentOpponentId () {
    return state.currentPlayerId === 1 ? 2 : 1
  },
  get currentPlayer () {
    return state.players[state.currentPlayerId]
  },
  get currentOpponent () {
    return state.players[state.currentOpponentId]
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
  },
  playedCard: false,
  overlayShown: false,
  showPlayerTurn: true,
  showLastPlay: false,
}

window.addEventListener('resize', () => {
  state.worldRatio = getWorldRatio()
})

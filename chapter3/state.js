var maxHealth = 10
var maxFood = 10
var handSize = 5
var cardUid = 0
var currentPlayingCard = null

var state = {
  // UI
  activeOverlay: null,
  // World
  worldRatio: getWorldRatio(),
  // Game
  ended: false,
  turn: 1,
  players: {
    1: {
      food: 10,
      health: 10,
      skipTurn: false,
      hand: [],
      lastPlayedCardId: null,
      dead: false,
    },
    2: {
      food: 10,
      health: 10,
      skipTurn: false,
      hand: [],
      lastPlayedCardId: null,
      dead: false,
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
    return state.currentPlayer.hand
  },
  get deadPlayers () {
    const list = []
    forEachPlayer(player => {
      if (player.dead) {
        list.push(player)
      }
    })
    return list
  },
  pile,
  get pileCount () {
    let result = 0
    for (let k in state.pile) {
      result += state.pile[k]
    }
    return result
  },
  canPlay: false,
}

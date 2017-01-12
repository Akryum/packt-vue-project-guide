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
  turn: 1,
  players: [
    {
      name: 'Anne of Cleves',
      food: 10,
      health: 10,
      skipTurn: false,
      skippedTurn: false,
      hand: [],
      lastPlayedCardId: null,
      dead: false,
    },
    {
      name: 'William the Bald',
      food: 10,
      health: 10,
      skipTurn: false,
      skippedTurn: false,
      hand: [],
      lastPlayedCardId: null,
      dead: false,
    },
  ],
  currentPlayerIndex: 0,
  get currentOpponentId () {
    return state.currentPlayerIndex === 0 ? 1 : 0
  },
  get currentPlayer () {
    return state.players[state.currentPlayerIndex]
  },
  get currentOpponent () {
    return state.players[state.currentOpponentId]
  },
  get currentHand () {
    return state.currentPlayer.hand
  },
  pile,
  get pileCount () {
    let result = 0
    for (let k in state.pile) {
      result += state.pile[k]
    }
    return result
  },
  discardPile: {},
  canPlay: false,
}

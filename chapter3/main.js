
// View
new Vue({
  name: 'game',
  el: '#app',
  template: `<div id="#app">
    <top-bar :turn="turn" :player="currentPlayerId" />

    <div class="world">
      <castle v-for="player in 2" :player="player" />
      <cloud v-for="index in 10" :index="(index - 1) % 5 + 1" />
      <div class="ocean" />
    </div>

    <transition name="hand">
      <hand v-if="!overlayShown" :cards="currentHand" @play="handlePlayCard" />
    </transition>

    <transition name="fade">
      <div class="overlay-background" v-if="overlayShown" />
    </transition>

    <transition name="zoom">
      <overlay v-if="showPlayerTurn" @close="handlePlayerTurnClose">
        <div class="big" v-if="currentPlayer.skipTurn">Player {{ currentPlayerId }} skips his turn!</div>
        <div class="big" v-else>Player {{ currentPlayerId }} turn</div>
        <div>Tap to continue</div>
      </overlay>
      <overlay v-else-if="showLastPlay" @close="handleLastPlayClose">
        <div>Player {{ currentOpponentId }} just played:</div>
        <card :card="lastPlayedCard" />
      </overlay>
    </transition>
  </div>`,
  data: state,
  computed: {
    lastPlayedCard () {
      return cards[this.currentOpponent.lastPlayedCardId]
    }
  },
  methods: {
    handlePlayCard (card, index) {
      playCard(card, index)
    },
    handlePlayerTurnClose () {
      this.showPlayerTurn = false
      this.showLastPlay = this.turn > 1
      if (!this.showLastPlay) {
        newTurn()
      }
    },
    handleLastPlayClose () {
      this.showLastPlay = false;
      newTurn()
    },
  },
  mounted () {
    // Draw hands
    for (let p = 1; p <= 2; p++) {
      drawInitialHand(state.players[p])
    }
  },
})

// Gameplay

function drawCard() {
  const choice = Math.round(Math.random() * (state.poolCount - 1))
  let	accumulation = 0
  for (let k in state.pool) {
    accumulation += state.pool[k]
    if (choice <= accumulation) {
      // Draw the card from the pool
      state.pool[k] --
      return k
    }
  }
}

function drawInitialHand(player) {
  for (let i = 0; i < handSize; i++) {
    player.hand.push(drawCard())
  }
}

function playCard(card, index) {
  if (!state.playedCard) {
    state.playedCard = true
    card.play(state.currentPlayer, state.currentOpponent)
    state.currentPlayer.lastPlayedCardId = card.id
    state.currentPlayer.hand.splice(index, 1)
    nextTurn()
  }
}

function nextTurn () {
  state.playedCard = false
  state.turn ++
  state.currentPlayerId = state.currentOpponentId
  state.showPlayerTurn = true
}

function newTurn () {
  if (state.currentPlayer.skipTurn) {
    state.currentPlayer.skipTurn = false
    nextTurn()
  }
}

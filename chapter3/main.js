// View
new Vue({
  name: 'game',

  el: '#app',

  template: `<div id="#app" :class="cssClass">
    <top-bar :turn="turn" :player="currentPlayerId" />

    <div class="world">
      <castle v-for="player in 2" :player="player" />
      <cloud v-for="index in 10" :index="(index - 1) % 5 + 1" />
      <div class="ocean" />
    </div>

    <transition name="hand">
      <hand v-if="!activeOverlay" :cards="currentHand" @play="handlePlayCard" @leave-transition-end="handleLeaveTransitionEnd" />
    </transition>

    <transition name="fade">
      <div class="overlay-background" v-if="activeOverlay" />
    </transition>

    <transition name="zoom" mode="out-in">
      <overlay v-if="activeOverlay === 'player-turn'" :key="activeOverlay" @close="handlePlayerTurnClose">
        <div class="big" v-if="currentPlayer.skipTurn">Player {{ currentPlayerId }} skips his turn!</div>
        <div class="big" v-else>Player {{ currentPlayerId }} turn</div>
        <div>Tap to continue</div>
      </overlay>

      <overlay v-else-if="activeOverlay === 'last-play'" :key="activeOverlay" @close="handleLastPlayClose">
        <div>Player {{ currentOpponentId }} just played:</div>
        <card :card="lastPlayedCard" />
      </overlay>
    </transition>
  </div>`,

  data: state,

  computed: {
    lastPlayedCard () {
      return cards[this.currentOpponent.lastPlayedCardId]
    },

    cssClass () {
      return {
        'can-play': this.canPlay,
      }
    },
  },

  methods: {
    handlePlayCard (card) {
      playCard(card)
    },

    handlePlayerTurnClose () {
      if (this.turn > 1) {
        this.activeOverlay = 'last-play'
      } else {
        newTurn()
      }
    },

    handleLastPlayClose () {
      newTurn()
    },

    handleLeaveTransitionEnd () {
      applyCard()
    },
  },

  mounted () {
    // Draw hands
    forEachPlayer(drawInitialHand)
  },
})

// Window resize handling
window.addEventListener('resize', () => {
  state.worldRatio = getWorldRatio()
})

// Gameplay

state.activeOverlay = 'player-turn'

function drawCard () {
  const choice = Math.round(Math.random() * (state.pileCount - 1))
  let	accumulation = 0
  for (let k in state.pile) {
    accumulation += state.pile[k]
    if (choice <= accumulation) {
      // Draw the card from the pile
      state.pile[k] --
      return {
        id: k,
        uid: cardUid++,
        data: cards[k],
      }
    }
  }
}

function drawInitialHand (player) {
  for (let i = 0; i < handSize; i++) {
    player.hand.push(drawCard())
  }
}

function playCard (card) {
  if (!state.playedCard) {
    state.canPlay = false
    currentPlayingCard = card

    // Remove the card from player hand
    const index = state.currentPlayer.hand.indexOf(card)
    state.currentPlayer.hand.splice(index, 1)

    // Add back the card to the pile
    addCardToPile(card.id)
  }
}

function addCardToPile (cardId) {
  if (typeof state.pile[cardId] === 'number') {
    state.pile[cardId] ++
  } else {
    state.pile[cardId] = 1
  }
}

function applyCard () {
  const card = currentPlayingCard
  // Apply card effect
  state.currentPlayer.lastPlayedCardId = card.id
  card.data.play(state.currentPlayer, state.currentOpponent)

  // Check if the stats (health, food) are not outside the boundaries
  forEachPlayer(checkStatsBounds)

  setTimeout(() => {
    // Check if the players are dead
    forEachPlayer(checkPlayerLost)

    if (state.deadPlayers.length !== 0) {
      endGame()
    } else {
      nextTurn()
    }
  }, 500)
}

function checkStatsBounds (player) {
  // Health
  if (player.health < 0) {
    player.health = 0
  } else if (player.health > maxHealth) {
    player.health = maxHealth
  }

  // Food
  if (player.food < 0) {
    player.food = 0
  } else if (player.food > maxFood) {
    player.food = maxFood
  }
}

function checkPlayerLost (player) {
  player.dead = (player.health === 0 || player.food === 0)
}

function nextTurn () {
  state.turn ++
  state.currentPlayerId = state.currentOpponentId
  state.activeOverlay = 'player-turn'
}

function newTurn () {
  state.activeOverlay = null
  if (state.currentPlayer.skipTurn) {
    // Skip turn
    state.currentPlayer.skipTurn = false
    nextTurn()
  } else if (state.turn > 2) {
    // Draw new card
    setTimeout(() => {
      state.currentPlayer.hand.push(drawCard())
      state.canPlay = true
    }, 800)
  } else {
    state.canPlay = true
  }
}

function endGame () {
  state.ended = true
}

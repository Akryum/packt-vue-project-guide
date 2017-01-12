// WORLD

function getWorldRatio () {
  return 1 / 1920 * window.innerWidth
}

// GAME

// Pile

function drawCard () {
  if (state.pileCount === 0) {
    refillPile()
  }

  const choice = Math.round(Math.random() * (state.pileCount - 1)) + 1

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

function addCardToPile (pile, cardId) {
  if (typeof pile[cardId] === 'number') {
    pile[cardId] ++
  } else {
    pile[cardId] = 1
  }
}

function refillPile () {
  Object.assign(state.pile, state.discardPile)
  state.discardPile = {}
}

// Card play

function applyCardEffect (card) {
  state.currentPlayer.lastPlayedCardId = card.id
  card.data.play(state.currentPlayer, state.currentOpponent)
  // Check if the stats (health, food) are not outside the boundaries
  state.players.forEach(checkStatsBounds)
}

// Player

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

function isOnePlayerDead () {
  return state.players.some(p => p.dead)
}

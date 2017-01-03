
// View
new Vue({
  name: 'game',
  el: '#app',
  template: `<div id="#app">
    <top-bar :turn="turn" :player="currentPlayerId" />

    <div class="world">
      <castle v-for="player in 2" :player="player" />
      <cloud v-for="index in 5" :index="index" />
    </div>

    <hand :cards="currentHand" />
  </div>`,
  data: state,
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

for (let p = 1; p <= 2; p++) {
  drawInitialHand(state.players[p])
}

Vue.component('top-bar', {
  template: `<div class="top-bar" :class="'player-' + player">
    <div class="player p1">Player 1</div>
    <div class="turn-counter">
      <img class="arrow" src="svg/turn.svg" />
      <div class="turn">Turn {{ turn }}</div>
    </div>
    <div class="player p2">Player 2</div>
  </div>`,
  props: ['turn', 'player'],
  computed: {
    opponent () {
      return this.player === 1 ? 2 : 1
    }
  }
})

function bubbleStyle () {
  return {
    top: (this.ratio * 220 + 40) * state.worldRatio + 'px',
  }
}

Vue.component('food-bubble', {
  template: `<div class="food-bubble" :style="bubbleStyle">
    <img src="svg/food-bubble.svg" />
    <div class="counter">{{ value }}</div>
  </div>`,
  props: ['value'],
  computed: {
    ratio () {
      return this.value / maxFood
    },
    bubbleStyle,
  },
})

Vue.component('health-bubble', {
  template: `<div class="health-bubble" :style="bubbleStyle">
    <img src="svg/health-bubble.svg" />
    <div class="counter">{{ value }}</div>
  </div>`,
  props: ['value'],
  computed: {
    ratio () {
      return this.value / maxHealth
    },
    bubbleStyle,
  },
})

Vue.component('card', {
  template: `<div class="card" :class="cssClass">
    <div class="title">{{ card.title }}</div>
    <img class="separator" src="svg/card-separator.svg" />
    <div class="description"><div v-html="card.description"></div></div>
  </div>`,
  props: ['card'],
  computed: {
    cssClass () {
      return [
        `type-${this.card.type}`,
      ]
    },
  },
})

Vue.component('hand', {
  template: `<div class="hand">
    <div class="cards">
      <card v-for="card of cards" :card="card" />
    </div>
  </div>`,
  props: ['cards'],
})

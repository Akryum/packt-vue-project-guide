Vue.component('castle', {
  template: `<div class="castle" :class="'player-' + player">
    <img class="building" :src="'svg/castle' + player + '.svg'" />
    <img class="ground" :src="'svg/ground' + player + '.svg'" />
    <castle-banners :player="player" />
  </div>`,
  props: ['player'],
})

Vue.component('castle-banners', {
  template: `<div class="banners">
    <!-- Food -->
    <img class="food-icon" src="svg/food-icon.svg" />
    <banner-bar class="food-bar" color="#288339" :value="foodRatio" />
    <food-bubble :value="food" />

    <!-- Health -->
    <img class="health-icon" src="svg/health-icon.svg" />
    <banner-bar class="health-bar" color="#9b2e2e" :value="healthRatio" />
    <health-bubble :value="health" />
  </div>`,
  props: ['player'],
  computed: {
    food () {
      return state.players[this.player].food
    },
    foodRatio () {
      return this.food / maxFood
    },
    health () {
      return state.players[this.player].health
    },
    healthRatio () {
      return this.health / maxHealth
    },
  }
})

Vue.component('banner-bar', {
  template: '#banner',
  props: ['color', 'value'],
  data () {
    return {
      height: 0,
    }
  },
  computed: {
    targetHeight () {
      return 220 * this.value + 40
    },
  },
  watch: {
    targetHeight (newValue, oldValue) {
      const vm = this
      new TWEEN.Tween({ value: oldValue })
        .easing(TWEEN.Easing.Cubic.InOut)
        .to({ value: newValue }, 500)
        .onUpdate(function () {
          vm.height = this.value.toFixed(0)
        })
        .start()
    },
  },
  created () {
    this.height = this.targetHeight
  },
})

Vue.component('cloud', {
  template: `<div class="cloud" :class="'cloud-' + index" :style="style">
    <img :src="'svg/cloud' + index + '.svg'" />
  </div>`,
  props: ['index'],
  data () {
    // Random animation speed
    const animationDuration = Math.random() * 120 + 120

    return {
      style: {
        animationDuration: animationDuration + 's',
        // Random animation midway starting point
        animationDelay: - Math.random() * 100 * animationDuration + 's',
        // Random position
        top: Math.random() * (window.innerHeight-300) + 115 + 'px',
        left: Math.random() * window.innerWidth + 'px',
      },
    }
  },
})

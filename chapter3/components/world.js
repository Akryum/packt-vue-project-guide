Vue.component('castle', {
  template: `<div class="castle" :class="'player-' + index">
    <img class="building" :src="'svg/castle' + index + '.svg'" />
    <img class="ground" :src="'svg/ground' + index + '.svg'" />
    <castle-banners :player="player" />
  </div>`,
  props: ['player', 'index'],
})

Vue.component('castle-banners', {
  template: `<div class="banners">
    <!-- Food -->
    <img class="food-icon" src="svg/food-icon.svg" />
    <banner-bar class="food-bar" color="#288339" :value="foodRatio" />
    <food-bubble :value="player.food" />

    <!-- Health -->
    <img class="health-icon" src="svg/health-icon.svg" />
    <banner-bar class="health-bar" color="#9b2e2e" :value="healthRatio" />
    <health-bubble :value="player.health" />
  </div>`,
  props: ['player'],
  computed: {
    foodRatio () {
      return this.player.food / maxFood
    },
    healthRatio () {
      return this.player.health / maxHealth
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

const cloudAnimationDurations = {
  min: 5000,
  max: 100000,
}

Vue.component('cloud', {
  template: `<div class="cloud" :class="'cloud-' + index" :style="style">
    <img :src="'svg/cloud' + index + '.svg'" @load="initPosition" />
  </div>`,
  props: ['index'],
  data () {
    return {
      style: {
        transform: 'none',
        zIndex: 0,
      },
    }
  },
  methods: {
    setPosition (left, top) {
      // Use transform for better performance
      this.style.transform = `translate(${left}px, ${top}px)`
    },

    initPosition () {
      // Element width
      const width = this.$el.clientWidth
      this.setPosition(-width, 0)
    },

    startAnimation (delay = 0) {
      const vm = this

      // Element width
      const width = this.$el.clientWidth

      // Random animation duration
      const { min, max } = cloudAnimationDurations
      const animationDuration = Math.random() * (max - min) + min

      // Bing faster clouds forward
      this.style.zIndex = max - animationDuration

      // Random position
      const top = Math.random() * (window.innerHeight * 0.4) + 115

      new TWEEN.Tween({ value: -width })
        .to({ value: window.innerWidth }, animationDuration)
        .delay(delay)
        .onUpdate(function () {
          vm.setPosition(this.value, top)
        })
        .onComplete(() => {
          // With a random delay
          this.startAnimation(Math.random() * 10000)
        })
        .start()
    },
  },
  mounted () {
    // We start the animation with a negative delay
    // So it begins midway
    this.startAnimation(-Math.random() * cloudAnimationDurations.min)
  },
})

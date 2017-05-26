<template>
  <div class="app-layout">
    <NavMenu />
    <router-view />
  </div>
</template>

<script>
import NavMenu from './NavMenu.vue'

export default {
  components: {
    NavMenu,
  },
}
</script>

<style lang="stylus">
@import '../style/main';
</style>

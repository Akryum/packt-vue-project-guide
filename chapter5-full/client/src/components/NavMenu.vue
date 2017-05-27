<template>
  <nav class="menu">
    <router-link :to="{name: 'home'}" exact>Home</router-link>
    <router-link :to="{name: 'faq'}">FAQ</router-link>
    <router-link :to="{name: 'tickets'}">Support tickets</router-link>
    <div class="spacer"></div>

    <template v-if="$state.user">
      <a>{{ $state.user.username }}</a>
      <a @click="logout">Logout</a>
    </template>
    <router-link v-else :to="{name: 'login'}">Login</router-link>
  </nav>
</template>

<script>
export default {
  methods: {
    async logout () {
      const result = await this.$fetch('logout')
      if (result.ok) {
        this.$state.user = null
        // Return to home if page is private
        if (this.$route.matched.some(m => m.meta.private)) {
          this.$router.push({ name: 'home' })
        }
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '../style/imports';

nav {
  padding: 16px 32px 0;
  h-box();
}

a {
  text-decoration: none;
  border-bottom: solid 2px transparent;
  display: inline-block;
  padding: 12px 16px 10px;

  &.router-link-active {
    border-bottom-color: $primary-color;
  }
}

.spacer {
  flex: 100% 1 1;
}
</style>

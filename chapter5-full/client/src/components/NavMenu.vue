<template>
  <nav class="menu">
    <router-link :to="{name: 'home'}" exact>Home</router-link>
    <router-link :to="{name: 'faq'}">FAQ</router-link>
    <router-link :to="{name: 'tickets'}">Support tickets</router-link>
    <div class="spacer"></div>
    <router-link :to="{name: 'login'}">Login</router-link>
  </nav>
</template>

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

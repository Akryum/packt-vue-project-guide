<template>
  <main class="login">
    <h1>Please login to continue</h1>
    <SmartForm :title="title" :operation="operation" :valid="valid">
      <div class="row">
        <input name="username" v-model="username" placeholder="Username" required/>
      </div>
      <div class="row">
        <input name="password" type="password" v-model="password" placeholder="Password" required/>
      </div>
      <div class="row" v-if="mode === 'signup'">
        <input name="verify-password" type="password" v-model="password2" placeholder="Retype Password" required/>
      </div>
      <div class="row" v-if="mode === 'signup'">
        <input name="email" type="email" v-model="email" placeholder="Email" required/>
      </div>

      <template slot="actions">
        <template v-if="mode === 'login'">
          <button type="button" class="secondary" @click="mode = 'signup'">Sign up</button>
          <button type="submit" :disabled="!valid || busy">Login</button>
        </template>
        <template v-else-if="mode === 'signup'">
          <button type="button" class="secondary" @click="mode = 'login'">Back to login</button>
          <button type="submit" :disabled="!valid || busy">Create account</button>
        </template>
      </template>
    </SmartForm>
  </main>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      password2: '',
      email: '',

      busy: false,
      error: null,

      mode: 'login',
    }
  },

  computed: {
    title () {
      switch (this.mode) {
        case 'login': return 'Login'
        case 'signup': return 'Create a new account'
      }
    },

    valid () {
      return !!this.username && !!this.password &&
      (this.mode !== 'signup' || (!!this.email && this.password === this.password2))
    }
  },

  methods: {
    async operation() {
      await this[this.mode]()
    },

    async login () {
      this.$state.user = await this.$fetch('login', {
        method: 'POST',
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })
      this.$router.replace(this.$route.params.wantedRoute || { name: 'home' })
    },

    async signup () {
      await this.$fetch('signup', {
        method: 'POST',
        body: JSON.stringify({
          username: this.username,
          password: this.password,
          email: this.email,
        }),
      })
      this.$router.replace(this.$route.params.wantedRoute || { name: 'home' })
    },
  }
}
</script>

<style lang="stylus" scoped>
@import '../style/imports';

form {
  >>> section {
    max-width: 400px;
  }
}
</style>

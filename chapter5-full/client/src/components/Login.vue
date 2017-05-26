<template>
  <main class="login">
    <h1>Please login to continue</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <input v-model="username" placeholder="Username" required/>
      </div>
      <div>
        <input type="password" v-model="password" placeholder="Password" required/>
      </div>

      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  </main>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
    }
  },

  methods: {
    handleSubmit() {
      if (this.username && this.password) {
        // TODO
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
form {
  max-width: 300px;

  > div {
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }
}
</style>

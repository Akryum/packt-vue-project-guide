<template>
  <main class="faq">
    <h1>Frenquently Asked Questions</h1>

    <Loading v-if="remoteDataBusy"/>
    <section v-else class="list">
      <article v-for="question of questions">
        <h2 v-html="question.title"></h2>
        <p v-html="question.content"></p>
      </article>
    </section>
  </main>
</template>

<script>
import RemoteData from '../mixins/RemoteData'

export default {
  mixins: [
    RemoteData({
      questions: 'questions',
    })
  ],

  /* data () {
    return {
      questions: [],
    }
  },

  async created () {
    const result = await this.$fetch('questions')
    this.questions = await result.json()
  }, */
}
</script>

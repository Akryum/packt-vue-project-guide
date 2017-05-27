<template>
  <main class="faq">
    <h1>Frenquently Asked Questions</h1>

    <transition name="zoom" appear>
      <Loading v-if="remoteDataBusy" class="page"/>
    </transition>

    <section class="list">
      <article v-for="question of questions">
        <h2 v-html="question.title"></h2>
        <p v-html="question.content"></p>
      </article>
    </section>
  </main>
</template>

<script>
import RemoteData from '../mixins/RemoteData'
import PersistantData from '../mixins/PersistantData'

export default {
  name: 'FAQ',

  mixins: [
    RemoteData({
      questions: 'questions',
    }),
    PersistantData([
      'questions',
    ]),
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

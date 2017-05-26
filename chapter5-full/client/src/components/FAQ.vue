<template>
  <main class="faq">
    <h1>Frenquently Asked Questions</h1>
    <section class="list">
      <article v-for="question of questions">
        <h2 v-html="question.title"></h2>
        <p v-html="question.content"></p>
      </article>
    </section>
  </main>
</template>

<script>
export default {
  data () {
    return {
      questions: [],
    }
  },

  async created () {
    const result = await fetch('http://localhost:3000/questions')
    this.questions = await result.json()
  },
}
</script>

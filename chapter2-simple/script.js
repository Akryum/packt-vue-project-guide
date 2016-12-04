// New VueJS instance
new Vue({
  name: 'notebook',

  // CSS selector of the root DOM element
  el: '#notebook',

  // Some data
  data () {
    return {
      content: localStorage.getItem('content') || 'This is a note',
    }
  },

  // Computed properties
  computed: {
    notePreview () {
      // Markdown rendered to HTML
      return marked(this.content)
    },
  },

  // Change watchers
  watch: {
    // Let's save the selection too
    content (val) {
      localStorage.setItem('content', val)
    },
  },
})

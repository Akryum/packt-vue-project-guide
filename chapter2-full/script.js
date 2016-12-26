
Vue.filter('date', time => moment(time).format('DD/MM/YY, HH:mm'))

// New VueJS instance
new Vue({
  name: 'notebook',

  // CSS selector of the root DOM element
  el: '#notebook',

  // Some data
  data () {
    return {
      // These are loaded from localStorage and have a default value
      // Don't forget the JSON parsing for the notes array
      notes: JSON.parse(localStorage.getItem('notes')) || [],
      selectedId: localStorage.getItem('selected-id') || null,
    }
  },

  // Computed properties
  computed: {
    selectedNote () {
      // We return the matching note with selectedId
      return this.notes.find(note => note.id === this.selectedId)
    },

    notePreview () {
      // Markdown rendered to HTML
      return this.selectedNote ? marked(this.selectedNote.content) : ''
    },

    sortedNotes () {
      return this.notes.concat().sort((a, b) => a.created - b.created)
      .sort((a, b) => (a.favorite === b.favorite)? 0 : a.favorite? -1 : 1)
    },

    linesCount () {
      if (this.selectedNote) {
        return this.selectedNote.content.split(/\r\n|\r|\n/).length
      }
    },

    wordsCount () {
      if (this.selectedNote) {
        var s = this.selectedNote.content
        s = s.replace(/\n/g, ' ')
        s = s.replace(/(^\s*)|(\s*$)/gi, '') //exclude start and end white-space
        s = s.replace(/[ ]{2,}/gi, ' ') // 2 or more space to 1
        return s.split(' ').length
      }
    },

    charactersCount () {
      if (this.selectedNote) {
        return this.selectedNote.content.split('').length
      }
    },
  },

  // Change watchers
  watch: {
    // When our notes change, we save them
    notes: {
      // The method name
      handler: 'saveNotes',
      // We need this to watch each note's properties inside the array
      deep: true,
    },
    // Let's save the selection too
    selectedId (val, oldVal) {
      localStorage.setItem('selected-id', val)
    },
  },

  methods:{
    // Add a note with some default content and select it
    addNote () {
      const time = Date.now()
      // Default new note
      const note = {
        id: String(time),
        title: 'New note ' + (this.notes.length + 1),
        content: '**Hi!** This notebook is using [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for formatting!',
        created: time,
        favorite: false,
      }
      // Add
      this.notes.push(note)
      // Select
      this.selectNote(note)
    },

    // Remove the selected note and select the next one
    removeNote () {
      if (this.selectedNote && confirm('Delete the note?')) {
        // Remove the note in the notes array
        const index = this.notes.indexOf(this.selectedNote)
        if (index !== -1) {
          this.notes.splice(index, 1)
        }

        // If we found the note in the array and
        // if the array is still not empty
        // we select the next note in the array
        if (index !== -1 && this.notes.length !== 0) {
          // Don't get past the array boundaries
          const i = Math.min(index, this.notes.length - 1)
          // Select the next note
          this.selectedId = this.notes[i].id
        } else {
          // Unselect
          this.selectedId = null
        }
      }
    },

    selectNote (note) {
      // This will update the 'selectedNote' computed property
      this.selectedId = note.id
    },

    saveNotes () {
      // Don't forget to stringify to JSON before storing
      localStorage.setItem('notes', JSON.stringify(this.notes))
      console.log('Notes saved!', new Date())
    },

    favoriteNote () {
      this.selectedNote.favorite = !this.selectedNote.favorite
    },
  },
})

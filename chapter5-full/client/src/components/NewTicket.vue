<template>
  <div class="new-ticket">
    <form @submit.prevent="submit">
      <h2>New ticket</h2>
      <div class="row">
        <input name="title" v-model="title" placeholder="Short description (max 100 chars)" maxlength="100" required/>
      </div>
      <div class="row">
        <textarea name="description" v-model="description" placeholder="Describe your problem in details" required rows="4"/>
      </div>

      <div class="actions">
        <router-link tag="button" :to="{name: 'tickets'}" class="secondary">Go back</router-link>
        <button type="submit" :disabled="!valid">Send ticket</button>
      </div>
    </form>
  </div>
</template>

<script>
import PersistantData from '../mixins/PersistantData'

export default {
  name: 'NewTicket',

  mixins: [
    PersistantData([
      'title',
      'description',
    ]),
  ],

  data () {
    return {
      busy: false,
      title: '',
      description: '',
    }
  },

  computed: {
    valid () {
      return !!this.title && !!this.description
    },
  },

  methods: {
    submit () {
      // TODO
      if (this.valid) {
        this.busy = true

        this.busy = false
        // Reset fields
        this.title = this.description = ''
      }
    },
  },
}
</script>

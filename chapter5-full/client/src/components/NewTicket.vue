<template>
  <div class="new-ticket">
    <SmartForm title="New ticket" :operation="operation" :valid="valid">
      <div class="row">
        <input name="title" v-model="title" placeholder="Short description (max 100 chars)" maxlength="100" required/>
      </div>
      <div class="row">
        <textarea name="description" v-model="description" placeholder="Describe your problem in details" required rows="4"/>
      </div>

      <template slot="actions">
        <router-link tag="button" :to="{name: 'tickets'}" class="secondary">Go back</router-link>
        <button type="submit" :disabled="!valid">Send ticket</button>
      </template>

    </SmartForm>
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
    async operation () {
      // TODO
      this.title = this.description = ''
    },
  },
}
</script>

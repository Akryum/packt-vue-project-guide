<template>
  <div class="tickets">
    <Loading v-if="remoteDataBusy"/>
    <div class="empty" v-else-if="tickets.length === 0">
      You don't have any ticket yet.
    </div>
    <section v-else class="tickets-list">
      <div v-for="ticket of tickets" class="ticket-item">
        <a>{{ ticket.title }}</a>
        <span class="badge">{{ ticket.status }}</span>
      </div>
    </section>
  </div>
</template>

<script>
import RemoteData from '../mixins/RemoteData'

export default {
  mixins: [
    RemoteData({
      tickets: 'tickets',
    }),
  ],
}
</script>

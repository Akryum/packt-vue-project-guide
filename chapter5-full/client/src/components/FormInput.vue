<template>
  <div class="row">
    <input
      class="input"
      :class="inputClass"
      :name="name"
      :type="type"
      :value="value"
      @input="update"
      :placeholder="placeholder" />
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
    },
    type: {
      type: String,
      default: 'text',
    },
    value: {
      required: true,
    },
    placeholder: {
      type: String,
    },
    invalid: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    inputClass () {
      return {
        'invalid': this.invalid,
      }
    },
  },

  methods: {
    update (e) {
      this.$emit('input', e.currentTarget.value)
    },
  },
}
</script>

<style lang="stylus" scoped>
.input {
  &.invalid {
    border-color: red;
  }
}
</style>

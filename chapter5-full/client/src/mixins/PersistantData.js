export default function (fields) {
  let name
  return {
    created () {
      name = this.$options.name
      for (const field of fields) {
        const savedValue = localStorage.getItem(`${name}.${field}`)
        if (savedValue) {
          this.$data[field] = JSON.parse(savedValue)
        }
      }
    },

    watch: fields.reduce((obj, field) => {
      obj[field] = val => {
        localStorage.setItem(`${name}.${field}`, JSON.stringify(val))
      }
      return obj
    }, {}),

    methods: {
      saveAllPersistantData () {
        for (const field of fields) {
          localStorage.setItem(`${name}.${field}`, JSON.stringify(this.$data[field]))
        }
      },
    },

    beforeDestroy () {
      this.saveAllPersistantData()
    },
  }
}

export default function (resources) {
  return {
    data () {
      let data = {
        _remoteDataLoading: 0,
      }

      // Initialize data properties
      for (const key in resources) {
        data[key] = null
      }

      return data
    },

    computed: {
      remoteDataBusy () {
        return this.$data._remoteDataLoading !== 0
      },
    },

    created () {
      Object.keys(resources).forEach(async (key) => {
        this.$data._remoteDataLoading++
        const result = await this.$fetch(resources[key])
        this.$data[key] = await result.json()
        this.$data._remoteDataLoading--
      })
    },
  }
}

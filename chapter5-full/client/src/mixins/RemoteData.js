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

    methods: {
      async fetchResource(key, url) {
        this.$data._remoteDataLoading++
        try {
          const result = await this.$fetch(url)
          this.$data[key] = await result.json()
        } catch (e) {
          if (e.response.status === 403) {
            document.location.reload()
          }
        }
        this.$data._remoteDataLoading--
      },
    },

    created () {
      for (const key in resources) {
        let url = resources[key]
        if (typeof url === 'function') {
          this.$watch(url, (val) => {
            this.fetchResource(key, val)
          }, {
            immediate: true,
          })
        } else {
          this.fetchResource(key, url)
        }
      }
    },
  }
}

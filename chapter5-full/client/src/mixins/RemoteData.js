export default function (resources) {
  return {
    data () {
      let initData = {
        remoteDataLoading: 0,
      }

      // Initialize data properties
      initData.remoteErrors = {}
      for (const key in resources) {
        initData[key] = null
        initData.remoteErrors[key] = null
      }

      return initData
    },

    computed: {
      remoteDataBusy () {
        return this.$data.remoteDataLoading !== 0
      },

      hasRemoteErrors () {
        return Object.keys(this.$data.remoteErrors).some(
          key => this.$data.remoteErrors[key]
        )
      },
    },

    methods: {
      async fetchResource (key, url) {
        this.$data.remoteDataLoading++
        this.$data.remoteErrors[key] = null
        try {
          this.$data[key] = await this.$fetch(url)
        } catch (e) {
          console.error(e)
          // If we are in a private route
          // We go to the login screen
          if (e.response && e.response.status === 403 &&
              this.$route.matched.some(m => m.meta.private)) {
            this.$router.replace({ name: 'login', params: {
              wantedRoute: this.$route.fullPath,
            }})
          } else {
            this.$data.remoteErrors[key] = e
          }
        }
        this.$data.remoteDataLoading--
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

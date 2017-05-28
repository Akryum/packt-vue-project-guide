
export function $fetch (url, options) {
  const finalOptions = Object.assign({}, {
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }, options)
  return fetch(`http://localhost:3000/${url}`, finalOptions).then(async (response) => {
    if (response.ok) {
      return Promise.resolve(response)
    } else {
      const message = await response.text()
      const error = new Error(message)
      error.response = response
      return Promise.reject(error)
    }
  })
}

export default {
  install (Vue) {
    // Fetch
    Vue.mixin({
      methods: {
        $fetch,
      },
    })
  },
}

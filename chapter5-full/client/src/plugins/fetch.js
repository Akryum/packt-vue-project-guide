
export function $fetch (url, options) {
  const finalOptions = Object.assign({}, {
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }, options)
  return fetch(`http://localhost:3000/${url}`, finalOptions)
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

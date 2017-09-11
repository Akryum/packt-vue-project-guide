import { $fetch } from '../plugins/fetch'

let fetchPostsUid = 0

export default {
  namespaced: true,

  state () {
    return {
      draft: null,
      loading: false,
      mapBounds: null,
      posts: [],
      selectedPostId: null,
      selectedPostDetails: null,
    }
  },

  getters: {
    draft: state => state.draft,
    posts: state => state.posts,
    selectedPost: state => state.posts.find(p => p._id === state.selectedPostId),
    selectedPostDetails: state => state.selectedPostDetails,
    currentPost: (state, getters) => state.draft || getters.selectedPost,
  },

  mutations: {
    addPost (state, value) {
      state.posts.push(value)
    },

    addComment (state, { post, comment }) {
      post.comments.push(comment)
    },

    draft (state, value) {
      state.draft = value
    },

    likePost (state, { post, userId }) {
      const index = post.likes.indexOf(userId)
      if (index !== -1) {
        post.likes.splice(index, 1)
      } else {
        post.likes.push(userId)
      }
    },

    loading (state, value) {
      state.value = value
    },

    posts (state, { posts, mapBounds }) {
      state.posts = posts
      state.mapBounds = mapBounds
    },

    selectedPostId (state, value) {
      state.selectedPostId = value
    },

    selectedPostDetails (state, value) {
      state.selectedPostDetails = value
    },

    updateDraft (state, value) {
      Object.assign(state.draft, value)
    },
  },

  actions: {
    createDraft ({ dispatch }) {
      // Default values
      dispatch('setDraft', {
        title: '',
        content: '',
        position: null,
        placeId: null,
      })
    },

    async createPost ({ commit, dispatch }, draft) {
      const data = {
        ...draft,
        // We need to get the object form
        position: draft.position.toJSON(),
      }

      // Request
      const result = await $fetch('posts/new', {
        method: 'POST',
        body: JSON.stringify(data),
      })
      dispatch('setDraft', null)

      // Update the posts list
      commit('addPost', result)
      dispatch('selectPost', result)
    },

    async fetchPosts ({ commit, state }, { mapBounds, force }) {
      let oldBounds = state.mapBounds
      if (force || !oldBounds || !oldBounds.equals(mapBounds)) {
        commit('loading', true)
        const requestId = ++fetchPostsUid
        const ne = mapBounds.getNorthEast()
        const sw = mapBounds.getSouthWest()
        const query = `posts?ne=${
          encodeURIComponent(ne.toUrlValue())
        }&sw=${
          encodeURIComponent(sw.toUrlValue())
        }`
        const posts = await $fetch(query)

        // We abort if we started another query
        console.log(posts)
        console.log(requestId, fetchPostsUid)
        if (requestId === fetchPostsUid) {
          commit('posts', {
            posts,
            mapBounds,
          })
          commit('loading', false)
        }
      }
    },

    async likePost ({ commit, rootGetters }, post) {
      const userId = rootGetters.user._id
      commit('likePost', {
        post,
        userId,
      })
      await $fetch(`posts/${post._id}/like`, {
        method: 'POST',
      })
    },

    'logged-in' ({ dispatch, state }) {
      if (state.mapBounds) {
        dispatch('fetchPosts', {
          mapBounds: state.mapBounds,
          force: true,
        })
      }
      if (state.selectedPostId) {
        dispatch('selectPost', state.selectedPostId)
      }
    },

    logout ({ commit }) {
      commit('posts', {
        posts: [],
        mapBounds: null,
      })
    },

    async selectPost ({ commit }, id) {
      commit('selectedPostDetails', null)
      commit('selectedPostId', id)
      const details = await $fetch(`posts/${id}`)
      commit('selectedPostDetails', details)
    },

    async sendComment({ commit, rootGetters }, { post, comment }) {
      const user = rootGetters.user
      commit('addComment', {
        post,
        comment: {
          ...comment,
          date: new Date(),
          user_id: user._id,
          author: user,
        },
      })

      await $fetch(`posts/${post._id}/comment`, {
        method: 'POST',
        body: JSON.stringify(comment),
      })
    },

    setDraft ({ commit }, value) {
      commit('draft', value)
    },

    setDraftLocation ({ dispatch, getters }, { position, placeId }) {
      if (!getters.draft) {
        dispatch('createDraft')
      }
      dispatch('updateDraft', {
        position,
        placeId,
      })
    },

    unselectPost ({ commit }) {
      commit('selectedPostId', null)
    },

    updateDraft ({ dispatch, commit, getters }, draft) {
      commit('updateDraft', draft)
    },
  },
}

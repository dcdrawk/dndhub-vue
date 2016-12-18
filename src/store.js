import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Create the main data store for our app
const store = new Vuex.Store({
  state: {
    user: window.localStorage.getItem('user') ? window.JSON.parse(window.localStorage.getItem('user')) : undefined,
    character: window.localStorage.getItem('character') ? window.JSON.parse(window.localStorage.getItem('character')) : undefined
    // characterList: window.localStorage.getItem('character') ? window.JSON.parse(window.localStorage.getItem('character')) : undefined,
  },
  mutations: {
    user_login (state, user) {
      state.user = user
    },
    user_logout (state) {
      state.user = undefined
    },
    update_character (state, character) {
      state.character = character
    }
  }
})

export default store

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Create the main data store for our app
const store = new Vuex.Store({
  state: {
    user: window.localStorage.getItem('user') ? window.JSON.parse(window.localStorage.getItem('user')) : undefined,
    character: window.localStorage.getItem('character') ? window.JSON.parse(window.localStorage.getItem('character')) : undefined,
    characterList: undefined
  },
  mutations: {
    login (state, user) {
      state.user = user
    },
    logout (state) {
      state.user = undefined
    },
    update_character (state, character) {
      state.character = character
    },
    update_character_list (state, characterList) {
      state.characterList = characterList
    }
  }
})

export default store

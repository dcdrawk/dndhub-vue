// The main Vue Instance
// Docs: http://vuejs.org/api/
import Vue from 'vue'

// Import the App Component
import App from './App'

// The Vue Router Instance
// Docs: http://router.vuejs.org/en/index.html
import VueRouter from 'vue-router'

// Vue validation
// https://github.com/logaretm/vee-validate
import VeeValidate from 'vee-validate'

import VueFire from 'vuefire'
import Firebase from 'firebase'

// Import the components for each page
import Home from './components/Home'
// import GettingStartedPage from './components/pages/GettingStartedPage'

// Authentication
import SignIn from './components/pages/SignIn'
import SignUp from './components/pages/SignUp'
import Profile from './components/pages/Profile'
import CharacterList from './components/pages/CharacterList'

Vue.use(VueFire)

var bus = new Vue({})

let firebaseConfig = {
  apiKey: 'AIzaSyACdSfcm596fdnyoIFiovJWlq_15g0Vuag',
  authDomain: 'codex-9bc8c.firebaseapp.com',
  databaseURL: 'https://codex-9bc8c.firebaseio.com',
  storageBucket: 'codex-9bc8c.appspot.com',
  messagingSenderId: '726793024913'
}

var firebaseApp = Firebase.initializeApp(firebaseConfig)
var db = firebaseApp.database()

Object.defineProperty(Vue.prototype, '$bus', {
  get () {
    return bus
  }
})

Object.defineProperty(Vue.prototype, '$db', {
  get () {
    return db
  }
})

Object.defineProperty(Vue.prototype, '$firebase', {
  get () {
    return Firebase
  }
})
// var eventHub = new Vue()
// Vue.use(eventHub)

// Characters
// import CharacterList from './components/pages/CharacterList'
// import General from './components/pages/General'
// import Stats from './components/pages/Stats'
// import Feats from './components/pages/Feats'
// import Weapons from './components/pages/Weapons'
// import Armor from './components/pages/Armor'
// import Spells from './components/pages/Spells'

// Component Pages
// import CardsPage from './components/pages/CardsPage'
// import ButtonsPage from './components/pages/ButtonsPage'
// import ListsPage from './components/pages/ListsPage'
// import TabsPage from './components/pages/TabsPage'
// import DividersPage from './components/pages/DividersPage'
// import ChipsPage from './components/pages/ChipsPage'
// import DataTablesPage from './components/pages/DataTablesPage'
// import DialogPage from './components/pages/DialogPage'
// import DropdownPage from './components/pages/DropdownPage'
// import ExpansionPanelPage from './components/pages/ExpansionPanelPage'
// import FormsPage from './components/pages/FormsPage'
// import SlidersPage from './components/pages/SlidersPage'
// import ToastsPage from './components/pages/ToastsPage'

// Example Pages
// import ChatPage from './components/pages/ChatPage'
// use Vue Router
Vue.use(VueRouter)

// use Vue Socket.io
// Vue.use(VueSocketio, '10.5.0.74:3000')

const config = {
  errorBagName: 'errors', // change if property conflicts.
  delay: 0,
  locale: 'en',
  messages: null,
  strict: true
}

Vue.use(VeeValidate, config)

// Map the Routes and Components
var router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/sign-in',
      component: SignIn
    },
    {
      path: '/sign-up',
      component: SignUp
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/character-list',
      component: CharacterList
    }

  ]
})

/* eslint-disable no-new, no-unused-vars */
const app = new Vue({
  router,
  ...App
}).$mount('#app')

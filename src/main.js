// The main Vue Instance
// Docs: http://vuejs.org/api/
import Vue from 'vue'

// Import the data store
import store from './store'

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

// Authentication
import SignIn from './components/pages/SignIn'
import SignUp from './components/pages/SignUp'
import Profile from './components/pages/Profile'
import CharacterList from './components/pages/CharacterList'
import General from './components/pages/General'
import Stats from './components/pages/Stats'
import Feats from './components/pages/Feats'
import Weapons from './components/pages/Weapons'
import Armor from './components/pages/Armor'
import Spells from './components/pages/Spells'
import Inventory from './components/pages/Inventory'
import Groups from './components/pages/Groups'
import Group from './components/pages/Group'

Vue.use(VueFire)

let firebaseConfig = {
  apiKey: 'AIzaSyACdSfcm596fdnyoIFiovJWlq_15g0Vuag',
  authDomain: 'codex-9bc8c.firebaseapp.com',
  databaseURL: 'https://codex-9bc8c.firebaseio.com',
  storageBucket: 'codex-9bc8c.appspot.com',
  messagingSenderId: '726793024913'
}

var firebaseApp = Firebase.initializeApp(firebaseConfig)
var db = firebaseApp.database()

// Set up an event bus
var bus = new Vue({})
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

// use Vue Router
Vue.use(VueRouter)

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
      component: SignIn
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
    },
    {
      path: '/general',
      component: General
    },
    {
      path: '/stats',
      component: Stats
    },
    {
      path: '/feats',
      component: Feats
    },
    {
      path: '/weapons',
      component: Weapons
    },
    {
      path: '/armor',
      component: Armor
    },
    {
      path: '/spells',
      component: Spells
    },
    {
      path: '/inventory',
      component: Inventory
    },
    {
      path: '/groups',
      component: Groups
    },
    {
      path: '/group/:groupId',
      name: 'group',
      component: Group
    }
  ]
})

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./static/worker.js', {
    scope: './static/'
  }).then(function (reg) {
    console.log('◕‿◕', reg)
  }, function (err) {
    console.log('ಠ_ಠ', err)
  })
  // Unregister the service worker (useful in development)
  // navigator.serviceWorker.getRegistrations().then((registrations) => {
  //   for (let registration of registrations) {
  //     registration.unregister()
  //   }
  // })
}

/* eslint-disable no-new, no-unused-vars */
const app = new Vue({
  router,
  store,
  ...App
}).$mount('#app')

<template>
  <div id="app">
    <xen-sidebar :class="{ 'xen-sidebar-open': sidebarOpen, 'xen-sidebar-closed': !sidebarOpen }">
      <!-- <p v-if="user">Welcome, {{user.displayName}}<p> -->
      <section class="dndhub-profile-info" v-if="user">
        <div class="dndhub-avatar">
          <img :src="user.photoURL" />
        </div>
        <p class="dndhub-email"><strong>{{ user.email }}</strong></p>
        <!-- {{ characters }} -->
        <xen-select class="character-select xen-color-primary" placeholder="Select a Character" :options="characters" optionKey="name"></xen-select>
      </section>
      <section class="xen-nav">
        <xen-list :dense="true">
          <router-link to="/sign-in" v-if="!user">
            <xen-list-item text="Sign In" :bold="true"></xen-list-item>
          </router-link>
          <router-link to="/sign-up" v-if="!user">
            <xen-list-item text="Sign Up" :bold="true"></xen-list-item>
          </router-link>
          <router-link to="/profile" v-if="user">
            <xen-list-item text="Profile" :bold="true"></xen-list-item>
          </router-link>
          <router-link to="/character-list">
            <xen-list-item text="Character List" :bold="true"></xen-list-item>
          </router-link>
        </xen-list>

        <xen-divider></xen-divider>

        <xen-list :dense="true">
          <router-link to="/general">
            <xen-list-item text="General" :bold="true"></xen-list-item>
          </router-link>
        </xen-list>

      </section>
    </xen-sidebar>
    <transition name="fade">      
      <div class="xen-sidebar-backdrop" v-if="sidebarOpen" @click="toggleSidebar()"></div>
    </transition>    
    <div class="page-container">
      <!-- <transition name="router-fade"> -->
        <keep-alive>
          <router-view></router-view>
        </keep-alive> 
      <!-- </transition> -->
    </div>
  </div>
</template>

<script>
  import XenSidebar from './components/xen/Sidebar'
  import XenToolbar from './components/xen/Toolbar'
  import XenList from './components/xen/List'
  import XenListItem from './components/xen/ListItem'
  import XenDivider from './components/xen/Divider'
  import Firebase from 'firebase'
  import XenSelect from './components/xen/Select'

  export default {
    name: 'app',

    components: {
      XenSidebar,
      XenToolbar,
      XenList,
      XenListItem,
      XenDivider,
      XenSelect
    },

    data () {
      return {
        sidebarOpen: false,
        user: undefined,
        characters: [],
        gameData: {}
      }
    },

    mounted () {
      var path = window.location.hash
      var pathArray = path.replace(/-+/, '').replace(/#+/, '').replace(/\/+/, '').split('/')

      this.$nextTick(() => {
        if (pathArray.length === 1 && pathArray[0] === '') {
          this.setActive('home')
        } else {
          this.expand(pathArray[0])
          this.setActive(pathArray[1])
        }
      })

      window.onpopstate = (event) => {
        setTimeout(() => {
          var path = this.$route.path
          var pathArray = path.replace(/-+/, '').replace(/\/+/, '').split('/')
          if (pathArray.length === 1 && pathArray[0] === '') {
            this.setActive('home')
          } else {
            this.setActive(pathArray[1])
          }
        }, 0)
      }

      // Firebase
      Firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.user = user
          console.log('a user has signed in', user)
          this.$bus.$emit('user-signin', user)
          // User is signed in.
          this.getCharacters()
          this.getGameData()
        } else {
          console.log('there is no user signed in')
          // No user is signed in.
        }
      })
    },

    methods: {
      toggleSidebar () {
        if (window.innerWidth < 768) this.sidebarOpen = !this.sidebarOpen
      },
      expand (list) {
        // if (this.$refs[list].$el.style.height === '0px') {
        //   this.$refs[list].$el.style.height = this.$refs[list].$el.scrollHeight + 'px'
        // } else {
        //   this.$refs[list].$el.style.height = 0
        // }
      },
      collapseAll () {
        // for (var i in this.$refs) {
        //   this.$refs[i].$el.style.height = 0
        // }
      },
      setActive (listItem) {
        // for (var i in this.$refs) {
        //   this.$refs[i].$el.classList.remove('active')
        // }
        // this.$refs[listItem].$el.classList.add('active')
        // this.active = this.$refs[listItem].text
      },

      getCharacters () {
        var userId = this.$firebase.auth().currentUser.uid
        return this.$firebase.database().ref('/characters/' + userId).once('value').then((snapshot) => {
          this.characters = snapshot.val()
          this.$bus.$emit('characters-loaded', this.characters)
        })
      },

      getGameData () {
        const endpoints = [
          'alignments',
          'armor',
          'backgrounds',
          'classes',
          'skills',
          'classFeatures',
          'feats',
          'languages',
          'races',
          'weapons',
          'spells'
        ]

        var promises = endpoints.map((endpoint) => {
          return new Promise((resolve, reject) => {
            this.$firebase.database().ref('/' + endpoint).once('value').then((snapshot) => {
              this.gameData[endpoint] = snapshot.val()
              resolve()
              this.$set(this.gameData, this.gameData)
            })
          })
        })
        return Promise.all(promises)
      }
    }
  }
</script>

<style lang="scss">
  @import './styles/core';
  #app {
    font-family: 'Roboto';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .xen-logo {
    width: 100px;
    height: auto;
    margin-top: 16px;
  }
  .xen-branding {
    text-align: center;
  }
  .page-toolbar {
    // padding-left: 280px;
    top: -56px;
    position: relative;
  }
  .xen-sidebar {
    transform: translate3d(0, 0, 0);
  }
  .xen-nav .xen-list {
    margin: 0;
    transition: all 300ms $material-easing;
  }
  .xen-sidebar,
  .page-container,
  .page-toolbar {
    // transition: all .3s $swift-out;
    transition: all 375ms $material-easing;
  }

  .xen-menu-button.xen-icon-button-container {
    display: none;
  }

  .xen-sidebar-backdrop {
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0,0,0,.52);
    z-index: 9;
    top: 0;
    &.show {
      animation: fade-in .5s forwards;
    }
    &.hide {
      animation: fade-out .5s forwards;
    }
  }

  .xen-nav .active {
    color: $primary-color;
  }

  .xen-list.xen-sublist .xen-list-item {
    padding-left: 32px;
  }

  .dndhub-profile-info {
    padding: 16px;
    background-color: $clr-grey-100;
    border-bottom: 1px solid $clr-grey-200;
    p {
      color: rgba(0, 0, 0, .54);
    }
  }

  .dndhub-email {
    font-size: 14px;
    font-weight: $medium;
  }

  .dndhub-avatar {
    width: 56px;
    img {
      margin-bottom: 16px;
      width: 100%;
      border-radius: 50%;
    }
  }

  .character-select.xen-select-container {
    margin-bottom: 0;
    margin-top: 16px;
  }

  @media only screen and (max-width: $small-breakpoint) {
    .xen-menu-button.xen-icon-button-container {
      display: inline-block;
    }
    .xen-sidebar {
      transform: translate3d(-280px, 0, 0);
    }

    .page-container, .page-toolbar {
      padding-left: 0;
    }

    .xen-sidebar.xen-sidebar-open {
      transform: translate3d(0, 0, 0);
    }
  }
</style>

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
        <xen-select v-if="characters" class="character-select xen-color-primary" placeholder="Select a Character" :options="characters" :value="characterName" optionKey="name" @input="selectCharacter($event)"></xen-select>
      </section>
      <section class="xen-nav">
        <xen-list :dense="true">
          <router-link to="/sign-in" v-if="!user">
            <xen-list-item text="Sign In" :bold="true" @click.native="toggleSidebar()"></xen-list-item>
          </router-link>
          <router-link to="/sign-up" v-if="!user">
            <xen-list-item text="Sign Up" :bold="true" @click.native="toggleSidebar()"></xen-list-item>
          </router-link>
          <router-link to="/sign-in" v-if="user">
            <xen-list-item text="Sign Out" :bold="true"  @click.native="signOut(); toggleSidebar();"></xen-list-item>
          </router-link>
          <router-link to="/profile" v-if="user">
            <xen-list-item text="Profile" :bold="true" @click.native="toggleSidebar()"></xen-list-item>
          </router-link>
          <router-link to="/character-list">
            <xen-list-item text="Character List" :bold="true"  @click.native="toggleSidebar()"></xen-list-item>
          </router-link>
        </xen-list>

        <xen-divider></xen-divider>

        <xen-list :dense="true" v-if="user && selectedCharacter">
          <router-link to="/general">
            <xen-list-item text="General" :bold="true" @click.native="toggleSidebar()"></xen-list-item>
          </router-link>
          <router-link to="/stats">
            <xen-list-item text="Stats" :bold="true" @click.native="toggleSidebar()"></xen-list-item>
          </router-link>
          <router-link to="/feats">
            <xen-list-item text="Feats" :bold="true" @click.native="toggleSidebar()"></xen-list-item>
          </router-link>
          <router-link to="/weapons">
            <xen-list-item text="Weapons" :bold="true" @click.native="toggleSidebar()"></xen-list-item>
          </router-link>
          <router-link to="/armor">
            <xen-list-item text="Armor" :bold="true" @click.native="toggleSidebar()"></xen-list-item>
          </router-link>
          <router-link to="/spells">
            <xen-list-item text="Spells" :bold="true" @click.native="toggleSidebar()"></xen-list-item>
          </router-link>
        </xen-list>

        <xen-divider></xen-divider>

        <xen-list :dense="true" v-if="user && selectedCharacter">
          <router-link to="/groups">
            <xen-list-item text="Groups" :bold="true" @click.native="toggleSidebar()"></xen-list-item>
          </router-link>
          <div v-if="selectedCharacter">
          <p v-if="selectedCharacter.groups" v-for="group in selectedCharacter.groups">TEST</p>
          </div>
        </xen-list>

      </section>
    </xen-sidebar>
    <transition name="fade">
      <div class="xen-sidebar-backdrop" v-if="sidebarOpen" @click="toggleSidebar()"></div>
    </transition>
    <div class="page-container">
      <!-- <transition name="router-fade"> -->
        <!-- <keep-alive> -->
          <router-view></router-view>
        <!-- </keep-alive> -->
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
        gameData: {},
        characterName: undefined,
        characterId: undefined,
        selectedCharacter: undefined,
        endpoints: [
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
      }
    },

    mounted () {
      this.$bus.$on('name-updated', (name) => {
        this.characterName = name
        window.localStorage.setItem('selected-character', name)
      })

      this.$bus.$on('group-added', (group) => {
        if (this.selectedCharacter.groups) {
          this.selectedCharacter.groups.push(group)
        } else {
          this.$set(this.selectedCharacter, 'groups', [])
          this.selectedCharacter.groups.push(group)
        }
        this.updateCharacter('', 'groups', this.selectedCharacter.groups)
      })

      // Firebase
      Firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.user = user
          console.log('a user has signed in', user)
          this.$bus.$emit('user-signin', user)
          // User is signed in.
          this.getCharacters()

          if (window.localStorage.getItem('game-data')) {
            let test = window.JSON.parse(window.localStorage.getItem('game-data'))
            this.gameData = test
            this.$set(this.gameData, this.gameData)
            this.$bus.$emit('data-loaded')
          } else {
            this.getGameData().then(() => {
              console.log('game data loaded...')
              this.$bus.$emit('data-loaded')
              window.localStorage.setItem('game-data', window.JSON.stringify(this.gameData))
            })
          }
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

      getCharacters () {
        let userId = this.$firebase.auth().currentUser.uid
        return this.$firebase.database().ref('/characters/' + userId).once('value').then((snapshot) => {
          this.characters = snapshot.val()
          this.$bus.$emit('characters-loaded', this.characters)
          // If there is a character in local storage, select it
          this.$nextTick(() => {
            if (window.localStorage.getItem('selected-character')) {
              this.selectCharacter(window.localStorage.getItem('selected-character'))
            }
          })
        })
      },

      checkData () {
        this.getDbVersion().then((version) => {
          if (window.localStorage.getItem('db-version') !== version) {
            window.localStorage.setItem('db-version', version)
            this.getGameData()
          } else {
            this.gameData = window.JSON.parse(window.localStorage.getItem('game-data'))
          }
        })
      },

      getGameData () {
        var promises = this.endpoints.map((endpoint) => {
          return new Promise((resolve, reject) => {
            this.$firebase.database().ref('/' + endpoint).once('value').then((snapshot) => {
              this.gameData[endpoint] = snapshot.val()
              this.$set(this.gameData, this.gameData)
              resolve()
            })
          })
        })
        return Promise.all(promises)
      },

      selectCharacter (characterName) {
        for (let i in this.characters) {
          if (this.characters[i].name === characterName) {
            this.selectedCharacter = this.characters[i]
            this.$bus.$emit('character-selected', this.selectedCharacter)
            let charRef = this.$firebase.database().ref('characters/' + this.$firebase.auth().currentUser.uid + '/' + i)
            charRef.on('value', (snapshot) => {
              // updateStarCount(postElement, snapshot.val());
              this.selectedCharacter = snapshot.val()
              // console.log(this.selectedCharacter)
              // this.$bus.$emit('character-selected', this.selectedCharacter)
              window.localStorage.setItem('selected-character', this.selectedCharacter.name)
              this.characterName = this.selectedCharacter.name
              this.characterId = i
            })
          }
        }
      },

      signOut () {
        this.$firebase.auth().signOut().then(() => {
          // Sign-out successful.
          window.localStorage.removeItem('selected-character')
          this.user = undefined
          // this.$bus.$emit('user-signout')
        }, (error) => {
          console.error(error)
          // An error happened.
        })
      },

      getDbVersion () {
        return new Promise((resolve, reject) => {
          this.$firebase.database().ref('/dbVersion').once('value').then((snapshot) => {
            resolve(snapshot.val())
          })
        })
      },

      // Save a character, requires a path to the property and value being assigned
      // e.g. path = 'skills/dexterity' value: {5}
      updateCharacter (path, prop, value) {
        console.log('updating ' + prop + '...')
        let userId = this.$firebase.auth().currentUser.uid
        let update = {}
        update[prop] = value
        this.$firebase.database().ref('/characters/' + userId + '/' + this.characterId + '/' + path).update(update)
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
    transition: transform 375ms $material-easing;
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
      transform: translate3d(-285px, 0, 0);
    }

    .page-container, .page-toolbar {
      padding-left: 0;
    }

    .xen-sidebar.xen-sidebar-open {
      transform: translate3d(0, 0, 0);
    }
  }
</style>

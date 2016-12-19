<template>
  <div>
    <xen-page-toolbar class="xen-theme-indigo" title="Groups"></xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Groups">

      <!-- Groups Tab -->
      <div slot="Groups">
        <section class="dndhub-tab-content">
          <div class="xen-data-table bordered hover" v-if="character">
            <table class="dndhub-table">
              <thead class="hidden">
                <tr>
                  <th class="text-left">
                    Name
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(group, index) in characterGroups">
                  <td class="xen-first-col text-left " @click="goToGroup(group)">
                    <div>{{ group.name }}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <!-- Join Groups Tab -->
      <div slot="Join Group">
        <section class="dndhub-tab-content">
          <div class="xen-data-table bordered hover">
            <table class="dndhub-table">
              <thead class="button-thead">
                <tr>
                  <th class="text-left">
                    <xen-button :raised="true" class="xen-theme-primary" @click.native="newGroupDialog = true">New Group</xen-button>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(group, index) in groups">
                  <td class="xen-first-col text-left" @click="showJoinDialog(group, index)">
                    <div>{{ group.name }}</div>
                  </td>
                  <td class="xen-last-col" @click="showJoinDialog(group, index)">
                    <i v-if="group.private" class="material-icons secondary-text">lock_outline</i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </xen-tabs>

    <!-- New Group Dialog -->
    <xen-dialog :show="newGroupDialog" @hide="newGroupDialog = false;" title="Create a New Group" :small="true" class="new-group-dialog">
      <!-- <p>Are you sure you want to delete this character?</p> -->
      <form class="row">
        <div class="col-xs-12">
          <xen-input label="Group Name" name="Group Name" class="xen-color-primary group-name" rules="required" :value="newGroup.name" @input="$set(newGroup, 'name', $event)"></xen-input>
          <span class="group-privacy"><xen-checkbox class="xen-color-blue" :value="newGroup.private" @input="newGroup.private = $event"></xen-checkbox>Private</span>
        </div>
        <div class="col-xs-12" v-if="newGroup.private">
          <xen-input ref="password" label="Password" name="password" type="password" class="xen-color-primary" rules="required" :value="newGroup.password" @input="newGroup.password = $event"></xen-input>
          <xen-input ref="repassword" label="Confirm Password" name="confirm password" type="password" class="xen-color-primary" rules="required|confirmed:password" :alue="repassword" @input="repassword = $event"></xen-input>
        </div>
      </form>
      <p v-if="errorMsg" class="xen-color-red">{{ errorMsg }}</p>
      <div slot="actions">
        <xen-button @click.native="newGroupDialog = false">Cancel</xen-button>
        <xen-button class="xen-color-primary" @click.native="createGroup();">Create</xen-button>
      </div>
    </xen-dialog>

    <!-- Join Group Dialog -->
    <xen-dialog :show="joinGroupDialog" @hide="joinGroupDialog = false; errorMsg = ''" title="Join Group" :small="true" class="new-group-dialog">
      <p v-if="selectedGroup">Join the group <span class="body-2 xen-color-primary">{{ selectedGroup.name }}</span>?</p>
      <form class="row" v-if="selectedGroup">
        <div class="col-xs-12" v-if="selectedGroup.private">
          <xen-input ref="joinPassword" label="Password" name="join password" type="password" class="xen-color-primary" :value="joinPassword" @input="joinPassword = $event"></xen-input>
        </div>
      </form>
      <p v-if="errorMsg" class="xen-color-red">{{ errorMsg }}</p>
      <div slot="actions">
        <xen-button @click.native="joinGroupDialog = false">Cancel</xen-button>
        <xen-button class="xen-color-primary" @click.native="joinGroup();">Join</xen-button>
      </div>
    </xen-dialog>

    <xen-toast :text="toastMsg" :toggle="showToast" @hide="showToast = false" ></xen-toast>
  </div>
</template>

<style lang="scss" scoped>
@import '../xen/styles/data-tables';
// @import '../xen/styles/variables';
.group-privacy {
  position: relative;
  left: -10px;
  display: flex;
  align-items: center;
}
.new-group-dialog {
  .group-name {
    margin-bottom: 0px;
  }
}
</style>

<script>
  import XenPageToolbar from '../xen/PageToolbar'
  import XenButton from '../xen/Button'
  import XenIconButton from '../xen/IconButton'
  import XenDivider from '../xen/Divider'
  import XenCard from '../xen/Card'
  import XenCardHeader from '../xen/CardHeader'
  import XenCardContent from '../xen/CardContent'
  import XenCardActions from '../xen/CardActions'
  import XenInput from '../xen/Input'
  import XenTextarea from '../xen/Textarea'
  import XenDialog from '../xen/Dialog'
  import XenLoadingSpinner from '../xen/LoadingSpinner'
  import XenSelect from '../xen/Select'
  import XenList from '../xen/List'
  import XenListItem from '../xen/ListItemCustom'
  import XenCheckbox from '../xen/Checkbox'
  import XenTabs from '../xen/Tabs'
  import XenChips from '../xen/Chips'
  import XenToast from '../xen/Toast'
  // import _ from 'lodash'

  export default {
    name: 'groups',

    components: {
      XenPageToolbar,
      XenButton,
      XenIconButton,
      XenDivider,
      XenCard,
      XenCardHeader,
      XenCardContent,
      XenInput,
      XenTextarea,
      XenCheckbox,
      XenDialog,
      XenLoadingSpinner,
      XenSelect,
      XenList,
      XenListItem,
      XenTabs,
      XenChips,
      XenToast,
      XenCardActions
    },

    data () {
      return {
        // user: this.$root.user || undefined,
        // character: this.$root.selectedCharacter || undefined,
        loaded: false,
        groups: [],
        characterGroups: [],
        newGroup: {
          members: [],
          messages: [],
          private: false,
          password: ''
        },
        errorMsg: '',
        newGroupDialog: false,
        repassword: '',
        joinGroupDialog: false,
        selectedGroup: undefined,
        joinPassword: undefined,
        showToast: false,
        toastMsg: ''
      }
    },

    mounted () {
      console.log(this)
      this.$bus.$on('errors-changed', (newErrors, oldErrors) => {
        // console.log('newErrors')
        // console.log(newErrors)
        newErrors.forEach(error => {
          if (!this.errors.has(error.field)) {
            this.errors.add(error.field, error.msg)
          }
        })
        if (oldErrors) {
          oldErrors.forEach(error => {
            this.errors.remove(error.field)
          })
        }
      })
      this.$bus.$on('character-selected', () => {
        // this.character = Object.assign({}, character)
        if (this.$root.gameData) {
          this.getCharacterGroups()
          this.loaded = true
        }
      })
      this.$bus.$on('data-loaded', () => {
        if (this.character) {
          this.getCharacterGroups()
          this.loaded = true
        }
      })

      if (this.character && this.$root.gameData) {
        this.getCharacterGroups()
        this.loaded = true
      }

      let groupsRef = this.$firebase.database().ref('groups/')
      groupsRef.on('value', (snapshot) => {
        this.groups = snapshot.val()
      })
    },

    methods: {
      createGroup () {
        this.$bus.$emit('xen-validate')
        setTimeout(() => {
          if (this.errors.errors.length > 0) {
            return
          } else {
            if (this.newGroup.name && this.newGroup.name !== '') {
              if (!this.newGroup.private) {
                delete this.newGroup.private
              }
              this.newGroup.members.push({
                userId: this.$firebase.auth().currentUser.uid,
                characterId: this.character.id
              })
              // Set the owner to the currently logged in user
              this.newGroup.owner = this.$firebase.auth().currentUser.uid
              let groupRef = this.$firebase.database().ref('groups/').push()
              groupRef.set(this.newGroup)
              groupRef.once('value', (snapshot) => {
                console.log('updated group')
                let group = snapshot.val()
                group.id = snapshot.key
                this.$bus.$emit('group-added', group)
              })
            }
            this.newGroupDialog = false
          }
        }, 0)
      },

      getCharacterGroups () {
        console.log('get the character groups...')
        let charGroupsRef = this.$firebase.database().ref('characters/' + this.$firebase.auth().currentUser.uid + '/' + this.character.id + '/groups')
        charGroupsRef.on('value', (snapshot) => {
          this.characterGroups = snapshot.val()
        })
      },

      goToGroup (group) {
        console.log(group)
        this.$router.push({name: 'group', params: { groupId: group.id }})
      },

      showJoinDialog (group, groupId) {
        // console.log(id)
        this.selectedGroup = group
        this.selectedGroup.groupId = groupId
        this.joinGroupDialog = true
      },

      joinGroup () {
        this.$bus.$emit('xen-validate')
        setTimeout(() => {
          if (this.selectedGroup.private && !this.joinPassword) {
            this.errorMsg = 'A password is required'
            return
          } else if (this.selectedGroup.private && this.selectedGroup.password !== this.joinPassword) {
            this.errorMsg = 'The passsword is incorrect'
            return
          }
          console.log(this.errors.errors.length)
          if (this.errors.errors.length > 0) {
            return
          } else {
            this.$firebase.database().ref('groups/' + this.selectedGroup.groupId).once('value').then((snapshot) => {
              let group = snapshot.val()
              let joined = false
              if (group.members) {
                for (var i in group.members) {
                  if (group.members[i].characterId === this.$root.characterId) {
                    this.errorMsg = 'You already belong to this group'
                    joined = true
                    return
                  }
                }
                if (!joined) {
                  group.members.push({
                    userId: this.$firebase.auth().currentUser.uid,
                    characterId: this.$root.characterId
                  })
                  group.id = this.selectedGroup.groupId
                  this.$firebase.database().ref('groups/' + this.selectedGroup.groupId).update(group)
                  this.$bus.$emit('group-added', group)
                  this.joinGroupDialog = false
                  this.joinPassword = ''
                  this.toastMsg = 'Joined the group ' + group.name
                  this.showToast = true
                }
              }
            })
          }
        }, 0)
        // })
      }
    },

    // Computed
    computed: {
      user () {
        return this.$store.state.user
      },
      character () {
        return this.$store.state.character
      }
    }
  }
</script>

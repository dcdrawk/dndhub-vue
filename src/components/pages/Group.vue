<template>
  <div>
    <xen-page-toolbar class="xen-theme-indigo" :title="'Group - ' + group.name"></xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Members">

      <!-- Members Tab -->
      <div slot="Members">
        <section class="dndhub-tab-content">
          <div class="filters group-filters">
            <div class="row">
              <div class="col-xs-6">
                <xen-select class="xen-color-primary xen-no-margin" label="Sort By" :options="['Name', 'Level', 'Class', 'Race', 'Health', 'Armor Class', 'Initiative']" :value="sortBy" @input="sortBy = $event"></xen-select>
              </div>
              <div class="col-xs-6">
                <xen-select class="xen-color-primary xen-no-margin" label="Show" :options="['Health', 'Armor Class', 'Initiative']" :value="showFilter" @input="showFilter = $event"></xen-select>
              </div>
            </div>
          </div>
          <div class="xen-data-table bordered hover">
            <table class="dndhub-table group-table">
              <thead class="hidden">
                <tr>
                  <th class="text-left">
                    Name
                  </th>
                  <th class="text-left">
                    Other
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(member, index) in sortedMembers">
                  <td class="xen-first-col text-left " @click="">
                    <div>{{ member.name }}</div>
                    <div><span v-if="member.level">Level {{ member.level }} </span>{{ member.race }} {{ member.class }}</div>
                  </td>
                  <td class="xen-last-col text-right " v-if="showFilter === 'Health'">
                    <div>{{ member.currentHP || 0 }} / {{ +member.maxHP || 0 + +member.tempHP || 0}}</div>
                    <div class="health-bar-outer">
                      <div class="health-bar-inner" :style="'transform: scaleX(' + getHealthbarWidth(member.currentHP, member.maxHP, member.tempHP) + ');'"
                      :class="{
                        'health-full': getHealthbarWidth(member.currentHP, member.maxHP, member.tempHP) >= 0.75,
                        'health-high': getHealthbarWidth(member.currentHP, member.maxHP, member.tempHP) >= 0.5 && getHealthbarWidth(member.currentHP, member.maxHP, member.tempHP) < .75,
                        'health-medium': getHealthbarWidth(member.currentHP, member.maxHP, member.tempHP) > 0.25 && getHealthbarWidth(member.currentHP, member.maxHP, member.tempHP) < .5,
                        'health-low': getHealthbarWidth(member.currentHP, member.maxHP, member.tempHP) > 0 && getHealthbarWidth(member.currentHP, member.maxHP, member.tempHP) < .25,
                      }"></div>
                    </div>
                  </td>
                  <td class="text-center xen-last-col" v-if="showFilter === 'Armor Class'">
                    <div>{{ member.armorClass || '-' }}</div>
                  </td>
                  <td class="text-center xen-last-col" v-if="showFilter === 'Initiative'">
                    <div>{{ member.initiative || '-' }}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <!-- Ability Scores Tab -->
      <div slot="Settings">
        <section class="dndhub-tab-content">
          <xen-card>
            <xen-card-content>
              <span v-if="this.$root.user">
                <xen-button v-if="group.owner === this.$root.user.uid" :raised="true" class="xen-theme-red" @click.native="deleteGroupDialog = true">Delete Group</xen-button>
                <xen-button v-else :raised="true" class="xen-theme-blue" @click.native="leaveGroupDialog = true">Leave Group</xen-button>
              </span>
            </xen-card-content>
          </xen-card>
        </section>
      </div>

    </xen-tabs>

    <!-- Delete Group Dialog -->
    <xen-dialog :show="deleteGroupDialog" @hide="deleteGroupDialog = false" title="Delete Group" :small="true" class="new-group-dialog">
      <p>Are you sure you want to delete this group?</p>
      <div slot="actions">
        <xen-button @click.native="deleteGroupDialog = false">Cancel</xen-button>
        <xen-button class="xen-color-primary" @click.native="deleteGroup();">Delete</xen-button>
      </div>
    </xen-dialog>

    <!-- Leave Group Dialog -->
    <xen-dialog :show="leaveGroupDialog" @hide="leaveGroupDialog = false" title="Leave Group" :small="true" class="new-group-dialog">
      <p>Are you sure you want to leave this group?</p>
      <div slot="actions">
        <xen-button @click.native="leaveGroupDialog = false">Cancel</xen-button>
        <xen-button class="xen-color-primary" @click.native="leaveGroup();">Leave</xen-button>
      </div>
    </xen-dialog>
  </div>
</template>

<style lang="scss">
@import '../xen/styles/data-tables';
.group-filters {
  padding: 16px;
}
</style>

<script>
  import _ from 'lodash'
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

  export default {
    name: 'group',

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
        user: this.$root.user || undefined,
        character: this.$root.selectedCharacter || undefined,
        loaded: false,
        members: {},
        membersSocket: {},
        group: {},
        errorMsg: '',
        deleteGroupDialog: false,
        leaveGroupDialog: false,
        showFilter: 'Health',
        sortBy: 'Name'
      }
    },

    mounted () {
      console.log(this)
      // var groupRef = this.$firebase.database().ref('groups/')
      this.$bus.$on('character-selected', character => {
        this.character = Object.assign({}, character)
        if (this.$root.gameData) {
          this.loaded = true
        }
      })
      // this.$bus.$on('data-loaded', () => {
      //   if (this.character) {
      //     this.loaded = true
      //   }
      // })

      if (this.character && this.$root.gameData) {
        this.loaded = true
      }

      var groupRef = this.$firebase.database().ref('groups/' + this.$route.params.groupId)
      groupRef.on('value', (snapshot) => {
        // updateStarCount(postElement, snapshot.val());
        console.log(snapshot.val())
        if (!snapshot.val()) {
          this.$router.push({ path: '/groups' })
        }
        this.$set(this, 'group', snapshot.val())
        // this.group = snapshot.val()
        this.$set(this, 'members', {})
        this.getMembers()
      })
    },

    methods: {
      createGroup () {
        console.log('create')
      },

      getMembers () {
        this.membersSocket = []
        this.group.members.forEach((member, index) => {
          this.membersSocket[member.characterId] = this.$firebase.database().ref('characters/' + member.userId + '/' + member.characterId)
          this.membersSocket[member.characterId].on('value', (snapshot) => {
            let character = snapshot.val()
            character.userId = member.userId
            this.$set(this.members, member.characterId, character)
          })
        })
      },

      removeAllMembers () {
        var promises = this.group.members.map((member, index) => {
          return new Promise((resolve, reject) => {
            this.$firebase.database().ref('characters/' + member.userId + '/' + member.characterId).once('value').then((snapshot) => {
              let character = snapshot.val()
              if (character.groups) {
                character.groups.forEach((group, index) => {
                  if (group.id === this.$route.params.groupId) {
                    character.groups.splice(index, 1)
                  }
                })
                console.log(character.groups)
                this.$firebase.database().ref('characters/' + member.userId + '/' + member.characterId + '/groups').set(character.groups).then(() => {
                  console.log('UPDATE COMPLETE FOR MEMBER ' + member.userId)
                  resolve()
                })
              }
            })
          })
        })
        return Promise.all(promises)
      },

      leaveGroup () {
        console.log('leave the group...')
        console.log(this.character)
        if (this.character.groups) {
          this.character.groups.forEach((group, index) => {
            if (group.id === this.$route.params.groupId) {
              this.character.groups.splice(index, 1)
              this.$firebase.database().ref('characters/' + this.$firebase.auth().currentUser.uid + '/' + this.$root.characterId + '/groups').set(this.character.groups)
            }
          })
        }
        this.group.members.forEach((member, index) => {
          if (member.characterId === this.$root.characterId) {
            this.group.members.splice(index, 1)
          }
        })
        this.$firebase.database().ref('groups/' + this.$route.params.groupId + '/members').set(this.group.members)
      },

      deleteGroup () {
        this.removeAllMembers().then(() => {
          this.$firebase.database().ref('groups/' + this.$route.params.groupId).remove()
        })
        // this.removeAllMembers().then(() => {
        //   console.log('done removing group from characters...')
        // })
      },
      getHealthbarWidth (current, max, temp) {
        return (+current || 0) / (+max || 1 + +temp)
      }
    },

    // Computed
    computed: {
      sortedMembers: function () {
        let orderBy = this.sortBy
        if (orderBy === 'Health') {
          orderBy = 'currentHP'
        } else if (orderBy === 'Armor Class') {
          orderBy = 'armorClass'
        } else {
          orderBy = orderBy.toLowerCase()
        }
        console.log(orderBy)
        return _.orderBy(this.members, orderBy)
      }
    }
  }
</script>

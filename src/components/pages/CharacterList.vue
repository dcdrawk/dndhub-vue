<template>
  <div>
    <xen-page-toolbar class="xen-theme-indigo" title="Character List"></xen-page-toolbar>
    <div class="xen-page-content xen-page-background character-list-page">
      <xen-card>
        <xen-card-header :actions="true" background="#fafafa" v-if="Object.keys($root.gameData).length > 0">
          <xen-button :raised="true" class="xen-theme-primary" @click.native="newCharacter = true">New Character</xen-button>
          </xen-card-header>
          <div class="row" v-if="Object.keys($root.gameData).length === 0">
            <div class="col-xs-12">
              <xen-loading-spinner class="xen-color-primary"></xen-loading-spinner>
            </div>
          </div>
          <xen-list v-if="menuIndexes && $root.characters">
            <xen-list-item v-for="(character, key, index) in $root.characters" :text="character.name">
              <div slot="dropdown">
                <xen-icon-button style="position: relative;" slot="target" icon="delete" @click.native="showDeleteDialog(key)"></xen-icon-button>
              </div>
            </xen-list-item>
          </xen-list>
          <xen-card-content v-else>
            <p class="">You haven't created any characters yet</p>
          </xen-card-content>
      </xen-card>
    </div>

    <!-- Delete Character Dialog -->
    <xen-dialog :show="deleteDialog" @hide="deleteDialog = false" title="Delete Character" :small="true">
      <p>Are you sure you want to delete this character?</p>
      <div slot="actions">
        <xen-button @click.native="deleteDialog = false">Cancel</xen-button>
        <xen-button class="xen-color-primary" @click.native="deleteCharacter(deleteKey); deleteDialog = false">Delete</xen-button>
      </div>
    </xen-dialog>

    <!-- New Character Dialog -->
    <xen-dialog :show="newCharacter" @hide="newCharacter = false" title="New Character" :large="true" :fullscreen="true">
      <div class="row xen-color-primary">
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
          <xen-input label="Name" class="xen-color-primary xen-no-margin" type="text" :value="character.name" @input="$set(character, 'name', $event)"></xen-input>
        </div>
        <div class="col-xs-6 col-md-6 col-lg-4 xen-no-margin">
          <xen-input label="Level" class="xen-color-primary xen-no-margin" type="number" :value="character.level" @input="$set(character, 'level', $event)"></xen-input>
        </div>
        <div class="col-xs-6 col-md-6 col-lg-4 xen-no-margin">
          <xen-input label="Experience" class="xen-color-primary xen-no-margin" type="number" :value="character.experience" @input="$set(character, 'experience', $event)"></xen-input>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 xen-no-margin">
          <xen-select label="Class" :options="$root.gameData.classes" optionKey="name" :value="character.class" @input="$set(character, 'class', $event)"></xen-select>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
          <xen-select class="xen-color-primary" label="Race" :options="$root.gameData.races" optionKey="name" :value="character.race" @input="$set(character, 'race', $event); getSubraces($event);"></xen-select>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
          <xen-select :disabled="subraces.length === 0 || !character.race" :label="subraceLabel" :options="subraces" optionKey="name" :value="character.subrace" @input="$set(character, 'subrace', $event);"></xen-select>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 xen-no-margin">
          <xen-select label="Alignment" :options="$root.gameData.alignments" optionKey="name" :value="character.alignment" @input="$set(character, 'alignment', $event)"></xen-select>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
          <xen-select label="Background" :options="$root.gameData.backgrounds" optionKey="name" :value="character.background" @input="$set(character, 'background', $event);"></xen-select>
        </div>
      </div>
      <div slot="actions">
        <xen-button @click.native="cancel()">Cancel</xen-button>
        <xen-button class="xen-color-primary" @click.native="createCharacter()">Confirm</xen-button>
      </div>
    </xen-dialog>
    <xen-toast :text="toastMsg" :toggle="showToast" @hide="showToast = false" ></xen-toast>
  </div>
</template>

<style scoped>
  .character-list-page .xen-button-container {
    vertical-align: middle;
  }
</style>

<script>
  import XenButton from '../xen/Button'
  import XenCard from '../xen/Card'
  import XenCardActions from '../xen/CardActions'
  import XenCardContent from '../xen/CardContent'
  import XenCardHeader from '../xen/CardHeader'
  import XenDialog from '../xen/Dialog'
  import XenIconButton from '../xen/IconButton'
  import XenInput from '../xen/Input'
  import XenList from '../xen/List'
  import XenListItem from '../xen/ListItem'
  import XenLoadingSpinner from '../xen/LoadingSpinner'
  import XenPageToolbar from '../xen/PageToolbar'
  import XenSelect from '../xen/Select'
  import XenToast from '../xen/Toast'

  export default {
    // Name
    name: 'character-list',

    // Components
    components: {
      XenButton,
      XenCard,
      XenCardActions,
      XenCardContent,
      XenCardHeader,
      XenDialog,
      XenIconButton,
      XenInput,
      XenList,
      XenListItem,
      XenLoadingSpinner,
      XenPageToolbar,
      XenSelect,
      XenToast
    },

    // Data
    data () {
      return {
        character: {},
        deleteDialog: false,
        deleteKey: undefined,
        editing: false,
        errorToast: false,
        menuIndexes: {},
        newCharacter: false,
        showToast: false,
        subraces: [],
        successToast: false,
        toastMsg: '',
        updatePhoto: false,
        uploadErrorMessage: undefined,
        uploading: false,
        user: this.$root.user || undefined
      }
    },

    // Mouted
    mounted () {
      // When a user signs in (page refresh)
      this.$bus.$on('user-signin', user => {
        this.user = Object.assign({}, user)
      })
    },

    // Methods
    methods: {
      // Show the character delete dialog
      showDeleteDialog (key) {
        this.deleteDialog = true
        this.deleteKey = key
      },

      // Cancel character dialog
      cancel () {
        this.character = {}
        this.newCharacter = false
      },

      // Create a new Character
      createCharacter () {
        this.$firebase.database().ref('characters/' + this.$root.user.uid + '/').push(this.character).then(() => {
          this.newCharacter = false
          this.$root.getCharacters()
          this.toastMsg = 'New Character Created'
          this.showToast = true
        })
      },

      // Delete a character
      deleteCharacter (characterId) {
        console.log(characterId)
        this.$firebase.database().ref('characters/' + this.$root.user.uid + '/' + characterId).remove().then(() => {
          this.$root.getCharacters()
        })
      },

      // Get the subraces of a selected race
      getSubraces (raceName) {
        this.subraces = []
        if (this.character.subrace) {
          this.character.subrace = undefined
        }
        this.$root.gameData.races.forEach((race, index) => {
          if (race.name === raceName && race.subraces) {
            console.log(race)
            this.subraces = race.subraces
          }
        })
      }
    },

    // Computed
    computed: {
      subraceLabel: function () {
        if (!this.character.race) {
          return 'Select a Race'
        } else if (!this.subraces || this.subraces.length === 0) {
          return 'No Subraces Available'
        } else {
          return 'Select a Subrace'
        }
      }
    }
  }
</script>

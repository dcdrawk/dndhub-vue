<template>
  <div>
    <xen-page-toolbar class="xen-theme-indigo" title="Armor"></xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Equipped">

      <!-- Equipped Armor Tab -->
      <div slot="Equipped">
        <section class="page-tab-content">
            <xen-card class="margin-bottom" v-if="!loaded">
              <xen-card-content>
                <xen-loading-spinner class="xen-color-primary"></xen-loading-spinner>
              </xen-card-content>
            </xen-card>
            <div class="xen-data-table bordered hover" v-if="loaded">
              <table>
                <thead>
                  <tr>
                    <th class="text-left xen-first-col">
                      Name
                    </th>
                    <th class="text-center">
                      Armor Class
                    </th>
                    <th class="checkbox-col xen-last-col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(armor, index) in filteredArmor">
                    <td class="text-left xen-first-col" @click="selectArmor(armor, false);">
                      {{ armor.name }}
                    </td>
                    <td class="text-center" @click="selectArmor(armor, false);">
                      {{ armor.ac || '-' }}
                    </td>
                    <td class="text-right xen-last-col">
                      <xen-icon-button class="table-button" icon="delete" @click.native="removeArmor(armor, index)"></xen-icon-button>
                    </td>
                  </tr>
                  <tr v-if="filteredArmor.length === 0">
                    <td colspan="3" class="xen-first-col text-left">You haven't added any armor yet</td>
                  </tr>
                </tbody>
              </table>
            </div>
        </section>
      </div>

      <!-- Browse Armor Tab -->
      <div slot="Browse All">
        <section class="page-tab-content">
          <xen-input class="xen-color-primary search-input" :value="filter" placeholder="Search Armor" @input="filter = $event"></xen-input>
          <div class="xen-data-table bordered hover" v-if="loaded">
            <table>
              <thead>
                <tr>
                  <th class="icon-col"></th>
                  <th class="text-left">
                    Name
                  </th>
                  <th class="text-center">
                    Armor Class
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="armor in gameArmor">
                  <td class="xen-first-col icon-col">
                  <xen-icon-button :raised="true" icon="add" class="xen-theme-blue table-icon-button" @click.native="addArmor(armor)"></xen-icon-button>
                  </td>
                  <td class="text-left" @click="selectArmor(armor, true);">
                    {{ armor.name }}
                  </td>
                  <td class="text-center" @click="selectArmor(armor, true);">
                    {{ armor.ac || '-' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </xen-tabs>

    <!-- Armor Dialog -->
    <div v-if="selectedArmor">
      <xen-dialog :show="showDialog" @hide="showDialog = false" :title="selectedArmor.name || 'undefined'" :large="true" :fullscreen="true" :primary="true">
        <div class="row">            <ul class="property-list">
            <li>
              <xen-input label="Name" class="xen-color-primary" :value="selectedArmor.name" :disabled="disableInput" @input="selectedArmor.name = $event; $root.updateCharacter('', 'armor', character.armor);"></xen-input>
            </li>
            <li>
              <xen-input label="Armor Class" class="xen-color-primary" :value="selectedArmor.ac" :disabled="disableInput" @input="selectedArmor.ac = $event; $root.updateCharacter('', 'armor', character.armor);"></xen-input>
            </li>
            <li>
              <xen-input label="Armor Type" class="xen-color-primary" :value="selectedArmor.armorType" :disabled="disableInput" @input="selectedArmor.armorType = $event; $root.updateCharacter('', 'armor', character.armor);"></xen-input>
            </li>
            <li>
              <xen-input label="Weight" class="xen-color-primary" :value="selectedArmor.weight" :disabled="disableInput" @input="selectedArmor.weight = $event; $root.updateCharacter('', 'armor', character.armor);"></xen-input>
            </li>
            <li>
              <xen-input label="Cost" class="xen-color-primary" :value="selectedArmor.cost" :disabled="disableInput" @input="selectedArmor.cost = $event; $root.updateCharacter('', 'armor', character.armor);"></xen-input>
            </li>
            <li v-if="!disableInput">
              <xen-textarea label="Notes" class="xen-color-primary" :value="selectedArmor.notes" :disabled="disableInput" @input="selectedArmor.notes = $event; $root.updateCharacter('', 'armor', character.armor);"></xen-input>
            </li>
            <li>
              <h2 class="caption secondary-text">Properties</h2>
              <xen-chips :chips="selectedArmor.properties" :read-only="disableInput"></xen-chips>
            </li>
          </ul>
        </div>
        <div slot="actions">
          <xen-button @click.native="showDialog = false" class="xen-color-primary">Close</xen-button>
        </div>
      </xen-dialog>
    </div>
    <xen-toast :text="toastMsg" :toggle="showToast" @hide="showToast = false" ></xen-toast>
  </div>
</template>

<style lang="scss">
</style>

<script>
  import _ from 'lodash'
  import XenButton from '../xen/Button'
  import XenCard from '../xen/Card'
  import XenCardContent from '../xen/CardContent'
  import XenCheckbox from '../xen/Checkbox'
  import XenChips from '../xen/Chips'
  import XenDialog from '../xen/Dialog'
  import XenIconButton from '../xen/IconButton'
  import XenInput from '../xen/Input'
  import XenList from '../xen/List'
  import XenListItem from '../xen/ListItemCustom'
  import XenLoadingSpinner from '../xen/LoadingSpinner'
  import XenPageToolbar from '../xen/PageToolbar'
  import XenTabs from '../xen/Tabs'
  import XenTextarea from '../xen/Textarea'
  import XenToast from '../xen/Toast'

  export default {
    name: 'armor',

    components: {
      XenButton,
      XenCard,
      XenCardContent,
      XenCheckbox,
      XenChips,
      XenDialog,
      XenIconButton,
      XenInput,
      XenList,
      XenListItem,
      XenLoadingSpinner,
      XenPageToolbar,
      XenTabs,
      XenTextarea,
      XenToast
    },

    data () {
      return {
        character: this.$root.selectedCharacter || undefined,
        disableInput: false,
        filter: '',
        loaded: false,
        selectedArmor: undefined,
        showDialog: false,
        showToast: false,
        toastMsg: '',
        user: this.$root.user || undefined
      }
    },

    mounted () {
      // When a user signs in
      this.$bus.$on('user-signin', user => {
        this.user = Object.assign({}, user)
      })

      // When a character is selected
      this.$bus.$on('character-selected', character => {
        this.character = Object.assign({}, character)
        this.loaded = this.checkLoaded()
        if (this.loaded) {
          this.checkArmor()
        }
      })

      // When the data is loaded
      this.$bus.$on('data-loaded', () => {
        this.loaded = this.checkLoaded()
        if (this.loaded) {
          this.checkArmor()
        }
      })

      // Check if the game data is loaded
      this.loaded = this.checkLoaded()
      if (this.loaded) {
        this.checkArmor()
      }
    },

    methods: {
      // check if character and game data are loaded
      checkLoaded () {
        if (this.character && this.$root.gameData) {
          return true
        }
      },

      // Check to make sure character has an armor attribute
      checkArmor () {
        if (!this.character.armor) {
          this.$set(this.character, 'armor', [])
        }
      },

      // Remove a piece of armor
      removeArmor (armor, index) {
        let array = _.orderBy(this.character.armor, 'name')
        array.splice(index, 1)
        this.character.armor = array
        this.showToast = true
        this.toastMsg = armor.name + ' removed'
        this.$root.updateCharacter('', 'armor', this.character.armor)
      },

      // Select a piece of armor to display in the dialog
      selectArmor (armor, disabled) {
        this.disableInput = disabled
        this.selectedArmor = armor
        this.$nextTick(() => {
          this.showDialog = true
        })
      },

      // Add a piece of armor to a character
      addArmor (armor) {
        this.character.armor.push(armor)
        this.showToast = true
        this.toastMsg = armor.name + ' equipped'
        this.$root.updateCharacter('', 'armor', this.character.armor)
      }
    },

    // Computed
    computed: {
      // Order the armor alphabetically
      filteredArmor: function () {
        return _.orderBy(this.character.armor, 'name')
      },

      // Filter the list of in-game armor
      gameArmor: function () {
        return this.$root.gameData.armor.filter((row) => {
          return row.name.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0
        })
      }
    }
  }
</script>

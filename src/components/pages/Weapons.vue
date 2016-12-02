<template>
  <div>
    <xen-page-toolbar class="xen-theme-indigo" title="Weapons"></xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Equipped">

      <!-- Equipped Weapons Tab -->
      <div slot="Equipped">
        <section class="page-tab-content">
          <!-- Loading Spinner -->
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
                    Damage
                  </th>
                  <th class="checkbox-col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(weapon, index) in filteredWeapons">
                  <td class="text-left xen-first-col" @click="selectWeapon(weapon, false);">
                    {{ weapon.name }}
                  </td>
                  <td class="text-center" @click="selectWeapon(weapon, false);">
                    {{ weapon.damage || '-' }}
                  </td>
                  <td class="text-right xen-last-col icon-col delete-col">
                    <xen-icon-button class="table-icon-button" icon="delete" @click.native="removeWeapon(weapon, index)"></xen-icon-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <!-- Browse Weapons Tab -->
      <div slot="Browse All">
        <section class="page-tab-content">
          <xen-input class="xen-color-primary search-input" :value="filter" placeholder="Search Weapons" @input="filter = $event"></xen-input>
          <div class="xen-data-table bordered hover" v-if="loaded">
            <table>
              <thead>
                <tr>
                  <th class="icon-col">
                    <!-- Equipped -->
                  </th>
                  <th class="text-left">
                    Name
                  </th>
                  <th class="text-center">
                    Damage
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="weapon in gameWeapons">
                  <td class="xen-first-col icon-col">
                    <xen-icon-button :raised="true" icon="add" class="xen-theme-blue table-icon-button" @click.native="addWeapon(weapon)"></xen-icon-button>
                  </td>
                  <td class="text-left" @click="selectWeapon(weapon, true);">
                    {{ weapon.name }}
                  </td>
                  <td class="text-center" @click="selectWeapon(weapon, true);">
                    {{ weapon.damage || '-' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </xen-tabs>

    <!-- Weapon Dialog -->
    <div v-if="selectedWeapon">
      <xen-dialog :show="showDialog" @hide="showDialog = false" :title="selectedWeapon.name || 'undefined'" :large="true" :fullscreen="true" :primary="true">
        <div class="row">
          <ul class="property-list">
            <li>
              <xen-input label="Name" class="xen-color-primary" :value="selectedWeapon.name" :disabled="disableInput" @input="selectedWeapon.name = $event; $root.updateCharacter('', 'weapons', character.weapons);"></xen-input>
            </li>
            <li>
              <xen-input label="Damage" class="xen-color-primary" :value="selectedWeapon.damage" :disabled="disableInput" @input="selectedWeapon.damage = $event; $root.updateCharacter('', 'weapons', character.weapons);"></xen-input>
            </li>
            <li>
              <xen-input label="Damage Type" class="xen-color-primary" :value="selectedWeapon.damageType" :disabled="disableInput" @input="selectedWeapon.damageType = $event; $root.updateCharacter('', 'weapons', character.weapons);"></xen-input>
            </li>
            <li>
              <xen-input label="Weapon Type" class="xen-color-primary" :value="selectedWeapon.weaponType" :disabled="disableInput" @input="selectedWeapon.weaponType = $event; $root.updateCharacter('', 'weapons', character.weapons);"></xen-input>
            </li>
            <li>
              <xen-input label="Weight" class="xen-color-primary" :value="selectedWeapon.weight" :disabled="disableInput" @input="selectedWeapon.weight = $event; $root.updateCharacter('', 'weapons', character.weapons);"></xen-input>
            </li>
            <li>
              <xen-input label="Cost" class="xen-color-primary" :value="selectedWeapon.cost" :disabled="disableInput" @input="selectedWeapon.cost = $event; $root.updateCharacter('', 'weapons', character.weapons);"></xen-input>
            </li>
            <li v-if="!disableInput">
              <xen-textarea label="Notes" class="xen-color-primary" :value="selectedWeapon.notes" :disabled="disableInput" @input="selectedWeapon.notes = $event; $root.updateCharacter('', 'weapons', character.weapons);"></xen-input>
            </li>
            <li>
              <h2 class="caption secondary-text">Properties</h2>
              <xen-chips :chips="selectedWeapon.properties" :read-only="disableInput"></xen-chips>
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
  import XenCardHeader from '../xen/CardHeader'
  import XenCheckbox from '../xen/Checkbox'
  import XenChips from '../xen/Chips'
  import XenDialog from '../xen/Dialog'
  import XenDivider from '../xen/Divider'
  import XenIconButton from '../xen/IconButton'
  import XenInput from '../xen/Input'
  import XenList from '../xen/List'
  import XenListItem from '../xen/ListItemCustom'
  import XenLoadingSpinner from '../xen/LoadingSpinner'
  import XenPageToolbar from '../xen/PageToolbar'
  import XenSelect from '../xen/Select'
  import XenTabs from '../xen/Tabs'
  import XenTextarea from '../xen/Textarea'
  import XenToast from '../xen/Toast'

  export default {
    // Name
    name: 'weapons',

    // Components
    components: {
      XenButton,
      XenCard,
      XenCardContent,
      XenCardHeader,
      XenCheckbox,
      XenChips,
      XenDialog,
      XenDivider,
      XenIconButton,
      XenInput,
      XenList,
      XenListItem,
      XenLoadingSpinner,
      XenPageToolbar,
      XenSelect,
      XenTabs,
      XenTextarea,
      XenToast
    },

    // Data
    data () {
      return {
        character: this.$root.selectedCharacter || undefined,
        disableInput: false,
        filter: '',
        loaded: false,
        selectedWeapon: undefined,
        showDialog: false,
        showToast: false,
        toastMsg: '',
        user: this.$root.user || undefined
      }
    },

    // Mounted
    mounted () {
      // When a user signs in (page-load)
      this.$bus.$on('user-signin', user => {
        this.user = Object.assign({}, user)
      })

      // When a character is selected
      this.$bus.$on('character-selected', character => {
        this.character = Object.assign({}, character)
        this.loaded = this.checkLoaded()
        if (this.loaded) {
          this.checkWeapons()
        }
      })

      // When the game data has loaded
      this.$bus.$on('data-loaded', () => {
        this.loaded = this.checkLoaded()
        if (this.loaded) {
          this.checkWeapons()
        }
      })

      // Run this when mounted
      this.loaded = this.checkLoaded()
      if (this.loaded) {
        if (this.loaded) {
          this.checkWeapons()
        }
      }
    },

    // Methods
    methods: {
      // Check if character and gme data have loaded
      checkLoaded () {
        if (this.character && this.$root.gameData) {
          return true
        }
      },

      // Check to see if character has a weapons attribute
      checkWeapons () {
        if (!this.character.weapons) {
          this.$set(this.character, 'weapons', [])
        }
      },

      // Remove a weapon
      removeWeapon (weapon, index) {
        let array = _.orderBy(this.character.weapons, 'name')
        array.splice(index, 1)
        this.character.weapons = array
        this.showToast = true
        this.toastMsg = weapon.name + ' removed'
        this.$root.updateCharacter('', 'weapons', this.character.weapons)
      },

      // Select a weapon to show in the dialog
      selectWeapon (weapon, disabled) {
        this.disableInput = disabled
        this.selectedWeapon = weapon
        this.$nextTick(() => {
          this.showDialog = true
        })
      },

      // Add a weapon to character
      addWeapon (weapon) {
        this.character.weapons.push(weapon)
        this.showToast = true
        this.toastMsg = weapon.name + ' equipped'
        this.$root.updateCharacter('', 'weapons', this.character.weapons)
      }
    },

    // Computed
    computed: {
      filteredWeapons: function () {
        return _.orderBy(this.character.weapons, 'name')
      },
      gameWeapons: function () {
        return this.$root.gameData.weapons.filter((row) => {
          return row.name.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0
        })
      }
    }
  }
</script>

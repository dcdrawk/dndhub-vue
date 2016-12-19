<template>
  <div>
    <xen-page-toolbar class="xen-theme-indigo" title="Inventory"></xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Items">

      <!-- Equipped inventory Tab -->
      <div slot="Items">
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
                      Quantity
                    </th>
                    <th class="checkbox-col xen-last-col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(inventory, index) in filteredinventory">
                    <td class="text-left xen-first-col" @click="selectinventory(inventory, false);">
                      {{ inventory.name }}
                    </td>
                    <td class="text-center" @click="selectinventory(inventory, false);">
                      {{ inventory.quantity || '-' }}
                    </td>
                    <td class="text-right xen-last-col delete-col">
                      <xen-icon-button class="table-icon-button" icon="delete" @click.native="removeinventory(inventory, index)"></xen-icon-button>
                    </td>
                  </tr>
                  <tr v-if="filteredinventory.length === 0">
                    <td colspan="3" class="xen-first-col text-left">You haven't added any inventory yet</td>
                  </tr>
                </tbody>
              </table>
            </div>
        </section>
      </div>

      <!-- Browse inventory Tab -->
      <div slot="Browse">
        <section class="page-tab-content">
          <xen-input class="xen-color-primary search-input" :value="filter" placeholder="Search inventory" @input="filter = $event"></xen-input>
          <div class="xen-data-table bordered hover" v-if="loaded">
            <table>
              <thead>
                <tr>
                  <th class="icon-col"></th>
                  <th class="text-left">
                    Name
                  </th>
                  <th class="text-center">
                    inventory Class
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="inventory in gameinventory">
                  <td class="xen-first-col icon-col">
                  <xen-icon-button :raised="true" icon="add" class="xen-theme-blue table-icon-button" @click.native="addinventory(inventory)"></xen-icon-button>
                  </td>
                  <td class="text-left" @click="selectinventory(inventory, true);">
                    {{ inventory.name }}
                  </td>
                  <td class="text-center" @click="selectinventory(inventory, true);">
                    {{ inventory.ac || '-' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </xen-tabs>

    <!-- inventory Dialog -->
    <div v-if="selectedInventory">
      <xen-dialog :show="showDialog" @hide="showDialog = false" :title="selectedInventory.name || 'undefined'" :large="true" :fullscreen="true" :primary="true">
        <div class="row">
          {{ selectedInventory }}
          <ul class="property-list">
            <li>
              <xen-input label="Name" class="xen-color-primary" :value="selectedInventory.name" :disabled="disableInput" @input="selectedInventory.name = $event; $root.updateCharacter('', 'inventory', character.inventory);"></xen-input>
            </li>
            <li>
              <xen-textarea label="Description" class="xen-color-primary" :value="selectedInventory.description" :disabled="disableInput"></xen-input>
            </li>
            <li>
              <xen-input label="Weight" class="xen-color-primary" :value="selectedInventory.weight" :disabled="disableInput" @input="selectedInventory.weight = $event; $root.updateCharacter('', 'inventory', character.inventory);"></xen-input>
            </li>
            <li>
              <xen-input label="Cost" class="xen-color-primary" :value="selectedInventory.cost" :disabled="disableInput" @input="selectedInventory.cost = $event; $root.updateCharacter('', 'inventory', character.inventory);"></xen-input>
            </li>
            <li>
              <xen-input label="Currency" class="xen-color-primary" :value="selectedInventory.currency" :disabled="disableInput" @input="selectedInventory.cost = $event; $root.updateCharacter('', 'inventory', character.inventory);"></xen-input>
            </li>
            <li>
              <h2 class="caption secondary-text">Properties</h2>
              <xen-chips :chips="selectedInventory.properties" :read-only="disableInput"></xen-chips>
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
  import DataService from '../services/DataService'
  import XenButton from '../xen/Button'
  import XenCard from '../xen/Card'
  import XenCardContent from '../xen/CardContent'
  import XenCheckbox from '../xen/Checkbox'
  import XenChips from '../xen/Chips'
  import XenDialog from '../xen/Dialog'
  import XenIconButton from '../xen/IconButton'
  import XenInput from '../xen/Input'
  import XenLoadingSpinner from '../xen/LoadingSpinner'
  import XenPageToolbar from '../xen/PageToolbar'
  import XenTabs from '../xen/Tabs'
  import XenTextarea from '../xen/Textarea'
  import XenToast from '../xen/Toast'

  export default {
    // Name
    name: 'inventory',

    // Components
    components: {
      XenButton,
      XenCard,
      XenCardContent,
      XenCheckbox,
      XenChips,
      XenDialog,
      XenIconButton,
      XenInput,
      XenLoadingSpinner,
      XenPageToolbar,
      XenTabs,
      XenTextarea,
      XenToast
    },

    // Created
    created () {
      this.fetchData()
    },

    // Data
    data () {
      return {
        inventory: [],
        disableInput: false,
        filter: '',
        loaded: false,
        selectedInventory: undefined,
        showDialog: false,
        showToast: false,
        toastMsg: ''
      }
    },

    // Mounted
    mounted () {
      // When a character is selected
      this.$bus.$on('character-selected', character => {
        this.character = Object.assign({}, character)
        this.loaded = this.checkLoaded()
        if (this.loaded) {
          this.checkinventory()
        }
      })

      // When the data is loaded
      this.$bus.$on('data-loaded', () => {
        this.loaded = this.checkLoaded()
        if (this.loaded) {
          this.checkinventory()
        }
      })

      // Check if the game data is loaded
      this.loaded = this.checkLoaded()
      if (this.loaded) {
        this.checkinventory()
      }
    },

    // Methods
    methods: {
      // Fetch data
      fetchData () {
        // inventory
        DataService.get('inventory').then((inventory) => {
          this.inventory = inventory
        })
      },

      // check if character and game data are loaded
      checkLoaded () {
        if (this.character) {
          return true
        }
      },

      // Check to make sure character has an inventory attribute
      checkinventory () {
        if (!this.character.inventory) {
          this.$set(this.character, 'inventory', [])
        }
      },

      // Remove a piece of inventory
      removeinventory (inventory, index) {
        let array = _.orderBy(this.character.inventory, 'name')
        array.splice(index, 1)
        this.character.inventory = array
        this.showToast = true
        this.toastMsg = inventory.name + ' removed'
        this.$root.updateCharacter('', 'inventory', this.character.inventory)
      },

      // Select a piece of inventory to display in the dialog
      selectinventory (inventory, disabled) {
        this.disableInput = disabled
        this.selectedInventory = inventory
        this.$nextTick(() => {
          this.showDialog = true
        })
      },

      // Add a piece of inventory to a character
      addinventory (inventory) {
        this.character.inventory.push(inventory)
        this.showToast = true
        this.toastMsg = inventory.name + ' equipped'
        this.$root.updateCharacter('', 'inventory', this.character.inventory)
      }
    },

    // Computed
    computed: {
      character: function () {
        return this.$store.state.character
      },
      // Order the inventory alphabetically
      filteredinventory: function () {
        return _.orderBy(this.character.inventory, 'name')
      },

      // Filter the list of in-game inventory
      gameinventory: function () {
        return this.inventory.filter((row) => {
          return row.name.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0
        })
      }
    }
  }
</script>

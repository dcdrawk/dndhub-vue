<template>
  <div>
    <xen-page-toolbar class="xen-theme-indigo" title="Armor"></xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Equipped">

      <!-- Combat Tab -->
      <div slot="Equipped">
        <!-- Combat Info -->
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
                    <th class="delete-col xen-last-col"></th>
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
                </tbody>
              </table>
            </div>
        </section>
      </div>

      <!-- Ability Scores Tab -->
      <div slot="Browse All">
        <section class="page-tab-content">
          <xen-input class="xen-color-primary search-input" :value="filter" placeholder="Search Armor" @input="filter = $event"></xen-input>
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
                <tr v-for="armor in gameArmor">
                  <td class="xen-first-col icon-col">
                  <xen-icon-button :raised="true" icon="add" class="xen-theme-primary table-icon-button" @click.native="addArmor(armor)"></xen-icon-button>
                  <!-- <xen-checkbox class="table-checkbox xen-color-primary" :value="armor.equipped" @input="toggleArmor($event, armor)"></xen-checkbox> -->
                  </td>
                  <td class="text-left" @click="selectArmor(armor, true);">
                    {{ armor.name }}
                  </td>
                  <td class="text-center" @click="selectArmor(armor, true);">
                    {{ armor.damage || '-' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>      
    </xen-tabs>
      <!-- Feat Dialog -->
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
@import '../xen/styles/data-tables';
@import '../xen/styles/variables';
.checkbox-col {
  width: 96px;
}

.icon-col {
  width: 80px;
}
.table-icon-button {
  margin: 4px 0 0 0;
}
.xen-data-table td.xen-first-col .table-checkbox i {
  margin-left: 12px;
}

.delete-col {
  width: 48px;
}
.combat-divider {
  margin-bottom: 16px;
}
.small-table-input {
  margin: auto;
  padding-top: 16px;
}
.small-table-input,
.small-table-input input {
  text-align: center;
  width: 40px;  
}
@media screen and (max-width: $small-breakpoint) {
  .xen-data-table th,
  .xen-data-table td {
    padding-right: 0;
  }
}
.dialog-description {
  width: 100%;
  ul {
    margin-bottom: 0;
    background-color: #fafafa;
    border: 1px solid #BDBDBD;
    li {
      padding: 8px;
      border-bottom: 1px solid #BDBDBD;
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
.search-input {
  margin-bottom: 0;
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
  import _ from 'lodash'

  export default {
    name: 'profile',

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
      XenToast
    },

    data () {
      return {
        user: this.$root.user || undefined,
        character: this.$root.selectedCharacter || undefined,
        loaded: false,
        showDialog: false,
        selectedArmor: undefined,
        disableInput: false,
        toastMsg: '',
        showToast: false,
        filter: ''
      }
    },

    mounted () {
      this.$bus.$on('user-signin', user => {
        this.user = Object.assign({}, user)
      })
      this.$bus.$on('character-selected', character => {
        this.character = Object.assign({}, character)
      })
      this.$bus.$on('data-loaded', () => {
        if (this.character) {
          this.loaded = true
        }
      })

      if (this.character && this.$root.gameData) {
        this.loaded = true
      }
    },

    methods: {
      removeArmor (armor, index) {
        let array = _.orderBy(this.character.armor, 'name')
        array.splice(index, 1)
        this.character.armor = array
        this.showToast = true
        this.toastMsg = armor.name + ' removed'
        this.$root.updateCharacter('', 'armor', this.character.armor)
      },

      selectArmor (armor, disabled) {
        this.disableInput = disabled
        this.selectedArmor = armor
        this.$nextTick(() => {
          this.showDialog = true
        })
      },

      addArmor (armor) {
        this.character.armor.push(armor)
        this.showToast = true
        this.toastMsg = armor.name + ' equipped'
        this.$root.updateCharacter('', 'armor', this.character.armor)
      },

      toggleArmor (event, armor) {
        if (event) {
          this.character.armor.push(armor)
        } else {
          this.character.armor.forEach((charWeap, index) => {
            if (charWeap.name === armor.name) {
              this.character.armor.splice(index, 1)
            }
          })
        }
        this.$root.updateCharacter('', 'armor', this.character.armor)
      }
    },

    // Computed
    computed: {
      filteredArmor: function () {
        return _.orderBy(this.character.armor, 'name')
      },
      gameArmor: function () {
        return this.$root.gameData.armor.filter((row) => {
          return row.name.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0
        })
      }
    }
  }
</script>

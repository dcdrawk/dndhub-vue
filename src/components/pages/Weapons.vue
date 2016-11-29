<template>
  <div>
    <xen-page-toolbar class="xen-theme-indigo" title="Weapons"></xen-page-toolbar>
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
                      Damage
                    </th>
                    <th class="delete-col xen-last-col"></th>
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
                    <td class="text-right xen-last-col">
                      <xen-icon-button class="table-button" icon="delete" @click.native="removeWeapon(weapon, index)"></xen-icon-button>
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
                  <xen-icon-button :raised="true" icon="add" class="xen-theme-primary table-icon-button" @click.native="addWeapon(weapon)"></xen-icon-button>
                  <!-- <xen-checkbox class="table-checkbox xen-color-primary" :value="weapon.equipped" @input="toggleWeapon($event, weapon)"></xen-checkbox> -->
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
      <!-- Feat Dialog -->
      <div v-if="selectedWeapon">
        <xen-dialog :show="showDialog" @hide="showDialog = false" :title="selectedWeapon.name || 'undefined'" :large="true" :fullscreen="true" :primary="true">
          <div class="row">            <ul class="property-list">
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
        selectedWeapon: undefined,
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
      removeWeapon (weapon, index) {
        let array = _.orderBy(this.character.weapons, 'name')
        array.splice(index, 1)
        this.character.weapons = array
        this.showToast = true
        this.toastMsg = weapon.name + ' removed'
        this.$root.updateCharacter('', 'weapons', this.character.weapons)
      },

      selectWeapon (weapon, disabled) {
        this.disableInput = disabled
        this.selectedWeapon = weapon
        this.$nextTick(() => {
          this.showDialog = true
        })
      },

      addWeapon (weapon) {
        this.character.weapons.push(weapon)
        this.showToast = true
        this.toastMsg = weapon.name + ' equipped'
        this.$root.updateCharacter('', 'weapons', this.character.weapons)
      },

      toggleWeapon (event, weapon) {
        if (event) {
          this.character.weapons.push(weapon)
        } else {
          this.character.weapons.forEach((charWeap, index) => {
            if (charWeap.name === weapon.name) {
              this.character.weapons.splice(index, 1)
            }
          })
        }
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

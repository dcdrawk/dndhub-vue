<template>
  <div>
    <xen-page-toolbar class="xen-theme-indigo" title="Spells"></xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Equipped">

      <!-- Combat Tab -->
      <div slot="Equipped">
        <!-- Combat Info -->
        <section class="dndhub-tab-content">

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
                  <tr v-for="(spell, index) in filteredSpells">
                    <td class="text-left xen-first-col" @click="selectSpell(spell, false);">
                      {{ spell.name }}
                    </td>
                    <td class="text-center" @click="selectSpell(spell, false);">
                      {{ spell.damage || '-' }}
                    </td>
                    <td class="text-right xen-last-col">
                      <xen-icon-button class="table-button" icon="delete" @click.native="removeSpell(spell, index)"></xen-icon-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
        </section>
      </div>

      <!-- Ability Scores Tab -->
      <div slot="Browse All">
        <section class="dndhub-tab-content">
          <div class="filters">
            <div class="row">
              <div class="col-xs-12">
                <xen-input class="xen-color-primary search-input" :value="filter" placeholder="Search Spells" @input="filter = $event; checkPage();" :debounce="500"></xen-input>
              </div>         
              <div class="col-xs-6 xen-no-margin">
                <xen-select class="xen-color-primary" label="Level" :options="['Cantrip', '1', '2', '3', '4', '5', '6', '7', '8', '9']" :value="levelFilter" @input="levelFilter = $event; checkPage();"></xen-select>
              </div>   
              <div class="col-xs-6 xen-no-margin">
                <xen-select class="xen-color-primary" label="Class" :options="classOptions" :value="classFilter" @input="classFilter = $event; checkPage();"></xen-select>
              </div>
              <div class="col-xs-6 xen-no-margin">
                <xen-select class="xen-color-primary" label="School" :options="schoolOptions" :value="schoolFilter" @input="schoolFilter = $event; checkPage();"></xen-select>
              </div>
              <div class="col-xs-6 xen-no-margin">
                <xen-select class="xen-color-primary" label="Per Page" :options="['10', '20', '50']" :value="perPage" @input="perPage = $event; checkPage();"></xen-select>
              </div>
            </div>
          </div>
          <!-- Bottom Pagination -->
          <div class="bottom-pagination">
            <span class="float-left"></span>
            <span>{{ page }} / {{ Math.ceil(numSpells / perPage) }}</span>
            <xen-button @click.native="page--" :disabled="page === 1"><i class="material-icons">navigate_before</i></xen-button>
            <xen-button @click.native="page++" :disabled="page === Math.ceil(numSpells / perPage)"><i class="material-icons">navigate_next</i></xen-button>
          </div>
          <div class="xen-data-table bordered hover" v-if="loaded">
            <table class="dndhub-table">
              <thead class="hidden">
                <tr>
                  <th class="icon-col">
                  </th>
                  <th class="text-left">
                    Name
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="spell in gameSpells">
                  <td class="xen-first-col icon-col">
                    <xen-icon-button :raised="true" icon="add" class="xen-theme-primary table-icon-button" @click.native="addSpell(spell)"></xen-icon-button>
                  </td>
                  <td class="text-left " @click="selectSpell(spell, true);">
                    <div>{{ spell.name }}</div>
                    <div class="caption">{{ spell.level }} {{ spell.school }}</div>
                    <div class="caption secondary-text">{{ spell.class }}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>      
    </xen-tabs>
      <!-- Feat Dialog -->
      <div v-if="selectedSpell">
        <xen-dialog :show="showDialog" @hide="showDialog = false" :title="selectedSpell.name || 'undefined'" :large="true" :fullscreen="true" :primary="true">
          <div class="row">            
          {{ selectedSpell }}
            <!-- <ul class="property-list">
              <li>
                <xen-input label="Name" class="xen-color-primary" :value="selectedSpell.name" :disabled="disableInput" @input="selectedSpell.name = $event; $root.updateCharacter('', 'spells', character.spells);"></xen-input>
              </li>
              <li>
                <xen-input label="Damage" class="xen-color-primary" :value="selectedSpell.damage" :disabled="disableInput" @input="selectedSpell.damage = $event; $root.updateCharacter('', 'spells', character.spells);"></xen-input>
              </li>
              <li>
                <xen-input label="Damage Type" class="xen-color-primary" :value="selectedSpell.damageType" :disabled="disableInput" @input="selectedSpell.damageType = $event; $root.updateCharacter('', 'spells', character.spells);"></xen-input>
              </li>
              <li>
                <xen-input label="Spell Type" class="xen-color-primary" :value="selectedSpell.spellType" :disabled="disableInput" @input="selectedSpell.spellType = $event; $root.updateCharacter('', 'spells', character.spells);"></xen-input>
              </li>
              <li>
                <xen-input label="Weight" class="xen-color-primary" :value="selectedSpell.weight" :disabled="disableInput" @input="selectedSpell.weight = $event; $root.updateCharacter('', 'spells', character.spells);"></xen-input>
              </li>
              <li>
                <xen-input label="Cost" class="xen-color-primary" :value="selectedSpell.cost" :disabled="disableInput" @input="selectedSpell.cost = $event; $root.updateCharacter('', 'spells', character.spells);"></xen-input>
              </li>
              <li v-if="!disableInput">
                <xen-textarea label="Notes" class="xen-color-primary" :value="selectedSpell.notes" :disabled="disableInput" @input="selectedSpell.notes = $event; $root.updateCharacter('', 'spells', character.spells);"></xen-input>
              </li>
              <li>
                <h2 class="caption secondary-text">Properties</h2>
                <xen-chips :chips="selectedSpell.properties" :read-only="disableInput"></xen-chips>
              </li>
            </ul> -->
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
  width: 56px;
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
  .icon-col {
    width: 72px;
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
table {
  // table-layout: auto;
  // padding-bottom: 48px;
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
        selectedSpell: undefined,
        disableInput: false,
        toastMsg: '',
        showToast: false,
        filter: '',
        classFilter: 'All',
        schoolFilter: 'All',
        levelFilter: 'All',
        perPage: '10',
        numSpells: 0,
        page: 1,
        classOptions: [
          'All',
          'Bard',
          'Cleric',
          'Druid',
          'Paladin',
          'Sorcerer',
          'Ranger',
          'Ritual Caster',
          'Warlock',
          'Wizard'
        ],
        schoolOptions: [
          'All',
          'Abjuration',
          'Conjuration',
          'Divination',
          'Enchantment',
          'Evocation',
          'Illusion',
          'Necromancy',
          'Transmutation'
        ]
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
      removeSpell (spell, index) {
        let array = _.orderBy(this.character.spells, 'name')
        array.splice(index, 1)
        this.character.spells = array
        this.showToast = true
        this.toastMsg = spell.name + ' removed'
        this.$root.updateCharacter('', 'spells', this.character.spells)
      },

      selectSpell (spell, disabled) {
        this.disableInput = disabled
        this.selectedSpell = spell
        this.$nextTick(() => {
          this.showDialog = true
        })
      },

      addSpell (spell) {
        this.character.spells.push(spell)
        this.showToast = true
        this.toastMsg = spell.name + ' equipped'
        this.$root.updateCharacter('', 'spells', this.character.spells)
      },

      toggleSpell (event, spell) {
        if (event) {
          this.character.spells.push(spell)
        } else {
          this.character.spells.forEach((charWeap, index) => {
            if (charWeap.name === spell.name) {
              this.character.spells.splice(index, 1)
            }
          })
        }
        this.$root.updateCharacter('', 'spells', this.character.spells)
      },

      checkPage () {
        if (this.page < 1) {
          this.page = 1
        } else if (this.page > Math.ceil(this.numSpells / this.perPage)) {
          this.page = Math.ceil(this.numSpells / this.perPage)
        }
      }

    },

    // Computed
    computed: {
      filteredSpells: function () {
        return _.orderBy(this.character.spells, 'name')
      },
      gameSpells: function () {
        let array = this.$root.gameData.spells.filter((row) => {
          return this.filter ? row.name.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0 : row
        }).filter((row) => {
          return this.levelFilter !== 'All' ? row.level.toLowerCase().indexOf(this.levelFilter.toLowerCase()) >= 0 : row
        }).filter((row) => {
          return this.classFilter !== 'All' ? row.class.toLowerCase().indexOf(this.classFilter.toLowerCase()) >= 0 : row
        }).filter((row) => {
          return this.schoolFilter !== 'All' ? row.school.toLowerCase().indexOf(this.schoolFilter.toLowerCase()) >= 0 : row
        })
        this.numSpells = array.length
        return array.slice((this.page - 1) * this.perPage, this.page * this.perPage)
      }
    }
  }
</script>

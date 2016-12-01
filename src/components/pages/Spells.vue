<template>
  <div>
    <xen-page-toolbar class="xen-theme-indigo" title="Spells"></xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Known">

      <!-- Combat Tab -->
      <div slot="Known">
        <!-- Combat Info -->
        <section class="dndhub-tab-content">

            <xen-card class="margin-bottom" v-if="!loaded">
              <xen-card-content>
                <xen-loading-spinner class="xen-color-primary"></xen-loading-spinner>
              </xen-card-content>
            </xen-card>
            <div class="xen-data-table bordered hover" v-if="loaded">
              <table class="dndhub-table">
                <thead class="hidden">
                  <tr>
                    <th class="text-left">
                      Name
                    </th>
                    <th class="icon-col xen-last-col">
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(spell, index) in filteredSpells">
                    <td class="xen-first-col text-left" @click="selectSpell(spell, true);">
                      <div>{{ spell.name }}</div>
                      <div class="caption">{{ spell.level }} {{ spell.school }}</div>
                      <div class="caption secondary-text">{{ spell.class }}</div>
                    </td>
                    <td class="text-right icon-col xen-last-col">
                      <xen-icon-button class="table-button" icon="delete" @click.native="removeSpell(spell, index)"></xen-icon-button>
                    </td>
                  </tr>
                  <tr v-if="filteredSpells.length === 0">
                    <td class="xen-first-col text-left">You haven't added any spells yet</td>
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
                <xen-input class="xen-color-primary search-input" :value="filter" placeholder="Search Spells" @input="filter = $event; checkPage();" :debounce="250"></xen-input> {{ filter }}
              </div>
              <div class="col-xs-6 xen-no-margin">
                <xen-select class="xen-color-primary" label="Level" :options="['All', 'Cantrip', '1', '2', '3', '4', '5', '6', '7', '8', '9']" :value="levelFilter" @input="levelFilter = $event; checkPage();"></xen-select>
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
                    <xen-icon-button :raised="true" icon="add" class="xen-theme-blue xen-color-white table-icon-button" @click.native="addSpell(spell)"></xen-icon-button>
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
          <!-- Bottom Pagination -->
          <div class="bottom-pagination">
            <span class="float-left"></span>
            <span>{{ page }} / {{ Math.ceil(numSpells / perPage) }}</span>
            <xen-button @click.native="page--" :disabled="page === 1"><i class="material-icons">navigate_before</i></xen-button>
            <xen-button @click.native="page++" :disabled="page === Math.ceil(numSpells / perPage)"><i class="material-icons">navigate_next</i></xen-button>
          </div>
        </section>
      </div>
    </xen-tabs>
      <!-- Feat Dialog -->
      <div v-if="selectedSpell">
        <xen-dialog :show="showDialog" @hide="showDialog = false" :title="selectedSpell.name || 'undefined'" :large="true" :fullscreen="true" :primary="true" class="spell-dialog">
          <div class="row spell-info">
            <div class="col-xs-12 spell-school">
              <span class="text-center body-2 xen-color-primary">{{ selectedSpell.level }} {{ selectedSpell.school }}</span>
              <span class="text-center">{{ selectedSpell.class }}</span>
            </div>
            <div class="col-xs-6 text-center">
              <span class="body-2 xen-color-primary">Casting Time</span>
              <span class="body-1">{{ selectedSpell.casting_time }}</span>
            </div>
            <div class="col-xs-6 text-center">
              <span class="body-2 xen-color-primary">Range</span>
              <span class="body-1">{{ selectedSpell.range }}</span>
            </div>
            <div class="col-xs-6 text-center">
              <span class="body-2 xen-color-primary">Components</span>
              <span class="body-1">{{ selectedSpell.components }}</span>
            </div>
            <div class="col-xs-6 text-center">
              <span class="body-2 xen-color-primary">Duration</span>
              <span class="body-1">{{ selectedSpell.duration }}</span>
            </div>
            <div class="col-xs-12">
            </div>
            <div class="col-xs-12 spell-description">
              <div v-html="selectedSpell.desc"></div>
            </div>
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
        if (this.$root.gameData) {
          this.loaded = true
        }
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
        if (!this.character.spells) {
          this.$set(this.character, 'spells', [])
        }
        this.character.spells.push(spell)
        this.showToast = true
        this.toastMsg = spell.name + ' added'
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
          this.page = Math.ceil(this.numSpells || this.perPage / this.perPage)
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
          return this.filter !== '' ? row.name.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0 : row
        }).filter((row) => {
          return this.levelFilter !== 'All' ? row.level.toLowerCase().indexOf(this.levelFilter.toLowerCase()) >= 0 : row
        }).filter((row) => {
          return this.classFilter !== 'All' ? row.class.toLowerCase().indexOf(this.classFilter.toLowerCase()) >= 0 : row
        }).filter((row) => {
          return this.schoolFilter !== 'All' ? row.school.toLowerCase().indexOf(this.schoolFilter.toLowerCase()) >= 0 : row
        })
        this.numSpells = array.length
        return array.slice((this.page - 1) * +this.perPage, this.page * +this.perPage)
      }
    }
  }
</script>

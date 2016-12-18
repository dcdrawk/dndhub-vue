<template>
  <div>
    <xen-page-toolbar class="xen-theme-indigo" title="Feats"></xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Known">

      <!-- Known Feats Tab -->
      <div slot="Known">
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
                  <th class="checkbox-col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(feat, index) in filteredFeats">
                  <td class="text-left xen-first-col" @click="selectFeat(feat);">
                    {{ feat.name }}
                  </td>
                  <td class="text-right xen-last-col delete-col">
                    <xen-icon-button class="table-icon-button" icon="delete" @click.native="removeFeat(feat, index)"></xen-icon-button>
                  </td>
                </tr>
                <tr v-if="filteredFeats.length === 0">
                  <td colspan="2" class="xen-first-col">You haven't added any feats yet</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <!-- Browse Feats Tab -->
      <div slot="Browse All">
        <section class="page-tab-content">
          <div class="xen-data-table bordered hover" v-if="loaded">
            <table>
              <thead class="hidden">
                <tr>
                  <th class="xen-first-col checkbox-col">
                    Known
                  </th>
                  <th class="text-left">
                    Name
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="feat in gameFeats">
                  <!--<td class="xen-first-col">
                  <xen-checkbox class="table-checkbox xen-color-blue" :value="feat.known" @input="toggleFeat($event, feat)"></xen-checkbox>
                  </td>-->
                  <td class="xen-first-col icon-col">
                    <xen-icon-button :raised="true" icon="add" class="xen-theme-blue table-icon-button" @click.native="addFeat(feat)"></xen-icon-button>
                  </td>
                  <td class="text-left" @click="selectFeat(feat);">
                    {{ feat.name }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </xen-tabs>

    <!-- Feat Dialog -->
    <div v-if="selectedFeat">
      <xen-dialog :show="showFeat" @hide="showFeat = false" :title="selectedFeat.name" :large="true" :fullscreen="true" :primary="true">
        <div class="row">
          <div class="dialog-description" v-html="selectedFeat.description"></div>
        </div>
        <div slot="actions">
          <xen-button @click.native="showFeat = false" class="xen-color-primary">Close</xen-button>
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
  import XenDialog from '../xen/Dialog'
  import XenIconButton from '../xen/IconButton'
  import XenInput from '../xen/Input'
  import XenLoadingSpinner from '../xen/LoadingSpinner'
  import XenPageToolbar from '../xen/PageToolbar'
  import XenSelect from '../xen/Select'
  import XenTabs from '../xen/Tabs'
  import XenTextarea from '../xen/Textarea'
  import XenToast from '../xen/Toast'

  export default {
    // Name
    name: 'feats',

    // Components
    components: {
      XenButton,
      XenCard,
      XenCardContent,
      XenCheckbox,
      XenDialog,
      XenIconButton,
      XenInput,
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
        feats: this.$root.gameData.feats || undefined,
        loaded: false,
        selectedFeat: undefined,
        showFeat: false,
        filter: '',
        showToast: false
      }
    },

    // Mounted
    mounted () {
      // When a character is selected
      this.$bus.$on('character-selected', character => {
        this.loaded = false
        this.character = Object.assign({}, character)
        this.checkFeats()
        this.loaded = true
      })

      // When the game data has loaded
      this.$bus.$on('data-loaded', () => {
        if (this.character) {
          this.checkFeats()
          this.loaded = true
        }
      })

      // Run this on mount
      if (this.character && this.$root.gameData) {
        this.checkFeats()
        this.loaded = true
      }
    },

    // Methods
    methods: {
      // Check the character for the feats attribute
      checkFeats () {
        if (!this.character.feats) {
          this.$set(this.character, 'feats', [])
        }
        if (!this.feats && this.$root.gameData.feats) {
          this.$set(this, 'feats', this.$root.gameData.feats)
        }
      },

      // Remove a feat
      removeFeat (feat, index) {
        this.character.feats = _.orderBy(this.character.feats, 'name').splice(index, 1)
        this.character.feats.splice(index, 1)
        this.$root.updateCharacter('', 'feats', this.character.feats)
      },

      // Select a feat
      selectFeat (feat) {
        this.selectedFeat = feat
        this.$nextTick(() => {
          this.showFeat = true
        })
      },

      // search feats to see if one already exists
      searchFeats (feat) {
        for (var i in this.feats) {
          if (feat.name === this.feats[i].name) {
            return true
          }
        }
        return false
      },

      // Add a feat to character
      addFeat (feat) {
        this.character.feats.push(feat)
        this.showToast = true
        this.toastMsg = feat.name + ' added'
        this.$root.updateCharacter('', 'feats', this.character.feats)
      }

      // Toggle a feat on / off
      // toggleFeat (event, feat) {
      //   if (!this.searchFeats(feat)) {
      //     if (event) {
      //       this.character.feats.push(feat)
      //     } else {
      //       this.character.feats.forEach((charFeat, index) => {
      //         if (charFeat.name === feat.name) {
      //           this.character.feats.splice(index, 1)
      //         }
      //       })
      //     }
      //     this.$root.updateCharacter('', 'feats', this.character.feats)
      //   }
      // }
    },

    // Computed
    computed: {
      // Filter the character's feats alphabetically
      filteredFeats: function () {
        return _.orderBy(this.character.feats, 'name')
      },

      gameFeats: function () {
        return this.$root.gameData.feats.filter((row) => {
          return row.name.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0
        })
      }
    }
  }
</script>

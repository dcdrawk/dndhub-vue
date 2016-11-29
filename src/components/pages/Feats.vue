<template>
  <div>
    <xen-page-toolbar class="xen-theme-indigo" title="Feats"></xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Known">

      <!-- Combat Tab -->
      <div slot="Known">
        <!-- Combat Info -->
        <section class="page-tab-content">

            <xen-card class="margin-bottom" v-if="!loaded">
              <xen-card-content>
                <xen-loading-spinner class="xen-color-primary"></xen-loading-spinner>
              </xen-card-content>
            </xen-card>
          <!-- <xen-card> -->
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
                    <td class="text-right xen-last-col">
                      <xen-icon-button class="table-button" icon="delete" @click.native="removeFeat(feat)"></xen-icon-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          <!-- </xen-card> -->
        </section>
      </div>

      <!-- Ability Scores Tab -->
      <div slot="Browse All">
        <section class="page-tab-content">
          <div class="xen-data-table bordered hover" v-if="loaded">
            <table>
              <thead>
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
                <tr v-for="feat in $root.gameData.feats">
                  <td class="xen-first-col">
                  <xen-checkbox class="table-checkbox xen-color-primary" :value="feat.known" @input="toggleFeat($event, feat)"></xen-checkbox>
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
  </div>
</template>

<style lang="scss">
@import '../xen/styles/data-tables';
@import '../xen/styles/variables';
.checkbox-col {
  width: 96px;
}

.table-button {
  margin: 0;
  i {
    opacity: .5;
  }
}
.xen-data-table td.xen-first-col .table-checkbox i {
  margin-left: 12px;
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
  th.xen-first-col {
    width: 100px;
  }
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
      XenTabs
    },

    data () {
      return {
        user: this.$root.user || undefined,
        character: this.$root.selectedCharacter || undefined,
        loaded: false,
        feats: [],
        showFeat: false,
        selectedFeat: undefined
      }
    },

    mounted () {
      this.$bus.$on('user-signin', user => {
        this.user = Object.assign({}, user)
      })
      this.$bus.$on('character-selected', character => {
        this.character = Object.assign({}, character)
        // this.getKnownFeats()
      })
      this.$bus.$on('data-loaded', () => {
        if (this.character) {
          this.getKnownFeats()
          this.loaded = true
        }
      })

      if (this.character && this.$root.gameData) {
        this.getKnownFeats()
        this.loaded = true
      }
    },

    methods: {
      removeFeat (feat) {
        this.character.feats.forEach((charFeat, index) => {
          if (charFeat.name === feat.name) {
            this.character.feats.splice(index, 1)
          }
        })
        this.$root.updateCharacter('', 'feats', this.character.feats)
        this.getKnownFeats()
      },

      getKnownFeats () {
        this.character.feats.forEach((charFeat, index) => {
          this.$root.gameData.feats.forEach((gameFeat, index) => {
            if (charFeat.name === gameFeat.name) {
              gameFeat.known = true
              return
            }
          })
        })
      },

      selectFeat (feat) {
        this.selectedFeat = feat
        this.$nextTick(() => {
          this.showFeat = true
        })
      },

      toggleFeat (event, feat) {
        if (event) {
          this.character.feats.push(feat)
        } else {
          this.character.feats.forEach((charFeat, index) => {
            if (charFeat.name === feat.name) {
              this.character.feats.splice(index, 1)
            }
          })
        }
        this.$root.updateCharacter('', 'feats', this.character.feats)
      }
    },

    // Computed
    computed: {

      filteredFeats: function () {
        return _.orderBy(this.character.feats, 'name')
      }
    }
  }
</script>

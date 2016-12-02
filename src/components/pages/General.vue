<template>
  <div>
    <xen-page-toolbar class="xen-theme-indigo" title="General"></xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Character">

      <!-- Character Tab -->
      <div slot="Character">
        <!-- Character Info -->
        <section class="page-tab-content">
          <xen-card class="margin-bottom" v-if="loaded">
            <!-- {{ character }} -->
            <xen-card-content>
              <div class="row xen-color-primary">
                <div class="col-lg-6 col-md-6 col-xs-12">
                  <xen-input label="Character Name" name="display" class="xen-no-margin xen-color-primary" :value="character.name" @input="character.name = $event; $root.updateCharacter('', 'name', character.name); $bus.$emit('name-updated', character.name)"></xen-input>
                </div>
                <div class="col-lg-3 col-md-3 col-xs-12">
                  <xen-input label="Level" name="display" class="xen-no-margin xen-color-primary" type="number" :value="character.level" @input="character.level = $event; $root.updateCharacter('', 'level', character.level);"></xen-input>
                </div>
                <div class="col-lg-3 col-md-3 col-xs-12">
                  <xen-input label="Experience" name="display" class="xen-no-margin xen-color-primary" type="number" :value="character.experience" @input="character.experience = $event; $root.updateCharacter('', 'experience', character.experience);"></xen-input>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
                  <xen-select class="xen-color-primary" label="Race" :options="$root.gameData.races" optionKey="name" :value="character.race" @input="getSubraces($event); $set(character, 'race', $event); $root.updateCharacter('', 'race', character.race);"></xen-select>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3" v-if="subraces.length > 0">
                  <xen-select class="card-last" label="Subrace" :options="subraces" optionKey="name" :value="character.subrace" @input="$set(character, 'subrace', $event); $root.updateCharacter('', 'subrace', character.subrace);"></xen-select>
                </div>
              </div>
            </xen-card-content>
          </xen-card>
        </section>
      </div>

      <!-- Class Tab -->
      <div slot="Class">
        <section class="page-tab-content">
          <xen-card class="margin-bottom" v-if="character">
            <xen-card-content>
              <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                  <xen-select class="xen-color-primary" label="Class" :options="$root.gameData.classes" optionKey="name" :value="character.class" @input="$set(character, 'class', $event); getArchetypes(character.class); getClassFeatures(); $root.updateCharacter('', 'class', character.class);"></xen-select>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6" v-if="archetypes.length > 0">
                  <xen-select class="xen-color-primary" label="Archetype" :options="archetypes" optionKey="title" :value="character.archetype" @input="$set(character, 'archetype', $event); getClassFeatures(); $root.updateCharacter('', 'archetype', character.archetype);"></xen-select>
                </div>
                <div class="col-lg-6 col-md-6 col-xs-12" v-if="classInfo">
                  <xen-input ref="hitdice" label="Hit Dice" name="display" class="xen-no-margin xen-color-primary card-last" :value="classInfo.hitDice" :disabled="true" ></xen-input>
                </div>
                <div class="col-lg-6 col-md-6 col-xs-12" v-if="classInfo">
                  <div class="">
                    <xen-checkbox class="xen-color-primary"></xen-checkbox>
                    <span class="body-1">Secondary Class</span>
                  </div>
                </div>
              </div>
            </xen-card-content>
          </xen-card>

          <xen-card class="margin-bottom">
            <xen-card-header>
              <h2 class="title">Features</h2>
            </xen-card-header>
            <xen-card-content>
              <div class="row">
                <div class="col-xs-3">
                  <xen-select label="Order By" :options="['Level', 'Title']" :value="featOrder" @input="featOrder = $event;" class="xen-no-margin"></xen-select>
                </div>
                <div class="col-xs-3">
                  <xen-select label="Direction" :options="['Descending', 'Ascending']" :value="direction" @input="direction = $event;" class="xen-no-margin"></xen-select>
                </div>
                <div class="col-xs-3">
                  <xen-select label="Page" :options="pages" :value="page" @input="page = $event" class="xen-no-margin"></xen-select>
                </div>
                <div class="col-xs-3">
                  <xen-select label="Per Page" :options="[5, 10, 15]" :value="limit" @input="limit = $event" class="xen-no-margin"></xen-select>
                </div>
              </div>
            </xen-card-content>
            <xen-divider></xen-divider>
            <xen-list v-if="classFeatures.length > 0" :dense="true">
              <xen-list-item v-for="feature in filteredFeats" :text="feature.title" :secondary-text="'Level ' + feature.level" @click.native="selectFeat(feature)"></xen-list-item>
            </xen-list>
          </xen-card>

          <!-- Class Features Dialog -->
          <div v-if="selectedFeat">
            <xen-dialog :show="showFeat" @hide="showFeat = false" :title="selectedFeat.title" :large="true" :fullscreen="true">
              <div class="row">
                <div v-html="selectedFeat.description"></div>
              </div>
              <div slot="actions">
                <xen-button @click.native="showFeat = false" class="xen-color-primary">Close</xen-button>
              </div>
            </xen-dialog>
          </div>

        </section>
      </div>

      <!-- Background Tab -->
      <div slot="Background">
        <section class="page-tab-content">
          <xen-card class="margin-bottom" v-if="character">
            <xen-card-content>
              <div class="row xen-color-primary">
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 xen-no-margin">
                  <xen-select label="Alignment" :options="$root.gameData.alignments" optionKey="name" :value="character.alignment" @input="$set(character, 'alignment', $event); $root.updateCharacter('', 'alignment', character.alignment);"></xen-select>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
                  <xen-select label="Background" :options="$root.gameData.backgrounds" optionKey="name" :value="character.background" @input="$set(character, 'background', $event); $root.updateCharacter('', 'background', character.background);"></xen-select>
                </div>
                <div class="col-xs-12 col-md-12 col-lg-12">
                  <xen-textarea label="Personality Traits" class="xen-color-primary" type="text" :value="character.personalityTraits" @input="$set(character, 'personalityTraits', $event); $root.updateCharacter('', 'personalityTraits', character.personalityTraits);"></xen-textarea>
                </div>
                <div class="col-xs-12 col-md-12 col-lg-12">
                  <xen-textarea label="Ideals" class="xen-color-primary" type="text" :value="character.ideals" @input="$set(character, 'ideals', $event); $root.updateCharacter('', 'ideals', character.ideals);"></xen-textarea>
                </div>
                <div class="col-xs-12 col-md-12 col-lg-12">
                  <xen-textarea label="Bonds" class="xen-color-primary" type="text" :value="character.bonds" @input="$set(character, 'bonds', $event); $root.updateCharacter('', 'bonds', character.bonds);"></xen-textarea>
                </div>
                <div class="col-xs-12 col-md-12 col-lg-12">
                  <xen-textarea label="Flaws" class="xen-color-primary card-last" type="text" :value="character.flaws" @input="$set(character, 'flaws', $event); $root.updateCharacter('', 'flaws', character.flaws);"></xen-textarea>
                </div>
              </div>
            </xen-card-content>
          </xen-card>
        </section>
      </div>
    </xen-tabs>
  </div>
</template>

<style scoped>
</style>

<script>
  import _ from 'lodash'
  import XenButton from '../xen/Button'
  import XenCard from '../xen/Card'
  import XenCardContent from '../xen/CardContent'
  import XenCardHeader from '../xen/CardHeader'
  import XenCheckbox from '../xen/Checkbox'
  import XenDialog from '../xen/Dialog'
  import XenDivider from '../xen/Divider'
  import XenInput from '../xen/Input'
  import XenList from '../xen/List'
  import XenListItem from '../xen/ListItem'
  import XenLoadingSpinner from '../xen/LoadingSpinner'
  import XenPageToolbar from '../xen/PageToolbar'
  import XenSelect from '../xen/Select'
  import XenTabs from '../xen/Tabs'
  import XenTextarea from '../xen/Textarea'

  export default {
    // Name
    name: 'general',

    // Components
    components: {
      XenButton,
      XenCard,
      XenCardContent,
      XenCardHeader,
      XenCheckbox,
      XenDialog,
      XenDivider,
      XenInput,
      XenList,
      XenListItem,
      XenLoadingSpinner,
      XenPageToolbar,
      XenSelect,
      XenTabs,
      XenTextarea
    },

    // Data
    data () {
      return {
        archetypes: [],
        character: this.$root.selectedCharacter || undefined,
        classFeatures: [],
        classInfo: undefined,
        direction: 'Descending',
        featOrder: 'Level',
        filter: undefined,
        limit: 5,
        loaded: false,
        page: 1,
        selectedFeat: undefined,
        showFeat: false,
        subraces: [],
        user: this.$root.user || undefined
      }
    },

    // Mounted
    mounted () {
      this.$bus.$on('user-signin', user => {
        this.user = Object.assign({}, user)
      })
      this.$bus.$on('character-selected', character => {
        this.loaded = false
        // console.log('character selected!')
        // this.character = Object.assign({}, character)
        this.$set(this, 'character', character)
        // console.log(this.character)
        this.getSubraces(this.character.race)
        this.getArchetypes(this.character.class)
        if (this.$root.gameData) {
          this.getClassFeatures()
          this.loaded = true
        }
      })
      this.$bus.$on('data-loaded', () => {
        if (this.character) {
          this.getSubraces(this.character.race)
          this.getArchetypes(this.character.class)
          this.getClassFeatures()
          this.loaded = true
        }
      })

      if (this.character && this.$root.gameData) {
        this.getSubraces(this.character.race)
        this.getArchetypes(this.character.class)
        this.getClassFeatures()
        this.loaded = true
      }
    },

    // Methods
    methods: {
      // Get the list of subraces from a race
      getSubraces (raceName) {
        console.log('get subraces')
        if (this.$root.gameData.races) {
          if (raceName !== this.character.race && this.loaded) {
            this.$set(this.character, 'subrace', undefined)
          }
          this.$root.gameData.races.forEach((race, index) => {
            if (race.name === raceName) {
              this.subraces = race.subraces
              return
            }
          })
        }
      },

      // Get the list of class archetypes
      getArchetypes (className) {
        console.log(className)
        if (this.$root.gameData.classes) {
          if (className !== this.character.class) {
            this.$set(this.character, 'archetype', undefined)
          }
          this.$root.gameData.classes.forEach((classObj, index) => {
            if (classObj.name === className) {
              this.classInfo = classObj
              this.archetypes = classObj.specializations
              return
            }
          })
        }
      },

      // Get the list of class features
      getClassFeatures () {
        if (this.$root.gameData.classFeatures) {
          this.classFeatures = []
          this.$root.gameData.classFeatures.forEach((feature) => {
            if (feature.class === this.character.class && feature.archetype === 'None' || feature.class === this.character.class && feature.archetype === this.character.archetype) {
              this.classFeatures = this.classFeatures.concat(feature.abilities)
            }
          })
        }
      },

      // Select a feat to show in the dialog
      selectFeat (feat) {
        this.selectedFeat = feat
        this.$nextTick(() => {
          this.showFeat = true
        })
      }
    },

    // Computed
    computed: {
      featDirection: function () {
        return this.direction === 'Descending' ? 1 : -1
      },

      pages: function () {
        let numPages = Math.ceil(this.classFeatures.length / this.limit)
        let pagesArray = []
        for (let i = 0; i < numPages; i++) {
          pagesArray.push(i + 1)
        }
        return pagesArray
      },

      filteredFeats: function () {
        if (this.featOrder === 'Level') {
          this.classFeatures = _.map(this.classFeatures, (feature) => {
            feature.level = +feature.level
            return feature
          })
        }

        let orderedArray = this.direction === 'Descending' ? _.orderBy(this.classFeatures, this.featOrder.toLowerCase()) : _.orderBy(this.classFeatures, this.featOrder.toLowerCase()).reverse()
        return orderedArray.slice((this.page - 1) * this.limit, this.limit * this.page)
      }
    }
  }
</script>

<template>
  <div>
    <xen-page-toolbar class="xen-theme-indigo" title="Stats"></xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Combat">

      <!-- Combat Tab -->
      <div slot="Combat">
        <!-- Combat Info -->
        <section class="page-tab-content">

          <xen-card class="margin-bottom">
            <!-- <div class="row" v-if="!loaded"> -->
              <!-- <div class="col-xs-12"> -->
              <xen-card-content v-if="!loaded">
               <xen-loading-spinner class="xen-color-primary"></xen-loading-spinner>
             </xen-card-content>
              <!-- </div> -->
            <!-- </div> -->
            <xen-card-content v-if="loaded">
              <div class="row xen-color-primary">
                <div class="col-lg-6 col-md-6 col-xs-6">
                  <xen-input label="Proficiency Bonus" class="xen-color-primary" type="number" :value="character.proficiencyBonus" @input="character.proficiencyBonus = $event; $root.updateCharacter('', 'proficiencyBonus', character.proficiencyBonus);"></xen-input>
                </div>
                <div class="col-lg-6 col-md-6 col-xs-6">
                  <xen-input label="Armor Class" class="xen-color-primary" type="number" :value="character.armorClass" @input="character.armorClass = $event; $root.updateCharacter('', 'armorClass', character.armorClass);"></xen-input>
                </div>
                <div class="col-lg-6 col-md-6 col-xs-6">
                  <xen-input label="Initiative" class="xen-color-primary card-last" type="number" :value="character.initiative" @input="character.initiative = $event; $root.updateCharacter('', 'initiative', character.initiative);"></xen-input>
                </div>
                <div class="col-lg-6 col-md-6 col-xs-6">
                  <xen-input label="Speed" class="xen-color-primary card-last" type="number" :value="character.speed" @input="character.speed = $event; $root.updateCharacter('', 'speed', character.speed);"></xen-input>
                </div>
              </div>

            </xen-card-content>
          </xen-card>

          <xen-card class="margin-bottom" v-if="loaded">
            <xen-card-header>
              <h2 class="title">Hit Points</h2>
            </xen-card-header>
            <xen-card-content>
              <div class="row xen-color-primary">
                <div class="col-lg-6 col-md-6 col-xs-6">
                  <xen-input :debounce="500" label="Current Hit Points" class="xen-color-primary" type="number" :value="character.currentHP" @input="character.currentHP = $event; $root.updateCharacter('', 'currentHP', character.currentHP);"></xen-input>
                </div>
                <div class="col-lg-6 col-md-6 col-xs-6">
                  <xen-input :disabled="true" label="Total Hit Points" class="xen-color-primary" type="number" :value="character.maxHP + character.tempHP" @input="character.totalHP = $event; $root.updateCharacter('', 'totalHP', character.totalHP);"></xen-input>
                </div>
                <div class="col-lg-6 col-md-6 col-xs-6">
                  <xen-input label="Max Hit Points" class="xen-color-primary card-last" type="number" :value="character.maxHP" @input="character.maxHP = $event; $root.updateCharacter('', 'maxHP', character.maxHP);"></xen-input>
                </div>
                <div class="col-lg-6 col-md-6 col-xs-6">
                  <xen-input label="Temp Hit Points" class="xen-color-primary card-last" type="number" :value="character.tempHP" @input="character.tempHP = $event; $root.updateCharacter('', 'tempHP', character.tempHP);"></xen-input>
                </div>
              </div>
            </xen-card-content>
          </xen-card>
        </section>
      </div>

      <!-- Ability Scores Tab -->
      <div slot="Ability Scores">
        <section class="page-tab-content">
          <div class="xen-data-table striped" v-if="loaded && character">
            <table>
              <thead>
                <tr>
                  <th class="xen-first-col">
                    Stat
                  </th>
                  <th class="text-center">
                    Base
                  </th>
                  <th class="text-center">
                    Bonus
                  </th>
                  <th class="text-center">
                    Modifier
                  </th>
                </tr>
              </thead>
              <tbody v-if="character.abilityScores">
                <tr v-for="score in abilityScores" v-if="character.abilityScores[score.name]">
                  <td class="xen-first-col">{{ score.name }}</td>
                  <td class="text-center">
                  <xen-input class="xen-color-primary small-table-input" type="number" :value="+character.abilityScores[score.name].base || 0"
                    @input="character.abilityScores[score.name].base = $event; $root.updateCharacter('abilityScores/' + score.name + '/', 'base', character.abilityScores[score.name].base);"></xen-input>
                  </td>
                  <td class="text-center" v-if="character.abilityScores[score.name]">
                    <xen-input class="xen-color-primary small-table-input" type="number" :value="+character.abilityScores[score.name].bonus || 0"
                    @input="$set(character.abilityScores[score.name], 'bonus', $event); $root.updateCharacter('abilityScores/' + score.name + '/', 'bonus', character.abilityScores[score.name].bonus);"></xen-input>
                  <td class="text-center">
                    <xen-input :disabled="true" class="xen-color-primary small-table-input" type="number" :value="getAbilityScoreModifier(+character.abilityScores[score.name].base, +character.abilityScores[score.name].bonus)"></xen-input>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <!-- Skills Tab -->
      <div slot="Skills">
        <!-- Skills Info -->
        <section class="page-tab-content">
          <!-- {{ character.skills }} -->
          <div class="xen-data-table striped" v-if="loaded && skills && character">
            <table>
              <thead>
                <tr>
                  <th class="xen-first-col">
                    Skill
                  </th>
                  <th class="text-center">
                    Trained
                  </th>
                  <th class="text-center">
                    Bonus
                  </th>
                  <th class="text-center">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody v-if="character.skills">
                <tr v-for="skill in gameSkills" v-if="character.skills[skill.name]">
                  <td class="xen-first-col">
                    <div>{{ skill.name }}</div>
                    <div class="caption secondary-text">{{ skill.abilityScore }}</div>
                  </td>
                  <td class="text-center">
                    <xen-checkbox class="xen-color-primary" :value="character.skills[skill.name].trained"
                     @input="character.skills[skill.name].trained = $event; $root.updateCharacter('skills/' + skill.name + '/', 'trained', character.skills[skill.name].trained);"></xen-checkbox>
                  </td>
                  <td class="text-center">
                    <xen-input class="xen-color-primary small-table-input" type="number" :value="character.skills[skill.name].bonus || 0"
                    @input="character.skills[skill.name].bonus = $event; $root.updateCharacter('skills/' + skill.name + '/', 'bonus', character.skills[skill.name].bonus);"></xen-input>
                  </td>
                  <td class="text-center">
                   <xen-input v-if="character.skills[skill.name].trained" :disabled="true" class="xen-color-primary small-table-input" type="number"
                     :value="getAbilityScoreModifier(character.abilityScores[skill.abilityScore].base, character.abilityScores[skill.abilityScore].bonus) + +character.proficiencyBonus + character.skills[skill.name].bonus"></xen-input>
                    <xen-input v-if="!character.skills[skill.name].trained" :disabled="true" class="xen-color-primary small-table-input" type="number"
                     :value="getAbilityScoreModifier(character.abilityScores[skill.abilityScore].base, character.abilityScores[skill.abilityScore].bonus) + character.skills[skill.name].bonus"></xen-input>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </xen-tabs>
  </div>
</template>

<style lang="scss" scoped>
@import '../xen/styles/variables';

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
</style>

<script>
  import DataService from '../services/DataService'
  import XenButton from '../xen/Button'
  import XenCard from '../xen/Card'
  import XenCardContent from '../xen/CardContent'
  import XenCardHeader from '../xen/CardHeader'
  import XenCheckbox from '../xen/Checkbox'
  import XenDialog from '../xen/Dialog'
  import XenDivider from '../xen/Divider'
  import XenInput from '../xen/Input'
  import XenLoadingSpinner from '../xen/LoadingSpinner'
  import XenPageToolbar from '../xen/PageToolbar'
  import XenSelect from '../xen/Select'
  import XenTabs from '../xen/Tabs'
  import XenTextarea from '../xen/Textarea'

  export default {
    // Name
    name: 'stats',

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
      XenLoadingSpinner,
      XenPageToolbar,
      XenSelect,
      XenTabs,
      XenTextarea
    },

    // Created
    created () {
      this.fetchData()
    },

    // Data
    data () {
      return {
        loaded: false,
        gameSkills: undefined,
        abilityScores: [{
          name: 'Strength'
        }, {
          name: 'Dexterity'
        }, {
          name: 'Constitution'
        }, {
          name: 'Intelligence'
        }, {
          name: 'Wisdom'
        }, {
          name: 'Charisma'
        }],
        skills: [{
          name: 'Acrobatics'
        }, {
          name: 'Animal Handling'
        }, {
          name: 'Arcana'
        }, {
          name: 'Athletics'
        }, {
          name: 'Deception'
        }, {
          name: 'History'
        }, {
          name: 'Insight'
        }, {
          name: 'Intimidation'
        }, {
          name: 'Investigation'
        }, {
          name: 'Medicine'
        }, {
          name: 'Nature'
        }, {
          name: 'Perception'
        }, {
          name: 'Performance'
        }, {
          name: 'Persuasion'
        }, {
          name: 'Religion'
        }, {
          name: 'Sleight of Hand'
        }, {
          name: 'Stealth'
        }, {
          name: 'Survival'
        }]
      }
    },

    // Mounted
    mounted () {
      // When a character is selected
      this.$bus.$on('character-selected', () => {
        // this.character = Object.assign({}, character)
        if (this.character) {
          this.checkAbilityScores()
          this.checkSkills()
          this.loaded = true
        }
      })

      // When the data is loaded
      this.$bus.$on('data-loaded', () => {
        if (this.character) {
          this.checkAbilityScores()
          this.checkSkills()
          this.loaded = true
        }
      })

      if (this.character) {
        this.checkAbilityScores()
        this.checkSkills()
        this.loaded = true
      }
    },

    // Methods
    methods: {
      // Fetch data
      fetchData () {
        // Skills
        DataService.get('skills').then((skills) => {
          this.gameSkills = skills
        })
      },

      // Set the ability scores
      setAbilityScores () {
        this.$set(this.character, 'abilityScores', {
          Strength: {
            base: 0,
            bonus: 0
          },
          Dexterity: {
            base: 0,
            bonus: 0
          },
          Constitution: {
            base: 0,
            bonus: 0
          },
          Intelligence: {
            base: 0,
            bonus: 0
          },
          Wisdom: {
            base: 0,
            bonus: 0
          },
          Charisma: {
            base: 0,
            bonus: 0
          }
        })
        this.$root.updateCharacter('', 'abilityScores', this.character.abilityScores)
      },

      // Return the modifier for an ability score
      getAbilityScoreModifier (score, bonus) {
        score = !isNaN(score) ? score : 0
        bonus = !isNaN(bonus) ? bonus : 0
        let total = score + bonus
        return Math.floor((parseInt(total, 0) / 2 - 5))
      },

      // check the character for the abilityScores attribute
      checkAbilityScores () {
        if (!this.character.abilityScores) {
          this.setAbilityScores()
        }
        this.abilityScores.forEach(score => {
          if (!this.character.abilityScores.hasOwnProperty(score.name)) {
            this.character.abilityScores[score.name] = {}
          }
        })
      },

      // Check the character for the skills attribute
      checkSkills () {
        console.log(this.character.skills)
        if (!this.character.skills) {
          this.$set(this.character, 'skills', {})
        }
        this.skills.forEach(skill => {
          if (!this.character.skills.hasOwnProperty(skill.name)) {
            this.$set(this.character.skills, skill.name, { trained: false, bonus: 0 })
            // this.$set(this.character.skills, this.character.skills)
          } else {
            if (!this.character.skills[skill.name].trained) {
              this.$set(this.character.skills[skill.name], 'trained', false)
            }
            if (!this.character.skills[skill.name].bonus) {
              this.$set(this.character.skills[skill.name], 'bonus', 0)
            }
          }
        })
        this.$set(this.character.skills, this.character.skills)
      }
    },

    // Computed
    computed: {
      character: function () {
        return this.$store.state.character
      }
    }
  }
</script>

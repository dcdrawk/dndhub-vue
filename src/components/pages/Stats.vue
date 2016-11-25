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
                <div class="col-lg-6 col-md-6 col-xs-12">
                  <xen-input label="Proficiency Bonus" class="xen-color-primary" type="number" :value="character.proficiencyBonus" @input="character.proficiencyBonus = $event; $root.updateCharacter('', 'proficiencyBonus', character.proficiencyBonus);"></xen-input>
                </div>
                <div class="col-lg-6 col-md-6 col-xs-12">
                  <xen-input label="Armor Class" class="xen-color-primary" type="number" :value="character.armorClass" @input="character.armorClass = $event; $root.updateCharacter('', 'armorClass', character.armorClass);"></xen-input>
                </div>
                <div class="col-lg-6 col-md-6 col-xs-12">
                  <xen-input label="Initiative" class="xen-color-primary card-last" type="number" :value="character.initiative" @input="character.initiative = $event; $root.updateCharacter('', 'initiative', character.initiative);"></xen-input>
                </div>
                <div class="col-lg-6 col-md-6 col-xs-12">
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
                <div class="col-lg-6 col-md-6 col-xs-12">
                  <xen-input label="Current Hit Points" class="xen-color-primary" type="number" :value="character.currentHP" @input="character.currentHP = $event; $root.updateCharacter('', 'currentHP', character.currentHP);"></xen-input>
                </div>
                <div class="col-lg-6 col-md-6 col-xs-12">
                  <xen-input :disabled="true" label="Total Hit Points" class="xen-color-primary" type="number" :value="character.maxHP + character.tempHP" @input="character.totalHP = $event; $root.updateCharacter('', 'totalHP', character.totalHP);"></xen-input>
                </div>
                <div class="col-lg-6 col-md-6 col-xs-12">
                  <xen-input label="Max Hit Points" class="xen-color-primary card-last" type="number" :value="character.maxHP" @input="character.maxHP = $event; $root.updateCharacter('', 'maxHP', character.maxHP);"></xen-input>
                </div>
                <div class="col-lg-6 col-md-6 col-xs-12">
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
          <div class="xen-data-table striped" v-if="loaded">
            <table>
              <thead>
                <tr>
                  <th class="xen-first-col">
                    Name
                  </th>
                  <th class="text-center">
                    Base
                  </th>
                  <th class="text-center">
                    Bonus
                  </th>
                  <!-- <th class="text-center">
                    Total
                  </th> -->
                  <th class="text-center">
                    Modifier
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="score in abilityScores">
                  <td class="xen-first-col">{{ score.name }}</td>
                  <td class="text-center">
                    <xen-input class="xen-color-primary small-table-input" type="number" :value="character.abilityScores[score.name].base" 
                    @input="character.abilityScores[score.name].base = $event; $root.updateCharacter('abilityScores/' + score.name + '/', 'base', character.abilityScores[score.name].base);"></xen-input>
                  </td>
                  <td>
                    <xen-input class="xen-color-primary small-table-input" type="number" :value="character.abilityScores[score.name].bonus"
                    @input="character.abilityScores[score.name].bonus = $event; $root.updateCharacter('abilityScores/' + score.name + '/', 'bonus', character.abilityScores[score.name].bonus);"></xen-input>
                  </td>
                  <!-- <td>
                    <xen-input :disabled="true" class="xen-color-primary small-table-input" type="number" :value="character.abilityScores[score.name].base + character.abilityScores[score.name].bonus"></xen-input>
                  </td> -->
                  <td>
                    <xen-input :disabled="true" class="xen-color-primary small-table-input" type="number" :value="getAbilityScoreModifier(character.abilityScores[score.name].base + character.abilityScores[score.name].bonus)"></xen-input>
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
          <div class="xen-data-table striped" v-if="loaded && $root.gameData.skills">
            <table>
              <thead>
                <tr>
                  <th class="xen-first-col">
                    Name
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
              <tbody>
                <tr v-for="skill in $root.gameData.skills">
                  <td class="xen-first-col">{{ skill.name }}</td>
                  <td class="text-center">
                    <xen-checkbox class="xen-color-primary" :value="character.skills[skill.name].trained"
                     @input="character.skills[skill.name].trained = $event; $root.updateCharacter('skills/' + skill.name + '/', 'trained', character.skills[skill.name].trained);"></xen-checkbox>
                  </td>
                  <td>
                    <xen-input class="xen-color-primary small-table-input" type="number" :value="character.skills[skill.name].bonus || 0"
                    @input="character.skills[skill.name].bonus = $event; $root.updateCharacter('skills/' + skill.name + '/', 'bonus', character.skills[skill.name].bonus);"></xen-input>
                  </td>
                  <td class="text-center">
                    <xen-input v-if="character.skills[skill.name].trained" :disabled="true" class="xen-color-primary small-table-input" type="number"
                     :value="getAbilityScoreModifier(character.abilityScores[skill.abilityScore].base + character.abilityScores[skill.abilityScore].bonus) + character.proficiencyBonus + character.skills[skill.name].bonus"></xen-input>
                    <xen-input v-if="!character.skills[skill.name].trained" :disabled="true" class="xen-color-primary small-table-input" type="number"
                     :value="getAbilityScoreModifier(character.abilityScores[skill.abilityScore].base + character.abilityScores[skill.abilityScore].bonus) + character.skills[skill.name].bonus"></xen-input>
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

<style lang="scss">
@import '../xen/styles/data-tables';
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
  import XenPageToolbar from '../xen/PageToolbar'
  import XenButton from '../xen/Button'
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
  import XenListItem from '../xen/ListItem'
  import XenCheckbox from '../xen/Checkbox'
  import XenTabs from '../xen/Tabs'

  export default {
    name: 'profile',

    components: {
      XenPageToolbar,
      XenButton,
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
        }]
      }
    },

    mounted () {
      this.$bus.$on('user-signin', user => {
        this.user = Object.assign({}, user)
      })
      this.$bus.$on('character-selected', character => {
        this.character = Object.assign({}, character)
        // this.getSubraces(this.character.race)
        // this.getArchetypes(this.character.class)
        // if (this.$root.gameData) {
        //   this.getClassFeatures()
        // }
      })
      this.$bus.$on('data-loaded', () => {
        if (this.character) {
          // this.getSubraces(this.character.race)
          // this.getArchetypes(this.character.class)
          // this.getClassFeatures()
          this.loaded = true
        }
      })

      if (this.character && this.$root.gameData) {
        // this.getSubraces(this.character.race)
        // this.getArchetypes(this.character.class)
        // this.getClassFeatures()
        this.loaded = true
      }
    },

    methods: {
      getAbilityScoreModifier (score) {
        return Math.floor((parseInt(score, 0) / 2 - 5))
      }
    }
  }
</script>

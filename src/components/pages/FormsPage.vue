<template>
  <div class="xen-page-background">
    <xen-page-toolbar class="xen-theme-indigo" title="Forms"></xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Example">

      <!-- Example Tab -->
      <div slot="Example">
        <section class="page-tab-content">

          <!-- Default Component -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Input Field</h2>
            </xen-card-header>
            <xen-card-content>
              <!-- Basic Input -->
              <xen-input value="Basic Input"></xen-input>

              <!-- Input with Placeholder -->
              <xen-input placeholder="Input with Placeholder"></xen-input>

              <!-- Input with Placeholder -->
              <xen-input label="Input with Floating Label and Binding" :value="inputValue" @input="inputValue = $event"></xen-input>
              <p>{{ inputValue }}</p>
            </xen-card-content>
          </xen-card>

          <!-- Textarea -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Textarea</h2>
            </xen-card-header>
            <xen-card-content>
              <!-- Basic Input -->
              <xen-textarea value="Basic Input"></xen-textarea>

              <!-- Input with Placeholder -->
              <xen-textarea placeholder="Input with Placeholder" :auto-grow="false"></xen-textarea>

              <!-- Input with Placeholder -->
              <xen-textarea label="Input with Floating Label" rows="5" :auto-grow="false"></xen-textarea>
            </xen-card-content>
          </xen-card>

          <!-- Select -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Select</h2>
            </xen-card-header>
            <xen-card-content>
              <xen-select :options="selectOptions" placeholder="Ice Cream"></xen-select>
            </xen-card-content>
          </xen-card>

          <!-- Radio Buttons -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Radio Buttons</h2>
            </xen-card-header>
            <xen-card-content>
              <xen-radio-group :value="radioValue" @input="radioValue = $event">
                <xen-radio-button value="Rick" class="xen-color-indigo"></xen-radio-button>
                <xen-radio-button value="Morty" class="xen-color-orange"></xen-radio-button>
                <xen-radio-button value="Mr. Poopybutthole" class="xen-color-purple"></xen-radio-button>
              </xen-radio-group>
              <p>Value: {{ radioValue }}</p>

              <xen-radio-group :value="radioValue" @input="radioValue = $event">
                <ul>
                  <li>
                    <xen-radio-button value="Rick" class="xen-color-indigo"></xen-radio-button>
                    <span class="body-1 xen-vertical-align-middle">Rick</span></li>
                  <li>
                    <xen-radio-button value="Morty" class="xen-color-orange" text="Test"></xen-radio-button>
                    <span class="body-1 xen-vertical-align-middle">Morty</span>
                  </li>
                  <li>
                    <xen-radio-button value="Mr. Poopybutthole" class="xen-color-purple"></xen-radio-button>
                    <span class="body-1 xen-vertical-align-middle">Mr. Poopybutthole</span>
                  </li>
                </ul>
              </xen-radio-group>
            </xen-card-content>
          </xen-card>

          <!-- Checkboxes -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Checkboxes</h2>
            </xen-card-header>
            <xen-card-content>
              <xen-checkbox :value="true" class="xen-color-indigo"></xen-checkbox>
              <xen-checkbox :value="false" class="xen-color-orange"></xen-checkbox>
              <xen-checkbox :value="false" class="xen-color-purple"></xen-checkbox>
            </xen-card-content>
          </xen-card>

        </section>
      </div>

      <!-- Template Tab-->
      <div slot="Template">
        <div class="page-tab-content">

          <!-- Component Template -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Default Component</h2>
            </xen-card-header>
            <xen-card-content class="xen-no-margin">
              <pre><code class="language-html">{{ componentTemplate }}</code></pre>            
            </xen-card-content>
          </xen-card>

        </div>
      </div>

      <!-- Script Tab-->
      <div slot="Script">
        <div class="page-tab-content"> 

          <!-- Default Component Script -->         
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Default Component</h2>
            </xen-card-header>
            <xen-card-content class="xen-no-margin">
              <pre><code class="language-javaScript">{{ componentScript }}</code></pre>            
            </xen-card-content>
          </xen-card>

        </div>
      </div>
    </xen-tabs>
  </div>
</template>

<script>
  import XenPageToolbar from '../xen/PageToolbar'
  import XenTabs from '../xen/Tabs'
  import XenCard from '../xen/Card'
  import XenCardHeader from '../xen/CardHeader'
  import XenCardContent from '../xen/CardContent'
  import XenInput from '../xen/Input'
  import XenTextarea from '../xen/Textarea'
  import XenSelect from '../xen/Select'
  import XenRadioGroup from '../xen/RadioGroup'
  import XenRadioButton from '../xen/RadioButton'
  import XenCheckbox from '../xen/Checkbox'
  import Prism from 'prismjs'

  export default {

    name: 'forms-page',

    // Components
    components: {
      XenPageToolbar,
      XenTabs,
      XenCard,
      XenCardHeader,
      XenCardContent,
      XenInput,
      XenTextarea,
      XenSelect,
      XenRadioGroup,
      XenRadioButton,
      XenCheckbox
    },

    // Data
    data () {
      return {
        inputValue: '',
        radioValue: 'Rick',
        selectOptions: ['Vanilla', 'Chocolate', 'Strawberry', 'Neopolitan'],
        componentTemplate: `<xen-component></xen-component>`,
        componentScript: `import XenComponent from '../xen/Component'

export default {
  components: {
    XenComponent
  }
}`
      }
    },

    // Mounted
    mounted () {
      Prism.highlightAll()
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

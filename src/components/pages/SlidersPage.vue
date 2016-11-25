<template>
  <div>
    <xen-page-toolbar class="xen-theme-indigo" title="Sliders"></xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Example">

      <!-- Example Tab -->
      <div slot="Example">
        <section class="page-tab-content">

          <!-- Default Component -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Default Component</h2>
            </xen-card-header>
            <xen-card-content>
              <xen-slider class="xen-color-indigo"></xen-slider>
              <!-- Example Component Here -->
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
  import XenSlider from '../xen/Slider'
  import Prism from 'prismjs'

  export default {

    name: 'copmonent-page',

    // Components
    components: {
      XenPageToolbar,
      XenTabs,
      XenCard,
      XenCardHeader,
      XenCardContent,
      XenSlider
    },

    // Data
    data () {
      return {
        msg: 'Hello World!',
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

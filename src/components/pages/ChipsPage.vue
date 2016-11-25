<template>
  <div class="xen-page-background">
    <xen-page-toolbar class="xen-theme-indigo" title="Chips"></xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Example">

      <!-- Example Tab -->
      <div slot="Example">
        <section class="page-tab-content">

          <!-- Default Chips -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Default Chips</h2>
            </xen-card-header>
            <xen-card-content>
              <xen-chips :chips="defaultChips"></xen-chips>
            </xen-card-content>
          </xen-card>

          <!-- Chips with Placeholder -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Chips with Placeholder</h2>
            </xen-card-header>
            <xen-card-content>
              <xen-chips :chips="placeholderChips"  placeholder="+ add a chip"></xen-chips>
            </xen-card-content>
          </xen-card>

          <!-- Read-Only Chips -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Read-Only Chips</h2>
            </xen-card-header>
            <xen-card-content>
              <xen-chips :chips="readOnlyChips" :read-only="true"></xen-chips>
            </xen-card-content>
          </xen-card>

        </section>
      </div>

      <!-- Template Tab-->
      <div slot="Template">
        <div class="page-tab-content">

          <!-- Chips Template -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Default Chips</h2>
            </xen-card-header>
            <xen-card-content class="xen-no-margin">
              <pre><code class="language-html">{{ defaultChipsTemplate }}</code></pre>            
            </xen-card-content>
          </xen-card>

          <!-- Chips Template -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Chips with Placeholder</h2>
            </xen-card-header>
            <xen-card-content class="xen-no-margin">
              <pre><code class="language-html">{{ placeholderChipsTemplate }}</code></pre>            
            </xen-card-content>
          </xen-card>

          <!-- Chips Template -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Read Only Chips</h2>
            </xen-card-header>
            <xen-card-content class="xen-no-margin">
              <pre><code class="language-html">{{ readOnlyChipsTemplate }}</code></pre>            
            </xen-card-content>
          </xen-card>

        </div>
      </div>

      <!-- Script Tab-->
      <div slot="Script">
        <div class="page-tab-content"> 

          <!-- Default Chips Script -->         
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Default Chips</h2>
            </xen-card-header>
            <xen-card-content class="xen-no-margin">
              <pre><code class="language-javaScript">{{ chipsScript }}</code></pre>            
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
  import XenChips from '../xen/Chips'
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
      XenChips
    },

    // Data
    data () {
      return {
        defaultChips: ['Tomato', 'Cucumber', 'Lettuce'],
        placeholderChips: ['Vancouver', 'Edmonton', 'Toronto'],
        readOnlyChips: ['Horror', 'Suspense', 'Drama'],
        defaultChipsTemplate: `<xen-chips :chips="defaultChips"></xen-chips>`,
        placeholderChipsTemplate: `<xen-chips :chips="placeholderChips"  placeholder="+ add a chip"></xen-chips>`,
        readOnlyChipsTemplate: `<xen-chips :chips="readOnlyChips" :read-only="true"></xen-chips>`,
        chipsScript: `import XenChips from '../xen/Chips'

export default {
  components: {
    XenChips
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

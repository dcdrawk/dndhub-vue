<template>
  <div>
    <xen-page-toolbar class="xen-theme-blue" title="Buttons"></xen-page-toolbar>
    <xen-tabs theme="blue" default-tab="Example" class="xen-page-tabs">
      <div slot="Example">
        <section class="page-tab-content">

          <!-- Flat Buttons -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Flat Buttons</h2>
            </xen-card-header>
            <xen-card-content>
              <xen-button>Default Button</xen-button>            
              <xen-button class="xen-color-indigo">Indigo Button</xen-button>
              <xen-button class="xen-color-green">Green Button</xen-button>
              <xen-button class="xen-color-amber">Amber Button</xen-button>
              <xen-button class="xen-color-red">Red Button</xen-button>
              <xen-button :disabled="true">Disabled Button</xen-button>
            </xen-card-content>
          </xen-card>

          <!-- Raised Buttons -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Raised Buttons</h2>
            </xen-card-header>
            <xen-card-content>
              <xen-button :raised="true">Default Button</xen-button>            
              <xen-button :raised="true" class="xen-theme-indigo">Indigo Button</xen-button>
              <xen-button :raised="true" class="xen-theme-green">Green Button</xen-button>
              <xen-button :raised="true" class="xen-theme-amber">Amber Button</xen-button>
              <xen-button :raised="true" class="xen-theme-red">Red Button</xen-button>
              <xen-button :raised="true" :disabled="true">Disabled Button</xen-button>          
            </xen-card-content>
          </xen-card>

          <!-- Flat Icon Buttons -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Flat Icon Buttons</h2>
            </xen-card-header>
            <xen-card-content>
              <xen-icon-button icon="menu"></xen-icon-button>
              <xen-icon-button icon="person" class="xen-color-indigo"></xen-icon-button>
              <xen-icon-button icon="check" class="xen-color-green"></xen-icon-button>
              <xen-icon-button icon="star" class="xen-color-amber"></xen-icon-button>
              <xen-icon-button icon="close" class="xen-color-red"></xen-icon-button>
              <xen-icon-button icon="sync_disabled" :disabled="true"></xen-icon-button>
            </xen-card-content>
          </xen-card>

          <!-- Raised Icon Buttons -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Raised Icon Buttons</h2>
            </xen-card-header>
            <xen-card-content>
              <xen-icon-button :raised="true" icon="menu"></xen-icon-button>
              <xen-icon-button :raised="true" icon="menu" :large="true"></xen-icon-button>
              <xen-icon-button :raised="true" icon="person" class="xen-theme-indigo"></xen-icon-button>
              <xen-icon-button :raised="true" icon="person" class="xen-theme-indigo" :large="true"></xen-icon-button>
              <xen-icon-button :raised="true" icon="check" class="xen-theme-green"></xen-icon-button>
              <xen-icon-button :raised="true" icon="check" class="xen-theme-green" :large="true"></xen-icon-button>
              <xen-icon-button :raised="true" icon="star" class="xen-theme-amber"></xen-icon-button>
              <xen-icon-button :raised="true" icon="star" class="xen-theme-amber" :large="true"></xen-icon-button>
              <xen-icon-button :raised="true" icon="close" class="xen-theme-red"></xen-icon-button>
              <xen-icon-button :raised="true" icon="close" class="xen-theme-red" :large="true"></xen-icon-button>
              <xen-icon-button :raised="true" icon="sync_disabled" :disabled="true"></xen-icon-button>
              <xen-icon-button :raised="true" icon="sync_disabled" :disabled="true" :large="true"></xen-icon-button>
            </xen-card-content>
          </xen-card>

        </section>
      </div>

      <!-- Button Template Tab -->
      <div slot="Template">
        <div class="page-tab-content">

          <!-- Flat Buttons Template -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Flat Buttons</h2>
            </xen-card-header>
            <xen-card-content class="xen-no-margin">
              <pre><code class="language-html">{{ flatButtonTemplate }}</code></pre>
            </xen-card-content>
          </xen-card>

          <!-- Raised Buttons Template -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Raised Buttons</h2>
            </xen-card-header>
            <xen-card-content class="xen-no-margin">
              <pre><code class="language-html">{{ raisedButtonTemplate }}</code></pre>
            </xen-card-content>
          </xen-card>

          <!-- Flat Icon Buttons Template -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Flat Icon Buttons</h2>
            </xen-card-header>
            <xen-card-content class="xen-no-margin">
              <pre><code class="language-html">{{ flatIconTemplate }}</code></pre>
            </xen-card-content>
          </xen-card>

          <!-- Raised Icon Buttons Template -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Raised Icon Buttons</h2>
            </xen-card-header>
            <xen-card-content class="xen-no-margin">
              <pre><code class="language-html">{{ raisedIconTemplate }}</code></pre>
            </xen-card-content>
          </xen-card>
        </div>
      </div>

      <!-- Button Script Tab -->
      <div slot="Script">
        <div class="page-tab-content">

          <!-- Button Script -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Buttons</h2>
            </xen-card-header>
            <xen-card-content class="xen-no-margin">
              <pre><code class="language-javaScript">{{ buttonScript }}</code></pre>            
            </xen-card-content>
          </xen-card>

          <!-- Icon Button Script -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Icon Buttons</h2>
            </xen-card-header>
            <xen-card-content class="xen-no-margin">
              <pre><code class="language-javaScript">{{ iconButtonScript }}</code></pre>            
            </xen-card-content>
          </xen-card>
        </div>
      </div>
    </xen-tabs>
  </div>
</template>

<script>
  import XenTabs from '../xen/Tabs'
  import XenCard from '../xen/Card'
  import XenCardHeader from '../xen/CardHeader'
  import XenCardContent from '../xen/CardContent'
  import XenButton from '../xen/Button'
  import XenIconButton from '../xen/IconButton'
  import XenPageToolbar from '../xen/PageToolbar'
  import Prism from 'prismjs'

  export default {

    name: 'my-component',

    // Components
    components: {
      XenTabs,
      XenCard,
      XenCardHeader,
      XenCardContent,
      XenButton,
      XenPageToolbar,
      XenIconButton
    },

    // Data
    data () {
      return {
        flatButtonTemplate: `<xen-button>Default Button</xen-button>            
<xen-button class="xen-color-indigo">Indigo Button</xen-button>
<xen-button class="xen-color-green">Green Button</xen-button>
<xen-button class="xen-color-amber">Amber Button</xen-button>
<xen-button class="xen-color-red">Red Button</xen-button>
<xen-button :disabled="true">Disabled Button</xen-button>`,

        raisedButtonTemplate: `<xen-button :raised="true">Default Button</xen-button>            
<xen-button :raised="true" class="xen-theme-indigo">Indigo Button</xen-button>
<xen-button :raised="true" class="xen-theme-green">Green Button</xen-button>
<xen-button :raised="true" class="xen-theme-amber">Amber Button</xen-button>
<xen-button :raised="true" class="xen-theme-red">Red Button</xen-button>
<xen-button :raised="true" :disabled="true">Disabled Button</xen-button>`,

        flatIconTemplate: `<xen-icon-button icon="menu"></xen-icon-button>
<xen-icon-button icon="person" class="xen-color-indigo"></xen-icon-button>
<xen-icon-button icon="check" class="xen-color-green"></xen-icon-button>
<xen-icon-button icon="star" class="xen-color-amber"></xen-icon-button>
<xen-icon-button icon="close" class="xen-color-red"></xen-icon-button>
<xen-icon-button icon="sync_disabled" :disabled="true"></xen-icon-button>`,

        raisedIconTemplate: `<xen-icon-button :raised="true" icon="menu"></xen-icon-button>
<xen-icon-button :raised="true" icon="menu" :large="true"></xen-icon-button>
<xen-icon-button :raised="true" icon="person" class="xen-theme-indigo"></xen-icon-button>
<xen-icon-button :raised="true" icon="person" class="xen-theme-indigo" :large="true"></xen-icon-button>
<xen-icon-button :raised="true" icon="check" class="xen-theme-green"></xen-icon-button>
<xen-icon-button :raised="true" icon="check" class="xen-theme-green" :large="true"></xen-icon-button>
<xen-icon-button :raised="true" icon="star" class="xen-theme-amber0"></xen-icon-button>
<xen-icon-button :raised="true" icon="star" class="xen-theme-amber0" :large="true"></xen-icon-button>
<xen-icon-button :raised="true" icon="close" class="xen-theme-red"></xen-icon-button>
<xen-icon-button :raised="true" icon="close" class="xen-theme-red" :large="true"></xen-icon-button>
<xen-icon-button :raised="true" icon="sync_disabled" :disabled="true"></xen-icon-button>
<xen-icon-button :raised="true" icon="sync_disabled" :disabled="true" :large="true"></xen-icon-button>`,
        buttonScript: `import XenButton from '../xen/Button'

export default {
  components: {
    XenButton
  }
}`,
        iconButtonScript: `import XenIconButton from '../xen/IconButton'

export default {
  components: {
    XenIconButton
  }
}`
      }
    },

    // Mounted
    mounted () {
      // Syntax Highlighting
      Prism.highlightAll()
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

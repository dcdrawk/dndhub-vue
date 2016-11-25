<template>
  <div class="xen-page-background">
    <xen-page-toolbar class="xen-theme-indigo" title="Expansion Panels"></xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Example">

      <!-- Example Tab -->
      <div slot="Example">
        <section class="page-tab-content">

          <!-- Default Expansion Panel -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Default Expansion Panel</h2>
            </xen-card-header>
            <xen-card-content>
              <!-- Example Expansion Panel Here -->
              <xen-expansion-panel title="Expansion Panel 1" summary-text="Summary" secondary-text="Secondary">
                <p>Expansion Panel Content</p>
              </xen-expansion-panel>
              <xen-expansion-panel title="Expansion Panel 2" summary-text="Summary" secondary-text="Secondary">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut placerat varius nulla. Aenean sit amet facilisis ante, bibendum volutpat diam. Donec quis lorem urna. Duis luctus convallis posuere. Aliquam venenatis odio sodales facilisis ullamcorper. In ut tincidunt mi. Nam eleifend, dui vel porta porttitor, dolor purus malesuada nibh, et rhoncus turpis tortor vitae risus. Duis nec arcu sem. Vivamus aliquet dictum turpis eu pharetra. Phasellus tempor sem ut metus porta, in blandit lorem pellentesque.</p>
              </xen-expansion-panel>
              <xen-expansion-panel title="Expansion Panel 3" summary-text="Summary" secondary-text="Secondary">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut placerat varius nulla. Aenean sit amet facilisis ante, bibendum volutpat diam. Donec quis lorem urna. Duis luctus convallis posuere. Aliquam venenatis odio sodales facilisis ullamcorper. In ut tincidunt mi. Nam eleifend, dui vel porta porttitor, dolor purus malesuada nibh, et rhoncus turpis tortor vitae risus. Duis nec arcu sem. Vivamus aliquet dictum turpis eu pharetra. Phasellus tempor sem ut metus porta, in blandit lorem pellentesque.</p>
                <p>Proin finibus aliquam ante, id convallis lectus aliquam ut. Ut porttitor felis sed vestibulum volutpat. In a tristique odio. Praesent velit leo, finibus in eleifend sed, faucibus a justo. Pellentesque cursus ultrices sem vitae ultricies. Maecenas porta accumsan accumsan. In congue dignissim eros vel fermentum. Curabitur nibh nunc, feugiat quis leo non, eleifend euismod nulla. Aenean pretium eu diam auctor viverra.</p>
                <p>Vivamus eu odio gravida, tincidunt nulla et, interdum augue. Aenean in risus ut lectus pretium semper. Aliquam erat volutpat. Fusce dapibus rutrum justo et suscipit. Quisque nec tempus eros, id sollicitudin augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus tellus eu commodo suscipit. Duis eget turpis erat. Ut dui velit, scelerisque id efficitur at, aliquam non erat. Aenean scelerisque faucibus cursus.</p>
              </xen-expansion-panel>
            </xen-card-content>
          </xen-card>

        </section>
      </div>

      <!-- Template Tab-->
      <div slot="Template">
        <div class="page-tab-content">

          <!-- Expansion Panel Template -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Default Expansion Panel</h2>
            </xen-card-header>
            <xen-card-content class="xen-no-margin">
              <pre><code class="language-html">{{ expansionPanelTemplate }}</code></pre>            
            </xen-card-content>
          </xen-card>

        </div>
      </div>

      <!-- Script Tab-->
      <div slot="Script">
        <div class="page-tab-content"> 

          <!-- Default Expansion Panel Script -->         
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Default Expansion Panel</h2>
            </xen-card-header>
            <xen-card-content class="xen-no-margin">
              <pre><code class="language-javaScript">{{ expansionPanelScript }}</code></pre>            
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
  import Prism from 'prismjs'
  import XenExpansionPanel from '../xen/ExpansionPanel'

  export default {

    name: 'copmonent-page',

    // Components
    components: {
      XenPageToolbar,
      XenTabs,
      XenCard,
      XenCardHeader,
      XenCardContent,
      XenExpansionPanel
    },

    // Data
    data () {
      return {
        msg: 'Hello World!',
        expansionPanelTemplate: `<xen-expansion-panel title="Expansion Panel 1" summary-text="Summary" secondary-text="Secondary">
  <p>Expansion Panel Content</p>
</xen-expansion-panel>
<xen-expansion-panel title="Expansion Panel 2" summary-text="Summary" secondary-text="Secondary">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut placerat varius nulla. Aenean sit amet facilisis ante, bibendum volutpat diam. Donec quis lorem urna. Duis luctus convallis posuere. Aliquam venenatis odio sodales facilisis ullamcorper. In ut tincidunt mi. Nam eleifend, dui vel porta porttitor, dolor purus malesuada nibh, et rhoncus turpis tortor vitae risus. Duis nec arcu sem. Vivamus aliquet dictum turpis eu pharetra. Phasellus tempor sem ut metus porta, in blandit lorem pellentesque.</p>
</xen-expansion-panel>
<xen-expansion-panel title="Expansion Panel 3" summary-text="Summary" secondary-text="Secondary">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut placerat varius nulla. Aenean sit amet facilisis ante, bibendum volutpat diam. Donec quis lorem urna. Duis luctus convallis posuere. Aliquam venenatis odio sodales facilisis ullamcorper. In ut tincidunt mi. Nam eleifend, dui vel porta porttitor, dolor purus malesuada nibh, et rhoncus turpis tortor vitae risus. Duis nec arcu sem. Vivamus aliquet dictum turpis eu pharetra. Phasellus tempor sem ut metus porta, in blandit lorem pellentesque.</p>
  <p>Proin finibus aliquam ante, id convallis lectus aliquam ut. Ut porttitor felis sed vestibulum volutpat. In a tristique odio. Praesent velit leo, finibus in eleifend sed, faucibus a justo. Pellentesque cursus ultrices sem vitae ultricies. Maecenas porta accumsan accumsan. In congue dignissim eros vel fermentum. Curabitur nibh nunc, feugiat quis leo non, eleifend euismod nulla. Aenean pretium eu diam auctor viverra.</p>
  <p>Vivamus eu odio gravida, tincidunt nulla et, interdum augue. Aenean in risus ut lectus pretium semper. Aliquam erat volutpat. Fusce dapibus rutrum justo et suscipit. Quisque nec tempus eros, id sollicitudin augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus tellus eu commodo suscipit. Duis eget turpis erat. Ut dui velit, scelerisque id efficitur at, aliquam non erat. Aenean scelerisque faucibus cursus.</p>
</xen-expansion-panel>`,
        expansionPanelScript: `import XenExpansionPanel from '../xen/ExpansionPanel'

export default {
  components: {
    XenExpansionPanel
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

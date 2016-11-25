<template>
  <div v-cloak>
    <xen-page-toolbar class="xen-theme-indigo" title="Tabs"></xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Example">

      <!-- Example Tab -->
      <div slot="Example">
        <section class="page-tab-content">

          <!-- Default Tabs -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Default Tabs</h2>
            </xen-card-header>
            <xen-card-content>
              <xen-tabs default-tab="Reminders">
                <div slot="Messages">
                  <p>Messages Content</p>
                </div>
                <div slot="Reminders">
                  <p>Reminders Content</p>
                </div>
                <div slot="Notifications">
                  <p>Notifications Content</p>
                </div>
              </xen-tabs>
            </xen-card-content>
          </xen-card>

          <!-- Themed Tabs with Icons -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Themed tabs with icons</h2>
            </xen-card-header>
            <xen-card-content>
              <xen-tabs theme="primary" default-tab="Messages">
                <div slot="Messages" icon="message">
                  <p>Messages Content</p>
                </div>
                <div slot="Reminders" icon="access_time">
                  <p>Reminders Content</p>
                </div>
                <div slot="Notifications" icon="notifications">
                  <p>Notifications Content</p>
                </div>
              </xen-tabs>
            </xen-card-content>
          </xen-card>

          <!-- Tabs with icons only -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Tabs with icons only</h2>
            </xen-card-header>
            <xen-card-content>
              <xen-tabs default-tab="Messages" :icons="true" :icons-only="true">
                <div slot="Messages" icon="message">
                  <p>Messages Content</p>
                </div>
                <div slot="Reminders" icon="access_time">
                  <p>Reminders Content</p>
                </div>
                <div slot="Notifications" icon="notifications">
                  <p>Notifications Content</p>
                </div>
              </xen-tabs>
            </xen-card-content>
          </xen-card>
        </section>
      </div>

      <!-- Template Tab -->
      <div slot="Template">
        <div class="page-tab-content"> 

          <!-- Default Tabs -->         
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Default Tabs</h2>
            </xen-card-header>
            <xen-card-content class="xen-no-margin">
              <pre><code class="language-html">{{ defaultTabsTemplate }}</code></pre>            
            </xen-card-content>
          </xen-card>

          <!-- Themed tabs with icons -->         
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Themed tabs with icons</h2>
            </xen-card-header>
            <xen-card-content class="xen-no-margin">
              <pre><code class="language-html">{{ defaultTabsTemplate }}</code></pre>            
            </xen-card-content>
          </xen-card>

          <!-- Themed tabs with icons -->         
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Tabs with icons only</h2>
            </xen-card-header>
            <xen-card-content class="xen-no-margin">
              <pre><code class="language-html">{{ defaultTabsTemplate }}</code></pre>            
            </xen-card-content>
          </xen-card>
        </div>
      </div>

      <!-- Script Tab -->
      <div slot="Script">
        <div class="page-tab-content"> 

          <!-- Default Tabs Script -->         
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Default Tabs</h2>
            </xen-card-header>
            <xen-card-content class="xen-no-margin">
              <pre><code class="language-javaScript">{{ defaulTabsScript }}</code></pre>            
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
  import XenDivider from '../xen/Divider'
  import XenList from '../xen/List'
  import XenListItem from '../xen/ListItem'
  import XenPageToolbar from '../xen/PageToolbar'
  import Prism from 'prismjs'

  export default {

    name: 'dividers-page',

    // Components
    components: {
      XenTabs,
      XenCard,
      XenCardHeader,
      XenCardContent,
      XenDivider,
      XenList,
      XenListItem,
      XenPageToolbar
    },

    // Data
    data () {
      return {
        defaultTabsTemplate: `<xen-tabs default-tab="Messages">
  <div slot="Messages">
    Messages Content
  </div>
  <div slot="Reminders">
    Reminders Content
  </div>
  <div slot="Notifications">
    Notifications Content
  </div>
</xen-tabs>`,
        themedTabsTemplate: `<xen-tabs theme="primary" default-tab="Messages" :icons="true">
  <div slot="Messages" icon="message">
    Messages Content
  </div>
  <div slot="Reminders" icon="access_time">
    Reminders Content
  </div>
  <div slot="Notifications" icon="notifications">
    Notifications Content
  </div>
</xen-tabs>`,
        iconTabsTemplate: `<xen-tabs default-tab="Messages" :icons="true" :icons-only="true">
  <div slot="Messages" icon="message">
    Messages Content
  </div>
  <div slot="Reminders" icon="access_time">
    Reminders Content
  </div>
  <div slot="Notifications" icon="notifications">
    Notifications Content
  </div>
</xen-tabs>`,
        defaulTabsScript: `import XenTabs from '../xen/Tabs'

export default {
  components: {
    XenTabs
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

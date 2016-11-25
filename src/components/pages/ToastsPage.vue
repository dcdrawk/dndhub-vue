<template>
  <div>
    <xen-page-toolbar class="xen-theme-indigo" title="Toasts"></xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Example">

      <!-- Example Tab -->
      <div slot="Example">
        <section class="page-tab-content">

          <!-- Default Toast -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Default Toast</h2>
            </xen-card-header>
            <xen-card-content>
              <xen-button :raised="true" @click.native="showDefaultToast = true">Toggle Toast</xen-button>
              <xen-toast text="here is my first toast" :toggle="showDefaultToast" @hide="showDefaultToast = false"></xen-toast>
            </xen-card-content>
          </xen-card>

          <!-- Toast with Action-->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Toast with Action</h2>
            </xen-card-header>
            <xen-card-content>
              <xen-button :raised="true" @click.native="showActionToast = true">Toggle Toast</xen-button>
              <xen-toast text="toast with an action" action-text="undo" :action="toastAction" :toggle="showActionToast" @hide="showActionToast = false" ></xen-toast>
            </xen-card-content>
          </xen-card>
        </section>
      </div>

      <!-- Template Tab-->
      <div slot="Template">
        <div class="page-tab-content">

          <!-- Default Divider Template -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Default Divider</h2>
            </xen-card-header>
            <xen-card-content class="xen-no-margin">
              <pre><code class="language-html">{{ dividerTemplate }}</code></pre>            
            </xen-card-content>
          </xen-card>

          <!-- Divider in List Template -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Divider in List</h2>
            </xen-card-header>
            <xen-card-content class="xen-no-margin">
              <pre><code class="language-html">{{ dividerInListTemplate }}</code></pre>            
            </xen-card-content>
          </xen-card>
        </div>
      </div>

      <!-- Script Tab-->
      <div slot="Script">
        <div class="page-tab-content"> 

          <!-- Default Divider Script -->         
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Default Divider</h2>
            </xen-card-header>
            <xen-card-content class="xen-no-margin">
              <pre><code class="language-javaScript">{{ dividerScript }}</code></pre>            
            </xen-card-content>
          </xen-card>

          <!-- Divider in List Script -->         
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Divider in List</h2>
            </xen-card-header>
            <xen-card-content class="xen-no-margin">
              <pre><code class="language-javaScript">{{ dividerInListScript }}</code></pre>            
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
  import Prism from 'prismjs'
  import XenPageToolbar from '../xen/PageToolbar'
  import XenButton from '../xen/Button'
  import XenToast from '../xen/Toast'

  export default {

    name: 'toasts-page',

    // Components
    components: {
      XenTabs,
      XenCard,
      XenCardHeader,
      XenCardContent,
      XenDivider,
      XenList,
      XenListItem,
      XenPageToolbar,
      XenButton,
      XenToast
    },

    // Data
    data () {
      return {
        showDefaultToast: false,
        showActionToast: false,
        dividerTemplate: `<xen-divider></xen-divider>`,
        dividerInListTemplate: `<xen-list>
  <xen-list-item text="Two Line Item" secondary-text="Duis autem vel eum iriure dolor in hendrerit in vulputate"></xen-list-item>
  <xen-list-item text="Two Line Item" secondary-text="Lorem ipsum dolor sit amet, consectetur adipiscing elit"></xen-list-item>
  <xen-divider></xen-divider>
  <xen-list-item text="Two Line Item" secondary-text="Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse"></xen-list-item>
  <xen-list-item text="Two Line Item" secondary-text="Adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore erat volutpat."></xen-list-item>
</xen-list>`,
        dividerScript: `import XenDivider from '../xen/Divider'

export default {
  components: {
    XenDivider
  }
}`,
        dividerInListScript: `import XenDivider from '../xen/Divider'
import XenList from '../xen/List'
import XenListItem from '../xen/ListItem'

export default {
  components: {
    XenDivider,
    XenList,
    XenListItem
  }
}`
      }
    },

    // Mounted
    mounted () {
      Prism.highlightAll()
    },

    methods: {
      toastAction () {
        window.alert('You clicked undo')
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

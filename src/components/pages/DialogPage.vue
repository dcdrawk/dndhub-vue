<template>
  <div class="xen-page-background">
    <xen-page-toolbar class="xen-theme-indigo" title="Dialogs"></xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Example">

      <!-- Example Tab -->
      <div slot="Example">
        <section class="page-tab-content">

          <!-- Default Component -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Default Dialog</h2>
            </xen-card-header>
            <xen-card-content>
              <xen-button :raised="true" @click.native="showDialog.small = true">Default Dialog</xen-button>
              <xen-dialog :show="showDialog.small" @hide="showDialog.small = false" title="Small Dialog" :small="true">
                <p>Confirm you opened the dialog</p>
                <div slot="actions">
                  <xen-button class="xen-color-primary" @click.native="showDialog.small = false">Cancel</xen-button>
                  <xen-button class="xen-color-primary" @click.native="showAlert('you clicked confirm', 'small')">Confirm</xen-button>
                </div>
              </xen-dialog>
            </xen-card-content>
          </xen-card>

          <!-- Default Component -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Medium Dialog</h2>
            </xen-card-header>
            <xen-card-content>
              <xen-button :raised="true" @click.native="showDialog.medium = true">Medium Dialog</xen-button>
              <xen-dialog :show="showDialog.medium" @hide="showDialog.medium = false" title="Medium Dialog" :medium="true">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut placerat varius nulla. Aenean sit amet facilisis ante, bibendum volutpat diam. Donec quis lorem urna. Duis luctus convallis posuere. Aliquam venenatis odio sodales facilisis ullamcorper. In ut tincidunt mi. Nam eleifend, dui vel porta porttitor, dolor purus malesuada nibh, et rhoncus turpis tortor vitae risus. Duis nec arcu sem. Vivamus aliquet dictum turpis eu pharetra. Phasellus tempor sem ut metus porta, in blandit lorem pellentesque.</p>
                <div slot="actions">
                  <xen-button class="xen-color-primary" @click.native="showDialog.medium = false">Cancel</xen-button>
                  <xen-button class="xen-color-primary" @click.native="showAlert('you clicked confirm', 'small')">Confirm</xen-button>
                </div>
              </xen-dialog>
            </xen-card-content>
          </xen-card>

          <!-- Default Component -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Large Dialog</h2>
            </xen-card-header>
            <xen-card-content>
              <xen-button :raised="true" @click.native="showDialog.large = true">Large Dialog</xen-button>
              <xen-dialog :show="showDialog.large" @hide="showDialog.large = false" title="Large Dialog" :large="true">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut placerat varius nulla. Aenean sit amet facilisis ante, bibendum volutpat diam. Donec quis lorem urna. Duis luctus convallis posuere. Aliquam venenatis odio sodales facilisis ullamcorper. In ut tincidunt mi. Nam eleifend, dui vel porta porttitor, dolor purus malesuada nibh, et rhoncus turpis tortor vitae risus. Duis nec arcu sem. Vivamus aliquet dictum turpis eu pharetra. Phasellus tempor sem ut metus porta, in blandit lorem pellentesque.</p>
                <p>Proin finibus aliquam ante, id convallis lectus aliquam ut. Ut porttitor felis sed vestibulum volutpat. In a tristique odio. Praesent velit leo, finibus in eleifend sed, faucibus a justo. Pellentesque cursus ultrices sem vitae ultricies. Maecenas porta accumsan accumsan. In congue dignissim eros vel fermentum. Curabitur nibh nunc, feugiat quis leo non, eleifend euismod nulla. Aenean pretium eu diam auctor viverra.</p>
                <p>Vivamus eu odio gravida, tincidunt nulla et, interdum augue. Aenean in risus ut lectus pretium semper. Aliquam erat volutpat. Fusce dapibus rutrum justo et suscipit. Quisque nec tempus eros, id sollicitudin augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus tellus eu commodo suscipit. Duis eget turpis erat. Ut dui velit, scelerisque id efficitur at, aliquam non erat. Aenean scelerisque faucibus cursus.</p>
                <div slot="actions">
                  <xen-button class="xen-color-primary" @click.native="showDialog.large = false">Cancel</xen-button>
                  <xen-button class="xen-color-primary" @click.native="showAlert('you clicked confirm', 'large')">Confirm</xen-button>
                </div>
              </xen-dialog>
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
              <pre><code class="language-html">{{ defaultDialogTemplate }}</code></pre>            
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
              <pre><code class="language-javaScript">{{ dialogScript }}</code></pre>            
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
  import XenButton from '../xen/Button'
  import XenDialog from '../xen/Dialog'
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
      XenButton,
      XenDialog
    },

    // Data
    data () {
      return {
        showDialog: {
          small: false,
          medium: false,
          large: false
        },
        defaultDialogTemplate: `<xen-button :raised="true" @click.native="showDialog.small = true">Default Dialog</xen-button>
<xen-dialog :show="showDialog.small" @hide="showDialog.small = false" title="Small Dialog" :small="true">
  <p>Confirm you opened the dialog</p>
  <div slot="actions">
    <xen-button class="xen-color-primary" @click.native="showDialog.small = false">Cancel</xen-button>
    <xen-button class="xen-color-primary" @click.native="showAlert('you clicked confirm', 'small')">Confirm</xen-button>
  </div>
</xen-dialog>`,
        mediumDialogTemplate: `<xen-button :raised="true" @click.native="showDialog.medium = true">Medium Dialog</xen-button>
<xen-dialog :show="showDialog.medium" @hide="showDialog.medium = false" title="Medium Dialog" :medium="true">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut placerat varius nulla. Aenean sit amet facilisis ante, bibendum volutpat diam. Donec quis lorem urna. Duis luctus convallis posuere. Aliquam venenatis odio sodales facilisis ullamcorper. In ut tincidunt mi. Nam eleifend, dui vel porta porttitor, dolor purus malesuada nibh, et rhoncus turpis tortor vitae risus. Duis nec arcu sem. Vivamus aliquet dictum turpis eu pharetra. Phasellus tempor sem ut metus porta, in blandit lorem pellentesque.</p>
  <div slot="actions">
    <xen-button class="xen-color-primary" @click.native="showDialog.medium = false">Cancel</xen-button>
    <xen-button class="xen-color-primary" @click.native="showAlert('you clicked confirm', 'small')">Confirm</xen-button>
  </div>
</xen-dialog>`,
        largeDialogTemplate: `<xen-button :raised="true" @click.native="showDialog.large = true">Large Dialog</xen-button>
<xen-dialog :show="showDialog.large" @hide="showDialog.large = false" title="Large Dialog" :large="true">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut placerat varius nulla. Aenean sit amet facilisis ante, bibendum volutpat diam. Donec quis lorem urna. Duis luctus convallis posuere. Aliquam venenatis odio sodales facilisis ullamcorper. In ut tincidunt mi. Nam eleifend, dui vel porta porttitor, dolor purus malesuada nibh, et rhoncus turpis tortor vitae risus. Duis nec arcu sem. Vivamus aliquet dictum turpis eu pharetra. Phasellus tempor sem ut metus porta, in blandit lorem pellentesque.</p>
  <p>Proin finibus aliquam ante, id convallis lectus aliquam ut. Ut porttitor felis sed vestibulum volutpat. In a tristique odio. Praesent velit leo, finibus in eleifend sed, faucibus a justo. Pellentesque cursus ultrices sem vitae ultricies. Maecenas porta accumsan accumsan. In congue dignissim eros vel fermentum. Curabitur nibh nunc, feugiat quis leo non, eleifend euismod nulla. Aenean pretium eu diam auctor viverra.</p>
  <p>Vivamus eu odio gravida, tincidunt nulla et, interdum augue. Aenean in risus ut lectus pretium semper. Aliquam erat volutpat. Fusce dapibus rutrum justo et suscipit. Quisque nec tempus eros, id sollicitudin augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus tellus eu commodo suscipit. Duis eget turpis erat. Ut dui velit, scelerisque id efficitur at, aliquam non erat. Aenean scelerisque faucibus cursus.</p>
  <div slot="actions">
    <xen-button class="xen-color-primary" @click.native="showDialog.large = false">Cancel</xen-button>
    <xen-button class="xen-color-primary" @click.native="showAlert('you clicked confirm', 'large')">Confirm</xen-button>
  </div>
</xen-dialog>`,
        dialogScript: `import XenDialog from '../xen/Dialog'
import XenButton from '../xen/Button'

export default {
  components: {
    XenDialog,
    XenButton
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

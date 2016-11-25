<template>
  <div>
    <xen-page-toolbar class="xen-theme-indigo" title="Dropdowns"></xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Example">

      <!-- Example Tab -->
      <div slot="Example">
        <section class="page-tab-content">

          <!-- Default Dropdown -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Default Dropdown</h2>
            </xen-card-header>
            <xen-card-content>
              <!-- Example Component Here -->
              <xen-dropdown :open="open1" @toggle="open1 = false">
                <xen-icon-button style="position: relative;" slot="target" icon="more_vert" @click.native="open1 = !open1"></xen-icon-button>
                <div slot="menu">
                  <xen-list>
                    <xen-list-item text="Preview" icon="remove_red_eye"></xen-list-item>
                    <xen-list-item text="Share" icon="person_add"></xen-list-item>
                    <xen-list-item text="Get link" icon="link"></xen-list-item>
                  </xen-list>
                  <xen-divider></xen-divider>
                  <xen-list>
                    <xen-list-item text="Make a copy" icon="content_copy"></xen-list-item>
                    <xen-list-item text="Download" icon="file_download"></xen-list-item>
                  </xen-list>
                  <xen-divider></xen-divider>
                  <xen-list>
                    <xen-list-item text="Remove" icon="delete"></xen-list-item>
                  </xen-list>
                </div>
              </xen-dropdown>
            </xen-card-content>
          </xen-card>

          <!-- Right Aligned Dense Dropdown -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Right Aligned + Dense Dropdown</h2>
            </xen-card-header>
            <xen-card-content>
              <!-- Example Component Here -->
              <xen-dropdown :open="open2" @toggle="open2 = false" position="right">
                <xen-icon-button style="position: relative;" slot="target" ref="test" icon="more_vert" @click.native="open2 = !open2"></xen-icon-button>
                <div slot="menu">
                  <xen-list :dense="true">
                    <xen-list-item text="Preview" icon="remove_red_eye"></xen-list-item>
                    <xen-list-item text="Share" icon="person_add"></xen-list-item>
                    <xen-list-item text="Get link" icon="link"></xen-list-item>
                  </xen-list>
                  <xen-divider></xen-divider>
                  <xen-list :dense="true">
                    <xen-list-item text="Make a copy" icon="content_copy"></xen-list-item>
                    <xen-list-item text="Download" icon="file_download"></xen-list-item>
                  </xen-list>
                  <xen-divider></xen-divider>
                  <xen-list :dense="true">
                    <xen-list-item text="Remove" icon="delete"></xen-list-item>
                  </xen-list>
                </div>
              </xen-dropdown>
            </xen-card-content>
          </xen-card>

        </section>
      </div>

      <!-- Template Tab-->
      <div slot="Template">
        <div class="page-tab-content">

          <!-- Dropdown Template -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Default Dropdown</h2>
            </xen-card-header>
            <xen-card-content class="xen-no-margin">
              <pre><code class="language-html">{{ dropdownTemplate }}</code></pre>            
            </xen-card-content>
          </xen-card>

          <!-- Right Aligned + Dense Template -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Right Aligned + Dense Dropdown</h2>
            </xen-card-header>
            <xen-card-content class="xen-no-margin">
              <pre><code class="language-html">{{ rightDropdownTemplate }}</code></pre>            
            </xen-card-content>
          </xen-card>

        </div>
      </div>

      <!-- Script Tab-->
      <div slot="Script">
        <div class="page-tab-content"> 

          <!-- Default Dropdown Script -->         
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Default Dropdown</h2>
            </xen-card-header>
            <xen-card-content class="xen-no-margin">
              <pre><code class="language-javaScript">{{ dropdownScript }}</code></pre>            
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
  import XenIconButton from '../xen/IconButton'
  import XenList from '../xen/List'
  import XenListItem from '../xen/ListItem'
  import XenDropdown from '../xen/Dropdown'
  import XenDivider from '../xen/Divider'

  export default {

    name: 'dropdown-page',

    // Components
    components: {
      XenPageToolbar,
      XenTabs,
      XenCard,
      XenCardHeader,
      XenCardContent,
      XenDropdown,
      XenIconButton,
      XenList,
      XenListItem,
      XenDivider
    },

    // Data
    data () {
      return {
        open1: false,
        open2: false,
        dropdownTemplate: `<xen-dropdown :open="open1" @toggle="open1 = false">
  <xen-icon-button style="position: relative;" slot="target" icon="more_vert" @click.native="open1 = !open1"></xen-icon-button>
  <div slot="menu">
    <xen-list>
      <xen-list-item text="Preview" icon="remove_red_eye"></xen-list-item>
      <xen-list-item text="Share" icon="person_add"></xen-list-item>
      <xen-list-item text="Get link" icon="link"></xen-list-item>
    </xen-list>
    <xen-divider></xen-divider>
    <xen-list>
      <xen-list-item text="Make a copy" icon="content_copy"></xen-list-item>
      <xen-list-item text="Download" icon="file_download"></xen-list-item>
    </xen-list>
    <xen-divider></xen-divider>
    <xen-list>
      <xen-list-item text="Remove" icon="delete"></xen-list-item>
    </xen-list>
  </div>
</xen-dropdown>`,
        rightDropdownTemplate: `<xen-dropdown :open="open2" @toggle="open2 = false" position="right">
  <xen-icon-button style="position: relative;" slot="target" ref="test" icon="more_vert" @click.native="open2 = !open2"></xen-icon-button>
  <div slot="menu">
    <xen-list :dense="true">
      <xen-list-item text="Preview" icon="remove_red_eye"></xen-list-item>
      <xen-list-item text="Share" icon="person_add"></xen-list-item>
      <xen-list-item text="Get link" icon="link"></xen-list-item>
    </xen-list>
    <xen-divider></xen-divider>
    <xen-list :dense="true">
      <xen-list-item text="Make a copy" icon="content_copy"></xen-list-item>
      <xen-list-item text="Download" icon="file_download"></xen-list-item>
    </xen-list>
    <xen-divider></xen-divider>
    <xen-list :dense="true">
      <xen-list-item text="Remove" icon="delete"></xen-list-item>
    </xen-list>
  </div>
</xen-dropdown>`,
        dropdownScript: `import XenDropdown from '../xen/Dropdown'
import XenIconButton from '../xen/IconButton'
import XenList from '../xen/List'
import XenListItem from '../xen/ListItem'
import XenDivider from '../xen/Divider'

export default {
  components: {
    XenDropdown,
    XenIconButton,
    XenList,
    XenListItem,
    XenDivider
  },

  data: {
    open1: false,
    open2: false
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

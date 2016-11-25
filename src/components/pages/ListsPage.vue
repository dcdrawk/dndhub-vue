<template>
  <div>
    <xen-page-toolbar class="xen-theme-green" title="Lists"></xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="green" default-tab="Example">
      <!-- Example Tab -->
      <div slot="Example">
        <section class="page-tab-content">

          <!-- Single Line List -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Single Line List</h2>
            </xen-card-header>
            <xen-card-content>
              <xen-list>
                <xen-list-item text="Inbox"></xen-list-item>
                <xen-list-item text="Sent"></xen-list-item>
                <xen-list-item text="Drafts"></xen-list-item>
                <xen-list-item text="Trash"></xen-list-item>
              </xen-list>
            </xen-card-content>
          </xen-card>

          <!-- Dense Single Line List -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Dense Single Line List</h2>
            </xen-card-header>
            <xen-card-content>
              <xen-list :dense="true">
                <xen-list-item text="Inbox"></xen-list-item>
                <xen-list-item text="Sent"></xen-list-item>
                <xen-list-item text="Drafts"></xen-list-item>
                <xen-list-item text="Trash"></xen-list-item>
              </xen-list>
            </xen-card-content>
          </xen-card>

          <!-- Single Line List with Icons -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Single Line List with Icons</h2>
            </xen-card-header>
            <xen-card-content>
              <xen-list>
                <xen-list-item text="Inbox" icon="mail"></xen-list-item>
                <xen-list-item text="Sent" icon="send"></xen-list-item>
                <xen-list-item text="Drafts" icon="drafts"></xen-list-item>
                <xen-list-item text="Trash" icon="delete"></xen-list-item>
              </xen-list>
            </xen-card-content>
          </xen-card>

          <!-- Single List List with Avatars + Icons -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Single Line List with Avatars + Icons</h2>
            </xen-card-header>
            <xen-card-content>
              <xen-list>
                <xen-list-item text="Inbox" icon="mail" :avatar="true"></xen-list-item>
                <xen-list-item text="Sent" icon="send" :avatar="true"></xen-list-item>
                <xen-list-item text="Drafts" icon="drafts" :avatar="true"></xen-list-item>
                <xen-list-item text="Trash" icon="delete" :avatar="true"></xen-list-item>
              </xen-list>
            </xen-card-content>
          </xen-card>

          <!-- Two Line List -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Two Line List</h2>
            </xen-card-header>
            <xen-card-content>
              <xen-list>
                <xen-list-item text="Two Line Item" secondary-text="Duis autem vel eum iriure dolor in hendrerit in vulputate"></xen-list-item>
                <xen-list-item text="Two Line Item" secondary-text="Lorem ipsum dolor sit amet, consectetur adipiscing elit"></xen-list-item>
                <xen-list-item text="Two Line Item" secondary-text="Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse"></xen-list-item>
                <xen-list-item text="Two Line Item" secondary-text="Adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore erat volutpat."></xen-list-item>
              </xen-list>
            </xen-card-content>
          </xen-card>

          <!-- Multi-Line List -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Multi-Line List</h2>
            </xen-card-header>
            <xen-card-content>
              <xen-list>
                <xen-list-item icon="star" text="Two Line Item" secondary-text="Duis autem vel eum iriure dolor in hendrerit in vulputate" multi-line="true"></xen-list-item>
                <xen-list-item text="Two Line Item" secondary-text="Lorem ipsum dolor sit amet, consectetur adipiscing elit" multi-line="true"></xen-list-item>
                <xen-list-item text="Two Line Item" secondary-text="Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse" multi-line="true"></xen-list-item>
                <xen-list-item text="Two Line Item" secondary-text="Adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore erat volutpat." multi-line="true"></xen-list-item>
              </xen-list>
            </xen-card-content>
          </xen-card>

        </section>
      </div>

      <!-- Template Tab -->
      <div slot="Template">
        <div class="page-tab-content">

          <!-- Single Line List Template -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Single Line List</h2>
            </xen-card-header>
            <xen-card-content>
              <pre><code class="language-html">{{ singleLineListTemplate }}</code></pre>   
            </xen-card-content>
          </xen-card>

          <!-- Dense Single Line List Template -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Dense Single Line List</h2>
            </xen-card-header>
            <xen-card-content>
              <pre><code class="language-html">{{ denseListTemplate }}</code></pre>   
            </xen-card-content>
          </xen-card>

          <!-- Single Line List with Icons Template -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Single Line List with Icons</h2>
            </xen-card-header>
            <xen-card-content>
              <pre><code class="language-html">{{ iconListTemplate }}</code></pre>   
            </xen-card-content>
          </xen-card>

          <!-- Single List List with Avatars + Icons Template -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Single Line List with Avatars + Icons</h2>
            </xen-card-header>
            <xen-card-content>
              <pre><code class="language-html">{{ avatarListTemplate }}</code></pre>   
            </xen-card-content>
          </xen-card>

          <!-- Two Line List Template -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Two Line List</h2>
            </xen-card-header>
            <xen-card-content>
              <pre><code class="language-html">{{ twoLineListTemplate }}</code></pre>   
            </xen-card-content>
          </xen-card>

          <!-- Multi-Line List Template -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Multi-Line List</h2>
            </xen-card-header>
            <xen-card-content>
              <pre><code class="language-html">{{multiLineListTemplate }}</code></pre>   
            </xen-card-content>
          </xen-card>
        </div>
      </div>

      <!-- Script Tab -->
      <div slot="Script">
        <div class="page-tab-content">          
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Default List</h2>
            </xen-card-header>
            <xen-card-content class="xen-no-margin">
              <pre><code class="language-javaScript">{{ listScript }}</code></pre>            
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
  import XenList from '../xen/List'
  import XenListItem from '../xen/ListItem'
  import XenPageToolbar from '../xen/PageToolbar'
  import Prism from 'prismjs'
  
  export default {

    name: 'list-page',

    // Components
    components: {
      XenTabs,
      XenCard,
      XenCardHeader,
      XenCardContent,
      XenList,
      XenListItem,
      XenPageToolbar
    },

    // Data
    data () {
      return {
        msg: 'Hello World!',
        singleLineListTemplate: `<xen-list>
  <xen-list-item text="Inbox"></xen-list-item>
  <xen-list-item text="Sent"></xen-list-item>
  <xen-list-item text="Drafts"></xen-list-item>
  <xen-list-item text="Trash"></xen-list-item>
</xen-list>`,
        denseListTemplate: `<xen-list :dense="true">
  <xen-list-item text="Inbox"></xen-list-item>
  <xen-list-item text="Sent"></xen-list-item>
  <xen-list-item text="Drafts"></xen-list-item>
  <xen-list-item text="Trash"></xen-list-item>
</xen-list>`,
        iconListTemplate: `<xen-list>
  <xen-list-item text="Inbox" icon="mail"></xen-list-item>
  <xen-list-item text="Sent" icon="send"></xen-list-item>
  <xen-list-item text="Drafts" icon="drafts"></xen-list-item>
  <xen-list-item text="Trash" icon="delete"></xen-list-item>
</xen-list>`,
        avatarListTemplate: `<xen-list>
  <xen-list-item text="Inbox" icon="mail" :avatar="true"></xen-list-item>
  <xen-list-item text="Sent" icon="send" :avatar="true"></xen-list-item>
  <xen-list-item text="Drafts" icon="drafts" :avatar="true"></xen-list-item>
  <xen-list-item text="Trash" icon="delete" :avatar="true"></xen-list-item>
</xen-list>`,
        twoLineListTemplate: `<xen-list>
  <xen-list-item text="Two Line Item" secondary-text="Duis autem vel eum iriure dolor in hendrerit in vulputate"></xen-list-item>
  <xen-list-item text="Two Line Item" secondary-text="Lorem ipsum dolor sit amet, consectetur adipiscing elit"></xen-list-item>
  <xen-list-item text="Two Line Item" secondary-text="Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse"></xen-list-item>
  <xen-list-item text="Two Line Item" secondary-text="Adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore erat volutpat."></xen-list-item>
</xen-list>`,
        multiLineListTemplate: `<xen-list>
  <xen-list-item icon="star" text="Two Line Item" secondary-text="Duis autem vel eum iriure dolor in hendrerit in vulputate" multi-line="true"></xen-list-item>
  <xen-list-item text="Two Line Item" secondary-text="Lorem ipsum dolor sit amet, consectetur adipiscing elit" multi-line="true"></xen-list-item>
  <xen-list-item text="Two Line Item" secondary-text="Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse" multi-line="true"></xen-list-item>
  <xen-list-item text="Two Line Item" secondary-text="Adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore erat volutpat." multi-line="true"></xen-list-item>
</xen-list>`,
        listScript: `import XenList from '../xen/List'
import XenListItem from '../xen/ListItem'

export default {
  components: {
    XenList,
    XenListItem
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

<template>
  <div>
    <xen-page-toolbar class="xen-theme-indigo" title="Getting Started"></xen-page-toolbar>
    <div class="xen-page-content xen-page-background">
      <!-- Default Chips -->
      <xen-card>
        <xen-card-header background="#eee">
          <h2 class="title">Installation</h2>
        </xen-card-header>
        <xen-card-content class="xen-no-margin">
          <pre><code class="language-js">// clone the repository
git clone https://github.com/dcdrawk/xen-ui.git

// install dependencies
npm install

// serve with hot reload at localhost:8080
npm run dev

// build for production with minification
npm run build

// run unit tests
npm run unit

// run e2e tests
npm run e2e

// run all tests
npm test</code></pre>  
        </xen-card-content>

        </xen-card>
        <xen-card>
          <xen-card-header background="#eee">
            <h2 class="title">Resources</h2>
          </xen-card-header>
          <xen-card-content class="xen-no-margin">
            <xen-list>
              <a href="https://vuejs.org/v2/api/" target="_blank">
                <xen-list-item text="VueJS" secondary-text="The Progressive JavaScript Framework"></xen-list-item>
              </a>
              <a href="https://router.vuejs.org/en/index.html" target="_blank">
                <xen-list-item text="Vue Router" secondary-text="Vue Routing Made Simple"></xen-list-item>
              </a>
              <a href="https://greensock.com/" target="_blank">
                <xen-list-item text="GreenSock" secondary-text="High-Performance Web Animation Library"></xen-list-item>
              </a>
              <a href="https://material.google.com/" target="_blank">
                <xen-list-item text="Material Design Spec" secondary-text="User Experience and Interface Deisgn Guidelines"></xen-list-item>
              </a>
            </xen-list>
          <!-- <a href="https://material.google.com/" target="blank">
            <h2>Material Design Spec</h2>
            <p>User Experience and Interface Deisgn Guidelines</p>
          </a> -->
          <!-- <xen-divider class="divider"></xen-divider> -->

          <!-- <h2>Material Design Spec</h2> -->
          <!-- <p>User Interface Design</p> -->


          </xen-card-content>
        </xen-card>
  </div>
</template>

<script>
  import XenPageToolbar from '../xen/PageToolbar'
  import XenButton from '../xen/Button'
  import XenDivider from '../xen/Divider'
  import XenCard from '../xen/Card'
  import XenCardHeader from '../xen/CardHeader'
  import XenCardContent from '../xen/CardContent'
  import XenCardMedia from '../xen/CardMedia'
  import XenCardActions from '../xen/CardActions'
  import XenRipple from '../xen/Ripple'
  import XenList from '../xen/List'
  import XenListItem from '../xen/ListItem'
  import Prism from 'prismjs'
  export default {
    name: 'hello',

    components: {
      XenPageToolbar,
      XenButton,
      XenDivider,
      XenCard,
      XenCardHeader,
      XenCardContent,
      XenCardMedia,
      XenCardActions,
      XenRipple,
      XenList,
      XenListItem
    },

    // Mounted
    mounted () {
      Prism.highlightAll()
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .divider {
    margin: 16px 0;
  }
</style>


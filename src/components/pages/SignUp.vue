<template>
  <div>
    <xen-page-toolbar class="xen-theme-indigo" title="Sign Up"></xen-page-toolbar>
    <div class="xen-page-content xen-page-background">
      <div class="row space-around">
        <!-- <img src="../assets/logo/android-chrome-192x192.png"> -->
        <div class="col-xs-12">
          <h1 class="display-2 text-center">Xen UI</h1>
          <h2 class="title text-center">A Material Design Vue.js Component Library</h2>
        </div>
        <div class="col-xs-12 text-center">
          <div>
            <a href="http://www.github.com/dcdrawk/xen-ui" target="_blank">
              <xen-button :raised="true" class="xen-theme-primary">View on Github</xen-button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

<script>
  import XenPageToolbar from '../xen/PageToolbar'
  import XenButton from '../xen/Button'
  import XenDivider from '../xen/Divider'
  import XenCard from '../xen/Card'
  import XenCardHeader from '../xen/CardHeader'
  import XenCardContent from '../xen/CardContent'
  import XenCardMedia from '../xen/CardMedia'
  import XenCardActions from '../xen/CardActions'

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
      XenCardActions
    }

  }
</script>

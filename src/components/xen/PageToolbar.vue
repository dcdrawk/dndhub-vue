<template>
  <div class="xen-page-toolbar">
    <xen-toolbar>
      <xen-icon-button class="xen-menu-button" :class="{}"icon="menu" @click.native="$root.toggleSidebar()">menu</xen-icon-button>
      <span class="title xen-page-title">{{ title || 'Page Title' }}</span>
    </xen-toolbar>
  </div>
</template>

<style lang="scss" scoped>
  @import './styles/variables';

  .xen-page-toolbar {
    position: fixed;
    width: 100%;
    padding: 16px;
    top: 0;
    z-index: 8;
  }

  i {
    margin-right: 16px;
  }

  .title {
    vertical-align: middle;
    line-height: 1.2;
  }
</style>

<script>
  import XenToolbar from './Toolbar'
  import XenIconButton from './IconButton'

  export default {
    // Name
    name: 'xen-page-toolbar',

    // Props
    props: [
      'title'
    ],

    // Components
    components: {
      XenToolbar,
      XenIconButton
    }

  }
</script>

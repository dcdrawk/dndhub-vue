<template>
  <div class="xen-card-title" :class="{ 'xen-custom-background': background, 'xen-card-header-actions': actions }" :style="background ? 'background-color:' + background + '; border-bottom: 1px solid rgba(0,0,0,.12);' : ''">
    <slot></slot>
  </div>
</template>

<style scoped>
  .xen-card-title-container {
    display: flex;
  }

  .xen-card-title {
    margin: 16px;
  }

  .xen-custom-background {
    padding: 16px;
    margin: 0;
  }

  .xen-card-header-actions,
  .xen-card-header-actions.xen-custom.background {
    margin: 0;
    padding: 8px;
  }

</style>

<script>
  export default {
    // Name
    name: 'xen-card-title',

    // Props
    props: [
      'background',
      'actions'
    ]

  }
</script>

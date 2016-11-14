<template>
  <div class="xen-card-title" :class="{ 'xen-custom-background': background }" :style="background ? 'background-color:' + background + '; border-bottom: 1px solid rgba(0,0,0,.12);' : ''">
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
</style>

<script>
  export default {
    // Name
    name: 'xen-card-title',

    // Props
    props: [
      'background'
    ]

  }
</script>

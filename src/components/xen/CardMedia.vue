<template>
  <div class="xen-card-media">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  .xen-card-media {

    img {
      width: 100%;
    }

  }
</style>

<script>
  export default {
    // Name
    name: 'card-media'

  }
</script>

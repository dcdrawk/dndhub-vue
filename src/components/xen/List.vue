<template>
  <div class="xen-list" :class="{ 'dense': dense }">
    <slot></slot>
  </div>
</template>

<style lang="scss">
  @import './styles/lists';
</style>

<script>
  export default {
    // Name
    name: 'xen-list',

    // Props
    props: [
      'dense'
    ]

  }
</script>

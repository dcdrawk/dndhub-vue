<template>
  <div class="xen-toolbar">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  @import '../../styles/variables';

  i {
    margin-right: 16px;
  }

  .title {
    vertical-align: middle;
    line-height: 1.2;
  }
</style>

<script>
  export default {
    // Name
    name: 'xen-toolbar',

    // Props
    props: [
      'title'
    ]

  }
</script>

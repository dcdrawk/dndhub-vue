<template>
  <div class="xen-card">
    <slot></slot>
  </div>
</template>

<style lang="scss">
  @import './styles/whiteframe';

  .xen-card {
    @extend .whiteframe-z1;
    background-color: #fff;
    display: inline-block;
    width: 100%;
    // margin-bottom: 16px;
  }

</style>

<script>
  export default {
    // Name
    name: 'xen-card'

  }
</script>

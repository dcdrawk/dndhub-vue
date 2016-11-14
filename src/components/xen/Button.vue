<template>
  <div class="xen-button-container" :class="{ 'raised': raised, 'flat': !raised, 'disabled': disabled }">
    <xen-ripple>
      <div class="xen-button" :class="{ 'raised': raised }">
        <slot></slot>
      </div>
    </xen-ripple>
  </div>
</template>

<style lang="scss">
  @import './styles/button';
</style>

<script>
  import XenRipple from './Ripple'

  export default {
    // Name
    name: 'xen-button',

    // Props
    props: [
      'primary',
      'raised',
      'disabled'
    ],

    // Components
    components: {
      XenRipple
    }

  }
</script>

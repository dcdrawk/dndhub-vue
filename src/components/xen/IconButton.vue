<template>
  <!-- <div class="xen-button-container" > -->
  <span class="xen-icon-button-container" :class="{ 'raised': raised, 'flat': !raised, 'disabled': disabled, 'large': large }">
    <xen-ripple :round="true">
      <span ref="button" class="xen-icon-button-wrapper" v-bind:class="{ 'primary': primary, 'secondary': secondary, 'raised': raised, 'flat': !raised, 'square': square }">
        <i class="material-icons">{{ icon }}</i>
      </span>
    </xen-ripple>
  </span>
</template>

<style lang="scss">
  @import './styles/button';
</style>

<script>
  import XenRipple from './Ripple'

  export default {
    // Name
    name: 'xen-icon-button',

    // Props
    props: [
      'raised',
      'primary',
      'secondary',
      'icon',
      'square',
      'disabled',
      'large'
    ],

    // Components
    components: {
      XenRipple
    }
  }
</script>

<template>
  <div class="xen-radio-button-container" @click="toggleCheckbox()" v-bind:class="{ 'has-value': selected, 'secondary-color': secondaryColor }">
    <xen-ripple :center="true">
      <div class="xen-radio-button">
        <div class="circle"></div>
      </div>
    </xen-ripple>
  </div>
</template>

<style lang="scss">
  @import './styles/radio-button';
</style>

<script>
  import XenRipple from './Ripple'

  export default {

    // Props
    props: [
      'value',
      'secondaryColor'
    ],

    // Components
    components: {
      XenRipple
    },

    // Data
    data () {
      return {
        selected: false
      }
    },

    // Methods
    methods: {
      toggleCheckbox () {
        this.$parent.$children.forEach((item, index) => {
          item.selected = false
        })
        this.$parent.$emit('radioSelect', this.value)
        this.selected = true
      }
    }

  }
</script>

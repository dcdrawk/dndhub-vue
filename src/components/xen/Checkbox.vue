<template>
  <div class="xen-checkbox-container" @click="toggleCheckbox()" v-bind:class="{ 'has-value': checkboxValue }">
    <xen-ripple :center="true">
      <div class="xen-checkbox"></div>
      <i class="material-icons">check</i>
    </xen-ripple>
  </div>
</template>

<style lang="scss">
  @import './styles/checkbox';
</style>

<script>
  import XenRipple from './Ripple'

  export default {
    // Props
    props: [
      'value'
    ],

    // Components
    components: {
      XenRipple
    },

    // Data
    data () {
      return {
        checkboxValue: this.value || false
      }
    },

    // Methods
    methods: {
      toggleCheckbox (value) {
        if (value === true || value === false) {
          this.checkboxValue = value
        } else {
          this.checkboxValue = !this.checkboxValue
        }
      }
    },

    // Watch
    watch: {
      'checkboxValue': {
        handler: function (val, oldVal) {
          this.$emit('input', this.checkboxValue)
        }
      },
      'value': {
        handler: function (val, oldVal) {
          this.checkboxValue = val
          this.$emit('input', this.checkboxValue)
        }
      }
    }
  }
</script>

<template>
  <div class="xen-input-container" v-bind:class="{ 'has-value': inputValue, 'focus': focused}">
    <label v-if="label">{{label}}</label>
    <input ref="input" v-model="inputValue" v-focus="focused" @focus="focused = true" @blur="focused = false" :placeholder="placeholder" type="text"/>
    <div class="xen-input-border"></div>
  </div>
</template>

<style lang="scss">
  @import './styles/input';
</style>

<script>
  import { focus } from 'vue-focus'

  export default {

    // Directives
    directives: { focus: focus },

    // Name
    name: 'xen-input',

    // Props
    props: [
      'label',
      'value',
      'type',
      'model',
      'placeholder'
    ],

    // Data
    data () {
      return {
        focused: false,
        inputValue: this.value || ''
      }
    },

    // Watch
    watch: {
      'inputValue': {
        handler: function (val, oldVal) {
          this.$emit('input', this.inputValue)
        }
      },
      'value': {
        handler: function (val, oldVal) {
          this.inputValue = val
        }
      }
    }
  }
</script>

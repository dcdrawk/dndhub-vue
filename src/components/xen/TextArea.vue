<template>
  <div class="xen-input-container" v-bind:class="{ 'has-value': inputValue, 'focus': focused }">
    <label>{{label}}</label>
    <textarea ref="textarea" v-model="inputValue" v-focus="focused" @focus="focused = true" @blur="focused = false" :placeholder="placeholder" :rows="rows"></textarea>
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
    name: 'xen-textarea',

    // Props
    props: [
      'label',
      'value',
      'type',
      'model',
      'placeholder',
      'rows',
      'autoGrow'
    ],

    // Data
    data () {
      return {
        focused: false,
        inputValue: this.value || ''
      }
    },

    // Methods
    methods: {
      auto_grow () {
        var element = this.$refs.textarea
        element.style.height = '16px'
        element.style.height = (element.scrollHeight + 21) + 'px'
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
          if (typeof this.autoGrow === 'undefined' || this.autoGrow !== false) {
            this.auto_grow()
          }
        }
      }
    }
  }
</script>

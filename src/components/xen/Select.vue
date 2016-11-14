<template>
  <div class="xen-select-container" v-bind:class="{ 'has-value': selectValue, 'xen-dense': dense }">
    <div class="xen-select" @click="openSelect()">
      <label v-if="label">{{label}}</label>
      <span v-if="selectValue">{{selectValue}}</span>
      <span class="xen-placeholder" v-if="placeholder && !selectValue">{{ placeholder }}</span>
      <i class="material-icons">arrow_drop_down</i>
    </div>
    <transition name="fade">
      <div class="xen-select-option-container" v-show="open" ref="container">
        <div class="xen-select-option" v-for="(option, index) in options" @click.stop="selectOption(option, index)">
          <span>{{option}}</span>
        </div>
      </div>
    </transition>

    <div class="xen-select-backdrop" v-if="open" @click="closeSelect()"></div>

  </div>
</template>

<style lang="scss">
  @import './styles/select'
</style>

<script>
  export default {

    // Props
    props: [
      'label',
      'value',
      'options',
      'placeholder',
      'dense'
    ],

    // Methods
    methods: {
      openSelect () {
        this.open = true

        setTimeout(() => {
          let optionHeight = this.dense ? 40 : 48
          let adjustment = this.dense ? -2 : 1
          let container = this.$refs.container

          let offset = ((this.selectedIndex + 1) * optionHeight * -1) + adjustment
          let scrollOffset = this.selectedIndex > 4 ? (this.options.length - 5) * optionHeight : 0

          container.scrollTop = this.selectedIndex > 4 ? optionHeight * (this.options.length - this.selectedIndex + 1) : 0

          console.log(this.selectedIndex + 1, optionHeight, adjustment, ((this.selectedIndex + 1) * optionHeight))
          container.style.transform = `translateY(${offset - scrollOffset}px)`
        }
        , 0)
      },

      closeSelect () {
        this.open = false
      },

      selectOption (option, index) {
        this.selectValue = option
        this.selectedIndex = index
        this.closeSelect()
        this.$emit('input', this.selectValue)
      },

      getSelectedIndex () {
        if (this.selectValue && this.options) {
          this.options.forEach((item, index) => {
            if (item === this.selectValue) {
              this.selectedIndex = index
            }
          })
        }
      }
    },

    // Data
    data () {
      return {
        open: false,
        selectedIndex: 0,
        selectValue: this.value || ''
      }
    },

    // Mounted
    mounted () {
      this.getSelectedIndex()
    },

    // Watch
    watch: {
      'selectValue': {
        handler: function (val, oldVal) {
          this.$emit('input', this.selectValue)
        }
      },
      'value': {
        handler: function (val, oldVal) {
          this.selectValue = val
          this.$emit('input', this.selectValue)
        }
      }
    }
  }
</script>

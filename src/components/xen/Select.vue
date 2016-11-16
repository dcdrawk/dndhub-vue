<template>
  <div class="xen-select-container" v-bind:class="{ 'has-value': selectValue, 'xen-dense': dense, 'focus': focused }" v-on-clickaway="away">    
    <div ref="select" class="xen-select" @click="openSelect(); focused = true">
      <label v-if="label">{{label}}</label>
        <span v-if="selectValue">{{selectValue}}</span>
      <!-- <span v-if="selectValue && !optionKey">{{selectValue}}</span> -->
      <!-- <span v-if="selectValue && optionKey">{{selectValue[optionKey]}}</span> -->
      <span class="xen-placeholder" v-if="placeholder && !selectValue">{{ placeholder }}</span>
      <i class="material-icons">arrow_drop_down</i>
      <div class="xen-input-border"></div>
    </div>
    <transition name="fade">
      <div class="xen-select-option-container" v-show="open" ref="container" v-focus="focused" @focus="focused = true" @blur="focused = false">
        <div class="xen-select-option" v-for="(option, key, index) in options" @click.stop="selectOption(option, key, index)">
          <span v-if="!optionKey">{{option}}</span>
          <span v-else>{{option[optionKey]}}</span>
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
  import { focus } from 'vue-focus'
  import { directive as onClickaway } from 'vue-clickaway'

  export default {
    // Directives
    directives: { focus: focus, onClickaway: onClickaway },

    // Props
    props: [
      'label',
      'value',
      'options',
      'placeholder',
      'dense',
      'optionKey'
    ],

    // Methods
    methods: {

      away () {
        if (this.focused === true) {
          this.focused = false
        }
      },

      openSelect () {
        this.open = true

        setTimeout(() => {
          let optionHeight = this.dense ? 40 : 48
          let container = this.$refs.container
          let selectRect = this.$refs.select.getBoundingClientRect()

          let offset = this.selectedIndex * optionHeight
          let scrollOffset = this.selectedIndex > 4 ? (this.selectedIndex - 4) * optionHeight : 0
          let totalYOffset = selectRect.top - offset - 19 + scrollOffset

          // Check if it's within the bounds of the window
          if (totalYOffset < 8) {
            totalYOffset = 8
          }

          if (totalYOffset + container.clientHeight > window.innerHeight - 8) {
            totalYOffset = window.innerHeight - 8 - container.clientHeight
          }

          container.scrollTop = scrollOffset
          container.style.transform = `translate3d(${selectRect.left - 12}px, ${totalYOffset}px, 0)`
        }
        , 0)
      },

      closeSelect () {
        this.open = false
      },

      selectOption (option, key, index) {
        this.selectValue = this.optionKey ? option[this.optionKey] : option
        this.selectedIndex = index || key
        this.closeSelect()
        this.$emit('input', this.selectValue)
      },

      getSelectedIndex () {
        if (this.selectValue && this.options) {
          this.options.forEach((item, index) => {
            let option = this.optionKey ? item[this.optionKey] : item
            if (option === this.selectValue) {
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
        selectValue: this.value || '',
        width: 200,
        focused: false
      }
    },

    // Mounted
    mounted () {
      this.getSelectedIndex()
      setTimeout(() => {
        this.$refs.container.style.width = this.$refs.select.clientWidth + 16 + 'px'
      })
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
          if (val === undefined) {
            this.selectedIndex = 0
          }
          this.$emit('input', this.selectValue)
        }
      }
    }
  }
</script>

<template>
  <div ref="container" class="xen-slider-container" v-bind:class="{ 'has-value': hasValue, 'focus': focused }"  v-focus="focused" @focus="focused = true"  @blur="focused = false" @mousedown="clickSlider($event)">
    <div ref="slider" class="xen-slider"></div>
    <div ref="circle" class="xen-slider-circle-container" :class="{ 'has-value': hasValue, 'focus': focused }">
      <div class="xen-slider-circle"></div>
    </div>

    <div ref="bubble" class="xen-slider-bubble" :class="{ 'focus': focused }" v-show="showBubble">
      {{ Math.round(value) }}
    </div>

    <div ref="indicator" class="xen-slider-indicator" v-bind:class="{ 'focus': focused }"></div>
  </div>
</template>

<style lang="scss">
  @import './styles/slider';
</style>

<script>
  import { focus } from 'vue-focus'
  import Hammer from 'hammerjs'
  
  export default {
    // Directives
    directives: { focus: focus },

    // Name
    name: 'xen-slider',

    // Props
    props: [
      'value',
      'min',
      'max',
      'steps',
      'showBubble'
    ],

    // Data
    data () {
      return {
        focused: false,
        translate: 0,
        hasValue: false,
        sliderValue: this.value || 0,
        minValue: this.min || 0,
        maxValue: this.max || 100
      }
    },

    // Methods
    methods: {
      clickSlider (ev) {
        let value = (ev.clientX - this.$refs.container.offsetLeft - 16) / this.$refs.slider.clientWidth * (+this.maxValue - +this.minValue) + +this.minValue

        if (value > this.minValue && value < this.maxValue) {
          this.sliderValue = (ev.clientX - this.$refs.container.offsetLeft - 16) / this.$refs.slider.clientWidth * (+this.maxValue - +this.minValue) + +this.minValue
        } else if (value <= this.minValue) {
          this.sliderValue = this.minValue
        } else {
          this.sliderValue = this.maxValue
        }
        this.translate = ev.clientX - this.$refs.container.offsetLeft - 16
        if (this.steps) {
          this.stepSnap(this.sliderValue)
        }
        if (Math.round(this.sliderValue * 100) <= this.minValue) {
          this.hasValue = false
        }
      },

      // Takes a value from 0 - 1
      setPosition (value) {
        let translate = (this.$refs.slider.clientWidth * value)
        this.$refs.circle.style.transform = `translateX(${translate}px)`
        this.$refs.bubble.style.transform = `translateX(${translate}px)`
        this.$refs.indicator.style.transform = `scaleX(${value})`
      },

      createSteps () {
        let steps = []
        // Set up the steps array
        for (let i = 0; i < this.steps; i++) {
          steps[i] = i * this.$refs.slider.clientWidth / (this.steps - 1)
          let sliderDot = document.createElement('span')
          sliderDot.classList.add('slider-dot')
          sliderDot.style.transform = `translate3d(${steps[i] - 4}px, -2px, 0px)`
          this.$refs.slider.append(sliderDot)
        }
      },

      // Snap to steps
      stepSnap (value) {
        let steps = []
        let position = ((value - this.minValue) / (this.maxValue - this.minValue)) * this.$refs.slider.clientWidth

        // Set up the steps array
        for (let i = 0; i < this.steps; i++) {
          steps[i] = i * this.$refs.slider.clientWidth / (this.steps - 1)
        }

        // Go through each step, determine where the value is closest to.
        for (let j in steps) {
          if (+j !== steps.length - 1) {
            if (position >= steps[j] && position < steps[+j + 1]) {
              // If it's between the two steps
              if (position <= (steps[j] + steps[+j + 1]) / 2) {
                this.sliderValue = ((steps[j] / this.$refs.slider.clientWidth) * (+this.maxValue - +this.minValue) + +this.minValue)
              } else {
                this.sliderValue = ((steps[+j + 1] / this.$refs.slider.clientWidth) * (+this.maxValue - +this.minValue) + +this.minValue)
              }
            }
          } else {
            if (position >= steps[+j - 1] && position <= steps[j]) {
              if (position <= (steps[j] + steps[+j - 1]) / 2) {
                this.sliderValue = ((steps[+j - 1] / this.$refs.slider.clientWidth) * (+this.maxValue - +this.minValue) + +this.minValue)
              } else {
                this.sliderValue = ((steps[j] / this.$refs.slider.clientWidth) * (+this.maxValue - +this.minValue) + +this.minValue)
              }
            }
          }
        }
      }
    },

    // Mounted
    mounted () {
      var circle = new Hammer(this.$refs.circle)
      setTimeout(() => {
        if (this.steps) {
          this.createSteps()
        }

        this.translate = (this.sliderValue / (this.maxValue - this.minValue)) * this.$refs.slider.clientWidth
        this.setPosition(this.sliderValue / (this.maxValue - this.minValue))
        this.hasValue = this.sliderValue / (this.maxValue - this.minValue)
      }, 0)

      circle.on('pan', (ev) => {
        var value = (this.translate + ev.deltaX) / this.$refs.slider.clientWidth
        if (value > 0 && value < 1) {
          this.sliderValue = ((this.translate + ev.deltaX) / this.$refs.slider.clientWidth * (+this.maxValue - +this.minValue)) + +this.minValue
        } else if (value <= 0) {
          this.sliderValue = this.minValue
          this.hasValue = false
        } else {
          this.sliderValue = this.maxValue
        }
      })

      circle.on('panstart', (ev) => {
        this.focused = true
      })

      circle.on('panend', (ev) => {
        this.focused = false
        this.translate = this.translate + ev.deltaX
        if (this.steps) {
          this.stepSnap(this.value)
        }
      })
    },

    // Watch
    watch: {
      'sliderValue': {
        handler: function (val, oldVal) {
          if (val !== oldVal) {
            setTimeout(() => {
              this.setPosition((this.sliderValue - this.minValue) / (this.maxValue - this.minValue))
            }, 0)
          }
          this.hasValue = this.sliderValue / (this.maxValue - this.minValue)
          this.$emit('changed', this.sliderValue)
        }
      }
    }
  }
</script>

<template>
  <transition name="toast">
    <div class="xen-toast-container" v-show="show">
      <div class="xen-toast">
        <span>{{ text }}</span>
        <xen-button v-if="action" @click.native="action">{{ actionText }}</xen-button>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
  @import './styles/toasts';
</style>

<script>
  import XenButton from './Button.vue'
  import ToastQueue from './classes/ToastQueue'

  export default {
    // Components
    components: {
      XenButton
    },

    // Props
    props: [
      'text',
      'actionText',
      'action',
      'toggle',
      'delay'
    ],

    // Data
    data () {
      return {
        show: false,
        toastDelay: this.delay || 3000
      }
    },

    // Watch
    watch: {
      'toggle': {
        handler: function (val, oldVal) {
          if (this.toggle) {
            ToastQueue.queue(this, this.toastDelay)
          }
          setTimeout(() => {
            this.$emit('hide')
          }, this.toastDelay)
        }
      }
    }
  }
</script>

<template>
  <div ref="panel" class="xen-expansion-panel" @click="togglePanel();" :class="{ 'closed': !panelOpen, 'open': panelOpen}">
    <div ref="container" class="row">
      <div class="col-xs-3 xen-expansion-title">
        <strong>{{ title }}</strong>
      </div>

      <div class="col-xs-3 xen-expansion-secondary">
        {{ summaryText }}
      </div>

      <div class="col-xs-3 xen-expansion-secondary">
        {{ secondaryText }}
      </div>

      <div class="col-xs-3 xen-expansion-secondary text-right">
        <i class="material-icons" :class="{ 'closed': !panelOpen, 'open': panelOpen}">keyboard_arrow_down</i>
      </div>
      <transition name="fade">
        <div ref="content" v-show="panelOpen" class="col-xs-12 xen-expansion-panel-content">
          <slot></slot>
        </div>
      </transition>
    </div>
  </div>

</template>

<style lang="scss">
  @import './styles/expansion-panels';
</style>

<script>
  import gsap from 'gsap'

  export default {
    // Props
    props: [
      'open',
      'title',
      'summaryText',
      'secondaryText'
    ],

    // Data
    data () {
      return {
        startHeight: 48,
        panelOpen: this.open || false
      }
    },

    // Methods
    methods: {
      togglePanel () {
        this.panelOpen = !this.panelOpen

        setTimeout(() => {
          if (this.panelOpen) {
            var contentHeight = this.$refs.content.clientHeight
            gsap.TweenLite.to(this.$refs.panel, 0.3, { height: this.startHeight + contentHeight + 'px', margin: '16px 0', ease: gsap.Power1.easeOut })
          } else {
            gsap.TweenLite.to(this.$refs.panel, 0.3, { height: '48px', margin: '0 0', ease: gsap.Power1.easeOut })
          }
        }, 0)
      }
    }
  }
</script>

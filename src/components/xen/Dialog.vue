<template>
  <div class="xen-dialog-container" :class="{ 'show': show }">
    <transition name="fade">
      <div class="xen-dialog-backdrop" @click="hideDialog();" v-if="show"></div>
    </transition>

    <!-- Dialog -->
    <transition name="dialog">
      <div class="xen-dialog" v-if="show" :class="{ 'small': small, 'medium': medium, 'large': large, 'has-actions': $slots.actions }">

        <!-- Dialog Title -->
        <h3 class="xen-dialog-title title">{{ title }}</h3>

        <!-- Dialog Content -->
        <div class="xen-dialog-content">
          <slot name="default"></slot>
        </div>

        <!-- Dialog Actions -->
        <div class="xen-dialog-actions-container" v-if="$slots.actions">
          <div class="xen-dialog-actions">
            <slot name="actions"></slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss">
  @import './styles/dialog';
</style>

<script>
  import MaterialButton from './Button.vue'
  import MaterialCard from './Card.vue'
  import Toolbar from './Toolbar.vue'

  export default {
    // Name
    name: 'xen-dialog',

    // Components
    components: {
      MaterialButton,
      MaterialCard,
      Toolbar
    },

    // Props
    props: [
      'title',
      'size',
      'show',
      'small',
      'medium',
      'large'
    ],

    // Methods
    methods: {
      hideDialog () {
        this.$emit('hide')
      }
    }

  }
</script>

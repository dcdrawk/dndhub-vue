<template>
  <div class="xen-tabs" :class="{'icons': icons, 'icons-only': iconsOnly}">
    <!--Tab Items-->
    <div class="xen-tab-items-container" :class="theme ? 'xen-theme-' + theme : ''">
      <div ref="tabItems" class="xen-tab-items">
        <xen-button class="xen-tab-button" v-for="(tab, key, index) in $slots" @click.native="selectTab(key, index)" :class="{'active': active === key}" v-show="key !== 'default'" ref="tabs" :xen-tab-name="key">
          <i v-show="icons" class="xen-tab-icon material-icons">
            {{ iconValues[key] }}
          </i>
          <div v-if="!iconsOnly" class="xen-tab-text">{{ key }}</div>
        </xen-button>
      </div>
      <div ref="active-tab-bar" class="xen-active-tab-bar" :class="{'xen-theme-accent': !theme, 'xen-theme-white': theme}"></div>
    </div>
    <!--Tab Content-->
    <div class="xen-tab-content" v-for="(tab, key, index) in $slots" v-show="active === key">
      <slot :name="key"></slot>
    </div>
  </div>
</template>

<script>
import XenButton from './Button'
import Hammer from 'hammerjs'

export default {
  // Name
  name: 'xen-tabs',

  // Components
  components: {
    XenButton
  },

  // Props
  props: [
    'defaultTab',
    'theme',
    'secondary',
    'icons',
    'iconsOnly'
  ],

  // Data
  data () {
    return {
      active: this.defaultTab,
      iconValues: [''],
      offset: 0,
      translate: 0,
      scale: 0,
      deltaX: 0,
      activeOffset: 0,
      activePosition: 0,
      test: {},
      index: 0
    }
  },

  // Mounted
  mounted () {
    this.$nextTick(() => {
      this.offset = 0
      this.active = this.defaultTab
      if (this.icons) {
        this.getIcons()
      } else {
        this.updateBar(this.active)
      }
      this.hammerTabs()
    })
  },

  // Methods
  methods: {
    // Select a tab
    selectTab (key, index) {
      this.active = key
      this.index = index
      this.scrollTabs(index)
      this.updateBar(index)
    },

    // Find the selected tab, set it as active
    findTab (index) {
      for (var i in this.$refs.tabs) {
        var item = this.$refs.tabs[i]
        if (index === +i) {
          return item.$el
        }
      }
    },

    // Find the selected tab, set it as active
    getActiveTab (tabName) {
      for (var i in this.$refs.tabs) {
        var item = this.$refs.tabs[i]
        if (tabName === item.$el.attributes['xen-tab-name'].nodeValue) {
          return item.$el
        }
      }
    },

    // Update the position and scale of the active tab bar
    updateBar (index) {
      // setTimeout(() => {
      // this.$nextTick(() => {
      if (this.$refs.tabs) {
        var button = this.getActiveTab(this.active)
        var tabBar = this.$refs['active-tab-bar']
        this.scale = button.clientWidth / 100
        this.translate = 0
        for (var i in this.$refs.tabs) {
          var item = this.$refs.tabs[i]
          if (this.active !== item.$el.attributes['xen-tab-name'].nodeValue) {
            this.translate += this.$refs.tabs[i].$el.clientWidth
          } else {
            break
          }
        }
        tabBar.style.transform = `translateX(${this.translate + this.offset}px) scaleX(${this.scale})`
      }
      // })
      // }, 0)
    },

    // Scroll the tab items if they overflow the container
    scrollTabs (index) {
      var tabItems = this.$refs.tabItems
      var button = this.$refs.tabs[index].$el
      this.activeOffset = button.offsetLeft
      this.activePosition = button.offsetLeft

      if (button.clientWidth + button.offsetLeft > tabItems.clientWidth) {
        this.offset = (tabItems.clientWidth - button.offsetLeft - button.clientWidth)
        tabItems.style.transform = `translateX(${this.offset}px)`
      } else {
        this.offset = 0
        tabItems.style.transform = `translateX(${this.offset}px)`
      }
    },

    // Gets the array of icons from the slots
    getIcons () {
      var iconArray = {}
      for (var i in this.$slots) {
        if (i !== 'default') {
          iconArray[i] = this.$slots[i][0].elm.attributes['icon'].nodeValue
        }
      }
      this.iconValues = iconArray
      this.updateBar(0)
    },

    // Gesture / Touch controls
    hammerTabs () {
      var tabHammer = new Hammer(this.$refs.tabItems)
      var tabItems = this.$refs.tabItems
      var activeTabBar = this.$refs['active-tab-bar']

      // Let the user pan the tabs back and forth if they are too big for their container.
      tabHammer.on('pan', (ev) => {
        var translate = this.translate + ev.deltaX + this.offset - this.activeOffset

        if (translate < 0 && translate >= tabItems.clientWidth - tabItems.scrollWidth) {
          tabItems.style.transform = `translateX(${translate}px)`
          activeTabBar.style.transform = `translateX(${translate + this.activePosition}px) scaleX(${this.scale})`
        } else if (translate < tabItems.clientWidth - tabItems.scrollWidth) {
          tabItems.style.transform = `translateX(${(tabItems.clientWidth - tabItems.scrollWidth)}px)`
          activeTabBar.style.transform = `translateX(${(tabItems.clientWidth - tabItems.scrollWidth + this.activePosition)}px) scaleX(${this.scale})`
        } else {
          tabItems.style.transform = `translateX(0px)`
          activeTabBar.style.transform = `translateX(${this.activePosition}px) scaleX(${this.scale})`
        }
      })

      // Pan Start
      tabHammer.on('panstart', (ev) => {
        tabItems.classList.add('panning')
        activeTabBar.classList.add('panning')
      })

      // Pan End
      tabHammer.on('panend', (ev) => {
        var translate = this.translate + ev.deltaX + this.offset - this.activeOffset
        tabItems.classList.remove('panning')
        activeTabBar.classList.remove('panning')

        if (translate < 0 && translate > tabItems.clientWidth * -1) {
          this.translate = this.translate + ev.deltaX + this.offset - this.activeOffset
        } else if (translate < tabItems.clientWidth * -1) {
          this.translate = tabItems.clientWidth * -1
        } else {
          this.translate = 0
        }

        this.offset = 0
        this.activeOffset = 0
      })
    }
  },

  // Watch
  watch: {
    // Watch the icons only property, update the tab bar accordingly
    'iconsOnly': {
      handler: function (val, oldVal) {
        this.updateBar(this.defaultTab)
        this.active = this.defaultTab
      }
    }
  }

}
</script>

<style lang="scss">
  @import './styles/tabs';
</style>
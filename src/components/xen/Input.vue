<template>
  <div class="xen-input-container" v-bind:class="{ 'has-value': inputValue, 'focus': focused, 'has-error-msg': errors.has(name), 'xen-disabled': disabled }">
    <label :class="{ 'xen-color-red': errors.has(name) }" v-if="label">{{label}}</label>
    <div v-if="rules">
      <input ref="input" v-model="inputValue" v-focus="focused" @focus="focused = true" @blur="focused = false" :placeholder="placeholder" :name="name" v-if="type === 'text' || !type" type="text" v-validate :data-rules="rules ? rules : 'required'" :disabled="disabled"/>
      <input ref="input" v-model="inputValue" v-focus="focused" @focus="focused = true" @blur="focused = false" :placeholder="placeholder" :name="name" v-if="type === 'number'" type="number" v-validate :data-rules="rules ? rules : 'required'" :disabled="disabled"/>
      <input ref="input" v-model="inputValue" v-focus="focused" @focus="focused = true" @blur="focused = false" :placeholder="placeholder" :name="name" v-if="type === 'password'" type="password" v-validate :data-rules="rules ? rules : 'required'" :disabled="disabled"/>
    </div>
    <div v-else>
      <input ref="input" v-model="inputValue" v-focus="focused" @focus="focused = true" @blur="focused = false" :placeholder="placeholder" :name="name" v-if="type === 'text' || !type" type="text" :disabled="disabled"/>
      <input ref="input" v-model="inputValue" v-focus="focused" @focus="focused = true" @blur="focused = false" :placeholder="placeholder" :name="name" v-if="type === 'number'" type="number" :disabled="disabled"/>
      <input ref="input" v-model="inputValue" v-focus="focused" @focus="focused = true" @blur="focused = false" :placeholder="placeholder" :name="name" v-if="type === 'password'" type="password" :disabled="disabled"/>
    </div>
    <span v-show="errors.has(name)" class="xen-input-error xen-color-red">{{ errors.first(name) }}</span>
    <div class="xen-input-border" :class="{ 'xen-theme-red': errors.has(name) }" ></div>
  </div>
</template>

<style lang="scss"
>  @import './styles/input';
</style>

<script>
  import { focus } from 'vue-focus'
  import { find, propEq } from 'ramda'
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
      'name',
      'model',
      'placeholder',
      'rules',
      'disabled'
    ],

    // Data
    data () {
      return {
        focused: false,
        inputValue: this.value || ''
      }
    },

    // Mounted
    mounted () {
      // console.log('hey')
      this.$bus.$on('xen-validate', () => {
        setTimeout(() => {
          this.$validator.validateAll()
        }, 0)
      })

      // Watch for errors
      this.$watch(() => this.errors.errors, (newValue, oldValue) => {
        const newErrors = newValue.filter(error =>
          find(propEq('field', error.field))(oldValue) === undefined
        )
        const oldErrors = oldValue.filter(error =>
          find(propEq('field', error.field))(newValue) === undefined
        )
        this.$bus.$emit('errors-changed', newErrors, oldErrors)
      })
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

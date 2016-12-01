<template>
  <div>
    <xen-page-toolbar class="xen-theme-indigo" title="Sign Up"></xen-page-toolbar>
    <div class="xen-page-content xen-page-background">
      <div class="row  space-around"  v-if="$root.user">
        <div class="col-lg-4 col-md-6 col-xs-12">
          <xen-card class="xen-no-margin success-message">
            <xen-card-content>
             <p>You are currently signed in as <strong>{{ $root.user.displayName }}</strong></p>
            </xen-card-content>
          </xen-card>
        </div>
      </div>
      <div class="row space-around">
        <div class="col-lg-4 col-md-6 col-xs-12">
          <xen-card>
            <xen-card-header>
              <h2 class="title">Sign Up</h2>
            </xen-card-header>

            <xen-card-content>
              <form ref="signin" name="signin" class="row">
                <div class="col-xs-12">
                  <!-- fake fields are a workaround for chrome autofill getting the wrong fields -->
                  <input style="display:none" type="text" name="fakeusernameremembered"/>
                  <input style="display:none" type="password" name="fakepasswordremembered"/>
                  <xen-input ref="email" label="Email" name="email" class="xen-color-primary" rules="required|email" :value="email" @input="email = $event"></xen-input>
                  <xen-input ref="password" label="Password" name="password" type="password" class="xen-color-primary" rules="required|min:6" :value="password" @input="password = $event"></xen-input>
                  <xen-input ref="repassword" label="Confirm Password" name="confirm password" type="password" class="xen-color-primary" rules="required|confirmed:password|min:6" :alue="repassword" @input="repassword = $event"></xen-input>
                </div>
              </form>
              <p v-if="errorMsg" class="xen-color-red">{{ errorMsg }}</p>
            </xen-card-content>

            <xen-card-actions class="text-right">
              <xen-button :raised="true" class="xen-theme-primary" @click.native="signUp" :disabled="errors.errors.length > 0">Sign Up</xen-button>
            </xen-card-actions>
          </xen-card>

          <xen-loading-spinner v-if="signingIn" class="xen-color-primary"></xen-loading-spinner>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .success-message {
    background-color: #e8f5e9;
  }
</style>

<script>
  import XenButton from '../xen/Button'
  import XenCard from '../xen/Card'
  import XenCardActions from '../xen/CardActions'
  import XenCardContent from '../xen/CardContent'
  import XenCardHeader from '../xen/CardHeader'
  import XenCardMedia from '../xen/CardMedia'
  import XenDivider from '../xen/Divider'
  import XenInput from '../xen/Input'
  import XenLoadingSpinner from '../xen/LoadingSpinner'
  import XenPageToolbar from '../xen/PageToolbar'

  export default {
    // Name
    name: 'sign-up',

    // Components
    components: {
      XenButton,
      XenCard,
      XenCardActions,
      XenCardContent,
      XenCardHeader,
      XenCardMedia,
      XenDivider,
      XenInput,
      XenLoadingSpinner,
      XenPageToolbar
    },

    // Data
    data () {
      return {
        email: '',
        password: '',
        repassword: '',
        errorMsg: undefined,
        signingIn: false
      }
    },

    // Methods
    methods: {
      // Sign Up with Email / Password
      signUp () {
        console.log('sign up')
        this.$bus.$emit('xen-validate')

        setTimeout(() => {
          if (this.errors.errors.length > 0) {
            return
          } else {
            if (this.password !== this.repassword) {
              this.errorMsg = 'Passwords must match.'
              return
            }
            this.signingIn = true
            this.$firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(() => {
              this.$router.push({ path: 'profile' })
            }).catch((error) => {
              this.errorMsg = error.message
            })
          }
        }, 0)
      }
    },

    // Mounted
    mounted () {
      // Listen on the bus for changers to the child components error bag and merge in/remove errors
      this.$bus.$on('errors-changed', (newErrors, oldErrors) => {
        newErrors.forEach(error => {
          if (!this.errors.has(error.field)) {
            this.errors.add(error.field, error.msg)
          }
        })
        if (oldErrors) {
          oldErrors.forEach(error => {
            this.errors.remove(error.field)
          })
        }
      })
    }

  }
</script>

<template>
  <div>
    <xen-page-toolbar class="xen-theme-indigo" title="Profile"></xen-page-toolbar>
    <div class="xen-page-content xen-page-background">
      <div class="row" v-if="!user">
        <div class="col-xs-12">
          <xen-loading-spinner class="xen-color-primary"></xen-loading-spinner>
        </div>
      </div>
      <div class="row" v-if="user">                

        <div class="col-lg-3 col-md-3 col-xs-12">
          <xen-card>
            <xen-card-content>
              <img class="profile-pic" :src="user.photoURL" v-if="user.photoURL"/>
            </xen-card-content>

            <xen-card-actions class="text-right">
              <xen-button class="xen-color-primary" @click.native="updatePhoto = true">Update Picture</xen-button>
            </xen-card-actions>
          </xen-card>
        </div>

        <div class="col-lg-9 col-md-9 col-xs-12">
          <xen-card>
            <xen-card-content>
              <div class="row">
                <div class="col-xs-12">
                  <xen-input ref="displayname" label="Display Name" name="display" class="xen-color-primary" rules="required" :value="user.displayName" @input="user.displayName = $event" :disabled="!editing"></xen-input>
                  <xen-input ref="email" label="Email" name="email" class="xen-color-primary" rules="required|email" :value="user.email" @input="user.email = $event" :disabled="!editing"></xen-input>
                </div>
              </div>
            </xen-card-content>

            <xen-card-actions class="text-right">
              <xen-button v-if="!editing" class="xen-color-primary" @click.native="editProfile();">Edit</xen-button>
              <xen-button v-if="editing" class="" @click.native="cancelEdit();">Cancel</xen-button>
              <xen-button v-if="editing"class="xen-theme-primary" :raised="true" @click.native="saveEdit();">Save</xen-button>
            </xen-card-actions>
          </xen-card>
        </div>
      </div>
    </div>
    <xen-dialog :show="updatePhoto" @hide="updatePhoto = false" title="Update Profile Photo" :medium="true">
      <div class="row">

        <input v-if="!uploading"  ref="photo" class="col-xs-12" type="file" @change="uploadErrorMessage = undefined"/>
        <xen-loading-spinner v-else class="xen-color-primary col-xs-12"></xen-loading-spinner>
        <p class="xen-color-red col-xs-12" v-if="uploadErrorMessage">{{ uploadErrorMessage }}</p>

      </div>
      <div slot="actions">
        <xen-button class="xen-color-primary" @click.native="updatePhoto = false">Cancel</xen-button>
        <xen-button class="xen-color-primary" @click.native="uploadPhoto()">Confirm</xen-button>
      </div>
    </xen-dialog>
    <xen-toast text="Your profile has been updated." :toggle="successToast" @hide="successToast = false"></xen-toast>
    <xen-toast text="An error occurred, please wait and try again." :toggle="errorToast" @hide="errorToast = false"></xen-toast>
  </div>
</template>

<style scoped>
  .profile-pic {
    width: 100%;
    border-radius: 50%;
    padding: 32px;
    max-width: 250px;
    margin: auto;
    display: block;
  }
</style>

<script>
  import XenPageToolbar from '../xen/PageToolbar'
  import XenButton from '../xen/Button'
  import XenDivider from '../xen/Divider'
  import XenCard from '../xen/Card'
  import XenCardHeader from '../xen/CardHeader'
  import XenCardContent from '../xen/CardContent'
  import XenCardMedia from '../xen/CardMedia'
  import XenCardActions from '../xen/CardActions'
  import XenInput from '../xen/Input'
  import XenToast from '../xen/Toast'
  import XenDialog from '../xen/Dialog'
  import XenLoadingSpinner from '../xen/LoadingSpinner'

  export default {
    name: 'profile',

    components: {
      XenPageToolbar,
      XenButton,
      XenDivider,
      XenCard,
      XenCardHeader,
      XenCardContent,
      XenCardMedia,
      XenCardActions,
      XenInput,
      XenToast,
      XenDialog,
      XenLoadingSpinner
    },

    data () {
      return {
        editing: false,
        successToast: false,
        errorToast: false,
        updatePhoto: false,
        uploading: false,
        uploadErrorMessage: undefined,
        user: this.$root.user || undefined,
        tempUser: {
          displayName: '',
          email: ''
        }
      }
    },

    mounted () {
      this.$bus.$on('user-signin', user => {
        this.user = Object.assign({}, user)
        // console.log(this.user)
      })
    },

    methods: {
      editProfile () {
        this.editing = true
        this.tempUser.displayName = this.user.displayName
        this.tempUser.email = this.user.email
      },

      cancelEdit () {
        this.editing = false
        console.log(this)
        this.$nextTick(() => {
          this.user.writable = true
          this.user.displayName = this.tempUser.displayName
          // this.user.email.writable = true
          this.user.email = this.tempUser.email
        })
      },

      saveEdit () {
        this.editing = false
        let user = Object.assign({}, this.user)
        this.$root.user.updateProfile(user).then(() => {
          this.successToast = true
        }, (error) => {
          console.error(error)
          this.errorToast = true
        })
      },

      /* eslint-disable no-undef, no-unused-vars */
      uploadPhoto (photo) {
        let reader = new FileReader()
        let file = this.$refs.photo.files[0]

        if (!file) {
          this.uploadErrorMessage = 'No File Selected'
          return
        }
        // reader.readAsDataURL(file)

        // Set up references for firebase file upload
        // console.log(this)
        var storageRef = this.$firebase.storage().ref()
        var uploadTask = storageRef.child('images/' + file.name).put(file)
        this.uploading = true
        uploadTask.on('state_changed', function (snapshot) {
          // Observe state change events such as progress, pause, and resume
          // See below for more detail
        }, (error) => {
          console.error(error)
          // Handle unsuccessful uploads
        }, () => {
          // Handle successful uploads on complete
          var downloadURL = uploadTask.snapshot.downloadURL
          this.$nextTick(() => {
            this.user.photoURL = downloadURL
            let user = Object.assign({}, this.user)
            this.$root.user.updateProfile(user)
            this.uploading = false
            this.updatePhoto = false
          })
        })
      }
    }

  }
</script>

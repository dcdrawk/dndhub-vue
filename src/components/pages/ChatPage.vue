<template>
  <div class="xen-page-background">
    <xen-page-toolbar class="xen-theme-indigo" title="Chat"></xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Example">

      <!-- Example Tab -->
      <div slot="Example">
        <section class="xen-chat-example xen-page-background">
          <p class="xen-chat-message" v-for="msg in chatMessages">{{ msg }}</p>


          <div class="xen-chat-box text-right">
          <xen-textarea placeholder="Enter a Message" :value="msg" @input="msg = $event" @keydown.enter.native="send($event)"></xen-textarea>

            <xen-button :raised="true" class="xen-theme-indigo" @click.native="send($event)">Send</xen-button>
          </div>
        </section>
      </div>

      <!-- Template Tab-->
      <div slot="Template">
        <div class="page-tab-content">
        </div>
      </div>

      <!-- Script Tab-->
      <div slot="Script">
        <div class="page-tab-content">

        </div>
      </div>
    </xen-tabs>
  </div>
</template>

<script>
  import XenTabs from '../xen/Tabs'
  import XenCard from '../xen/Card'
  import XenCardHeader from '../xen/CardHeader'
  import XenCardContent from '../xen/CardContent'
  import XenDivider from '../xen/Divider'
  import XenList from '../xen/List'
  import XenListItem from '../xen/ListItem'
  import Prism from 'prismjs'
  import XenPageToolbar from '../xen/PageToolbar'
  import XenTextarea from '../xen/Textarea'
  import XenButton from '../xen/Button'

  export default {

    name: 'dividers-page',

    sockets: {
      connect: function () {
        console.log('socket connected')
      },
      chat_message: function (msg) {
        this.chatMessages.push(msg)
      }
    },

    // Components
    components: {
      XenTabs,
      XenCard,
      XenCardHeader,
      XenCardContent,
      XenDivider,
      XenList,
      XenListItem,
      XenPageToolbar,
      XenTextarea,
      XenButton
    },

    // Data
    data () {
      return {
        msg: 'Hello World!',
        chatMessages: []
      }
    },

    // Mounted
    mounted () {
      Prism.highlightAll()
    },

    methods: {
      send (ev) {
        if (ev.type === 'click') {
          if (this.msg !== undefined && this.msg !== null && this.msg !== '') {
            this.$socket.emit('chat_message', this.msg)
            this.msg = ''
          }
        } else if (ev.type === 'keydown' && !ev.shiftKey) {
          ev.preventDefault()
          if (this.msg !== undefined && this.msg !== null && this.msg !== '') {
            this.$socket.emit('chat_message', this.msg)
            this.msg = ''
          }
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../styles/whiteframe';
  @import '../../styles/variables';

  .xen-chat-example {
    height: calc(100vh - 230px);
    overflow: auto;
  }

  .xen-chat-message {
    padding: 8px 16px;
    margin: 0;
    background-color: #fafafa;
    &:nth-child(even) {
      background-color: #eee;
    }
  }

  .xen-chat-box {
    position: fixed;
    width: calc(100% - 280px);
    bottom: 0;
    padding: 16px;
    background-color: #fff;
    @extend .whiteframe-z3;
    transition: all 375ms $material-easing;

    @media screen and (max-width: 768px) {
      width: 100%;
    }
    .xen-button-container {
      margin: 0;
    }
  }

  .xen-input-container {
    margin-top: 0;
  }
</style>

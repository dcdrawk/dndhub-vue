<template>
  <div>
    <xen-page-toolbar class="xen-theme-blue-grey"title="Cards"></xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="blue-grey" default-tab="Example">
      <div slot="Example">
        <section class="page-tab-content">

          <!-- Default Cards -->
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Default Cards</h2>
            </xen-card-header>
            <xen-card-content>
              <div class="row" ref="default">
                <div class="col-xs-12 col-md-4">
                  <xen-card>
                    <xen-card-header>
                      <h2 class="title">Title</h2>
                      <h3 class="subheading">Subtitle</h3>
                    </xen-card-header>
                    <xen-card-content>
                      <p>Ea his congue ceteros reformidans. Cum in probo mundi dissentias, eum ut omnium vivendo dissentiunt. Vel cu dolores assentior. Ea natum phaedrum erroribus sea. Sea id dicant percipitur assueverit, prima ponderum torquatos ut eam.</p>
                    </xen-card-content>
                  </xen-card>
                </div>

                <div class="col-xs-12 col-md-4">
                  <xen-card>
                    <xen-card-header>
                      <h2 class="title">Title</h2>
                      <h3 class="subheading">Subtitle</h3>
                    </xen-card-header>
                    <xen-card-media>
                      <img src="./../../assets/clouds.jpg">
                    </xen-card-media>
                    <xen-card-content>
                      <p>Ea his congue ceteros reformidans. Cum in probo mundi dissentias, eum ut omnium vivendo dissentiunt. Vel cu dolores assentior. Ea natum phaedrum erroribus sea. Sea id dicant percipitur assueverit, prima ponderum torquatos ut eam.</p>
                    </xen-card-content>
                  </xen-card>
                </div>

                <div class="col-xs-12 col-md-4">
                  <xen-card>
                    <xen-card-media>
                      <img src="./../../assets/clouds.jpg">
                    </xen-card-media>
                    <xen-card-header>
                      <h2 class="title">Title</h2>
                      <h3 class="subheading">Subtitle</h3>
                    </xen-card-header>
                    <xen-card-content>
                      <p>Vim porro commune at, ea sed semper latine. Elitr ignota theophrastus pri ad, ei iudico tamquam nominavi eum, vim ne delenit sapientem. Sea officiis consequat necessitatibus ne. Cu mazim suavitate sea, ei eum porro ponderum maiestatis.</p>
                    </xen-card-content>
                  </xen-card>
                </div>
              </div>
            </xen-card-content>
          </xen-card>
        </section>
      </div>

      <!-- Card Template Tab -->
      <div slot="Template">
        <div class="page-tab-content">          
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Default Cards</h2>
            </xen-card-header>
            <xen-card-content class="xen-no-margin">
              <pre><code class="language-html">{{ defaultCardTemplate }}</code></pre>            
            </xen-card-content>
          </xen-card>
        </div>
      </div>

      <!-- Card Script Tab -->
      <div slot="Script">
        <div class="page-tab-content">          
          <xen-card>
            <xen-card-header background="#eee">
              <h2 class="title">Default Cards</h2>
            </xen-card-header>
            <xen-card-content class="xen-no-margin">
              <pre><code class="language-javaScript">{{ defaultCardScript }}</code></pre>            
            </xen-card-content>
          </xen-card>
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
  import XenCardMedia from '../xen/CardMedia'
  import XenPageToolbar from '../xen/PageToolbar'
  import Prism from 'prismjs'

  export default {

    name: 'cards-page',

    // Components
    components: {
      XenTabs,
      XenCard,
      XenCardHeader,
      XenCardContent,
      XenCardMedia,
      XenPageToolbar
    },

    // Data
    data () {
      return {
        msg: 'Hello World!',
        test: this.$refs.default,
        defaultCardTemplate: `<div class="row" ref="default">
  <div class="col-xs-4">
    <xen-card>
      <xen-card-header>
        <h2 class="title">Title</h2>
        <h3 class="subheading">Subtitle</h3>
      </xen-card-header>
      <xen-card-content>
        <p>Ea his congue ceteros reformidans. Cum in probo mundi dissentias, eum ut omnium vivendo dissentiunt. Vel cu dolores assentior. Ea natum phaedrum erroribus sea. Sea id dicant percipitur assueverit, prima ponderum torquatos ut eam.</p>
      </xen-card-content>
    </xen-card>
  </div>

  <div class="col-xs-4">
    <xen-card>
      <xen-card-header>
        <h2 class="title">Title</h2>
        <h3 class="subheading">Subtitle</h3>
      </xen-card-header>
      <xen-card-media>
        <img src="./../../assets/clouds.jpg">
      </xen-card-media>
      <xen-card-content>
        <p>Ea his congue ceteros reformidans. Cum in probo mundi dissentias, eum ut omnium vivendo dissentiunt. Vel cu dolores assentior. Ea natum phaedrum erroribus sea. Sea id dicant percipitur assueverit, prima ponderum torquatos ut eam.</p>
      </xen-card-content>
    </xen-card>
  </div>

  <div class="col-xs-4">
    <xen-card>
      <xen-card-media>
        <img src="./../../assets/clouds.jpg">
      </xen-card-media>
      <xen-card-header>
        <h2 class="title">Title</h2>
        <h3 class="subheading">Subtitle</h3>
      </xen-card-header>
      <xen-card-content>
        <p>Vim porro commune at, ea sed semper latine. Elitr ignota theophrastus pri ad, ei iudico tamquam nominavi eum, vim ne delenit sapientem. Sea officiis consequat necessitatibus ne. Cu mazim suavitate sea, ei eum porro ponderum maiestatis.</p>
      </xen-card-content>
    </xen-card>
  </div>
</div>`,
        defaultCardScript: `import XenCard from '../xen/Card'
import XenCardHeader from '../xen/CardHeader'
import XenCardContent from '../xen/CardContent'
import XenCardMedia from '../xen/CardMedia'

export default {
  components: {
    XenTabs,
    XenCard,
    XenCardHeader,
    XenCardContent,
    XenCardMedia
  },
}
`
      }
    },

    // Mounted
    mounted () {
      Prism.highlightAll()
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

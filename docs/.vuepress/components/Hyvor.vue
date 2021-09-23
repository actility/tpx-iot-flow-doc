<template>
  <div v-if="this.$site.themeConfig.hyvor">
    <div id='hyvor-talk-view'></div>
  </div>
</template>

<script>

export default {
  name: 'hyvor', // vue component name
  data () {
    return {
      idComment: null
    }
  },
  methods: {
    setVariables() {
      window.HYVOR_TALK_WEBSITE = 4654
      window.HYVOR_TALK_CONFIG = {
        url: false,
        id: false,
      }
    },
    checkScript() {
      if (document.getElementById('ht-embed-script')) {
        this.removeScript('ht-embed-script')
      }
      this.addScript('//talk.hyvor.com/web-api/embed', 'ht-embed-script')
    },
    addScript(src, id) {
      var script = document.createElement('script')
      script.src = src
      script.id = id
      this.idComment = id
      document.body.appendChild(script)
    },
    removeScript(id) {
      var script = document.getElementById(id)
      if (id) {
        script.parentElement.removeChild(script)
      }
    }
  },
  mounted() {
    this.setVariables();
    this.checkScript();
  }
}
</script>



<template>
  <div id="disqus_thread" class="theme-default-content"></div>
</template>
<script>
export default {
  name: 'disqusTag',
  methods: {
    running() {
      var d = document,
          s = d.createElement('script');
      s.src = this.$site.themeConfig.disqus + '.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      return (d.head || d.body).appendChild(s);
    },
  },
  mounted() {
    this.running()
  }
}
</script>
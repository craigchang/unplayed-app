<template>
  <div id="footer">
    <a class="homepage-url" :href="homepageUrl">Craig</a> began maintaining these lists around 2016. <a class="post-url" :href="postUrl">Huh?</a>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Footer',
  data () { 
    return {
      homepageUrl: 'http://craigchang.me/',
      postUrl: 'http://shauninman.com/archive/2011/04/18/unplayed'
    }
  },
  created () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

div, a {
  font-size: 0.750rem;
}

</style>

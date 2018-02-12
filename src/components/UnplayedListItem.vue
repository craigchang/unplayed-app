<template>
  <li v-if="item.link !== ''">
    <a :href="item.link">{{item.gameTitle}}</a>
    <span>{{item.consoleName}}</span>
    <span>{{item.comment}}</span>
  </li>
  <li v-else>
    {{item.gameTitle}}
    <span>{{item.consoleName}}</span>
    <span>{{item.comment}}</span>
  </li>
</template>

<script>
export default {
  name: 'UnplayedListItem',
  data () {
    return {}
  },
  created () {
  },
  props: ['item']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

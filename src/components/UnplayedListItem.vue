<template>
  <li :class="{highlight: isHighlight}">
    <div class="d-flex justify-content-between align-items-center">
      <a :href="item.link !== '' ? item.link : '#'">{{item.gameTitle}}</a>
      <span class="badge badge-pill" :class="'badge-' + item.colorStyle">{{item.consoleName}}</span>
    </div>
    <small v-if="item.comment">{{item.comment}}</small>
  </li>
</template>

<script>
/* eslint-disable */
export default {
  name: 'UnplayedListItem',
  data () {
    return {
      isHighlight: false
    }
  },
  created () {
  },
  props: ['item']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* bootstrap css */ 
.badge {
  font-size: 70%;
}

small {
  color: #999;
}

.list-group-item-action {
  color: #333;
}


li.highlight {
  background-color: #cccccc;
}

</style>

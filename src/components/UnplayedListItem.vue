<template>
  <li>
    <div class="d-flex justify-content-between align-items-center">
      <a :href="itemLink">{{gameTitle}}</a>
      <span :class="classes">{{consoleName}}</span>
    </div>
    <small v-if="comment">{{comment}}</small>
  </li>
</template>

<script>
/* eslint-disable */
export default {
  name: 'UnplayedListItem',
  props: ['gameTitle', 'link', 'consoleName', 'comment', 'colorStyle'],
  computed: {
    classes: function() {
      return [
        'badge',
        'badge-pill',
        'badge-' + this.colorStyle
      ];
    },
    itemLink: function() {
      return this.link !== '' ? this.link : '#';
    }
  }
}
</script>

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

</style>

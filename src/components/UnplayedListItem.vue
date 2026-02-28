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
  props: ['gameTitle', 'link', 'consoleName', 'comment', 'colorStyle', 'consoleList'],
  computed: {
    resolvedColorStyle: function() {
      if (this.consoleList && this.consoleList.length > 0) {
        const found = this.consoleList.find(c => c.consoleName === this.consoleName);
        if (found) return found.colorStyle;
      }
      return this.colorStyle || 'secondary';
    },
    classes: function() {
      return [
        'badge',
        'badge-pill',
        'badge-' + this.resolvedColorStyle
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
  font-size: .625rem;
}
small {
  color: #999;
}
.list-group-item-action {
  color: #333;
}

/* scoped */
a, span {
  font-size: 0.750rem;
}
small {
  font-size: 0.625rem;
}
.list-group-item-action {
  padding: .5rem 1rem;
}

</style>

/* eslint-disable */
<template>
  <button
    type="button"
    :class="classes"
    @click.stop="$emit('filterButtonClick', $event, consoleName, colorStyle, index, !isSelected)">
    {{consoleName}}
    <span class="badge badge-light">{{count}}</span>
    <span class="sr-only">count</span>
  </button>
</template>

<script>

export default {
/* eslint-disable */
  name: 'FilterButton',
  props: ['consoleName', 'count', 'colorStyle', 'index', 'isSelected'],
  computed: {
    classes: function() {
      return [
        'select-btn', 
        'btn', 
        'btn-' + this.colorStyle, 
        {selected: this.isSelected}
      ];
    }
  }
}

</script>

<style scoped>

button {
  font-size: .750rem;
}

button.selected {
  /*border: 1px solid black;*/
}

</style>
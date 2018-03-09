/* eslint-disable */
<template>
  <button
    type="button"
    :class="classes"
    @click.stop="clickEvent($event, consoleName, colorStyle, index)">
    {{consoleName}}
    <span class="badge badge-light">{{count}}</span>
    <span class="sr-only">count</span>
  </button>
</template>

<script>

export default {
/* eslint-disable */
  name: 'FilterButton',
  data () { 
    return {
      isSelected: false
    }
  },
  props: ['consoleName', 'count', 'colorStyle', 'index', 'isSelected'],
  methods: {
    clickEvent: function(event, consoleName, colorStyle, index) {
      this.isSelected = !this.isSelected;
      this.$emit('filterButtonClick', event, consoleName, colorStyle, index, this.isSelected);
    }
  },
  computed: {
    classes: function() {
      return [
        'select-btn', 
        'btn', 
        'btn-' + this.colorStyle, 
        {selected: this.isSelected}
      ];
    }
  },
  created () {
    if (this.$parent) {
      this.$parent.$on('Main:removeFilterByConsole', (consoleName) => {
        if(this.consoleName === consoleName)
          this.isSelected = false;
      });
      this.$parent.$on('Main:showAll', () => {
        this.isSelected = false;
      });
    }
  }
}

</script>

<style scoped>

button.selected {
  border: 3px solid black;
}

</style>
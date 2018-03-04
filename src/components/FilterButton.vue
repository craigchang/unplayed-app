/* eslint-disable */
<template>
  <button
    type="button"
    :class="classes"
    @click.stop="clickEvent($event, consoleName)"
    >
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
  props: ['consoleName', 'count', 'colorStyle'],
  methods: {
    clickEvent: function(event, consoleName) {
      this.isSelected = !this.isSelected;
      if (this.isSelected) {
        this.$emit('filterButtonClick', event, consoleName, true);
      } else {
        this.$emit('filterButtonClick', event, consoleName, false);
      }
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
    //console.log(this);
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
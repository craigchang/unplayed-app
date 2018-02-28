<template>
  <div>
    <div class="jumbotron">
      <div style="margin: 0 auto; max-width: 1200px;">
        <button @click="showAll" class="btn btn-primary">Show All</button>
        <FilterButton
          v-for="(obj, console) in unplayedConsoleList"
          :key="console"
          :color-style="obj.colorStyle"
          :count="obj.count"
          :console-name="console"
          @filterButtonClick="filterButtonClick"
        />
      </div>
    </div>
    <div class="jumbotron" style="background-color: white;margin: 0 auto; max-width: 1200px;">
      <button
        v-for="(obj) in unplayedFilteredList"
        :key="obj.console"
        type="button"
        :class="' btn btn-' + obj.colorStyle"
        @click.stop="removeFilterByConsole($event, obj.console)">
          <span aria-hidden="true">&times;</span>
          {{obj.console}}
      </button>
    </div>
    <div class="row">
      <UnplayedList
        list-title="Unplayed"
        :file-name="unplayedFile"
        :console-list="unplayedConsoleList"
        :color-list="colorList"
        @refreshConsoleListComponent="refreshConsoleListComponent"/>
      <UnplayedList
        list-title="Unbeaten"
        :file-name="unbeatenFile"
        :console-list="unplayedConsoleList"
        :color-list="colorList"
        @refreshConsoleListComponent="refreshConsoleListComponent"/>
      <UnplayedList
        list-title="Beaten"
        :file-name="beatenFile"
        :console-list="unplayedConsoleList"
        :color-list="colorList"
        @refreshConsoleListComponent="refreshConsoleListComponent"/>
      <UnplayedList
        list-title="Abandoned"
        :file-name="abandonedFile"
        :console-list="unplayedConsoleList"
        :color-list="colorList"
        @refreshConsoleListComponent="refreshConsoleListComponent"/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import unplayed_md from '../../unplayed-lists/unplayed.markdown'
import unbeaten_md from '../../unplayed-lists/unbeaten.markdown'
import beaten_md from '../../unplayed-lists/beaten.markdown'
import abandoned_md from '../../unplayed-lists/abandoned.markdown'
import UnplayedList from './UnplayedList'
import FilterButton from './FilterButton'

export default {
  name: 'Main',
  components: {
    UnplayedList,
    FilterButton
  },
  data () {
    return {
      colorList: ['unique', 'pink', 'purple', 'deep-purple', 'indigo', 'light-blue', 'cyan', 'dark-green', 'light-green', 'yellow', 'amber', 'deep-orange', 'brown', 'blue-grey', 'mdb-color'],
      buttonStylesList: new Object(),
      unplayedConsoleList: new Object(),
      unplayedFilteredList: [],
      unplayedFilteredConsoleArray: [],
      unplayedFile: unplayed_md,
      unbeatenFile: unbeaten_md,
      beatenFile: beaten_md,
      abandonedFile: abandoned_md
    }
  },
  methods: {
    addFilterByConsoleButton: function(consoleName) {
      this.unplayedFilteredList.push({
        console: consoleName,
        colorStyle: this.unplayedConsoleList[consoleName].colorStyle
      })
      this.unplayedFilteredConsoleArray.push(consoleName);
    },
    removeFilterByConsoleButton: function (consoleName) {
      var found = this.unplayedFilteredList.map((obj) => obj.console).indexOf(consoleName);
      this.unplayedFilteredList.splice(found, 1);
      this.unplayedFilteredConsoleArray.splice(found, 1);
    },
    refreshConsoleListComponent: function(value) {
      this.$forceUpdate();
    },
    filterButtonClick: function(event, consoleName, isSelected) {
      if (isSelected) {
        this.addFilterByConsoleButton(consoleName);
      } else {
        this.removeFilterByConsoleButton(consoleName);
      }
      this.$emit('Main:filterByConsole', event, this.unplayedFilteredConsoleArray);
    },
    removeFilterByConsole: function(event, consoleName) {
      this.$emit('Main:removeFilterByConsole', consoleName);
      this.removeFilterByConsoleButton(consoleName);
    },
    showAll: function(event) {
      this.$emit('Main:showAll');
      this.unplayedFilteredList = [];
      this.unplayedFilteredConsoleArray = [];
    }
  },
  created () {

  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.jumbotron {
  padding: 1rem;
  margin-bottom: 0;
}
.jumbotron button {
  margin-right: 1rem;
  margin-bottom: 0.5rem;
}
.selected {
  border: 3px solid black;
}
</style>

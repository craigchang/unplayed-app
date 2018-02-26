<template>
  <div>
    <div class="jumbotron">
      <div style="margin: 0 auto; max-width: 1200px;">
        <button @click="showAll" class="btn btn-primary">Show All</button>
        <button 
          v-for="(obj, console) in unplayedConsoleList" 
          type="button"
          :class="'select-btn btn btn-' + obj.colorStyle"
          @click.stop="filterByConsole($event, console)"
          :console="console" 
          :id="console"
          >
          {{console}}
          <span class="badge badge-light">{{obj.count}}</span>
          <span class="sr-only">count</span>
        </button>
      </div>
    </div>
    <div class="jumbotron" style="background-color: white;margin: 0 auto; max-width: 1200px;">
      <button 
          v-for="(obj, console) in unplayedFilteredList"
          type="button"
          :class="' btn btn-' + obj.colorStyle"
          @click.stop="unfilterByConsole($event, obj.console)"
          >
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

export default {
  name: 'Main',
  components: {
    UnplayedList
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      colorList: ['unique', 'pink', 'purple', 'deep-purple', 'indigo', 'light-blue', 'cyan', 'dark-green', 'light-green', 'yellow', 'amber', 'deep-orange', 'brown', 'blue-grey', 'mdb-color'],
      buttonStylesList: new Object(),
      unplayedConsoleList: new Object(),
      unplayedFilteredList: [],
      unplayedFilteredConsoleList: [],
      unplayedFile: unplayed_md,
      unbeatenFile: unbeaten_md,
      beatenFile: beaten_md,
      abandonedFile: abandoned_md
    }
  },
  methods: {
    refreshConsoleListComponent: function(value) {
      this.$forceUpdate();
    },
    filterByConsole: function(event, consoleName) {
      let element = event.currentTarget;

      if (!element.classList.contains('selected')) {
        element.classList.add('selected');
        this.unplayedFilteredList.push({
          console: element.id,
          colorStyle: this.unplayedConsoleList[element.id].colorStyle
        });
        this.unplayedFilteredConsoleList.push(consoleName);
      } else {
        element.classList.remove('selected');
        var found = this.unplayedFilteredList.map((obj) => obj.console).indexOf(consoleName);
        this.unplayedFilteredList.splice(found, 1);
        this.unplayedFilteredConsoleList.splice(found, 1);
      }
      
      this.$emit('filterByConsole', event, this.unplayedFilteredConsoleList);
    },
    unfilterByConsole: function(event, consoleName) {
      let selectedEl = document.getElementById(consoleName);
      selectedEl.classList.remove('selected');

      var found = this.unplayedFilteredList.map((obj) => obj.console).indexOf(consoleName);
      this.unplayedFilteredList.splice(found, 1);
      this.unplayedFilteredConsoleList.splice(found, 1);
    },
    showAll: function(event) {
      let buttons = document.getElementsByClassName('select-btn');
      for(let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('selected');
      }

      this.$emit('showAll');
      this.unplayedFilteredList = [];
      this.unplayedFilteredConsoleList = [];
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

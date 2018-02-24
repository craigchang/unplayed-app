<template>
  <div>
    <div class="jumbotron">
      <button v-for="(obj, console) in unplayedConsoleList" :console="console" type="button" :class="'btn btn-' + obj.style">{{console}}
        <span class="badge badge-light">{{obj.count}}</span>
        <span class="sr-only">unread messages</span>
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
      colorList: ['elegent', 'unique', 'pink', 'purple', 'deep-purple', 'indigo', 'light-blue', 'cyan', 'dark-green', 'light-green', 'yellow', 'amber', 'deep-orange', 'brown', 'blue-grey', 'mdb-color'],
      buttonStylesList: new Object(),
      unplayedConsoleList: new Object(),
      unplayedFile: unplayed_md,
      unbeatenFile: unbeaten_md,
      beatenFile: beaten_md,
      abandonedFile: abandoned_md
    }
  },
  methods: {
    refreshConsoleListComponent: function(value) {
      console.log('list done rendering', value)
      this.$forceUpdate();
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
</style>

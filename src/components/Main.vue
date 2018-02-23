<template>
  <div>
    <div class="jumbotron">
      <button v-for="(count, console) in unplayedConsoleList" :console="console" :count="count" type="button" class="btn btn-primary">{{console}}
        <span class="badge badge-light">{{count}}</span>
        <span class="sr-only">unread messages</span>
      </button>
    </div>
    <div class="row">
      <UnplayedList 
        list-title="Unplayed"
        :file-name="unplayedFile"
        :console-list="unplayedConsoleList"
        @refreshConsoleListComponent="refreshConsoleListComponent"/>
      <UnplayedList 
        list-title="Unbeaten" 
        :file-name="unbeatenFile" 
        :console-list="unplayedConsoleList"
        @refreshConsoleListComponent="refreshConsoleListComponent"/>
      <UnplayedList 
        list-title="Beaten" 
        :file-name="beatenFile" 
        :console-list="unplayedConsoleList"
        @refreshConsoleListComponent="refreshConsoleListComponent"/>
      <UnplayedList 
        list-title="Abandoned"
        :file-name="abandonedFile"
        :console-list="unplayedConsoleList"
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

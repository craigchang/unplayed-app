<template>
  <div class="row">
    <UnplayedList list-title="Unplayed" :file-name="unplayedFile" :console-set="unplayedConsoleSet"/>
    <UnplayedList list-title="Unbeaten" :file-name="unbeatenFile" :console-set="unplayedConsoleSet"/>
    <UnplayedList list-title="Beaten" :file-name="beatenFile" :console-set="unplayedConsoleSet"/>
    <UnplayedList list-title="Abandoned" :file-name="abandonedFile" :console-set="unplayedConsoleSet"/>
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
      unplayedConsoleSet: new Set(),
      unplayedFile: unplayed_md,
      unbeatenFile: unbeaten_md,
      beatenFile: beaten_md,
      abandonedFile: abandoned_md
    }
  },
  created () {
  },
  mounted () {
    console.log(this.unplayedConsoleSet);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

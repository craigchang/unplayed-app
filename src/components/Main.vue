<template>
  <div>
    <UnplayedList list-title="Unplayed" :file-name="unplayedFile"/>
    <UnplayedList list-title="Unbeaten" :file-name="unbeatenFile"/>
    <UnplayedList list-title="Beaten" :file-name="beatenFile"/>
    <UnplayedList list-title="Abandoned" :file-name="abandonedFile"/>
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
      unplayedFile: unplayed_md,
      unbeatenFile: unbeaten_md,
      beatenFile: beaten_md,
      abandonedFile: abandoned_md
    }
  },
  created () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

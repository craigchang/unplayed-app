<template>
  <div class="col-lg-3">
    <h1>{{listTitle}}</h1>
    <p>{{listDescription}}</p>
    <ul class="list-group">
      <!-- <UnplayedListItem v-for="(item, key) in unplayedList" :item="item" :key="item.id"></UnplayedListItem> -->
      <UnplayedListItem class="list-group-item list-group-item-action flex-column align-items-start" v-for="(item, key) in unplayedList" :item="item" :item-key="key"></UnplayedListItem>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
import showdown from 'showdown'
import $ from 'jquery'
import UnplayedListItem from '@/components/UnplayedListItem'
import UnplayedListParser from '@/helpers/unplayed-list-parser'

export default {
  name: 'UnplayedList',
  components: {
    UnplayedListItem
  },
  props: ['listTitle', 'fileName'],
  data () {
    return {
      listDescription: '',
      unplayedList: []
    }
  },
  created () {
    fetch(this.fileName)
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.text();
      })
      .then(text => {
        let parsedHtmlArray = UnplayedListParser.convertMarkdownToHtmlDom(text);
        for(var i = 0; i < parsedHtmlArray.length; i++) {
          if (parsedHtmlArray[i].tagName === 'P') {
            this.listDescription = parsedHtmlArray[i].outerText;
          }
          if (parsedHtmlArray[i].tagName === 'UL') {
            this.unplayedList = UnplayedListParser.parseListUl(parsedHtmlArray[i]);
          }
        }

      }).catch(e => {
        console.log(e);
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1
{
  margin: 0 0 16px;
  padding: 1rem 0 1rem 1.25rem;
  padding-left: 1.25rem;
  border-bottom: 4px solid #333;
}

p
{
  padding-left: 1.25rem;
  margin: 0 0 16px;
}

</style>

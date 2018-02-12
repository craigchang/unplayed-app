<template>
  <div class="list">
    <h1>{{listTitle}}</h1>
    <p>{{listDescription}}</p>
    <ul>
      <!-- <UnplayedListItem v-for="(item, key) in unplayedList" :item="item" :key="item.id"></UnplayedListItem> -->
      <UnplayedListItem v-for="(item, key) in unplayedList" :item="item" :key="key"></UnplayedListItem>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
import showdown from 'showdown'
import $ from 'jquery'
import UnplayedListItem from './UnplayedListItem'

export default {
  name: 'UnplayedList',
  components: {
    UnplayedListItem
  },
  props: ['listTitle', 'fileName'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
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
        let converter = new showdown.Converter();
        let html = converter.makeHtml(text);
        html = html.replace(/\(/g, '<span>').replace(/\)/g, '</span>');
        let parsedHtmlArray = $.parseHTML(html);
        for(var i = 0; i < parsedHtmlArray.length; i++) {
          if (parsedHtmlArray[i].tagName === 'P') {
            this.listDescription = parsedHtmlArray[i].outerText;
          }

          if (parsedHtmlArray[i].tagName === 'UL') {
            this.unplayedList = this.getListArray(parsedHtmlArray[i]);
          }
        }
      }).catch(e => {
        console.log(e)
      })
  },
  methods: {
    getListArray: (listUl) => {
      let gamesLiElements = Array.from(listUl.getElementsByTagName('li'));
      let listObj = [];

      gamesLiElements.forEach((element) => {        
        let link = '';
        if (element.getElementsByTagName('a').length > 0)
          link = element.getElementsByTagName('a')[0].getAttribute('href');

        let gameTitle = '';
        if (element.getElementsByTagName('a').length > 0)
          gameTitle = element.getElementsByTagName('a')[0].innerText;
        else
          gameTitle = element.innerText;

        let consoleName = '';
        if (element.getElementsByTagName('span').length > 0)
          consoleName = element.getElementsByTagName('span')[0].innerText;

        let comment = '';
        if (element.getElementsByTagName('span').length > 1)
          comment = element.getElementsByTagName('span')[1].innerText;

        listObj.push({
          link,
          gameTitle,
          consoleName,
          comment
        });
      });

      return listObj
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

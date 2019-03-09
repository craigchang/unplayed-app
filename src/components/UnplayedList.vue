<template>
  <div class="col-lg-3">
    <h1>{{listTitle}}</h1>
    <p>{{listDescription}}</p>
    <!-- <div class="form-group">
      <input type="text" aria-describedby="searchByName" placeholder="Search by Name" class="form-control search-by-name-input" v-model="searchByNameInput">
    </div> -->
    <div class="sort-by-container">
      <span>Sort by: </span>
      <div class="sort-by-criteria-container">
        <span>
          <a href="#name" @click.prevent="sortByName">Name<span :class="sortByNameClasses" :title="sortByNameClass"></span>
          </a>
        </span>
        <span>
          <a href="#console" @click.prevent="sortByConsole">Console<span :class="sortByConsoleClasses" :title="sortByConsoleClass"></span>
          </a>
        </span>
      </div>
    </div>
    <ul class="list-group">
      <UnplayedListItem
        class="list-group-item list-group-item-action flex-column align-items-start"
        v-for="(obj, key) in filteredUnplayedList"
        :key="key"
        :game-title="obj.gameTitle"
        :link="obj.link"
        :console-name="obj.consoleName"
        :comment="obj.comment"
        :color-style="obj.colorStyle"/>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
import showdown from 'showdown'
import $ from 'jquery'
import UnplayedListItem from '@/components/UnplayedListItem'
import UtilityComponent from '@/components/UtilityComponent'

export default {
  name: 'UnplayedList',
  extends: UtilityComponent,
  components: {
    UnplayedListItem
  },
  props: ['listTitle', 'fileName', 'consoleList', 'colorList', 'filterByConsoleArray', 'searchByNameInput'],
  data () {
    return {
      listDescription: '',
      unplayedList: [],
      sortByConsoleClass: '',
      sortByNameClass: '',
      searchByNameInput: ''
    }
  },
  methods: {
    convertMarkdownToHtmlDom: function(text) {
      let html = (new showdown.Converter()).makeHtml(text);
      html = html.replace(/\(/g, '<span>').replace(/\)/g, '</span>');
      return $.parseHTML(html);
    },
    parseLink: function(element) {
      if (element.getElementsByTagName('a').length > 0)
        return element.getElementsByTagName('a')[0].getAttribute('href');
      return '';
    },
    parseGameTitle: function(element) {
      if (element.getElementsByTagName('a').length > 0)
        return element.getElementsByTagName('a')[0].innerText;
      else
        return element.childNodes[0].textContent.trim(); // For now assume game title is always the first line
    },
    parseConsoleName: function(element) {
      if (element.getElementsByTagName('span').length > 0)
        return element.getElementsByTagName('span')[0].innerText;
      return '';
    },
    parseComment: function(element) {
      if (element.getElementsByTagName('span').length > 1)
        return element.getElementsByTagName('span')[1].innerText;
      return '';
    },
    parseListUl: function(listUl) {
      let gamesLiElements = Array.from(listUl.getElementsByTagName('li'));
      let listObj = [];
      let randomIndex = 0;
      let colorStyle = '';

      gamesLiElements.forEach((element) => {
        let link = this.parseLink(element);
        let gameTitle = this.parseGameTitle(element);
        let consoleName = this.parseConsoleName(element);
        let comment = this.parseComment(element);

        let foundConsoleIndex = this.consoleList.findIndex(obj => obj.consoleName == consoleName);
        if ( foundConsoleIndex === -1 ) {
          randomIndex = Math.floor(Math.random() * this.colorList.length);
          colorStyle = this.colorList[randomIndex];
          this.consoleList.push({
            consoleName,
            'count': 1,
            colorStyle,
            'isSelected': false
          });
          this.colorList.splice(randomIndex, 1);
        } else {
          this.consoleList[foundConsoleIndex].count++;
          colorStyle = this.consoleList[foundConsoleIndex].colorStyle;
        }

        listObj.push({
          link,
          gameTitle,
          consoleName,
          comment,
          colorStyle
        });
      });

      return listObj;
    },
    sortByConsole: function(event) {
      this.sortByNameClass = ''; // reset name
      if (this.sortByConsoleClass === '' || this.sortByConsoleClass === 'descending') {
        this.sortByConsoleClass = 'ascending';
        this.sortAscByCategory('consoleName', this.unplayedList);
      } else {
        this.sortByConsoleClass = 'descending';
        this.sortDescByCategory('consoleName', this.unplayedList);
      }
    },
    sortByName: function(event) {
      this.sortByConsoleClass = ''; // reset console
      if (this.sortByNameClass === '' || this.sortByNameClass === 'descending') {
        this.sortByNameClass = 'ascending';
        this.sortAscByCategory('gameTitle', this.unplayedList);
      } else {
        this.sortByNameClass = 'descending';
        this.sortDescByCategory('gameTitle', this.unplayedList);
      }
    }
  },
  computed: {
    filteredUnplayedList: function() {
      let filteredResults = this.unplayedList;
      if (this.filterByConsoleArray.length > 0) {
        filteredResults = this.unplayedList.filter((obj) => {
          return this.filterByConsoleArray.includes(obj.consoleName);
        });
      }
      
      filteredResults = filteredResults.filter((obj) => {
        return obj.gameTitle.toUpperCase().indexOf(this.searchByNameInput.toUpperCase()) !== -1;
      });

      return filteredResults;
    },
    sortByNameClasses: function() {
      return [
        'sort-by-name-btn',
        'list-sort oi',
        'oi-sort-' + this.sortByNameClass
      ];
    },
    sortByConsoleClasses: function() {
      return [
        'sort-by-console-btn',
        'list-sort oi',
        'oi-sort-' + this.sortByConsoleClass
      ];
    }
  },
  created () {
    console.log(this.fileName)
    fetch(this.fileName)
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.text();
      })
      .then(text => {
        let parsedHtmlArray = this.convertMarkdownToHtmlDom(text);
        for(var i = 0; i < parsedHtmlArray.length; i++) {
          if (parsedHtmlArray[i].tagName === 'P') {
            this.listDescription = parsedHtmlArray[i].outerText;
          }
          if (parsedHtmlArray[i].tagName === 'UL') {
            this.unplayedList = this.parseListUl(parsedHtmlArray[i]);
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
  padding: 0.5rem 0 0.5rem 0.750rem;
  padding-left: 1rem;
  border-bottom: 4px solid #333;
  font-size: 1.5rem;
}

p, span {
  font-size: 0.75rem;
}

p
{
  padding-left: 1rem;
  margin: 0 0 16px;
}

input.search-by-name-input {
  padding: .375rem 1rem; 
  font-size: 0.8125rem;
}

span.list-sort {
  font-size: 1.5rem;
}

div.sort-by-container {
  padding: 0 1rem;
  margin-bottom: 0;
  margin: 0 0 10px;
  border-bottom: 1px solid #333;
}

div.sort-by-criteria-container {
  float: right;
}

div.sort-by-criteria-container > span {
  margin-left: 0.5rem;
}

div.sort-by-criteria-container span.oi {
  font-size: 0.7rem;
}

</style>

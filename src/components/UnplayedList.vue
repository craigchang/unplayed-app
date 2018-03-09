<template>
  <div class="col-lg-3">
    <h1>{{listTitle}}</h1>
    <p>{{listDescription}}</p>
    <div class="form-group">
      <input type="text" aria-describedby="searchByName" placeholder="Search by Name" class="form-control" v-model="searchByNameInput" style="padding: .375rem 1.25rem; font-size: 0.8125rem;">
    </div>
    <div class="sort-by-container">
      <span>Sort by: </span>
      <div class="sort-by-criteria-container">
        <span>
          <a class="sort-by-name-btn" href="#name" @click.prevent="sortByName">Name<span class="list-sort oi" :class="'oi-sort-' + [sortByNameClass]" :title="sortByNameClass"></span>
          </a>
        </span>
        <span>
          <a class="sort-by-console-btn" href="#console" @click.prevent="sortByConsole">Console<span class="list-sort oi" :class="'oi-sort-' + [sortByConsoleClass]" :title="sortByConsoleClass"></span>
          </a>
        </span>
      </div>
    </div>
    <ul class="list-group">
      <UnplayedListItem
        class="list-group-item list-group-item-action flex-column align-items-start"
        v-for="(item, key) in filteredUnplayedList"
        :key="key"
        :item="item"
        :item-key="key"/>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
import showdown from 'showdown'
import $ from 'jquery'
import UnplayedListItem from '@/components/UnplayedListItem'
import Utility from '@/helpers/utility'

export default {
  name: 'UnplayedList',
  components: {
    UnplayedListItem
  },
  props: ['listTitle', 'fileName', 'consoleList', 'consoleListTwo', 'colorList'],
  data () {
    return {
      listDescription: '',
      unplayedList: [],
      sortByConsoleClass: '',
      sortByNameClass: '',
      searchByNameInput: '',
      filterByConsoleArray: ''
    }
  },
  methods: {
    convertMarkdownToHtmlDom: function(text) {
      let html = (new showdown.Converter()).makeHtml(text);
      html = html.replace(/\(/g, '<span>').replace(/\)/g, '</span>');
      return $.parseHTML(html);
    },
    parseListUl: function(listUl) {
      let gamesLiElements = Array.from(listUl.getElementsByTagName('li'));
      let listObj = [];
      let randomIndex = 0;
      let colorStyle = '';
      let consoleSet = new Set();

      gamesLiElements.forEach((element) => {
        // get link
        let link = '';
        if (element.getElementsByTagName('a').length > 0)
          link = element.getElementsByTagName('a')[0].getAttribute('href');

        // get game title
        let gameTitle = '';
        if (element.getElementsByTagName('a').length > 0)
          gameTitle = element.getElementsByTagName('a')[0].innerText;
        else
          gameTitle = element.childNodes[0].textContent.trim(); // For now assume game title is always the first line

        // get console name
        let consoleName = '';
        if (element.getElementsByTagName('span').length > 0)
          consoleName = element.getElementsByTagName('span')[0].innerText;

        // get comment (if any)
        let comment = '';
        if (element.getElementsByTagName('span').length > 1)
          comment = element.getElementsByTagName('span')[1].innerText;

        // apply unique color for each console
        // if (!this.consoleList[consoleName]) {
        //   randomIndex = Math.floor(Math.random() * this.colorList.length);
        //   colorStyle = this.colorList[randomIndex];
        //   this.consoleList[consoleName] = { 'count': 1, 'colorStyle': colorStyle };
        //   //this.colorList.splice(randomIndex, 1);
        // } else {
        //   this.consoleList[consoleName].count++;
        //   colorStyle = this.consoleList[consoleName].colorStyle;
        // }

        let ind = this.consoleListTwo.findIndex(obj => obj.consoleName == consoleName);

        if ( ind === -1 ) {
          randomIndex = Math.floor(Math.random() * this.colorList.length);
          colorStyle = this.colorList[randomIndex];
          this.consoleList[consoleName] = { 'count': 1, 'colorStyle': colorStyle };

          //colorStyle = this.colorList[randomIndex];
          this.consoleListTwo.push({
            consoleName,
            'count': 1,
            colorStyle,
            'isSelected': false
          });
          this.colorList.splice(randomIndex, 1);
        } else {
          this.consoleList[consoleName].count++;
          colorStyle = this.consoleList[consoleName].colorStyle;

          let foundIndex = this.consoleListTwo.findIndex((obj) => {
            return obj.consoleName == consoleName;
          });
          if (foundIndex !== -1) {
            this.consoleListTwo[foundIndex].count++;
            colorStyle = this.consoleListTwo[foundIndex].colorStyle;
          }
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
        Utility.sortAscByCategory('consoleName', this.unplayedList);
      } else {
        this.sortByConsoleClass = 'descending';
        Utility.sortDescByCategory('consoleName', this.unplayedList);
      }
    },
    sortByName: function(event) {
      this.sortByConsoleClass = ''; // reset console
      if (this.sortByNameClass === '' || this.sortByNameClass === 'descending') {
        this.sortByNameClass = 'ascending';
        Utility.sortAscByCategory('gameTitle', this.unplayedList);
      } else {
        this.sortByNameClass = 'descending';
        Utility.sortDescByCategory('gameTitle', this.unplayedList);
      }
    },
    search: function(nameKey, myArray) {
      for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
          return myArray[i];
        }
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
        let parsedHtmlArray = this.convertMarkdownToHtmlDom(text);
        for(var i = 0; i < parsedHtmlArray.length; i++) {
          if (parsedHtmlArray[i].tagName === 'P') {
            this.listDescription = parsedHtmlArray[i].outerText;
          }
          if (parsedHtmlArray[i].tagName === 'UL') {
            this.unplayedList = this.parseListUl(parsedHtmlArray[i]);
          }
        }

        this.$emit('refreshConsoleListComponent', this.listTitle)
      }).catch(e => {
        console.log(e);
      })

    this.$parent.$on('Main:filterByConsole', (event, filteredConsoleArray) => {
      this.filterByConsoleArray = filteredConsoleArray;
    });
    this.$parent.$on('Main:showAll', () => {
      this.filterByConsoleArray = '';
    });
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
  font-size: 2rem;
}

p
{
  padding-left: 1.25rem;
  margin: 0 0 16px;
}

span.list-sort {
  font-size: 1.5rem;
}

div.sort-by-container {
  padding: 0 1.25rem;
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

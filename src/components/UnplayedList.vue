<template>
  <div class="col-lg-3">
    <h1>{{listTitle}}</h1>
    <p>{{listDescription}}</p>
    <div class="form-group">
      <input type="text" aria-describedby="searchByName" placeholder="Search by name" class="form-control" v-model="searchByNameInput" style="padding: .375rem 1.25rem; font-size: 0.8125rem;">
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
      <!-- <UnplayedListItem v-for="(item, key) in unplayedList" :item="item" :key="item.id"></UnplayedListItem> -->
      <UnplayedListItem class="list-group-item list-group-item-action flex-column align-items-start" v-for="(item, key) in filteredUnplayedList" :item="item" :item-key="key"></UnplayedListItem>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
import showdown from 'showdown'
import $ from 'jquery'
import UnplayedListItem from '@/components/UnplayedListItem'
import UnplayedListParser from '@/helpers/unplayed-list-parser'
import Utility from '@/helpers/utility'

export default {
  name: 'UnplayedList',
  components: {
    UnplayedListItem
  },
  props: ['listTitle', 'fileName', 'consoleList'],
  data () {
    return {
      listDescription: '',
      unplayedList: [],
      unplayedListOriginal: '',
      sortByConsoleClass: '',
      sortByNameClass: '',
      searchByNameInput: ''
    }
  },
  methods: {
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
      return this.unplayedList.filter((obj) => {
        return obj.gameTitle.toUpperCase().indexOf(this.searchByNameInput.toUpperCase()) !== -1;
      });
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
            this.unplayedListOriginal = this.unplayedList;
          }
        }

        // for(let obj of this.unplayedList) {
        //   if (!this.consoleList.includes(obj.consoleName))
        //     this.consoleList.push({console: obj.consoleName, count: 1});
        //   else
        //     this.consoleList['console'] .push({console: obj.consoleName, count: 1});
        // }

        // console.log('unplayed console list before loop', this.listTitle, this.consoleList);

        for(let obj of this.unplayedList) {
          if (!this.consoleList[obj.consoleName])
            this.consoleList[obj.consoleName] = 1;
          else
            this.consoleList[obj.consoleName]++;
        }

        // console.log('unplayed console list after loop', this.listTitle, this.consoleList);

        this.$emit('refreshConsoleListComponent', this.listTitle)

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

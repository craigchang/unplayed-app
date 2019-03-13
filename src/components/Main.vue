<template>
  <div>
    <div class="jumbotron">
      <div>
        <button @click="showAll" class="btn btn-primary btn-show-all">Show All</button>
        <FilterButton
          v-for="(obj, index) in unplayedConsoleList"
          :key="index"
          :index="index"
          :color-style="obj.colorStyle"
          :count="obj.count"
          :console-name="obj.consoleName"
          :is-selected="obj.isSelected"
          @filterButtonClick="filterButtonClick"
        />
      </div>
    </div>

    <div class="jumbotron" :style="unplayedFilteredList.length !== 0 ? 'margin-top:0.5rem;' : 'padding-top: 0rem;'">
      <button
        v-for="(consoleName, index) in unplayedFilteredList"
        type="button"
        :key="consoleName"
        :index="index"
        :style="{'font-size': '.750rem'}"
        :class="' btn btn-' + findColorStyleByConsoleName(consoleName)"
        @click.stop="removeFilterByConsoleButton(consoleName, index, findIndexOnConsoleListByConsoleName(consoleName), false)">
          <span aria-hidden="true">&times;</span>
          {{consoleName}}
      </button>
    </div>
    <div class="form-group" style="margin-top:0.5rem">
      <input type="text" aria-describedby="searchByName" placeholder="Search by Name" class="form-control search-by-name-input" v-model="searchByNameInput">
    </div>

    <nav>
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <a class="nav-item nav-link" id="nav-full-tab" data-toggle="tab" href="#nav-full" role="tab" aria-controls="nav-full" aria-selected="true">Full List</a>
        <a class="nav-item nav-link active" id="nav-split-tab" data-toggle="tab" href="#nav-split" role="tab" aria-controls="nav-split" aria-selected="false">Split List</a>
      </div>
    </nav>

    <div class="tab-content" id="nav-tabContent">
      <div class="tab-pane fade" id="nav-full" role="tabpanel" aria-labelledby="nav-full-tab">
        <div class="row" style="margin-top: 1rem">
          <FullList
            :file-name-unplayed="unplayedFile"
            :file-name-unbeaten="unbeatenFile"
            :file-name-beaten="beatenFile"
            :file-name-abandoned="abandonedFile"
            :search-by-name-input="searchByNameInput"
            :console-list="unplayedConsoleList"
            :filter-by-console-array="unplayedFilteredList"
            :color-list="colorList"
            />
        </div>
      </div>
      <div class="tab-pane fade show active" id="nav-split" role="tabpanel" aria-labelledby="nav-split-tab">
        <div class="row" style="margin-top: 1rem">
          <UnplayedList
            list-title="Unplayed"
            :search-by-name-input="searchByNameInput"
            :file-name="unplayedFile"
            :console-list="unplayedConsoleList"
            :filter-by-console-array="unplayedFilteredList"
            :color-list="colorList"/>
          <UnplayedList
            list-title="Unbeaten"
            :search-by-name-input="searchByNameInput"
            :file-name="unbeatenFile"
            :console-list="unplayedConsoleList"
            :filter-by-console-array="unplayedFilteredList"
            :color-list="colorList"/>
          <UnplayedList
            list-title="Beaten"
            :search-by-name-input="searchByNameInput"
            :file-name="beatenFile"
            :console-list="unplayedConsoleList"
            :filter-by-console-array="unplayedFilteredList"
            :color-list="colorList"/>
          <UnplayedList
            list-title="Abandoned"
            :search-by-name-input="searchByNameInput"
            :file-name="abandonedFile"
            :console-list="unplayedConsoleList"
            :filter-by-console-array="unplayedFilteredList"
            :color-list="colorList"/>
        </div>
      </div>
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
import FilterButton from './FilterButton'
import FullList from './FullList'

export default {
  name: 'Main',
  components: {
    FullList,
    UnplayedList,
    FilterButton
  },
  data () {
    return {
      colorList: ['unique', 'pink', 'purple', 'deep-purple', 'indigo', 'light-blue', 'cyan', 'dark-green', 'light-green', 'yellow', 'amber', 'deep-orange', 'brown', 'blue-grey', 'mdb-color'],
      unplayedConsoleList: [],
      unplayedFilteredList: [],
      unplayedFile: unplayed_md,
      unbeatenFile: unbeaten_md,
      beatenFile: beaten_md,
      abandonedFile: abandoned_md,
      searchByNameInput: ''
    }
  },
  methods: {
    findColorStyleByConsoleName: function(consoleName) {
      let [objFound] = this.unplayedConsoleList.filter(obj => obj.consoleName == consoleName)
      return objFound ? objFound.colorStyle : '';
    },
    findIndexOnConsoleListByConsoleName: function(consoleName) {
      return this.unplayedConsoleList.findIndex(obj => obj.consoleName == consoleName)
    },
    addFilterByConsoleButton: function(consoleName, colorStyle, indexOnConsoleList, isSelected) {
      this.unplayedFilteredList.push(consoleName);
      this.unplayedConsoleList[indexOnConsoleList].isSelected = isSelected;
    },
    removeFilterByConsoleButton: function(consoleName, indexOnFilteredList, indexOnConsoleList, isSelected) {
      this.unplayedFilteredList.splice(indexOnFilteredList, 1);
      this.unplayedConsoleList[indexOnConsoleList].isSelected = isSelected;
    },
    filterButtonClick: function(event, consoleName, colorStyle, indexOnConsoleList, isSelected) {
      if (isSelected) {
        this.addFilterByConsoleButton(consoleName, colorStyle, indexOnConsoleList, isSelected);
      } else {
        let indexOnFilteredList = this.unplayedFilteredList.findIndex(element => element == consoleName)
        this.removeFilterByConsoleButton(consoleName, indexOnFilteredList, indexOnConsoleList, isSelected);
      }
    },
    showAll: function(event) {
      this.unplayedFilteredList = [];
      this.unplayedConsoleList.forEach(obj => obj.isSelected = false);
    }
  },
  computed: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button.btn-show-all {
  font-size: .750rem;
}

.jumbotron {
  padding: 0.5rem 0.5rem 0 0.5rem;
  margin-bottom: 0;
}
.jumbotron button {
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}
.selected {
  border: 3px solid black;
}
</style>

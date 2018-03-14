import Vue from 'vue'
import { shallow } from 'vue-test-utils'
import UtilityComponent from '@/components/UtilityComponent'

describe('UtilityComponent.vue', () => {

  describe('methods: sortDescByCategory', () => {
    
    const list = [
      {
        'gameTitle': 'Bioshock Infinite',
        'link': 'http://www.metacritic.com/game/pc/bioshock-infinite',
        'consoleName': 'PS4',
        'comment': 'best game ever',
        'colorStyle': 'amber',
        'score': 9
      },
      {
        'gameTitle': 'RIME',
        'link': 'http://www.metacritic.com/game/pc/rime',
        'consoleName': 'PC',
        'comment': 'best game too',
        'colorStyle': 'unique',
        'score': 6
      }
    ];

    it('should sort by gameTitle in descending order', () => {
      const Constructor = Vue.extend(UtilityComponent)
      const vm = new Constructor().$mount();
      const listResults = vm.sortDescByCategory('gameTitle', list);
      expect(listResults.findIndex(obj => obj.gameTitle == 'RIME')).toEqual(0);
      expect(listResults.findIndex(obj => obj.gameTitle == 'Bioshock Infinite')).toEqual(1);
    })

    it('should sort by consoleName in descending order', () => {
      const Constructor = Vue.extend(UtilityComponent)
      const vm = new Constructor().$mount();
      const listResults = vm.sortDescByCategory('consoleName', list);
      expect(listResults.findIndex(obj => obj.gameTitle == 'RIME')).toEqual(1);
      expect(listResults.findIndex(obj => obj.gameTitle == 'Bioshock Infinite')).toEqual(0);
    })

    it('should sort by score in descending order', () => {
      const Constructor = Vue.extend(UtilityComponent)
      const vm = new Constructor().$mount();
      const listResults = vm.sortDescByCategory('score', list);
      expect(listResults.findIndex(obj => obj.gameTitle == 'RIME')).toEqual(1);
      expect(listResults.findIndex(obj => obj.gameTitle == 'Bioshock Infinite')).toEqual(0);
    })

    it('should sort by gameTitle in ascending order', () => {
      const Constructor = Vue.extend(UtilityComponent)
      const vm = new Constructor().$mount();
      const listResults = vm.sortAscByCategory('gameTitle', list);
      expect(listResults.findIndex(obj => obj.gameTitle == 'RIME')).toEqual(1);
      expect(listResults.findIndex(obj => obj.gameTitle == 'Bioshock Infinite')).toEqual(0);
    })

    it('should sort by consoleName in ascending order', () => {
      const Constructor = Vue.extend(UtilityComponent)
      const vm = new Constructor().$mount();
      const listResults = vm.sortAscByCategory('consoleName', list);
      expect(listResults.findIndex(obj => obj.gameTitle == 'RIME')).toEqual(0);
      expect(listResults.findIndex(obj => obj.gameTitle == 'Bioshock Infinite')).toEqual(1);
    })
  
    it('should sort by score in ascending order', () => {
      const Constructor = Vue.extend(UtilityComponent)
      const vm = new Constructor().$mount();
      const listResults = vm.sortAscByCategory('score', list);
      expect(listResults.findIndex(obj => obj.gameTitle == 'RIME')).toEqual(0);
      expect(listResults.findIndex(obj => obj.gameTitle == 'Bioshock Infinite')).toEqual(1);
    })

  })
})
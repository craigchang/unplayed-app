import Vue from 'vue'
import { shallow } from 'vue-test-utils'
import UnplayedListItem from '@/components/UnplayedListItem'

describe('UnplayedListItem.vue', () => {
  it('should contain the correct propsData', () => {
    const Constructor = Vue.extend(UnplayedListItem)
    const vm = new Constructor({
      propsData: {
        gameTitle: 'Bioshock Infinite',
        link: 'http://www.metacritic.com/game/pc/bioshock-infinite',
        consoleName: 'PS4',
        comment: 'best game ever',
        colorStyle: 'amber'
      }
    }).$mount()
    expect(vm.gameTitle).toEqual('Bioshock Infinite')
    expect(vm.link).toEqual('http://www.metacritic.com/game/pc/bioshock-infinite')
    expect(vm.consoleName).toEqual('PS4')
    expect(vm.comment).toEqual('best game ever')
    expect(vm.colorStyle).toEqual('amber')
  })

  describe('computed method: classes()', () => {
    it('should have colorStyle', () => {
      const Constructor = Vue.extend(UnplayedListItem)
      const vm = new Constructor({
        propsData: {
          colorStyle: 'amber'
        }
      }).$mount()
      expect(vm.$el.querySelector('span').className).toEqual('badge badge-pill badge-amber')
    })
  })

  describe('computed method: itemLink()', () => {
    it('should contain a link if provided', () => {
      const Constructor = Vue.extend(UnplayedListItem)

      const vm = new Constructor({
        propsData: {
          link: 'http://www.metacritic.com/game/pc/bioshock-infinite'
        }
      }).$mount()
      expect(vm.$el.querySelector('a').href).toEqual('http://www.metacritic.com/game/pc/bioshock-infinite')
    })

    it('should not contain a link if not provided', () => {
      const Constructor = Vue.extend(UnplayedListItem)
      const vm = new Constructor({
        propsData: {
          link: ''
        }
      }).$mount()
      expect(vm.$el.querySelector('a').getAttribute('href')).toEqual('#')
    })
  })
  
})
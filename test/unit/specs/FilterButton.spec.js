import Vue from 'vue'
import FilterButton from '@/components/FilterButton'

describe('FilterButton.vue', () => {
  it('should contain the correct data', () => {
    const Constructor = Vue.extend(FilterButton)
    const vm = new Constructor().$mount()
    expect(vm.isSelected).toEqual(false)
  })
})

describe('FilterButton.vue', () => {
  it('should contain the correct propsData', () => {
    const Constructor = Vue.extend(FilterButton)
    const vm = new Constructor({
      propsData: {
        consoleName: 'PS4',
        count: 1,
        colorStyle: 'unique'
      }
    }).$mount()
    expect(vm.consoleName).toEqual('PS4')
    expect(vm.count).toEqual(1)
    expect(vm.colorStyle).toEqual('unique')
  })
})

describe('FilterButton.vue', () => {
  it('should run classes()', () => {
    const Constructor = Vue.extend(FilterButton)
    const vm = new Constructor({
      data: {
        isSelected: true
      },
      propsData: {
        isSelected: true,
        colorStyle: 'unique'
      }
    }).$mount()
    expect(vm.$el.className).toEqual('select-btn btn btn-unique selected')
  })
})
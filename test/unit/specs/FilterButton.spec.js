import Vue from 'vue'
import { shallow } from 'vue-test-utils'
import FilterButton from '@/components/FilterButton'

describe('FilterButton.vue', () => {
  it('should contain the correct propsData', () => {
    const Constructor = Vue.extend(FilterButton)
    const vm = new Constructor({
      propsData: {
        consoleName: 'PS4',
        count: 1,
        colorStyle: 'unique',
        index: 2,
        isSelected: true
      }
    }).$mount()
    expect(vm.consoleName).toEqual('PS4')
    expect(vm.count).toEqual(1)
    expect(vm.colorStyle).toEqual('unique')
    expect(vm.index).toEqual(2)
    expect(vm.isSelected).toEqual(true)
  })

  it('should contain the following click event', () => {
    const wrapper = shallow(FilterButton);
    const button = wrapper.find('button');
    const spy = jest.fn();
    wrapper.vm.$on('filterButtonClick', spy);

    // action
    button.trigger('click');

    // result
    expect(spy).toHaveBeenCalledTimes(1);
  })


  it('should run computed: classes()', () => {
    const Constructor = Vue.extend(FilterButton)
    const vm = new Constructor({
      propsData: {
        isSelected: true,
        colorStyle: 'unique'
      }
    }).$mount()
    expect(vm.$el.className).toEqual('select-btn btn btn-unique selected')
  })
})
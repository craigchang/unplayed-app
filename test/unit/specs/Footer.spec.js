import Vue from 'vue'
import Footer from '@/components/Footer'

describe('Footer.vue', () => {
  const Constructor = Vue.extend(Footer)
  const vm = new Constructor().$mount()

  it('should contain the correct data', () => {
    expect(vm.homepageUrl)
      .toEqual('http://craigchang.me/')
    expect(vm.postUrl)
      .toEqual('http://shauninman.com/archive/2011/04/18/unplayed')
  })

  it('should render correct text contents', () => {
    expect(vm.$el.textContent)
      .toEqual('Craig began maintaining these lists around 2016. Huh?')
  })

  it('should contain the correct homepage url', () => {
    expect(vm.$el.querySelector('a.homepage-url').href)
      .toEqual('http://craigchang.me/')
  })

  it('should contain the correct post url', () => {
    expect(vm.$el.querySelector('a.post-url').href)
      .toEqual('http://shauninman.com/archive/2011/04/18/unplayed')
  })
})

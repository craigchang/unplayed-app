import Vue from 'vue'
import Footer from '@/components/Footer'

describe('Footer.vue', () => {
  it('should render correct text contents', () => {
    const Constructor = Vue.extend(Footer)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent)
      .toEqual('Craig began maintaining these lists around 2016. Huh?')
  })
})

describe('Footer.vue', () => {
  it('should contain the correct homepage url', () => {
    const Constructor = Vue.extend(Footer)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('a.homepage-url').href)
      .toEqual('http://craigchang.me/')
  })
})

describe('Footer.vue', () => {
  it('should contain the correct post url', () => {
    const Constructor = Vue.extend(Footer)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('a.post-url').href)
      .toEqual('http://shauninman.com/archive/2011/04/18/unplayed')
  })
})
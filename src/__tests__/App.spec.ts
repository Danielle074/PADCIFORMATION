import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'

// `App.vue` is just a <router-view/> (see the file) — the previous version
// of this test asserted the default Vite scaffold's "You did it!" welcome
// text, which was never updated when the real app replaced that template.
describe('App', () => {
  it('mounts and renders the matched route without crashing', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/', component: { template: '<div>ok</div>' } }],
    })
    router.push('/')
    await router.isReady()

    const wrapper = mount(App, { global: { plugins: [router] } })

    expect(wrapper.text()).toContain('ok')
  })
})

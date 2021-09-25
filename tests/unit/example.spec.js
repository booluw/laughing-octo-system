import flushPromises from "flush-promises"
import Vue from 'vue'
import { mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

jest.mock('axios')

it('Sends a message containing the user.name when success', async() => {
  const user = {name: 'John Doe', email: 'johndoe@company.agency', message: 'Test message from Jest'}
  const wrapper = mount(HelloWorld)

  await wrapper.find('#name').setValue(user.name)
  await wrapper.find('#email').setValue(user.email)
  await wrapper.find('#message').setValue(user.message)
  await wrapper.find('form').trigger("submit.prevent")

  wrapper.vm.$nextTick().then( ()=> {
    expect.assertions(1)
    expect(wrapper.find('#response').text()).toContain(`Thank you ${user.name}. Your message has been recieved.`)
  })
})

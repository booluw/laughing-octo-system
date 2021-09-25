<template>
  <section id="app" class="container">
    <form class="form" @submit.prevent="validateForm()">
      <h1 class="form__heading">Contact Us!</h1>
      <div id="response" :class="errorClass"></div>
      <label for="name" :class="`input-group ${user.name.length !== 0 && (user.name.length < 5 || user.name.length > 50 ? 'input-group--danger' : '')}`">
        <span class="input-group__label">name</span>
        <input id="name" type="text" v-model="user.name" class="input-group__input" required/>
      </label>
      <label for="email" class="input-group">
        <div id="err"></div>
        <span class="input-group__label">email</span>
        <input id="email" type="email" v-model="user.email" class="input-group__input" required/>
      </label>
      <label for="subject" class="input-group">
        <span class="input-group__label">subject</span>
        <input id="subject" type="text" v-model="user.subject" :class="`input-group__input ${user.subject.length > 100 ? 'input-group--danger' : ''}`" />
      </label>
      <label for="message" class="input-group">
        <span :class="`input-group__label ${user.message.length > 500 ? 'input-group--danger':''}`">message</span>
        <textarea id="message" type="text" v-model="user.message" class="input-group__input" required></textarea>
      </label>
      <button class="btn" id="btn" :disabled="user.message.length == 0">send</button>
    </form>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      user: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      error: false,
      errorClass: ''
    }
  },
  methods: {
    validateForm() {
      this.error = true
      let response = document.getElementById('response')
      let btn = document.getElementById('btn')
      let user = this.user

      btn.disabled = true //disable the submit button
      btn.innerText = 'Please wait...'

      if((/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})/).test(this.user.email)) { // first validate e-mail
        if(user.name.length > 5 && user.name.length <= 50) {
        // Send data
          if(user.message.length > 1 && user.message.length <=100 ){
            axios.post('https://5d9f7fe94d823c0014dd323d.mockapi.io/api/message', this.user, {
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          }).then(result => {
            this.errorClass = 'alert alert--success'
            response.innerText =`Thank you ${this.user.name}. Your message has been recieved.`
            console.log(result)
          }).catch(error => {
            response.innerText = `Oops, looks like we ran into an error while recieving your message. Please try again.`
            console.log(error)
          })
          } else {
            this.errorClass = 'alert alert--danger'
            response.innerText = 'Your message is more than 100 characters.'
          }
        } else {
          this.errorClass = 'alert alert--danger'
          response.innerText = 'Your name is more than 50 characters or less than 5 characters.'
        }
      } else {
        this.error = true
        this.errorClass = 'alert alert--danger'
        response.innerText = `${this.user.email} is not a valid email address`
      }
    }
  }
}
</script>

<style>
*,
*::after,
*::before {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {font-size: 62.5%;}
body {font-size: 2rem;}

:root {--base: rgb(0, 224, 161);}
.container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: white;
}

.form {
  border: .2rem solid var(--base);
  background-color: transparent;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 2rem;
  padding: 5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-block-start: 1.5rem;
  border-bottom: .2rem solid rgba(0, 224, 161, .5);
  transition: border 300ms ease-in-out;
}

.input-group:focus-within {border-color: rgb(0, 224, 161);}

.input-group--danger {
  border-color: tomato;
}

.input-group__label {
  text-transform: capitalize;
  font-size: 1.8rem;
  opacity: .7;
}

.input-group__input {
  border: none;
  outline: none;
  background: transparent;
  padding: .5rem;
  font-size: 2rem;
}

.btn {
  display: flex;
  margin-block-start: 3rem;
  padding: 1.5rem 5rem;
  outline: none;
  border: none;
  border-radius: 3rem;
  background: var(--base);
  border: .3rem solid rgba(255,255,255,.7);
  color: white;
  cursor: pointer;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .2rem;
  transition: border 300ms ease-in-out;
}

.btn:hover {
  border-color: rgba(0,0,0,.3);
}

.btn[disabled] {
  cursor: not-allowed;
  filter: grayscale(100%);
  }

.alert {
  font-size: 1.5rem;
  display: block;
  padding: 1rem;
  margin-block-end: 1rem;
  border-left: .5rem solid transparent;
  color: transparent;
  transition: 300ms ease-in-out;
  text-align: left;
}

.alert--error {
  border-color: rgb(255, 99, 71);
  background: rgba(255, 99, 71, .5);
  color: black;
}

.alert--success {
  border-color: rgb(0, 224, 161);
  background: rgba(0, 224, 161, .5);
  color: black;
}
</style>

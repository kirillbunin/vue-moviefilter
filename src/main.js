import Vue from 'vue'
import VueAxios from 'vue-axios'
import Axios from 'axios'
import App from './App.vue'

Vue.use(VueAxios, Axios)

new Vue({
  el: '#app',
  render: h => h(App)
})

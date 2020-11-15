import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'

import filter from "./filters"
import { store } from "./store/index";

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

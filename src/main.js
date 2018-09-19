import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App.vue'
import routes from './config/routes'
import * as resources from './resources'
import resource from './plugins/resource'
import deviceQueries from './plugins/device-queries'
import getMarkdown from './plugins/get-markdown'

Vue.use(BootstrapVue);

Vue.use(resource, {
  resources,
  endpoint: '/static'
})

Vue.use(deviceQueries, {
  phone: 'max-width: 567px',
  tablet: 'min-width: 568px',
  mobile: 'max-width: 1024px',
  laptop: 'min-width: 1025px',
  desktop: 'min-width: 1280px',
  monitor: 'min-width: 1448px'
})

Vue.use(getMarkdown, {
  endpoint: '/static'
})

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})

import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import store from './plugins/store'
import http from './plugins/axios'
import moment from 'moment'

import NoteApp from './NoteApp.vue'

Vue.config.productionTip = false

Vue.filter('date', time => moment(time)
  .format('DD/MM/YY, HH:mm'))

new Vue({
  store,
  http,
  render: h => h(NoteApp)
}).$mount('#project-notes')

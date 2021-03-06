import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { dom } from '@fortawesome/fontawesome-svg-core'
import { VueReCaptcha } from 'vue-recaptcha-v3'
import axios from 'axios'

library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

dom.watch()
Vue.use(Vuelidate)
Vue.use(VueReCaptcha, {
  siteKey: process.env.VUE_APP_RECAPTCHA_V3_KEY,
})
Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:8000/api/'


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

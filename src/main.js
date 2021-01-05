import Vue from 'vue'
import App from './App.vue'
import router from './router'
import FlashMessage from '@smartweb/vue-flash-message'

Vue.config.productionTip = false
Vue.use(FlashMessage)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

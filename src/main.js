// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './axios/index'
import custom from './assets/js/custom'
import './assets/js/rem'
import 'url-search-params-polyfill'
import 'formdata-polyfill'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(custom);

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: { App },
  template: '<App/>'
})

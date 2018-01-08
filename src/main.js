// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'

import './assets/rem.js'
import './common/common.css'
import './common/vue_transition.css'
import './assets/font-awesome.min.css'

import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

Vue.use(VueLazyload,{
  lazyComponent: true
});

Vue.filter('statusFilter',(val)=>{
  return val==0?'已完结':'连载中'
})

Vue.prototype.console = console;

router.beforeEach((to,from,next)=>{
  console.log(to,from);
  next();
})
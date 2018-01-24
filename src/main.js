// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'
import VModal from 'vue-js-modal'
import { Button, Input,Container } from 'element-ui'
import Navigation from 'vue-navigation'

import './assets/rem.js'
import './common/vue_common.js'
import '!style-loader!css-loader!less-loader!./common/app.less'
import '!style-loader!css-loader!less-loader!./common/common.less'
import './common/vue_transition.css'
import './assets/font-awesome.min.css'
import 'swiper/dist/css/swiper.css'


Vue.use(Button)
Vue.use(Input)
Vue.use(Container)

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
})


Vue.use(Navigation, {router})

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.use(VueLazyload,{
  lazyComponent: true
});
Vue.use(VModal, { dialog: true });

router.beforeEach((to,from,next)=>{
  if(to.meta.requireLogin){
	  if(!Vue.prototype.$userInfo.isLogin){
		  let backurl = escape(window.location.protocol+'//'+window.location.host+'/#'+to.path);
		  next(`/login?backurl=${backurl}`)
	  }
  }
  next();
})


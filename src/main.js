import "./assets/rem.js";

import Vue from "vue";
import App from "./App";
import router from "./router";
import VueAwesomeSwiper from "vue-awesome-swiper";
import VueLazyload from "vue-lazyload";
import VModal from "vue-js-modal";
import { Button, Input, Container,Form,FormItem,Checkbox,Loading} from "element-ui";
import Navigation from "vue-navigation";
import {getCookie} from './common/function'

import './common/setChannel.js'  //判断注册来源，写到cookie
import "./common/vue_common.js";
import "!style-loader!css-loader!less-loader!./common/common.less";
import "./common/vue_transition.css";
import "./assets/font-awesome.min.css";
import "swiper/dist/css/swiper.css";


Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Container);
Vue.use(Checkbox);
Vue.use(Loading);
Vue.use(Navigation, { router });
Vue.use(VueAwesomeSwiper /* { default global options } */);
Vue.use(VueLazyload, {
	lazyComponent: true
});
Vue.use(VModal, { dialog: true });


checkLogin();
function checkLogin(){
	const uidCookieName = 'uid';
	const uid = getCookie(uidCookieName);
	if(uid){
		Vue.prototype.$userInfo.isLogin = true;
		Vue.prototype.$userInfo.userId = uid;
	}
}

router.beforeEach((to, from, next) => {
	if (to.meta.requireLogin) {
		if (!Vue.prototype.$userInfo.isLogin) {
			let backurl = encodeURIComponent(
				window.location.protocol +
					"//" +
					window.location.host +
					"/#" +
					to.path
			);
			next({name:'login',query:{backurl}});
		}
	}
	next();
});


new Vue({
	el: "#app",
	router,
	template: "<App/>",
	components: { App }
});

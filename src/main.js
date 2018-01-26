// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import VueAwesomeSwiper from "vue-awesome-swiper";
import VueLazyload from "vue-lazyload";
import VModal from "vue-js-modal";
import { Button, Input, Container,Form,FormItem,Checkbox} from "element-ui";
import Navigation from "vue-navigation";


import "./assets/rem.js";
import "./common/vue_common.js";
import "!style-loader!css-loader!less-loader!./common/common.less";
import "./common/vue_transition.css";
import "./assets/font-awesome.min.css";
import "swiper/dist/css/swiper.css";


Vue.use(Button);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Container);
Vue.use(Checkbox);

new Vue({
	el: "#app",
	router,
	template: "<App/>",
	components: { App }
});

Vue.use(Navigation, { router });

Vue.config.productionTip = false;
Vue.use(VueAwesomeSwiper /* { default global options } */);
Vue.use(VueLazyload, {
	lazyComponent: true
});
Vue.use(VModal, { dialog: true });

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

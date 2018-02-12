// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "./assets/rem.js";
import Vue from "vue";
import App from './recharge_app.vue'
import VModal from "vue-js-modal";
import {Button,Radio,RadioGroup} from "element-ui";
import Router from 'vue-router'

import './common/setChannel.js'  //判断注册来源，写到cookie
import "./common/vue_common.js";
import "!style-loader!css-loader!less-loader!./common/recharge.less";
import "./assets/font-awesome.min.css";

Vue.use(Button);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Router);
Vue.config.productionTip = false;
Vue.use(VModal, { dialog: true });


new Vue({
	el: "#app",
	template: "<App/>",
	components: { App },
	router:new Router({
		routes:	[
			{
				path:'/r_common',
				name:'r_common',
				component:()=>import('./components/recharge_common.vue')
			},
			{
				path:'/r_book',
				name:'r_book',
				component:()=>import('./components/recharge_book.vue')
			},
			{
				path:'/r_success',
				name:'r_success',
				component:()=>import('./components/recharge_success.vue')
			},
		]
	})

});

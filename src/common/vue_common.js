import Vue from 'vue'
/* 公共模块 */
Vue.filter('statusFilter',(val)=>{
	return val==0?'已完结':'连载中'
})

Vue.prototype.console = console;

Vue.prototype.$userInfo = {
	isLogin:false,
	userName:'',
	userId:"",
}

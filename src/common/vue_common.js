import Vue from 'vue'
import config from './config'
import {isWeiXin} from './function'
/* 公共模块 */
Vue.filter('statusFilter',(val)=>{
	return val==0?'已完结':'连载中'
})

Vue.prototype.console = console;

Vue.prototype.$userInfo = {
	isLogin:false,
	userName:'',
	userId:"",
	isWeiXinFun:false,
	isWeiXin:isWeiXin()
}

// 项目配置设置
Vue.prototype.$config = config;

Vue.prototype.$turnToLogin = function(alertText,backPathName){
	this.$modal.show("dialog", {
		text: alertText,
		buttons: [
			{
				title: "关闭",
				handler: () => {
					this.$modal.hide("dialog");
				}
			},
			{
				title: "去登录",
				default: true,
				handler: () => {
				let backurl = encodeURIComponent(
					window.location.protocol +
						"//" +
						window.location.host +
						"/#/" +backPathName
				);
				this.$router.push({name:'login',query:{backurl}})
				}
			}
		]
	});
}

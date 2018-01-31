import Vue from 'vue'
import config from './config'
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
}

Vue.prototype.$config = {
	coinName:config.coinName,
	webName:config.webName,
	telephone:config.telephone,
	qq:config.qq
}

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
				let backurl = escape(
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

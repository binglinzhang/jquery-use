import Vue from 'vue'
import config from './config'
import { getCookie, setCookie, parseUrlQuery, isWeiXin } from "./function";
import axios from "axios";
import md5 from "md5";
import { resolve } from 'path';
/* 公共模块 */
Vue.filter('statusFilter', (val) => {
	return val == 0 ? '已完结' : '连载中'
})

Vue.prototype.console = console;

Vue.prototype.$userInfo = {
	isLogin: false,
	userName: '',
	userId: "",
	isWeiXinFun: false,
	isWeiXin: isWeiXin()
}

// 项目配置设置
Vue.prototype.$config = config;

Vue.prototype.$turnToLogin = function (alertText, backPathName) {
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
						"/#/" + backPathName
					);
					this.$router.push({ name: 'login', query: { backurl } })
				}
			}
		]
	});
}

Vue.prototype.$getWeiXinFunsStatus = () => {
	return new Promise((ressolve, reject) => {
		// 获取微信关注状态
		function getWeiXinFunsStatus() {
			if (Vue.$userInfo.isWeiXinFun) return false;
			//如果存在web_uuid就话只需请求token
			if (getCookie("web_uuid")) {
				getTokens();
				return false;
			}

			if (!parseUrlQuery(window.location.search).code) {
				let targetUrl = `http://m.shengshixiwen.com/apis/0.1/User/weixin.html?appid=${
					Vue.$config.appid
					}&redirect_uri=${encodeURIComponent(
						window.location.href
					)}&response_type=code&scope=snsapi_base&state=${md5(
						new Date().getTime()
					)}#wechat_redirect`;
				window.location.href = targetUrl;
				return;
			}

			axios
				.get(
					`/apis/0.1/User/Msg.php?a=mulu&code=${
					parseUrlQuery(window.location.search).code
					}`
				)
				.then(res => {
					if (res.data.code == 200) {
						getTokens();
					}
				});

		}
		function getTokens() {
			axios.get("/apis/0.1/User/Msg.php?a=token").then(res => {
				if (res.data.code == 200) {
					Vue.$userInfo.isWeiXinFun = res.data.data.subscribe == 1;
					resolve(Vue.$userInfo.isWeiXinFun);
				}
			});
		}
	})
}


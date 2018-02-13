function isWeiXin() {
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		return true;
	} else {
		return false;
	}
}
function setCookie(name, value, days) {
	let time = new Date();
	time.setDate(time.getDate() + days);
	document.cookie =
		`${name}=${value}` +
		(days == null ? "" : ";expires=" + time.toGMTString());
}
function getCookie(name) {
	var arr,
		reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
	else return null;
}
function delCookie(name) {
	setCookie(name, "", -1);
}

function parseUrlQuery(hash) {
	let queryArr = hash.match(/\?.+=.+/);
	if (!queryArr) return {};
	queryArr = queryArr[0].slice(1).split("&");
	let parseResult = {};
	queryArr.forEach(item => {
		let arr = item.split("=");
		parseResult[arr[0]] = arr[1];
	});
	return parseResult;
}
function myAjax({ methods, url, async, data, success, error }) {
	function postDataFormat(obj) {
		if (typeof obj != "object") {
			alert("输入的参数必须是对象");
			return;
		}

		// 支持有FormData的浏览器（Firefox 4+ , Safari 5+, Chrome和Android 3+版的Webkit）
		if (typeof FormData == "function") {
			var data = new FormData();
			for (var attr in obj) {
				data.append(attr, obj[attr]);
			}
			return data;
		} else {
			// 不支持FormData的浏览器的处理
			var arr = new Array();
			var i = 0;
			for (var attr in obj) {
				arr[i] =
					encodeURIComponent(attr) +
					"=" +
					encodeURIComponent(obj[attr]);
				i++;
			}
			return arr.join("&");
		}
	}

	var xhr = new XMLHttpRequest();
	xhr.onload = () => success(xhr.responseText);
	xhr.onerror = error.bind(xhr);
	xhr.open(methods, url, async);
	xhr.send(postDataFormat(data));
}
function fetchDateYmd() {
	const now = new Date();
	const year = now
		.getFullYear()
		.toString(),
		month = ('0' + (now.getMonth() + 1)).slice(-2),
		date = ('0' + now
			.getDate()).slice(-2)
		;
	return `${year}${month}${date}`;
}

//微信公众号支付
function weixinPay(wxPayConfigObj) {
	function onBridgeReady() {
		WeixinJSBridge.invoke(
			"getBrandWCPayRequest",
			{
				"appId": wxPayConfigObj.appId, //公众号名称，由商户传入
				"timeStamp": wxPayConfigObj.timeStamp, //时间戳，自1970年以来的秒数
				"nonceStr": wxPayConfigObj.nonceStr, //随机串
				"package": wxPayConfigObj.package,
				"signType": wxPayConfigObj.signType, //微信签名方式：
				"paySign": wxPayConfigObj.paySign //微信签名
			},
			function (res) {
				if (res.err_msg == "get_brand_wcpay_request:ok") {
					const backUrl = getCookie("recharge_back_url") || location.host;
					delCookie("recharge_back_url");
					this.$modal.show("dialog", {
						text: `恭喜，已充值成功`,
						buttons: [
							{
								title: "点击返回",
								default: true,
								handler: () => {
									window.location.href = backUrl;
								}
							}
						]
					});
				}
			}
		);
	}
	if (typeof WeixinJSBridge == "undefined") {
		if (document.addEventListener) {
			document.addEventListener(
				"WeixinJSBridgeReady",
				onBridgeReady,
				false
			);
		} else if (document.attachEvent) {
			document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
			document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
		}
	} else {
		onBridgeReady();
	}
}

export {
	isWeiXin,
	setCookie,
	getCookie,
	delCookie,
	parseUrlQuery,
	myAjax,
	fetchDateYmd,
	weixinPay
};

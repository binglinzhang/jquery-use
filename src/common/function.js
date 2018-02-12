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
		month = ('0'+(now.getMonth() + 1)).slice(-2),
		date = ('0'+now
			.getDate()).slice(-2)
;
	return `${year}${month}${date}`;
}
export {
	isWeiXin,
	setCookie,
	getCookie,
	delCookie,
	parseUrlQuery,
	myAjax,
	fetchDateYmd
};

function isWeiXin() {
	var ua = window.navigator.userAgent.toLowerCase();
	if (
		ua.match(/MicroMessenger/i) == "micromessenger"
	) {
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
	let queryArr = hash
		.match(/\?.+=.+/)[0]
		.slice(1)
		.split("&");
	let parseResult = {};
	queryArr.forEach(item => {
		let arr = item.split("=");
		parseResult[arr[0]] = arr[1];
	});
	return parseResult;
}

export { isWeiXin, setCookie, getCookie, delCookie, parseUrlQuery };

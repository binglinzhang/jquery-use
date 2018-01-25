function isWeiXin() {
	var ua = window.navigator.userAgent.toLowerCase();
	if (
		ua.match(/MicroMessenger/i) == "micromessenger" ||
		ua.match(/_SQ_/i) == "_sq_"
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

export { isWeiXin, setCookie, getCookie, delCookie };

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
function setCookie(name,value,days){
	let time = new Date();
	time.setDate(time.getDate()+days);
	document.cookie = `${name}=${value}`+(days==null ? "" : ";expires="+time.toGMTString());
}
function getCookie(name){
	let cookie = document.cookie , ns , start , end;
	if(!cookie.length<0){
		return false;
	}
	ns = cookie.indexOf(`${name}=`);
	if(ns!=-1){
		start = ns+name.length+1;
		end = cookie.indexOf(";",start)
		if(end==-1){
			end = cookie.length
		}
		return cookie.slice(start,end)
	}
}
function delCookie(name){
	myUntils.setCookie(name,"",-1);
}

export {
	isWeiXin,
	setCookie,
	getCookie,
	delCookie
}

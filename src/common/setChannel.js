(function() {
	function trim(str) {
		return str.replace(/(^\s*)|(\s*$)/g, '');
	}

	function getCookie(name) {
		if (document.cookie.length > 0) {
			var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
			if (arr != null) {
				return trim(arr[2])
			}
		}
		return null;
	}

	function setCookie(name, value, expireSecond) {
		var exdate = new Date();
		exdate.setTime(exdate.getTime() + expireSecond * 24 * 60 * 60 * 1000);
		document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exdate.toUTCString() + ";path=/;domain=shengshixiwen.com";
	}

	function getParam(name) {
		if (location.search.length > 0) {
			var arr = location.search.match(new RegExp("(^\\?|&)" + name + "=([^&]*)(&|$)"));
			if (arr != null) {
				return trim(arr[2]);
			}
		}
		return null;
	}

	function isTrue(str) {
		if (!isNaN(str) && str != '0') {
			return true;
		}
	}

	function setPromotionInfo() {
		var channelId = getParam("channelId"),
			sign = getParam("sign"),
			promotionStartTime = getParam("promotionStartTime"),
			firstVisitTime = Number(Date.parse(new Date()).toString().substr(0, 10));
		var ChannelPromotion = {
			"channelId": channelId,
			"sign": sign,
			"promotionStartTime": promotionStartTime,
			"firstVisitTime": firstVisitTime
		};
		ChannelPromotion = JSON.stringify(ChannelPromotion);
		if (channelId && sign && promotionStartTime && isTrue(channelId)) {
			setCookie("ChannelPromotion", ChannelPromotion, 30, "shengshixiwen.com", '/');
			console.log(JSON.parse(decodeURIComponent(getCookie("ChannelPromotion"))).channelId);
		}
		if (navigator.userAgent.indexOf("MicroMessenger") != -1) {
			var PromotionInfo = {};
			var IsVerificated = getParam("IsVerificated");
			if (IsVerificated == 3) {
				PromotionInfo.IsVerificated = IsVerificated;
				var NewPromotionInfo = JSON.stringify(PromotionInfo);
				setCookie("PromotionInfo", NewPromotionInfo, 3, "shengshixiwen.com", "/");
			}
			var DelVerificated = getParam("DelVerificated");
			if (DelVerificated == -1) {
				setCookie("PromotionInfo", NewPromotionInfo, 0, "shengshixiwen.com", "/");
			}
		}
	}
	setPromotionInfo();
})();
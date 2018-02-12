<template>
	<div class="main">
		<div class="container user-pay-info">
			<div class="content">
				<p>充值账号：{{nickname}}</p>
				<p>购买书本：<span>《{{bookname}}》</span></p>
				<p>需付金额：{{price}}元</p>
			</div>
		</div>
		<div class="container online-pay">
			<div class="content">
				<p></p>
				<h2>选择支付方式</h2>
				<div class="way">
					<el-radio-group v-model="payType">
						<el-radio label="zfb" v-if="!($userInfo.isWeiXin&&$config.showZFBInWeiXin)">支付宝支付</el-radio>
						<el-radio label="wx">微信支付</el-radio>
					</el-radio-group>
				</div>
				<div class="btn submitBtn" @click="recharge">
					<a>确认支付</a>
				</div>
			</div>
		</div>
		<div class="contact">
			<p>若充值遇到问题或充值失败，请联系客服。</p>
			<p>客服QQ：{{$config.qq}}</p>
		</div>
		<v-dialog width="80%"></v-dialog>
	</div>
</template>

<script>
import axios from "axios";
import md5 from "md5";
import qs from "qs";
import {
  parseUrlQuery,
  fetchDateYmd,
  myAjax,
  isWeiXin
} from "../common/function";
export default {
  name: "app",
  data() {
    return {
      payType: isWeiXin() ? "wx" : "zfb",
      price: null,
      bookname: null,
      nickname: null,
      bookId: null,
      wxPayConfig: {}
    };
  },
  computed: {
    chargetype() {
      return this.payType == "zfb"
        ? "alipay"
        : this.$userInfo.isWeiXin ? "wxpay" : "wxh5pay";
    }
  },
  methods: {
    init() {
      let queryObj = parseUrlQuery(window.location.hash);
      this.price = Number(queryObj.price) / 100;
      this.bookId = queryObj.bookId;
      //获取用户信息
      axios.get("/apis/0.1/User/UserInfo.php").then(res => {
        this.nickname = res.data.data.nicker;
      });
      //获取书本信息
      axios.get(`/apis/0.1/BookInfo.php?bookId=${this.bookId}`).then(res => {
        this.bookname = res.data.data.name;
      });
    },
    recharge() {
      const data = {
        token: md5(`${fetchDateYmd()}${this.price}s3fhgrwwe`),
        money: this.price,
        chargetype: this.chargetype,
        type: 104,
        book_id: this.bookId
      };
      myAjax({
        methods: "post",
        url: "/apis/0.1/Pay/Pay.php",
        data,
        async: false,
        success: res => {
          let result = JSON.parse(res);
          if (result.code == 200) {
            if (this.chargetype == "wxpay") {
              this.wxPayConfig = result.data.data;
              this.weixinPay();
            } else {
              window.location.href = result.data;
            }
          } else {
            this.$modal.show("dialog", {
              text: `${result.msg}`,
              buttons: [
                {
                  title: "我知道了",
                  default: true,
                  handler: () => {
                    this.$modal.hide("dialog");
                  }
                }
              ]
            });
          }
        },
        error: function() {}
      });
    },
    selectItem(item, index, obj) {
      this.activeIndex = index;
      this.selectMoney = item.cost;
      this.selectType = obj.isEgold ? 101 : 103;
    },
    weixinPay() {
      function onBridgeReady() {
        WeixinJSBridge.invoke(
          "getBrandWCPayRequest",
          {
            appId: this.wxPayConfig.appid, //公众号名称，由商户传入
            timeStamp: this.wxPayConfig.timeStamp, //时间戳，自1970年以来的秒数
            nonceStr: this.wxPayConfig.nonceStr, //随机串
            package: this.wxPayConfig.package,
            signType: this.wxPayConfig.signType, //微信签名方式：
            paySign: this.wxPayConfig.paySign //微信签名
          },
          function(res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              alert("微信支付成功");
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
  },
  created() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
@import url("../common/mixin.less");
.submitBtn {
  a {
    background-color: @mainColor;
  }
}
</style>

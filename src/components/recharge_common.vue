<template>
	<div class="main">
		<div class="container user-pay-info">
			<div class="content">
				<p>充值账号：{{nickname}}</p>
				<p>账户余额：
					<span>{{lessCoin}}</span> {{$config.coinName}}
					<span style="margin-left:20px">{{lessTicket}}</span> 书券
				</p>
			</div>
		</div>
		<div class="container online-pay">
			<div class="content">
				<h2>选择支付金额
					<span>（1元=100{{$config.coinName}}）</span>
				</h2>
				<div class="money">
					<label v-for="(item,index) in payChoose.egold"
						:class="{active:activeIndex==index}"
						@click="selectItem(item,index,{isEgold:true})"
						v-if="!membersRecharge">
						<p>{{item.cost}}元</p>
						<p>{{item.egold+$config.coinName}}</p>
						<p v-if="Number(item.coin)"><span>赠送{{item.coin}}</span>书券</p>
					</label>
					<label
						v-for="(item,index) in payChoose.month"
						:class="{active:activeIndex==(membersRecharge?index:index+payChoose.egold.length)}"
						@click="selectItem(item,membersRecharge?index:index+payChoose.egold.length,{isMonth:true})">
						<p>畅读会员</p>
						<p>{{item.cost}}元</p>
						<p>{{item.month}}个月</p>
					</label>
				</div>
				<h2>选择支付方式</h2>
				<div class="way">
					<el-radio-group v-model="payType">
						<el-radio label="zfb">支付宝支付</el-radio>
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
import qs from "qs";
import md5 from "md5";
import {
  parseUrlQuery,
  myAjax,
  fetchDateYmd,
  isWeiXin
} from "../common/function";
export default {
  name: "app",
  data() {
    return {
      payType: isWeiXin() ? "wx" : "zfb",
      payChoose: {
        egold: [],
        month: []
      },
      activeIndex: 0,
      lessCoin: null,
      nickname: null,
      lessTicket: null,
      selectMoney: 0,
      selectType: 101,
      originHost: null,
      membersRecharge: true
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
      //获取用户信息
      axios.get("/apis/0.1/User/UserInfo.php").then(res => {
        this.nickname = res.data.data.nicker;
        this.lessCoin = res.data.data.amount;
        this.lessTicket = res.data.data.coin;
      });
      //获取支付选项
      axios.get("/apis/0.1/Pay/PayConfigs.php").then(res => {
        this.payChoose = res.data.data;
        this.selectMoney = this.payChoose.egold[0].cost;
      });
      //是否过滤非会员选项
      this.membersRecharge = this.$route.query.members || false;
    },
    recharge() {
      const data = {
        token: md5(`${fetchDateYmd()}${this.selectMoney}s3fhgrwwe`),
        money: this.selectMoney,
        chargetype: this.chargetype,
        type: this.selectType
      };
      myAjax({
        methods: "post",
        url: "/apis/0.1/Pay/Pay.php",
        data,
        async: false,
        success: res => {
          let result = JSON.parse(res);
          console.log(result,'sdasdakjsdhiuo');
          if (result.code == 200) {
            if (this.chargetype == "wxpay") {
              alert("准备开启wxpay");
              this.weixinPay(result.data);
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
      // axios.post("/apis/0.1/Pay/Pay.php", qs.stringify(data)).then(res => {
      //   if (res.data.code == 200) {
      //     if (this.chargetype == "wxpay") {
      //       this.weixinPay(res.data.data);
      //     } else {
      //       window.location.href = res.data.data;
      //     }
      //   } else {
      //     this.$modal.show("dialog", {
      //       text: `${res.data.msg}`,
      //       buttons: [
      //         {
      //           title: "我知道了",
      //           default: true,
      //           handler: () => {
      //             this.$modal.hide("dialog");
      //           }
      //         }
      //       ]
      //     });
      //   }
      // });
    },
    weixinPay(wxPayConfigObj) {
      let self = this;
      console.log(wxPayConfigObj)
      function onBridgeReady(){
        alert("准备支付了");
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
          function(res) {
            console.log(res);
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
    },
    selectItem(item, index, obj) {
      this.activeIndex = index;
      this.selectMoney = item.cost;
      this.selectType = obj.isEgold ? 101 : 103;
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


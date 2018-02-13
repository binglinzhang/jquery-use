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
  isWeiXin,
  getCookie,
  delCookie,
  weixinPay
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
      lessCoin: null,     //剩余金币
      nickname: null,
      lessTicket: null,   //剩余书券
      selectMoney: 0,     //已选择的金额
      selectType: 101,   //支付方式
      originHost: null,  //来源的域名
      membersRecharge: true,   
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
    //开始支付
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
          if (result.code == 200) {
            //公众号支付
            if (this.chargetype == "wxpay") {
              weixinPay(result.data);
            } else {
              window.location.href = result.data;
            }
          } else {    //h5支付
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


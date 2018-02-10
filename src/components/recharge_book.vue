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
import md5 from 'md5'
import { parseUrlQuery,fetchDateYmd ,myAjax} from "../common/function";
export default {
  name: "app",
  data() {
    return {
      payType: isWeiXin()?'wx':"zfb",
      price: null,
      bookname: null,
      nickname: null,
      bookId: null
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
      axios.get("/apis/0.1/User/UserInfo.php").then(res => {
        this.nickname = res.data.data.nicker;
      });
      axios.get(`/apis/0.1/BookInfo.php?bookId=${this.bookId}`).then(res => {
        this.bookname = res.data.data.name;
	  });
	  axios.get("/apis/0.1/Url.php").then(res => {});
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
		  methods:'post',
		  url:'/apis/0.1/Pay/Pay.php',
		  data,
		  async:false,
		  success:(res)=>{
			let result = JSON.parse(res);
			if (result.code == 206) {
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
			} else if (result.code == 200) {
				window.location.href = result.data;
			}
		  },
		  error:function(){

		  }
	  })
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

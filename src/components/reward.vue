<template>
      <div>
        <div class="container reward">
          <h1 class="h1_up">
            <span class="nv_span">打赏作者</span>
          </h1>
          <div class="award">
            <ul>
              <li :class="{active:activeFlag==index}" @click="activeFlag=index" v-for="(item,index) in reward" :key="index" :style="{backgroundImage:`url(${item.img})`}">
                <span>{{item.name}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="self_up">
          <span class="round"></span>
          <span>{{reward[activeFlag].label}}</span>
          <div class="cnt_btn">
            <button class="btn" @click="rewardCheck">打赏作者：{{reward[activeFlag].price+$config.coinName}}</button>
          </div>
        </div>
        <v-dialog width="80%"/>
      </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
	name: "reword",
	data() {
		return {
			activeFlag: 0,
			reward: [""]
		};
	},
	methods: {
		rewardCheck() {
			if (!this.$userInfo.isLogin) {
				this.$turnToLogin("请先登录", "book");
				return;
			}
			this.$modal.show("dialog", {
				text: `确定打赏 ${this.reward[this.activeFlag].price} 币吗`,
				buttons: [
					{
						title: "确定",
						handler: () => {
							this.$modal.hide("dialog");
							console.log(this);
							this.goReward();
						}
					},
					{
						title: "取消"
					}
				]
			});
		},
		goReward() {
			let data = {
				book_id: this.bookId,
				price: this.reward[this.activeFlag].price,
				num: 1,
				desc: this.reward[this.activeFlag].label
			};
			axios
				.post("/apis/0.1/UserLevel/AddBonus.php", qs.stringify(data))
				.then(res => {
					if(res.data.code==200){
						this.$modal.show("dialog", {
							text: `打赏成功`,
							buttons: [
								{
									title: "确定",
									handler: () => {
										this.$modal.hide("dialog");
									}
								},
							]
						});
					}else if(res.data.code==206){
						this.$modal.show("dialog", {
							text: '余额不足，是否前往充值',
							buttons: [
								{
									title: "去充值",
									handler: () => {
										this.$router.push('/')
									}
								},
								{
									title: "取消",
									handler: () => {
										this.$modal.hide("dialog");
									}
								},
							]
						});
					}
				});
		}
	},
	props: {
		bookId: {
			type: String
		}
	},
	created() {
		axios
			.get(`/apis/0.1/UserLevel/BonusLevel.php?bookId=${this.bookId}`)
			.then(res => {
				this.reward = res.data.data.BONUS_CONF;
			});
	}
};
</script>

<style lang="less" scoped>
@import url("../common/mixin.less");
.reward {
	overflow: hidden;
	margin-bottom: 0.4rem;
}
.reward .h1_up {
	padding-bottom: 0.1rem;
}

.reward .award {
	float: left;
	width: 7rem;
	margin-right: 0.1rem;
	padding-left: 0.3rem;
	margin-bottom: 0.3rem;
	margin-top: 0.1rem;
}

.reward .award li {
	float: left;
	width: 1.6rem;
	height: 1.6rem;
	text-align: center;
	border-radius: 0.1rem;
	font-size: 0.24rem;
	color: #333;
	border: solid 0.05rem #fff;
	position: relative;
	margin: 0 0.3rem 0.45rem;
}

.reward .award li:nth-child(1) {
	background: no-repeat center bottom 0.2rem #fff;
	background-size: 1.2rem;
}

.reward .award li:nth-child(2) {
	background: no-repeat center bottom 0.2rem #fff;
	background-size: 1.2rem;
}

.reward .award li:nth-child(3) {
	background: no-repeat center bottom 0.2rem #fff;
	background-size: 1.2rem;
}

.reward .award li:nth-child(4) {
	background: no-repeat center bottom 0.2rem #fff;
	background-size: 1.2rem;
}

.reward .award li:nth-child(5) {
	background: no-repeat center bottom 0.2rem #fff;
	background-size: 1.2rem;
}

.reward .award li:nth-child(6) {
	background: no-repeat center bottom 0.2rem #fff;
	background-size: 1.2rem;
}

.reward .award li.active {
	background-color: #e4f2ff;
}

.reward .award li span {
	position: absolute;
	left: 50%;
	margin-left: -0.8rem;
	width: 1.6rem;
	bottom: -0.5rem;
	font-size: 0.26rem;
}

.self_up {
	width: 7.1rem;
	color: @mainColor;
	margin-left: 0.24rem;
	vertical-align: bottom;
	position: relative;
}

.self_up .round {
	display: inline-block;
	width: 0.1rem;
	height: 0.1rem;
	border-radius: 50%;
	background-color: @mainColor;
}

.self_up span:nth-child(2) {
	font-size: 0.26rem;
	color: @mainColor;
}

.cnt_btn {
	margin-top: 0.3rem;
	text-align: center;
}

.cnt_btn .btn {
	width: 6.1rem;
	height: 0.84rem;
	border: none;
	border-radius: 0.08rem;
	font-size: 0.28rem;
	background-color: @mainColor;
	color: #fff;
	box-shadow: 0 0rem 0.4rem @mainColor;
}

.container.reward .nv_span {
	border-left: solid 0.06rem @mainColor;
	color: @mainColor;
}
</style>

<template>
    <div class="help-center">
	  <link-head><span>帮助中心</span></link-head>
      <div class="container">
        <div class="tabs">
          <a :class="{active:activeTabFlag==0}" @click="activeTabFlag=0">常见问题</a>
          <a :class="{active:activeTabFlag==1}" @click="activeTabFlag=1">读者帮助</a>
        </div>
		<transition name="fadeTab">
			<div class="common-question" v-show="activeTabFlag==0">
				<ul>
					<li class="content" v-for="(item,index) in problemsList" :key="index" :class="{active:problemActiveIndex==index}" @click="problemActiveIndex=index">
						<div class="cq-title">
							<span>{{index+1 +'. '+item.title}}</span>
						</div>
						<div class="cq-content" v-html="item.content">

						</div>
					</li>
				</ul>
			</div>
		</transition>
		<transition name="fadeTab">
        <div class="reader-help">
          <ul>
            <li v-for="(tab,tabindex) in helpList" :key="tabindex">
              <a>{{tab.tabTitle}}:</a>
              <ul>
                <li class="content" v-for="(item,index) in tab.problems" :key="index" :class="{active:item._index==helpActiveIndex}" @click="helpActiveIndex=item._index">
                  <div class="rh-title">
                    <span>{{index+1+'.'+item.title}}</span>
                  </div>
                  <div class="rh-content" v-html="item.content">

                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
		</transition>
      </div>
	  <n-footer></n-footer>
    </div>
</template>

<script>
import linkHead from "./link_header.vue";
import nFooter from './nfooter'
export default {
	name: "help",
	data() {
		return {
			problemActiveIndex: 0,
			helpActiveIndex: 0,
			activeTabFlag: 0,
			problemsList: [
				{
					title: `${this.$config.webName}手机站账号可以通用吗？`,
					content: `可以。${
						this.$config.webName
					}主站和手机站已经实现了账户互通。如果您已在主站注册账号，则无需在手机站再次注册，充值、订阅、收藏完完本?`
				},
				{
					title: "如何查看我收藏的书籍？",
					content:
						"登录后，点击网站首页右上角的阅读历史图标，点击【进入书架】按钮。或者进入个人中心页面，点击【书架】，查看您的收藏。"
				},
				{
					title: "充值后账户余额数量没变？",
					content: `解决办法：<p>（1）刷新当前页面；</p><p>（2）退出后重新登录；</p><p>（3）如果以上2种方法无效，那么可能没有充值成功，请联系本站客服。客服电话：${
						this.$config.telephone
					}(09:00-17:30)，客服QQ：${this.$config.qq}。</p>`
				},
				{
					title: "如何查看消费记录？",
					content:
						"登录后，进入个人中心页面，点击【消费记录】，查看您的充值记录和消费记录。"
				},
				{
					title: "为什么我无法阅读VIP章节？",
					content: `VIP章节需要订阅后才能阅读。充值后，选择您要看的VIP章节并按提示支付${
						this.$config.coinName
					}，随后即可阅读。`
				}
			],
			helpList: [
				{
					tabTitle: "充值",
					problems: [
						{
							title: `如何给账户充值？`,
							content: `首页导航栏点击【充值】按钮，或者进入个人中心页面点击【充值】。`,
							_index:0
						},
						{
							title: `充值后不到账怎么办？`,
							content: `未到账可能是以下原因造成的：<p>（1）由于充值人数较多，所以充值通道拥挤，充值成功速度就会稍慢；</p>
							<p>（2）数据提交上去之后，系统要对数据进行核对才可以给出成功或者失败的结果。</p><p>如果30分钟内没有到账，请立即联系本站客服。</p>
							<p>客服电话：${this.$config.telephone}(09:00-17:30)</p><p>客服QQ：${this.$config.qq}</p>`,
							_index:1
						},
						{
							title: `充值后账户余额数量没变？`,
							content: `<p>（1）刷新当前页面；</p>
							<p>（2）退出后重新登录；</p>
							<p>（3）如果以上2种方法无效，那么可能没有充值成功，请联系本站客服。</p>
							<p>客服电话：${this.$config.telephone}</p><p>客服QQ：${this.$config.qq}。</p>`,
							_index:2
						},
						{
							title: `如何查看我的充值记录？`,
							content: `个人中心页面，点击【充值记录】，便会看到您的充值记录。`,
							_index:3
						},
					]
				},
				{
					tabTitle: "订阅",
					problems: [
						{
							title: `为什么我无法阅读VIP章节？`,
							content: `VIP章节需要订阅后才能阅读。充值后，选择您要看的VIP章节并按提示支付${this.$config.coinName}币，随后即可阅读。`,
							_index:4
						},
						{
							title: `VIP书籍怎么收费的？`,
							content: `本站VIP内容按照300字1个${this.$config.webName+this.$config.coinName}进行收费,即每300字您需要支付0.01元,越高等级的VIP订阅折扣越大。`,
							_index:5
						},
						{
							title: `充值后就能免费阅读VIP章节？`,
							content: `不是。VIP章节需要您订阅后才能阅读，且按照300字1${this.$config.coinName}进行计费。`,
							_index:6
						},
						{
							title: `购买的VIP章节无法阅读？`,
							content: `您可能遇到了系统问题，请联系本站客服解决。客服电话：${this.$config.telephone}，客服QQ：${this.$config.qq}。`,
							_index:7
						},
					]
				},
				{
					tabTitle: "书券",
					problems: [
						{
							title: `什么是书券？`,
							content: `书券是${this.$config.webName}新增的一种虚拟币，与${this.$config.coinName}等值，可用于VIP章节订阅。`,
							_index:8
						},
						{
							title: `书券的使用范围`,
							content: `书券在${this.$config.webName}全站通用（包括${this.$config.webName} Wap站和手机客户端），但受以下使用限制：
							<p>（1）书券仅能用于章节订阅，不支持作品打赏等消费功能；</p>`,
							_index:9
						},
						{
							title: `如何获得书券？`,
							content: `目前，${this.$config.webName}用户可以通过以下途径来获得书券：
							<p>(1)签到</p><p>(1)充值</p><p>(1)活动</p>`,
							_index:10
						},
					]
				}
			]
		};
	},
	components: {
		linkHead,
		nFooter
	},
	methods: {}
};
</script>

<style lang="less" scoped>
@import url("../common/mixin.less");
.help-center .tabs a {
	margin: 0 0.5rem;
}

.common-question .cq-title {
	line-height: 0.6rem;
}
.common-question .cq-content {
	max-height: 0;
	line-height: 0.5rem;
	overflow: hidden;
	padding: 0 0.2rem;
	background: #f4f4f4;
	border-radius: 0.1rem;
}
.common-question .content .cq-content {
	-webkit-transition: max-height 300ms ease;
	transition: max-height 400ms ease;
}
.common-question .active .cq-content {
	max-height: 3rem;
	transition: max-height 0.2;
}

.reader-help a {
	font-size: 0.34rem;
	font-weight: bold;
	padding: 0.2rem;
	display: block;
}
.reader-help .rh-title {
	line-height: 0.6rem;
}
.reader-help .rh-content {
	max-height: 0;
	line-height: 0.5rem;
	overflow: hidden;
	padding: 0 0.2rem;
	background: #f4f4f4;
	border-radius: 0.1rem;
}
.reader-help .content .rh-content {
	-webkit-transition: max-height 300ms ease;
	transition: max-height 300ms ease;
}
.reader-help .active .rh-content {
	max-height: 4rem;
}
</style>

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
					<li class="content" v-for="(item,index) in problemsList" :class="{active:problemActiveIndex==index}" @click="problemActiveIndex=index">
						<div class="cq-title">
							<span>{{index+1 +'. '+item.title}}</span>
						</div>
						<div class="cq-content">
							{{item.content}}
						</div>
					</li>
				</ul>
			</div>
		</transition>
		<transition name="fadeTab">
			<div class="common-question reader-help " v-show="activeTabFlag==1">
				<ul>
					<li class="content" v-for="(item,index) in helpList" :class="{active:helpActiveIndex==index}" @click="helpActiveIndex=index">
						<div class="cq-title">
							<span>{{index+1 +'. '+item.title}}</span>
						</div>
						<div class="cq-content">
							{{item.content}}
						</div>
					</li>
				</ul>
			</div>
		</transition>
      </div>
    </div>
</template>

<script>
import linkHead from './link_header.vue'
export default {
	name:'help',
	data(){
		return{
			problemActiveIndex:0,
			helpActiveIndex:0,
			activeTabFlag:0,
			problemsList:[
				{title:'阅路小说网手机站账号可以通用吗？',content:'可以。阅路小说网主站和手机站已经实现了账户互通。如果您已在主站注册账号，则无需在手机站再次注册，充值、订阅、收藏完完本'},
				{title:'忘记密码怎么办？',content:'在登录界面点击【忘记密码？】，之后将跳转至找回密码页面。目前提供通过注册邮箱找回密码的服务。'},
				{title:'阅路小说网手机站账号可以通用吗？',content:'可以。阅路小说网主站和手机站已经实现了账户互通。如果您已在主站注册账号，则无需在手机站再次注册，充值、订阅、收藏完完本'},
				{title:'阅路小说网手机站账号可以通用吗？',content:'可以。阅路小说网主站和手机站已经实现了账户互通。如果您已在主站注册账号，则无需在手机站再次注册，充值、订阅、收藏完完本'},
				{title:'阅路小说网手机站账号可以通用吗？',content:'可以。阅路小说网主站和手机站已经实现了账户互通。如果您已在主站注册账号，则无需在手机站再次注册，充值、订阅、收藏完完本'},
				{title:'阅路小说网手机站账号可以通用吗？',content:'可以。阅路小说网主站和手机站已经实现了账户互通。如果您已在主站注册账号，则无需在手机站再次注册，充值、订阅、收藏完完本'}
			],
			helpList:[
				{title:'阅路小说网手机站账号可以通用吗？',content:'可以。阅路小说网主站和手机站已经实现了账户互通。如果您已在主站注册账号，则无需在手机站再次注册，充值、订阅、收藏完完本'},
				{title:'忘记密码怎么办？',content:'在登录界面点击【忘记密码？】，之后将跳转至找回密码页面。目前提供通过注册邮箱找回密码的服务。'},
				{title:'阅路小说网手机站账号可以通用吗？',content:'可以。阅路小说网主站和手机站已经实现了账户互通。如果您已在主站注册账号，则无需在手机站再次注册，充值、订阅、收藏完完本'},
				{title:'阅路小说网手机站账号可以通用吗？',content:'可以。阅路小说网主站和手机站已经实现了账户互通。如果您已在主站注册账号，则无需在手机站再次注册，充值、订阅、收藏完完本'},
				{title:'阅路小说网手机站账号可以通用吗？',content:'可以。阅路小说网主站和手机站已经实现了账户互通。如果您已在主站注册账号，则无需在手机站再次注册，充值、订阅、收藏完完本'},
				{title:'阅路小说网手机站账号可以通用吗？',content:'可以。阅路小说网主站和手机站已经实现了账户互通。如果您已在主站注册账号，则无需在手机站再次注册，充值、订阅、收藏完完本'}
			]
		}
	},
	components:{
		linkHead
	},
	methods:{

	}
}
</script>

<style lang="less" scoped>
@import url('../common/color.less');
.help-center .tabs a{
	margin: 0 .5rem;
}

.common-question .cq-title {
  line-height:.6rem;
}
.common-question .cq-content {
  max-height: 0;
  line-height:.5rem;
  overflow: hidden;
  padding: 0 .2rem;
  background: #f4f4f4;
  border-radius: .1rem;
}
.common-question .content .cq-content{
  -webkit-transition: max-height 300ms ease;
  transition: max-height 400ms ease;
}
.common-question .active .cq-content{
	max-height: 3rem;
	transition: max-height .2;
}

.reader-help a {
    font-size: .34rem;
    font-weight: bold;
    padding: .2rem;
    display: block;
}
.reader-help .rh-title {
  line-height:.6rem;
}
.reader-help .rh-content {
  max-height: 0;
  line-height:.5rem;
  overflow: hidden;
  padding: 0 .2rem;
  background: #f4f4f4;
  border-radius: .1rem;
}
.reader-help .content .rh-content{
  -webkit-transition: max-height 300ms ease;
  transition: max-height 300ms ease;
}
.reader-help .active .rh-content{
  max-height: 4rem;
}

</style>


<template>
    <div class="login-container">
	  <link-head>登录</link-head>
      <div class="login">
        <div class="login-title">
          <span>
            <a>快捷登录</a>
          </span>
        </div>
        <div class="login-box">
          <a class="weixin" v-if="isInWeiXin" :href="'http://m.shengshixiwen.com/apis/0.1/User/wxLogin.php?backurl='+myEscape($route.query.backurl)">
            <i class="fa fa-wechat"></i>
		  </a>
          <a class="qq" :href="'http://m.shengshixiwen.com/apis/0.1/User/qqLogin.php?backurl='+myEscape($route.query.backurl)">
            <i class="fa fa-qq"></i>
		  </a>
          <a class="weibo" :href="'http://m.shengshixiwen.com/apis/0.1/User/wbLogin.php?backurl='+myEscape($route.query.backurl)">
            <i class="fa fa-weibo"></i>
		  </a>
          <a class="baidu" :href="'http://m.shengshixiwen.com/apis/0.1/User/bdLogin.php?backurl='+myEscape($route.query.backurl)">
            <i class="iconfont icon-baidu"></i>
		  </a>
        </div>
      </div>
      <div class="login login-count">
        <div class="login-title">
          <span>
            <a>账号登录</a>
          </span>
        </div>
		<div class="goSignUp">还没有账号?现在去 <router-link to="/sign_up" class="btn">注册</router-link></div>
		<div class="login-form-group">
			<el-input placeholder="请输入用户名/手机号" v-model="user.name" clearable>
				<i slot="prefix" class="el-input__icon iconfont icon-user" style="font-size:20px;margin-left:10px;"></i>
  			</el-input>
			<el-input placeholder="请输入密码" v-model="user.pwd" clearable>
				<i slot="prefix" class="el-input__icon iconfont icon-password" style="font-size:20px;margin-left:10px;"></i>
  			</el-input>
			<el-button type="danger" round style="width:100%;margin-top:20px">登录</el-button>
		</div>
      </div>
	  <n-footer></n-footer>
    </div>
</template>

<script>
import linkHead from './link_header.vue'
import nFooter from './nfooter.vue'
import {isWeiXin} from '../common/common_fn.js'
export default {
	name:'login',
	data(){
		return{
			user:{
				name:'zzz',
				pwd:123
			},
			isInWeiXin:false
		}
	},
	components:{
		linkHead,
		nFooter
	},
	created(){
		this.isInWeiXin = isWeiXin();
	},
	methods:{
		myEscape(url){
			return escape(url)
		}
	}
}
</script>
<style lang="less" scoped>
	@import url('../common/color.less');
    .login-container {
      background-color: #f7f7f7;
    }

    .login-container .login-title {
      text-align: center;
      margin-top: .3rem;
    }

    .login-container .login-title span {
      display: inline-block;
      width: 2rem;
      height: .04rem;
      line-height: .04rem;
      background-color: #999;
    }

    .login-container .login-title span a {
      display: inline-block;
      height: .24rem;
      padding: 0 .2rem;
      color: #666;
      background-color: #f7f7f7;
    }

    .login-container .login-box {
      width: 6rem;
      border: solid 0.02rem #ebebeb;
      margin: .2rem auto;
      padding: .3rem;
      border-radius: .1rem;
      background-color: #fff;
	  overflow: hidden;
	  display: flex;
	  justify-content: space-between;
    }

    .login-container .login-box a {
      float: left;
      width: 1.2rem;
      text-align: center;
      margin: 0 .1rem;
      line-height: .8rem;
    }

    .login-container .login-box a i {
      width: 1.1rem;
      height: 1.1rem;
      font-size: .53rem;
      text-align: center;
      line-height: 1.1rem;
      border-radius: .6rem;
	  color: #fff;
	  display: block;
    }

    .login-container .login-box a:nth-child(1) i {
      background-color: #09a456;
    }

    .login-container .login-box a:nth-child(2) i {
      background-color: #f39c12;
    }

    .login-container .login-box a:nth-child(3) i {
      background-color: #ff6060;
      font-size: .58rem;
	}

    .login-container .login-box a:nth-child(4) i {
      background-color: #409EFF;
      font-size: .58rem;
	}
	.login-form-group{
		margin-top: 0.3rem;
	}
	.goSignUp{
		margin: 0.2rem 0;
		font-size: 12px;
		.btn{
			color: @mainColor;
		}
	}
	.login-count{
		width: 6.6rem;
		margin: 0 auto;
	}
</style>
<style lang="less">
.login-form-group{
	.el-input__inner{
		padding-left:45px;
	}
}
</style>

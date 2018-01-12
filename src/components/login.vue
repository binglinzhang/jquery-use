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
          <a class="weixin">
            <i class="fa fa-wechat"></i>微信登录</a>
          <a class="qq">
            <i class="fa fa-qq"></i>QQ登录</a>
          <a class="weibo">
            <i class="fa fa-weibo"></i>微博登录</a>
        </div>
      </div>
	  <n-footer></n-footer>
    </div>
</template>

<script>
import linkHead from './link_header.vue'
import nFooter from './nfooter.vue'
export default {
	name:'login',
	data(){
		return{

		}
	},
	components:{
		linkHead,
		nFooter
	}
}
</script>
<style lang="less" scoped>
	@import url('../common/color.less');
    .login-container {
      background-color: #f7f7f7;
    }

    .login-container .login {
      min-height: 7rem;
    }

    .login-container .login-title {
      text-align: center;
      margin-top: .5rem;
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
      height: .5rem;
      padding: 0 .2rem;
      color: #666;
      background-color: #f7f7f7;
    }

    .login-container .login-box {
      width: 6rem;
      border: solid 0.02rem #ebebeb;
      margin: .5rem auto;
      padding: .4rem .3rem .2rem .3rem;
      border-radius: .1rem;
      background-color: #fff;
      overflow: hidden;
    }

    .login-container .login-box a {
      float: left;
      width: 1.2rem;
      text-align: center;
      margin: 0 .4rem;
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
</style>

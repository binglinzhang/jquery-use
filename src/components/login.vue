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
          <a class="weixin" v-if="isInWeiXin" :href="'http://m.shengshixiwen.com/apis/0.1/User/wxLogin.php?backurl='+$route.query.backurl">
            <i class="fa fa-wechat"></i>
		  </a>
          <a class="qq" :href="'http://m.shengshixiwen.com/apis/0.1/User/qqLogin.php?backurl='+$route.query.backurl">
            <i class="fa fa-qq"></i>
		  </a>
          <a class="weibo" :href="'http://m.shengshixiwen.com/apis/0.1/User/wbLogin.php?backurl='+$route.query.backurl">
            <i class="fa fa-weibo"></i>
		  </a>
          <a class="baidu" :href="'http://m.shengshixiwen.com/apis/0.1/User/bdLogin.php?backurl='+$route.query.backurl">
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
		<el-form ref="form" :model="form" :rules="rules" label-width="0" class="login-form-group">
			<el-form-item prop="username" auto-complete="on">
				<el-input placeholder="请输入用户名/手机号" v-model="form.username" clearable>
					<i slot="prefix" class="el-input__icon iconfont icon-user" style="font-size:20px;margin-left:10px;"></i>
				</el-input>
			</el-form-item>
			<el-form-item prop="password" auto-complete="on">
				<el-input placeholder="请输入密码" v-model="form.password" clearable type="password">
					<i slot="prefix" class="el-input__icon iconfont icon-password" style="font-size:20px;margin-left:10px;"></i>
				</el-input>
			</el-form-item>
			<el-button type="danger" round style="width:100%;margin-top:20px" @click="checkForm('form')">登录</el-button>
		</el-form>
      </div>

	  <v-dialog width="80%"/>

	  <n-footer></n-footer>
    </div>
</template>

<script>
import linkHead from './link_header.vue'
import nFooter from './nfooter.vue'
import {isWeiXin} from '../common/function.js'
import axios from 'axios'
import qs from 'qs'
export default {
	name:'login',
	data(){
		return{
			form:{
				username:null,
				password:null
			},
			isInWeiXin:false,
			rules:{
				username:[
					{
						required:true,
						message:'请输入账号',
						trigger:'blur'
					}
				],
				password:[
					{
						required:true,
						message:'请输入密码',
						trigger:'blur'
					}
				]
			}
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
		login(){
			axios.post('/apis/0.1/User/Login.php',qs.stringify(this.form)).then(res=>{
				if(res.data.code==200){
					this.$userInfo.isLogin = true;
					let pathName = decodeURIComponent(this.$route.query.backurl).split('/').slice(-1)[0];
					this.$modal.show("dialog", {
						text: "登录成功，3s后自动跳转",
						buttons: [
							{
								title: "立即跳转",
								default: true,
								handler: () => {
									this.$router.push('/'+pathName)
								}
							}
						]
					});
					setTimeout(()=>{this.$router.push('/'+pathName)},3000)
				}else{
					this.$modal.show("dialog", {
						text: `登录失败,${res.data.msg}`,
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
			})
		},
		checkForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.login();
				} else {
					console.log("error submit!!", valid);
					return false
				}
			});
		},
	}
}
</script>
<style lang="less" scoped>
	@import url('../common/mixin.less');
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

    .login-container .login-box a.weixin i {
      background-color: #09a456;
    }

    .login-container .login-box a.qq i {
      background-color: #f39c12;
    }

    .login-container .login-box a.weibo i {
      background-color: #ff6060;
      font-size: .58rem;
	}

    .login-container .login-box a.baidu i {
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
		margin: 30px auto 0;
	}
</style>

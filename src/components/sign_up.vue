<template>
    <div class="login-container">
	  <link-head>注册</link-head>

      <div class="login login-count">
        <div class="login-title">
          <span>
            <a>账号注册</a>
          </span>
        </div>
		<div class="login-form-group">
			<el-input placeholder="请输入昵称" v-model="user.nickname" clearable>
				<i slot="prefix" class="el-input__icon iconfont icon-nicheng" style="font-size:20px;margin-left:10px;"></i>
  			</el-input>
			<el-input placeholder="请输入账号" v-model="user.account" clearable>
				<i slot="prefix" class="el-input__icon iconfont icon-user" style="font-size:20px;margin-left:10px;"></i>
  			</el-input>
			<!-- <el-input placeholder="请输入手机号" v-model="user.phone" clearable>
				<i slot="prefix" class="el-input__icon iconfont icon-ziyuan" style="font-size:20px;margin-left:10px;"></i>
  			</el-input> -->
			<el-input placeholder="请输入密码" v-model="user.pwd" clearable>
				<i slot="prefix" class="el-input__icon iconfont icon-password" style="font-size:20px;margin-left:10px;"></i>
  			</el-input>
			<el-input placeholder="请再一次输入密码" v-model="user.pwd_check" clearable>
				<i slot="prefix" class="el-input__icon iconfont icon-password" style="font-size:20px;margin-left:10px;"></i>
  			</el-input>
			<!-- <el-input placeholder="请输入验证码" v-model="user.check_code" clearable>
				<i slot="prefix" class="el-input__icon iconfont icon-ecurityCode" style="font-size:20px;margin-left:10px;"></i>
				<div slot="suffix" class="check-code" :style="{backgroundImage:`url(${backgroundImage})`}"></div>
  			</el-input> -->
			<el-button type="danger" round style="width:100%;margin-top:20px" @click="signUp">注册</el-button>
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
			isOnSignUp:false,
			user:{
				nickname:'',
				account:"",
				phone:"",
				pwd:"",
				pwd_check:"",
				check_code:""
			},
			backgroundImage:'/static/checkcode.png'
		}
	},
	components:{
		linkHead,
		nFooter
	},
	methods:{
		signUp(){
			if(this.pwd&&this.pwd == this.pwd_check){

			}
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
		min-height: 8rem;
	}
	.check-code{
		width: 80px;
		height: 40px;
		background-size: 100% 100%
	}
</style>

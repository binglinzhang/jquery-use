<template>
    <div class="login-container">
	  <link-head>注册</link-head>

      <div class="login login-count">
        <div class="login-title">
          <span>
            <a>账号注册</a>
          </span>
        </div>
		<div class="">

		</div>
		<el-form ref="form" :model="form" :rules="rules" label-width="0" class="login-form-group">
			<el-form-item prop="nickname">
				<el-input placeholder="请输入昵称" v-model="form.nickname" clearable>
					<i slot="prefix" class="el-input__icon iconfont icon-nicheng" style="font-size:20px;margin-left:10px;"></i>
				</el-input>
			</el-form-item>
			<el-form-item prop="account">
				<el-input placeholder="请输入账号" v-model="form.account" clearable>
					<i slot="prefix" class="el-input__icon iconfont icon-user" style="font-size:20px;margin-left:10px;"></i>
				</el-input>
			</el-form-item>
			<!-- <el-form-item prop="phone">
				<el-input placeholder="请输入手机号" v-model="form.phone" clearable>
					<i slot="prefix" class="el-input__icon iconfont icon-ziyuan" style="font-size:20px;margin-left:10px;"></i>
				</el-input>
			</el-form-item> -->
			<el-form-item prop="pwd">
				<el-input placeholder="请输入密码" v-model="form.pwd" clearable type="password">
					<i slot="prefix" class="el-input__icon iconfont icon-password" style="font-size:20px;margin-left:10px;"></i>
				</el-input>
			</el-form-item>
			<el-form-item prop="pwd_check">
				<el-input placeholder="请再一次输入密码" v-model="form.pwd_check" clearable type="password">
					<i slot="prefix" class="el-input__icon iconfont icon-password" style="font-size:20px;margin-left:10px;"></i>
				</el-input>
			</el-form-item>
			<!-- <el-form-item prop="check_code">
				<el-input placeholder="请输入验证码" v-model="form.check_code" clearable>
					<i slot="prefix" class="el-input__icon iconfont icon-ecurityCode" style="font-size:20px;margin-left:10px;"></i>
					<el-button slot="append" class="check-code" size="sm" type="text" >获取验证码</el-button>
				</el-input>
			</el-form-item> -->
			<el-button type="danger" round style="width:100%;margin-top:20px" @click="checkForm('form')">注册</el-button>
		</el-form>
      </div>

	  <v-dialog width="80%"/>

	  <n-footer></n-footer>
    </div>
</template>

<script>
import linkHead from "./link_header.vue";
import nFooter from "./nfooter.vue";
import axios from "axios";
import qs from "qs";
import {
	nickname,
	account,
	phone,
	pwd,
	pwd_check
} from "../common/formValidateRules";
export default {
	name: "login",
	data() {
		return {
			isOnSignUp: false,
			form: {
				nickname: "",
				account: "",
				phone: "",
				pwd: "",
				pwd_check: "",
				check_code: ""
			},
			rules: {
				nickname: nickname(),
				account: account(),
				phone: phone(),
				pwd: pwd(),
				//由于this指向问题，目前只能把pwd_check写在这
				pwd_check: [
					{
						required: true,
						message: "请输入密码",
						trigger: "blur"
					},
					{
						min: 6,
						max: 20,
						message: "长度需在 6 到 20 个字符",
						trigger: "blur"
					},
					{
						validator: (rule, value, callback) => {
							if (value !== this.form.pwd) {
								callback(new Error("两次输入密码不一致!"));
							} else {
								callback();
							}
						},
						trigger: "blur"
					}
				]
			}
		};
	},
	components: {
		linkHead,
		nFooter
	},
	methods: {
		checkForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.signUp();
				} else {
					console.log("error submit!!", valid);
					return false;
				}
			});
		},
		signUp() {
			let data = {
				nicker: this.form.nickname,
				username: this.form.account,
				password: this.form.pwd,
				repassword: this.form.pwd_check
			};
			axios
				.post("/apis/0.1/User/Register.php", qs.stringify(data))
				.then(res => {
					if (res.data.code == 200) {
						this.$modal.show("dialog", {
							text: "注册成功",
							buttons: [
								{
									title: "关闭",
									handler: () => {
										this.$modal.hide("dialog");
									}
								},
								{
									title: "去登录",
									default: true,
									handler: () => {
										this.$router.push({name:'login'})
									}
								}
							]
						});
					}else{
						this.$modal.show("dialog", {
							text: `注册失败,${res.data.msg}`,
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
				});
		}
	}
};
</script>
<style lang="less" scoped>
@import url("../common/color.less");
.login-container {
	background-color: #f7f7f7;
}

.login-container .login-title {
	text-align: center;
	margin-top: 0.3rem;
}

.login-container .login-title span {
	display: inline-block;
	width: 2rem;
	height: 0.04rem;
	line-height: 0.04rem;
	background-color: #999;
}

.login-container .login-title span a {
	display: inline-block;
	height: 0.24rem;
	padding: 0 0.2rem;
	color: #666;
	background-color: #f7f7f7;
}

.login-form-group {
	margin-top: 0.3rem;
}
.goSignUp {
	margin: 0.2rem 0;
	font-size: 12px;
	.btn {
		color: @mainColor;
	}
}
.login-count {
	width: 6.6rem;
	margin: 0 auto;
	min-height: 8rem;
}
.check-code {
	width: 80px;
	height: 40px;
}
</style>

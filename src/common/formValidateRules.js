function nickname(){
	return 	[
		{
			required: true,
			message: "请输入昵称",
			trigger: "blur"
		},
		{
			min: 2,
			max: 15,
			message: "长度在 2 到 15 个字符",
			trigger: "blur"
		}
	];
}
function account(){
	return 	[
		{
			required: true,
			message: "请输入账号",
			trigger: "blur"
		},
		{
			validator:(rule,value,callback)=>{
				let reg = /^\d+$/;
				if (reg.test(value)) {
					callback(new Error('账号不能为纯数字'));
				}else{
					callback()
				}
			},
			trigger: 'blur'
		},
		{
			min: 6,
			max: 20,
			message: "长度需在 6 到 20 个字符",
			trigger: "blur"
		},
	];
}
function phone(){
	return 	[
		{
			required: true,
			message: "请输入手机号码",
			trigger: "blur"
		},
		{
			validator:(rule,value,callback)=>{
				let reg = /^(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
				if (!reg.test(value)) {
					callback(new Error('手机号码有误'));
				}else{
					callback()
				}
			},
			trigger: 'blur'
		}
	];
}
function pwd(){
	return 	[
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
			validator:(rule,value,callback)=>{
				let reg = /^\d+$/;
				if (reg.test(value)) {
					callback(new Error('密码不能为纯数字'));
				}else{
					callback()
				}
			},
			trigger: 'blur'
		}
	];
}

let  pwd_check = ()=>{
	return 	[
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
				console.log(this,rule);
				if (value !== this.form.pwd) {
					callback(new Error("两次输入密码不一致!"));
				}else{
					callback()
				}
			},
			trigger: "blur"
		}
	];
}

export{
	nickname,
	account,
	phone,
	pwd,
	pwd_check
}
